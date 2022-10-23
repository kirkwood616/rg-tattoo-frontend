import { ref, StorageReference, uploadBytesResumable } from "firebase/storage";
import { storage } from "firebaseConfig";
import { PhotoType } from "models/AppointmentRequest";
import { RequestReducer } from "models/RequestReducer";
import { formatPhotoPath } from "./Formatting";

export async function handlePhotoUpload(state: RequestReducer, photoType: PhotoType) {
  let file: File;
  let fileName: string;
  let storageRef: StorageReference;
  switch (photoType) {
    case "reference":
      if (!state.referencePhoto.value) break;
      file = state.referencePhoto.value;
      fileName = formatPhotoPath(state, "reference");
      if (!fileName) return;
      storageRef = ref(storage, `/images/${fileName}`);
      try {
        await uploadBytesResumable(storageRef, file);
        console.log("uploaded");
        break;
      } catch (error) {
        console.error(error);
        break;
      }
    case "placement":
      if (!state.placementPhoto.value) break;
      file = state.placementPhoto.value;
      fileName = formatPhotoPath(state, "reference");
      if (!fileName) return;
      storageRef = ref(storage, `/images/${fileName}`);
      try {
        await uploadBytesResumable(storageRef, file);
        break;
      } catch (error) {
        console.error(error);
        break;
      }
  }
}

function handleReferencePhotoUpload(state: RequestReducer): void {
  if (!state.referencePhoto.value) return;
  const storageRef = ref(
    storage,
    `/images/${state.firstName.value}-${state.lastName.value}-ref-${state.referencePhoto.value.name}`
  );
  uploadBytesResumable(storageRef, state.referencePhoto.value);
}

function handlePlacementPhotoUpload(state: RequestReducer): void {
  if (!state.placementPhoto.value) return;
  const storageRef = ref(
    storage,
    `/images/${state.firstName.value}-${state.lastName.value}-place-${state.placementPhoto.value.name}`
  );
  uploadBytesResumable(storageRef, state.placementPhoto.value);
}

export { handleReferencePhotoUpload, handlePlacementPhotoUpload };
