console.log("server.js is running");
const jsonServer = require("json-server");
const multer = require("multer");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const path = require("path");
const fs = require("fs");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const SECRET_KEY = "your-very-secret-key";
const expiresIn = "1h";

server.use(cors());
server.use(middlewares);
server.use(jsonServer.bodyParser);

// Authentication middleware
server.use((req, res, next) => {
  const publicPaths = [
    '/login',
  ];
  const publicGetPaths = [
    '/carouselText',
    '/genesisText',
    '/reasonText',
    '/teammembers',
    '/carouselImages',
    '/citiesProjects',
    '/cultureProjects',
    '/foodProjects',
    '/youthProjects',
    '/economyProjects',
    '/allProjects',
  ];

  if (publicPaths.includes(req.path)) {
    return next();
  }

  if (req.method === 'GET') {
    const isPublicGetPath = publicGetPaths.some(p => req.path.startsWith(p));
    console.log(`Path: ${req.path}, Is Public GET Path: ${isPublicGetPath}`);
    if (isPublicGetPath) {
      return next();
    }
  }

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
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

// Explicit routes for projects that were returning 404
server.get("/allProjects", (req, res) => {
  const db = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8'));
  res.json(db.allProjects);
});

server.get("/foodProjects", (req, res) => {
  const db = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8'));
  console.log("Sending foodProjects:", db.foodProjects); // Add this line
  res.json(db.foodProjects);
});

server.get("/economyProjects", (req, res) => {
  const db = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8'));
  res.json(db.economyProjects);
});

server.get("/youthProjects", (req, res) => {
  const db = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8'));
  res.json(db.youthProjects);
});

server.get("/citiesProjects", (req, res) => {
  const citiesProjects = router.db.get("citiesProjects").value();
  res.json(citiesProjects);
});

server.get("/cultureProjects", (req, res) => {
  const cultureProjects = router.db.get("cultureProjects").value();
  res.json(cultureProjects);
});

server.get("/foodProjects", (req, res) => {
  const foodProjects = router.db.get("foodProjects").value();
  res.json(foodProjects);
});

server.get("/youthProjects", (req, res) => {
  const youthProjects = router.db.get("youthProjects").value();
  res.json(youthProjects);
});

server.get("/economyProjects", (req, res) => {
  const economyProjects = router.db.get("economyProjects").value();
  res.json(economyProjects);
});

// Routes for carousel text
server.get("/carouselText/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const carouselText = router.db.get("carouselText").find({ id }).value();
  if (carouselText) {
    res.json(carouselText);
  } else {
    res.status(404).json({ message: "Carousel text not found" });
  }
});

server.put("/carouselText/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedContent = req.body.content;
  const carouselText = router.db.get("carouselText").find({ id }).assign({ content: updatedContent }).write();
  if (carouselText) {
    res.json(carouselText);
  } else {
    res.status(404).json({ message: "Carousel text not found" });
  }
});

// Routes for reason text
server.get("/reasonText/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const reasonText = router.db.get("reasonText").find({ id }).value();
  if (reasonText) {
    res.json(reasonText);
  } else {
    res.status(404).json({ message: "Reason text not found" });
  }
});

server.put("/reasonText/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedContent = req.body.content;
  const reasonText = router.db.get("reasonText").find({ id }).assign({ content: updatedContent }).write();
  if (reasonText) {
    res.json(reasonText);
  } else {
    res.status(404).json({ message: "Reason text not found" });
  }
});

// Routes for genesis text
server.get("/genesisText/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const genesisText = router.db.get("genesisText").find({ id }).value();
  if (genesisText) {
    res.json(genesisText);
  } else {
    res.status(404).json({ message: "Genesis text not found" });
  }
});

server.put("/genesisText/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedContent = req.body.content;
  const genesisText = router.db.get("genesisText").find({ id }).assign({ content: updatedContent }).write();
  if (genesisText) {
    res.json(genesisText);
  } else {
    res.status(404).json({ message: "Genesis text not found" });
  }
});

// Routes for carousel images
server.get("/carouselImages", (req, res) => {
  const carouselImages = router.db.get("carouselImages").value();
  res.json(carouselImages);
});

server.put("/carouselImages/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedSlide = req.body;
  const carouselImage = router.db.get("carouselImages").find({ id }).assign(updatedSlide).write();
  if (carouselImage) {
    res.json(carouselImage);
  } else {
    res.status(404).json({ message: "Carousel image not found" });
  }
});

server.delete("/carouselImages/:id", (req, res) => {
  const id = parseInt(req.params.id);
  router.db.get("carouselImages").remove({ id }).write();
  res.status(200).json({ message: "Carousel image deleted" });
});

server.post("/carouselImages", (req, res) => {
  const newSlide = req.body;
  const carouselImages = router.db.get("carouselImages");
  const lastId = carouselImages.value().length > 0 ? Math.max(...carouselImages.value().map(s => s.id)) : 0;
  newSlide.id = lastId + 1;
  carouselImages.push(newSlide).write();
  res.status(201).json(newSlide);
});

server.put("/carouselImages", (req, res) => {
  const updatedCarouselImages = req.body;
  router.db.set("carouselImages", updatedCarouselImages).write();
  res.status(200).json(updatedCarouselImages);
});

// PUT route for updating a team member by category and id
server.get("/teammembers", (req, res) => {
  const teammembers = router.db.get("teammembers").value();
  res.json(teammembers);
});

server.put("/teammembers/:category/:id", (req, res) => {
  const category = req.params.category;
  const id = parseInt(req.params.id);
  const updatedMember = req.body;

  console.log("PUT /teammembers - Category:", category, "ID:", id, "Updated Member:", updatedMember); // Added log

  const teammembers = router.db.get("teammembers");
  const categoryMembers = teammembers.get(category);

  if (!categoryMembers.value()) {
    console.log("Category not found:", category); // Added log
    return res.status(404).json({ message: "Category not found" });
  }

  try { // Added try-catch block
    const memberToUpdate = categoryMembers.find({ id });

    if (memberToUpdate.value()) { // Check if member exists before updating
      const updated = memberToUpdate.assign(updatedMember).write();
      console.log("Successfully updated member:", updatedMember); // Log the updatedMember
      res.status(200).json(updatedMember);
    } else {
      console.log("Team member not found:", id);
      res.status(404).json({ message: "Team member not found" });
    }
  } catch (error) {
    console.error("Error during team member update:", error); // Added error log
    res.status(500).json({ message: "Internal Server Error during update", error: error.message });
  }
});

server.delete("/teammembers/:category/:id", (req, res) => {
  const category = req.params.category;
  const id = parseInt(req.params.id);

  const teammembers = router.db.get("teammembers");
  const categoryMembers = teammembers.get(category);

  if (!categoryMembers.value()) {
    return res.status(404).json({ message: "Category not found" });
  }

  const initialLength = categoryMembers.value().length;
  categoryMembers.remove({ id }).write();

  if (categoryMembers.value().length < initialLength) {
    res.status(200).json({ message: "Team member deleted" });
  } else {
    res.status(404).json({ message: "Team member not found" });
  }
});

// Create JWT token
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Login route
server.post("/login", (req, res) => {
  const { id, password } = req.body;
  const user = router.db.get("user").find({ id }).value();

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

// Multer setup for dynamic team member file uploads
const teamUploadStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const category = req.params.category;
    const dest = path.join(__dirname, '..', 'client', 'public', 'images', 'photos', 'team', category);
    fs.mkdir(dest, { recursive: true }, (err) => {
      if (err) return cb(err);
      cb(null, dest);
    });
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const teamUpload = multer({ storage: teamUploadStorage });

// Upload route for team member images by category
server.post("/upload/:category", teamUpload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }
  const fileUrl = `images/photos/team/${req.params.category}/${req.file.filename}`;
  res.json({ url: fileUrl });
});

// Multer setup for carousel image uploads
const carouselUploadsDir = path.join(__dirname, '..', 'client', 'public', 'images', 'photos', 'carousel');
if (!fs.existsSync(carouselUploadsDir)) {
  fs.mkdirSync(carouselUploadsDir, { recursive: true });
}
const carouselStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, carouselUploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const carouselUpload = multer({ storage: carouselStorage });

// Upload route for carousel images
server.post("/upload/carousel", carouselUpload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }
  const fileUrl = `images/photos/carousel/${req.file.filename}`;
  res.json({ url: fileUrl });
});

server.use(router);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});