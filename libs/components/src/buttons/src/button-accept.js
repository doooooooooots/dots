import React from "react";
import { Button } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

export default function BtnAccept(props) {
  const {
    onClick,
    variant = "contained",
    color = "primary",
    children = "J'accepte",
    ...other
  } = props;
  return (
    <Button
      onClick={onClick}
      variant={variant}
      color={color}
      startIcon={<ThumbUpIcon />}
      {...other}
    >
      {children}
    </Button>
  );
}
