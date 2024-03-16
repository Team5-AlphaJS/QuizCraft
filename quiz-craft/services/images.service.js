import { storage } from "/config/firebase-config";
// import { deleteObject, listAll, ref } from "firebase/storage";
import { ref } from "firebase/storage";
import { getDownloadURL, uploadBytes } from "firebase/storage";
import { v4 } from "uuid"; // so that we can generate a unique name for each image

export const uploadAvatar = async (image) => {
  try {
      const imageRef = ref(storage, `avatars/${image.name + v4()}`);
      await uploadBytes(imageRef, image);
      const url = await getDownloadURL(imageRef);
      return url;
  } catch (error) {
      console.log(error.message);
  }
}

// will be used later in the UserProfile component
// export const deleteAvatar = async (image) => {
//   try {
//     const lastFolderRef = ref(storage, `avatars/${image}`);
//     const res = await listAll(lastFolderRef);
//     await deleteObject(res.items[0]);
//   } catch (e) {
//     console.log(e.message);
//   }
// };