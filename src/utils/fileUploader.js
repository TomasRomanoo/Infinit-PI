import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({});

export const fileUploader = async (file) => {
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: filePath.substring(filePath.lastIndexOf("/") + 1),
    Body: file,
  });

  try {
    const response = await s3.send(command);
    console.log(response);
  } catch (err) {
    console.error(err);
  }
};


