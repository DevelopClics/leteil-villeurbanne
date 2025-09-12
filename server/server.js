const jsonServer = require("json-server");
const multer = require("multer");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const path = require("path");
const fs = require("fs");

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, '..', 'client', 'public', 'images', 'photos', 'team', 'office');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const SECRET_KEY = "your-very-secret-key";
const expiresIn = "1h";

server.use(cors());
server.use(middlewares);
server.use(jsonServer.bodyParser);

// Middleware to set Cache-Control headers for image files
server.use((req, res, next) => {
  if (req.path.startsWith('/images/photos/team/office/') && req.method === 'GET') {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }
  next();
});

// Middleware to authenticate requests
server.use((req, res, next) => {
  if (req.path === "/login") {
    return next();
  }
  // Allow GET requests to carouselText, genesisText, and reasonText without authentication
  if (
    (req.path.startsWith("/carouselText") ||
      req.path.startsWith("/genesisText") ||
      req.path.startsWith("/reasonText") ||
      req.path.startsWith("/teammembers") ||
      req.path.startsWith("/carouselImages")) && // Added /carouselImages for GET
    req.method === "GET"
  ) {
    return next();
  }

  if (
    (req.path.startsWith("/carouselText") ||
      req.path.startsWith("/genesisText") ||
      req.path.startsWith("/reasonText") ||
      req.path.startsWith("/pageTitles") ||
      req.path.startsWith("/pageParagraphs") ||
      req.path.startsWith("/teammembers")) && // Added /teammembers for PUT/PATCH/POST/DELETE
    (req.method === "PUT" || req.method === "PATCH" || req.method === "POST" || req.method === "DELETE") // Added POST and DELETE
  ) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = decoded; // Attach user info to request
      return next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
  }
  next();
});

// Custom route to handle PUT requests for teammembers
server.put("/teammembers/:category/:id", (req, res) => {
  const category = req.params.category;
  const id = parseInt(req.params.id);
  const updatedMember = req.body;
  console.log("Received updatedMember:", updatedMember);

  const db = router.db; // Get the lowdb instance
  const teammembers = db.get("teammembers").value();
  console.log("teammembers before update:", JSON.stringify(teammembers, null, 2));

  if (!teammembers[category]) {
    return res.status(404).json({ message: "Category not found" });
  }

  const index = teammembers[category].findIndex(member => member.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Team member not found" });
  }

  // Update the member
  teammembers[category][index] = { ...teammembers[category][index], ...updatedMember };
  console.log("teammembers after update (in memory):", JSON.stringify(teammembers, null, 2));

  // Write the updated data back to db.json
  db.set("teammembers", teammembers).write();
  console.log("db.json written.");

  res.status(200).json(teammembers[category][index]);
});

// Function to create a token
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Login route
server.post("/login", (req, res) => {
  const { id, password } = req.body;
  const db = router.db; // Get the lowdb instance
  const user = db.get("user").find({ id }).value();

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  bcrypt.compare(password, user.password).then((isMatch) => {
    if (isMatch) {
      const token = createToken({ id: user.id, role: user.role });
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Custom route for file uploads
server.post("/upload", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    const fileUrl = `images/photos/team/office/${req.file.filename}`;
    console.log("File uploaded successfully. URL:", fileUrl);
    res.json({ url: fileUrl });
  } catch (error) {
    console.error("Error during file upload:", error);
    res.status(500).json({ message: "File upload failed", error: error.message });
  }
});

server.use(router);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});