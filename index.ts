import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator'

const app = express();
const port = process.env.PORT || 3000;


export interface Payload {
    a: number,
    b: number
}


app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
    res.send("hello world");
});

const bodyAChain = () => body('a').isInt()
app.post("/app", body('a').isInt(), body('b').isInt(), (req: Request<Payload>, res: Response) => {
    if (req.headers.authorization != "DEVCREW-BACKEND-TEST") {
        res.status(401).send({ error: "Unauthorized" })
    }
    else {

        if (!req.body['a'] || !req.body['b']) {
            res.status(422).send({ error: "Unsupported data format" })
        }
        else {
            res.send({ result: `${req.body['a'] + req.body['b']}` })
        }
    }

});


app.listen(port, () => console.log(`api is running on port ${port}`));
