import { DocumentData, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";
import { Project } from "../types";

export const firebaseConfig = {
  apiKey: "AIzaSyCIo4F7qu5Hk51FdX9b0JcLzA3Ab-ewJsg",
  authDomain: "portfolio-tero-lamminpaa.firebaseapp.com",
  projectId: "portfolio-tero-lamminpaa",
  storageBucket: "portfolio-tero-lamminpaa.appspot.com",
  messagingSenderId: "503351430121",
  appId: "1:503351430121:web:b8af708048828022235978",
  measurementId: "G-0TX5GL8VKP"
};

export const projectConverter = {
  toFirestore(project: Project): DocumentData {
    return {
      title: project.title,
      imagePath: project.imagePath,
      imageUrl: project.imageUrl,
      text: project.text,
      github: project.github
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Project {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      title: data.title,
      imagePath: data.imagePath,
      imageUrl: data.imageUrl,
      text: data.text,
      github: data.github
    };
  }
};