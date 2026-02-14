

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAfzgijvVSJDpo-AJmhR57V9Vmlbb9wVgc",
  authDomain: "capstone-project-b2d02.firebaseapp.com",
  projectId: "capstone-project-b2d02",
  appId: "1:839209319584:web:25cbefec01635f45515dc5"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
