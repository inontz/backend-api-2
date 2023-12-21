import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import multer from "multer";

const app = express();
const port = process.env.PORT || 3000;
const upload = multer().single("file");

export interface Payload {
  a: number;
  b: number;
}

app.use(express.json());
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

app.get("/", async (req: Request, res: Response) => {
  res.send("hello world");
});

app.post("/upload", function (req, res, next) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError || !req.file) {
      console.error(err);
      res.status(442).send({ error: "Please select a file" });
      // A Multer error occurred when uploading.
    } else if (err) {
      console.error(err);
      res.status(500).send({ error: err });
    } else {
      let arr_name = req.file?.originalname.toString().split(".");
      console.info(
        `file uploaded: ${req.file?.originalname} - ${req.file?.size} bytes`
      );
      res.send({
        fileName: `${req.file?.originalname}`,
        size: `${req.file?.size / (1024 * 1024)} MB`,
        extension: `${arr_name[arr_name.length - 1]}`,
      });
    }
  });
});

app.listen(port, () => console.log(`api is running on port ${port}`));
