
//import multer

import multer from "multer";

//configure the multer storage for filename and destination

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },

    filename: (req, file, cb) => {
        // cb(null, new Date().toISOString() + file.originalname);
        cb(null, new Date().toISOString().replace(/:/g, '_') + file.originalname);
    }
})

// configure the storage inside multer and export it

export const upload = multer({ storage: storage })