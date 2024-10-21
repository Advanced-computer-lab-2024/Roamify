// middleware/uploadMiddleware.js
const multer = require('multer');
const path = require('path');
let counter = 0;
// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    cb(null, './placesImages'); // Folder where files will be saved
  },
  filename: function (req, file, cb) {
  
    // Get the place name from req.body if available
    const placeName = req.body.name ? req.body.name.replace(/\s+/g, '_').toLowerCase() : 'place';
    const fileName = `${counter++}${placeName}-${Date.now()}${path.extname(file.originalname)}`;
    
    cb(null, fileName);
  }
});


// File filter to allow only images
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

// Initialize Multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },  // 1MB file size limit
  fileFilter: fileFilter
});

module.exports = upload;
