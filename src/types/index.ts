import { SxProps, Theme } from "@mui/system";

/**
 * Interface for project
 */
export interface Project {
  id?: string;
  title: string;
  imagePath: string;
  imageUrl: string;
  text: string;
  github: string;
}

/**
 * Interface for project body
 */
export interface ProjectBody {
  projectTitle: string;
  projectText: string;
  projectGitHub: string;
  imageFile: File;
}

/**
 * Interface for image object
 */
export interface ImageObject {
  file: File;
  url: string;
}

/**
 * Interface for sx styles
 */
export interface SXStyles {
  [key: string]: SxProps<Theme>
}