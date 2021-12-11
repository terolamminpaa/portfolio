import { SXStyles } from "../../types";

const sx: SXStyles = {
  projectCard: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },

  projectCardContent: {
    flexGrow: 1
  },

  projectCardText: {
    wordWrap: "break-word"
  },

  projectCardActions: {
    pt: 0,
    pb: 2,
    justifyContent: "center"
  },

  githubButton: {
    textTransform: "none"
  },

  newProjectGrid: {
    minHeight: {
      xs: 300,
      sm: 378
    }
  },

  newProjectContainer: {
    width: "100%",
    height: "100%"
  },

  newProjectButton: {
    pt: 2,
    pb: 2,
    width: "100%",
    height: "100%",
    textTransform: "none"
  },

  newProjectIcon: {
    fontSize: 100,
    alignSelf: "center"
  }
}

export default sx;