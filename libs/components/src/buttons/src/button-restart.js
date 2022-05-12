import React from "react";
import { Button } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

export default function BtnRestart(props) {
  const {
    onClick,
    variant = "contained",
    color = "primary",
    children = "Je recommence",
    ...other
  } = props;
  return (
    <Button
      onClick={onClick}
      variant={variant}
      color={color}
      startIcon={<RestartAltIcon />}
      {...other}
    >
      {children}
    </Button>
  );
}
