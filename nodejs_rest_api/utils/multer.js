import multer from "multer";
import path from "path";

const upload = multer({
  storage: multer.diskStorage({
		// destination: (req, file, callback) => {
		// 	callback(null, "./uploads/");
		// },
		// filename: (req, file, callback) => {
		// 	callback(null, `${Date.now()}${path.extname(file.originalname)}`);
		// }
	}),
  limits: { fileSize: 52428800 }, //50MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const mimeType = fileTypes.test(file.mimetype);

    const extName = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimeType && extName) {
      return cb(null, true);
    }

    cb(new Error("File type is not supported"), false);
  },
});

export default upload;
