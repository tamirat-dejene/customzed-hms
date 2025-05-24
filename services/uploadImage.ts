import axios from "axios";
import { CLOUDINARY_NAME } from "@/utils/config";

export const uploadImage = async (image: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "hms_cabins");

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`,
      formData
    );

    return response.data.secure_url;
  } catch (error: any) {
    console.error(
      "Cloudinary upload failed:",
      error?.response?.data || error.message
    );
    throw new Error("Image upload failed.");
  }
};
