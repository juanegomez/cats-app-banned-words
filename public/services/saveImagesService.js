const multer = require("multer");//for upload files
const path = require("path");
const uuid = require("uuid");//for generate a unique id
const boom = require("@hapi/boom");//to show errors

class saveImagesService {
  constructor() {}

  saveImage(folderName) {
    //Save uploads images with multer
     
    const storage = multer.diskStorage({
      destination: `public/uploads/${folderName}`,
      //make a unique file name 
      filename: (req, file, cb) => {
        cb(null, uuid.v4() + path.extname(file.originalname).toLowerCase());
      },
    });

    return multer({
      storage,
      dest: `../public/uploads/${folderName}`,
      //files must not exceed 5mb in size
      limits: { fieldSize: 5000000 },
      //only images are allowed to be uploaded
      fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif|JPG/;
        const mimeType = fileTypes.test(file.mimetype);
        const extName = fileTypes.test(path.extname(file.originalname));
        if (mimeType && extName) {
          return cb(null, true);
        }
        cb(boom.badData("file must be an image (jpeg|jpg|png|gif)."));
      },
    }).single("image");
  }
}

module.exports = saveImagesService;
