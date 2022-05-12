import { Button } from "@mui/material";
import React from "react";
import SendIcon from "@mui/icons-material/Send";

export default function BtnSubmit(props) {
  const {
    onClick,
    variant = "contained",
    color = "primary",
    children = "J'envoie",
    ...other
  } = props;
  return (
    <Button
      onClick={onClick}
      variant={variant}
      color={color}
      startIcon={<SendIcon />}
      {...other}
    >
      {children}
    </Button>
  );
}
