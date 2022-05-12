import React from "react";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function BtnPrevious(props) {
  const {
    onClick,
    variant = "contained",
    color = "primary",
    children = "Précédent",
    ...other
  } = props;
  return (
    <Button
      onClick={onClick}
      variant={variant}
      color={color}
      startIcon={<ArrowBackIcon />}
      {...other}
    >
      {children}
    </Button>
  );
}
