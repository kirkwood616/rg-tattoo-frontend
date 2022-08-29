import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebaseConfig";
import { RequestReducer } from "../models/RequestReducer";

function handleReferencePhotoUpload(state: RequestReducer): void {
  if (!state.referencePhoto.value) return;
  const storageRef = ref(storage, `/images/${state.firstName.value}-${state.lastName.value}-ref-${state.referencePhoto.value.name}`);
  uploadBytesResumable(storageRef, state.referencePhoto.value);
}

function handlePlacementPhotoUpload(state: RequestReducer): void {
  if (!state.placementPhoto.value) return;
  const storageRef = ref(storage, `/images/${state.firstName.value}-${state.lastName.value}-place-${state.placementPhoto.value.name}`);
  uploadBytesResumable(storageRef, state.placementPhoto.value);
}

export { handleReferencePhotoUpload, handlePlacementPhotoUpload };
