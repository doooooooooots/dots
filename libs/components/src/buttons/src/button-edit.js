import { Button } from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";

export default function BtnEdit(props) {
  const {
    onClick,
    variant = "contained",
    color = "primary",
    children = "Je modifie",
    ...other
  } = props;
  return (
    <Button
      onClick={onClick}
      variant={variant}
      color={color}
      startIcon={<EditIcon />}
      {...other}
    >
      {children}
    </Button>
  );
}
