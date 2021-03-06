import multer from 'multer';

/**
 * WHERE DOES MULTER STORE FILE INFORMATION?
 * req.file => for just ONE file
 * req.files => for multiple files
 */
// MULTER configuration
const storage = multer.diskStorage({
  destination: 'photosupload',
  // filename function will construct a filename
  // that will be used to store the file
  filename: (req, file, done) => {
    let date = new Date();
    /* console.log(req.file, 'try') */
    let filenameUpload = `${date.getTime()}-${
      file.originalname
    }`;
    done(null, filenameUpload);
  },
});

// File upload middleware
const photoUpload = multer({
  storage: storage,
});

export default photoUpload;