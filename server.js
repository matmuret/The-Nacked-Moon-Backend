import express from "express";
import mongoose from "mongoose";
/* import dataShop from "./dataShop.js"; */
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
import dotenv from "dotenv";
import cors from "cors";
import orderRouter from "./routers/orderRouter.js";
import albumRouter from "./routers/albumRouter.js";
import  bodyParserPkg from "body-parser";
const {urlencoded, json } = bodyParserPkg;
import methodOverride from "method-override";
import morgan from "morgan";
import path from "path";
import { photoUpload, dataUri } from "./middleware/photoUpload.js";
import { upload } from "./middleware/upload.js";
import { uploader, cloudinaryConfig } from "./config/cloudinary.js";

dotenv.config();

const app = express();
app.use(urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(cors());
app.use(morgan("dev"));
app.use(json());
/* app.use(urlencoded({ extended: true })); */

mongoose.connect(
  process.env.MONGODB_URL || "mongodb://localhost/thenakedmoon",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);
mongoose.connection.on("error", console.error);
mongoose.connection.on("open", function () {
  console.log("Database connection established...");
});
/* app.get("/api/Shop/:id", (req, res) => {
  const product = dataShop.products.find((x) => x._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
}); */

/* app.get("/api/Shop", (req, res) => {
  res.send(dataShop.products);
}); */

/* app.use("/api/photosupload", express.static("photosupload"));
app.use("/api/productsupload", express.static("productsupload")); */
console.log(photoUpload)
app.post("/api/photosupload", photoUpload, (req, res) => {
  
  /* console.log("req.body :", req.body); */
  if (req.file) {
    const file = dataUri(req).content;
    return uploader
      .upload(file)
      .then((result) => {
        const images = result.url;
        return res.status(200).json({
          messge: "Your image has been uploded successfully to cloudinary",
          data: {
            images,
          },
        });
      })
      .catch((err) =>
        res.status(400).json({
          messge: "someting went wrong while processing your request",
          data: {
            err,
          },
        })
      );
  }
});
app.post("/api/productsupload", upload, (req, res) => {
  console.log("req.body :", req.body);
  if (req.file) {
    const file = dataUri(req).content;
    return uploader
      .upload(file)
      .then((result) => {
        const image = result.url;
        return res.status(200).json({
          messge: "Your image has been uploded successfully to cloudinary",
          data: {
            image,
          },
        });
      })
      .catch((err) =>
        res.status(400).json({
          messge: "someting went wrong while processing your request",
          data: {
            err,
          },
        })
      );
  }
});
/* app.get("/", (req, res) => {
  res.send("Server is ready");
}); */
app.use("/api/albumup", albumRouter);
app.use("/api/users", userRouter);
app.use("/api/Shop", productRouter);
app.use("/api/orders", orderRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});
app.use("*", cloudinaryConfig);
//Set static assets
const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  /*  app.use(
    "/photosuploads",
    express.static(path.join(__dirname, "/photosuploads"))
  );
  app.use(
    "/productsupload",
    express.static(path.join(__dirname, "/productsupload"))
  ); */
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
