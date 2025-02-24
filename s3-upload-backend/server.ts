import { Request, Response } from "express";
import express, { Application } from "express";
import * as dotenv from "dotenv";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import cors from "cors";

/*
    S3 client backend for getting presigned url for uploading to s3 bucket
*/
dotenv.config();

const app: Application = express();
const port = 8082;

// Enable CORS for all origins
app.use(cors());

const s3Client = new S3Client({
    region: process.env.AWS_S3_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

app.use(express.json());

app.post("/get-presigned-url", async (req: Request, res: Response): Promise<void> => {
    const { fileName, fileType } = req.body;

    // Parameters for the S3 pre-signed URL
    const params = {
        Bucket: process.env.AWS_S3_BUCKET!,
        Key: `uploads/${fileName}`,
        ContentType: fileType,
    };

    try {
        // Generate the pre-signed URL using AWS SDK v3
        const command = new PutObjectCommand(params);
        const url = await getSignedUrl(s3Client, command, { expiresIn: 60 * 5 });
        res.json({ uploadUrl: url });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error generating pre-signed URL" });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
