import React from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function BtnDelete(props) {
  const {
    onClick,
    variant = "contained",
    color = "error",
    children = "Je supprime",
    ...other
  } = props;
  return (
    <Button
      onClick={onClick}
      variant={variant}
      color={color}
      startIcon={<DeleteIcon />}
      {...other}
    >
      {children}
    </Button>
  );
}
