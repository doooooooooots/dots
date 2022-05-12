import React from "react";
import { Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function BtnNext(props) {
  const {
    onClick,
    variant = "contained",
    color = "primary",
    children = "Suivant",
    ...other
  } = props;
  return (
    <Button
      onClick={onClick}
      variant={variant}
      color={color}
      endIcon={<ArrowForwardIcon />}
      {...other}
    >
      {children}
    </Button>
  );
}
