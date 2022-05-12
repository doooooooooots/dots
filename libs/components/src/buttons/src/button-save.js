import React from "react";
import { Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

export default function BtnSave(props) {
  const {
    onClick,
    variant = "contained",
    color = "primary",
    children = "Je Sauve",
    ...other
  } = props;
  return (
    <Button
      onClick={onClick}
      variant={variant}
      color={color}
      startIcon={<SaveIcon />}
      {...other}
    >
      {children}
    </Button>
  );
}
