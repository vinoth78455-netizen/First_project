<<<<<<< HEAD
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();

// uploads folder path
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// static files (index.html, gallery.html, dashboard.html, style.css)
app.use(express.static(__dirname));

// uploaded images serve
app.use("/uploads", express.static(uploadDir));

// upload API
app.post("/upload", upload.array("files", 20), (req, res) => {
  res.json({ success: true });
});

// list API
app.get("/list", (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) return res.status(500).json({ error: "Cannot read folder" });

    const imgs = files
      .filter((f) => /\.(png|jpe?g|gif|webp)$/i.test(f))
      .map((name) => ({
        name,
        url: "/uploads/" + name,
      }));
    res.json(imgs);
  });
});

// delete API
app.delete("/delete/:name", (req, res) => {
  const filePath = path.join(uploadDir, req.params.name);
  fs.unlink(filePath, (err) => {
    if (err) return res.status(500).json({ error: "File not found" });
    res.json({ success: true });
  });
});

// PORT from Render or 3000 local
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
=======
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();

// uploads folder path
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// static files (index.html, gallery.html, dashboard.html, style.css)
app.use(express.static(__dirname));

// uploaded images serve
app.use("/uploads", express.static(uploadDir));

// upload API
app.post("/upload", upload.array("files", 20), (req, res) => {
  res.json({ success: true });
});

// list API
app.get("/list", (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) return res.status(500).json({ error: "Cannot read folder" });

    const imgs = files
      .filter((f) => /\.(png|jpe?g|gif|webp)$/i.test(f))
      .map((name) => ({
        name,
        url: "/uploads/" + name,
      }));
    res.json(imgs);
  });
});

// delete API
app.delete("/delete/:name", (req, res) => {
  const filePath = path.join(uploadDir, req.params.name);
  fs.unlink(filePath, (err) => {
    if (err) return res.status(500).json({ error: "File not found" });
    res.json({ success: true });
  });
});

// PORT from Render or 3000 local
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(Server running on port ${PORT});
>>>>>>> 0dc3cb8fd6e24f35e72587ddaa7c95b224c03057
});