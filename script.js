const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// uploads folder இருக்காவிட்டா create பண்ணு
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer storage settings
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // file name = time-originalname (duplicate avoid)
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// front-end files serve பண்ண
app.use(express.static(path.join(__dirname, "public")));

// uploaded images-ஐ /uploads URL-ல serve பண்ண
app.use("/uploads", express.static(uploadDir));

// multiple files upload API
app.post("/upload", upload.array("files", 20), (req, res) => {
  res.json({ success: true });
});

// images list API
app.get("/list", (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Unable to read directory" });
    }

    const imgs = files
      .filter((f) => /\.(png|jpe?g|gif|webp)$/i.test(f))
      .map((name) => ({
        name,
        url: "/uploads/" + name,
      }));

    res.json(imgs);
  });
});

// delete image API
app.delete("/delete/:name", (req, res) => {
  const filename = req.params.name;
  const filePath = path.join(uploadDir, filename);

  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(500).json({ error: "File not found" });
    }
    res.json({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(Server running on http://localhost:${PORT});
});