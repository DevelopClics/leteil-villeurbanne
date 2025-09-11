const jsonServer = require("json-server");
const multer = require("multer");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const SECRET_KEY = "your-very-secret-key";
const expiresIn = "1h";

server.use(cors());
server.use(middlewares);
server.use(jsonServer.bodyParser);

// Middleware to authenticate requests
server.use((req, res, next) => {
  if (req.path === "/login") {
    return next();
  }
  // Allow GET requests to carouselText, genesisText, and reasonText without authentication
  if (
    (req.path.startsWith("/carouselText") ||
      req.path.startsWith("/genesisText") ||
      req.path.startsWith("/reasonText")) &&
    req.method === "GET"
  ) {
    return next();
  }

  if (
    (req.path.startsWith("/carouselText") ||
      req.path.startsWith("/genesisText") ||
      req.path.startsWith("/reasonText") ||
      req.path.startsWith("/pageTitles") ||
      req.path.startsWith("/pageParagraphs")) &&
    (req.method === "PUT" || req.method === "PATCH")
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
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Custom route for file uploads
server.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

server.use(router);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});