import React from "react";
import { Button } from "@mui/material";
import CallSplitIcon from "@mui/icons-material/CallSplit";

export default function BtnMove(props) {
  const {
    onClick,
    variant = "contained",
    color = "primary",
    children = "Je déplace",
    ...other
  } = props;
  return (
    <Button
      onClick={onClick}
      variant={variant}
      color={color}
      startIcon={<CallSplitIcon />}
      {...other}
    >
      {children}
    </Button>
  );
}
