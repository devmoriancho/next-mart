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
  if (images.length < 1 || images.length > 4) {
    throw new Error("Please upload between 1 and 4 images.");
  }

  const uploadPromises = images.map(async (image) => {
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise<UploadImageResult>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "fashion_tutorial",
            format: "webp",
          },
          (error, result) => {
            if (error || !result) {
              return reject(error || new Error("Cloudinary upload failed"));
            }
            resolve({
              publicId: result.public_id,
              imageUrl: result.secure_url,
            });
          },
        )
        .end(buffer);
    });
  });

  return Promise.all(uploadPromises);
}

export async function deleteImages(publicIds: string[]) {
  await Promise.all(
    publicIds.map(
      (publicId) =>
        new Promise<void>((resolve, reject) => {
          cloudinary.uploader.destroy(publicId, (error) => {
            if (error) {
              reject(error);
              return;
            }
            resolve();
          });
        }),
    ),
  );
}
