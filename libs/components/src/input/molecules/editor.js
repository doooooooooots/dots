import { Box, TextareaAutosize } from "@mui/material";
import React from "react";

const Editor = React.forwardRef((props, ref) => (
  <Box sx={{ "& textarea": { width: "100%" } }}>
    <TextareaAutosize
      {...props}
      ref={ref}
      aria-label="form-textarea"
      minRows={3}
    />
  </Box>
));

export default Editor;
