import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface UploadImageResult {
  publicId: string;
  imageUrl: string;
}

export async function uploadImages(
  images: File[],
): Promise<UploadImageResult[]> {
  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    throw new Error(
      "Missing required cloud storage configuration credentials.",
    );
  }

  if (images.length < 1 || images.length > 4) {
    throw new Error("Please upload between 1 and 4 images.");
  }

  return Promise.all(
    images.map(async (file) => {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      return new Promise<UploadImageResult>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "nextmart",
            transformation: [{ format: "webp", quality: "auto" }],
          },
          (error, result) => {
            if (error || !result) {
              reject(error || new Error("Cloud asset generation failed."));
              return;
            }

            resolve({
              imageUrl: result.secure_url,
              publicId: result.public_id,
            });
          },
        );

        stream.end(buffer);
      });
    }),
  );
}
