import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCIo4F7qu5Hk51FdX9b0JcLzA3Ab-ewJsg",
  authDomain: "portfolio-tero-lamminpaa.firebaseapp.com",
  projectId: "portfolio-tero-lamminpaa",
  storageBucket: "portfolio-tero-lamminpaa.appspot.com",
  messagingSenderId: "503351430121",
  appId: "1:503351430121:web:b8af708048828022235978",
  measurementId: "G-0TX5GL8VKP"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);