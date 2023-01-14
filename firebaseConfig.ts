import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const api_key = process.env.NEXT_PUBLIC_API_KEY || "";
const auth_domain = process.env.NEXT_PUBLIC_AUTH_DOMAIN || "";
const project_id = process.env.NEXT_PUBLIC_PROJECT_ID || "";
const storage_bucket = process.env.NEXT_PUBLIC_STORAGE_BUCKET || "";
const messaging_sender_id = process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID || "";
const app_id = process.env.NEXT_PUBLIC_APP_ID || "";
const measurement_id = process.env.NEXT_PUBLIC_MEASUREMENT_ID || "";

const firebaseConfig = {
  apiKey: api_key,
  authDomain: auth_domain,
  projectId: project_id,
  storageBucket: storage_bucket,
  messagingSenderId: messaging_sender_id,
  appId: app_id,
  measurementId: measurement_id,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const storage = getStorage(app);

export { auth, storage, app };
