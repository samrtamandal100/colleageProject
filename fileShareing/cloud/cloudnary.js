const cloudinary = require('cloudinary').v2;


// Configuration 
cloudinary.config({
  cloud_name: "dah5sosw6",
  api_key: "138997413823257",
  api_secret: "XvA0Fs2tZjQ-tjIyLFHf51_2Uus"
});

module.exports = cloudinary;