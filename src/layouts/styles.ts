import { SXStyles } from "../types";

const sx: SXStyles = {
  background: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },

  content: {
    flexGrow: 1,
    display: "flex",
    overflow: "auto"
  },
  
  container: {
    pt: 2,
    flex: 1,
    "&:after": {
      content: '""',
      width: "100%",
      height: 8,
      display: "block"
    }
  }
}

export default sx;