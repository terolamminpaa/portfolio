import { db, storage } from "..";
import { v4 as uuidv4 } from 'uuid';
import { Project, ProjectBody } from "../types";
import { projectConverter } from "../firebase/firebase-config";
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { deleteObject, getDownloadURL, ref, StorageReference, uploadBytes } from "firebase/storage";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, runTransaction } from "firebase/firestore";

/**
 * Api for firebase functionality
 */
export default class Api {

  /**
   * Sign in to firebase
   *
   * @param email user email
   * @param password user password
   */
  public static signIn = async (email: string, password: string): Promise<void> => {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
    } catch(error) {
      return Promise.reject(error);
    }
  }

  /**
   * Sign out of firebase
   */
   public static signOut = async (): Promise<void> => {
    try {
      const auth = getAuth();
      await signOut(auth);
    } catch(error) {
      return Promise.reject(error);
    }
  }

  /**
   * Get projects from firestore
   *
   * @returns array of projects promise
   */
  public static getProjects = async (): Promise<Project[]> => {
    const projectsRef = collection(db, "projects").withConverter(projectConverter);
    const q = query(projectsRef);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data());
  }

  /**
   * Get single project from firestore
   *
   * @param id project id
   * @returns project
   */
  public static getSingleProject = async (id: string): Promise<Project> => {
    const projectsRef = doc(db, "projects", id).withConverter(projectConverter);
    const docSnap = await getDoc(projectsRef);
    const project = docSnap.data();

    if (!project) {
      return Promise.reject();
    }

    return project;
  }

  /**
   * Add project to firestore
   *
   * @param body project body
   * @returns created project
   */
  public static addProject = async (body: ProjectBody): Promise<Project> => {
    const imageRef = await Api.uploadProjectImage(body.imageFile);
    const imageUrl = await getDownloadURL(imageRef);
    const project: Project = {
      title: body.projectTitle,
      imagePath: imageRef.fullPath,
      imageUrl: imageUrl,
      text: body.projectText,
      github: body.projectGitHub
    }
    const projectsRef = collection(db, "projects");
    const docRef = await addDoc(projectsRef, project);
    return Api.getSingleProject(docRef.id);
  }

  /**
   * Edit project in firestore
   *
   * @param project project
   * @param body project body
   * @returns edited project
   */
  public static editProject = async (project: Project, body: Partial<ProjectBody>): Promise<Project> => {

    if (!project.id) {
      return Promise.reject();
    }

    const projectsRef = doc(db, "projects", project.id);
    await runTransaction(db, async (transaction) => {
      const docSnap = await transaction.get(projectsRef);

      if (!docSnap.exists()) {
        return Promise.reject();
      }

      if (body.imageFile) {
        await Api.deleteProjectImage(project.imagePath);
        const imageRef = await Api.uploadProjectImage(body.imageFile);
        const imageUrl = await getDownloadURL(imageRef);
        transaction.update(projectsRef, { imagePath: imageRef.fullPath, imageUrl });
      }

      transaction.update(projectsRef, {
        title: body.projectTitle,
        text: body.projectText,
        github: body.projectGitHub
      });
    });

    return await Api.getSingleProject(project.id);
  }

  /**
   * Delete project from firestore
   *
   * @param id project id
   * @param imagePath image path
   */
  public static deleteProject = async (id: string, imagePath: string): Promise<void> => {
    await Api.deleteProjectImage(imagePath);
    await deleteDoc(doc(db, "projects", id));
  }

  /**
   * Upload image to firebase storage
   *
   * @param imageFile image file
   * @returns storage reference
   */
  public static uploadProjectImage = async (imageFile: File): Promise<StorageReference> => {
    const storageRef = ref(storage, `project-images/${uuidv4()}.${imageFile.name.split(".").pop()}`);
    const result = await uploadBytes(storageRef, imageFile);
    return result.ref;
  }

  /**
   * Delete image from firebase storage
   *
   * @param imagePath image path
   */
  public static deleteProjectImage = async (imagePath: string): Promise<void> => {
    const storageRef = ref(storage, imagePath);
    await deleteObject(storageRef);
  }

}