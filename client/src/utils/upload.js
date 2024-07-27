import axios from "axios";

const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "freelancing");

  try {
    const res = await axios.post(
      // "cloudinary://384455224293136:3d2dFnIv2s6RnoqR2WZJwy-QZmg@sauumyaaa",
      "https://api.cloudinary.com/v1_1/sauumyaaa/image/upload",
      data
    );
    const {url}=res.data;
    return url;

  } catch (err) {
    console.log(err);
  }
};

export default upload;
