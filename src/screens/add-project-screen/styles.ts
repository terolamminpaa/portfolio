import theme from "../../theme";
import { SXStyles } from "../../types";

const sx: SXStyles = {
  paper: {
    p: 2
  },

  required: {
    color: theme.palette.error.main
  },

  dropzone: {
    p: 2,
    width: "100%",
    maxHeight: 400,
    display: "flex",
    position: "relative",
    justifyContent: "center",
    "&:hover": {
      backgroundColor: theme.palette.action.hover
    }
  },

  dropzoneImage: {
    width: "100%",
    objectFit: "cover"
  },

  dropzoneIcon: {
    fontSize: 100,
    alignSelf: "center"
  },

  clearImageButton: {
    top: 16,
    right: 16,
    display: "flex",
    position: "absolute",
    justifyContent: "center"
  },

  clearImageIcon: {
    borderRadius: 25,
    alignSelf: "center",
    backgroundColor: theme.palette.secondary.main
  },

  preview: {
    width: "100%",
    minHeight: 263,
    hyphens: "auto",
    wordWrap: "break-word",
    padding: "16.5px 14px",
    whiteSpace: "pre-wrap"
  },

  helperText: {
    margin: "3px 14px 0px 14px!important"
  }
}

export default sx;