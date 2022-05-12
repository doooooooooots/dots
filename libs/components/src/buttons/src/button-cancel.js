import React from "react";
import { Button } from "@mui/material";

export default function BtnCancel(props) {
  const {
    onClick,
    variant = "outlined",
    color = "basic",
    children = "Annuler",
    ...other
  } = props;
  return (
    <Button onClick={onClick} variant={variant} color={color} {...other}>
      {children}
    </Button>
  );
}
w