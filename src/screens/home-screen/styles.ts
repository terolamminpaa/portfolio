import { SXStyles } from "../../types";

const sx: SXStyles = {
  grid: {
    textAlign: "center",
    pb: 2
  },

  header: {
    mt: 2
  },
  
  imageContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center"
  },
  
  avatar: {
    width: 250,
    height: 250,
    border: "1rem solid #1f1f1f"
  },

  avatarName: {
    alignSelf: "center",
    mt: 1
  },

  avatarCaption: {
    alignSelf: "center"
  },

  textContent: {
    maxWidth: 500,
    hyphens: "auto",
    textAlign: "initial"
  },

  textContainer: {
    display: "flex",
    justifyContent: "center"
  },
  
  buttonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center"
  },
  
  buttonStack: {
    width: "100%",
    maxWidth: 500,
    justifyContent: "center"
  },
  
  link: {
    width: {
      xs: "100%",
      md: "auto"
    }
  },

  button: {
    width: "100%"
  }
}

export default sx;