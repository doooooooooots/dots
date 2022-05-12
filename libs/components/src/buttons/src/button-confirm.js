import { Button } from "@mui/material";
import React from "react";
import CheckIcon from "@mui/icons-material/Check";

export default function BtnConfirm(props) {
  const {
    onClick,
    variant = "contained",
    color = "primary",
    children = "Je confirme",
    ...other
  } = props;
  return (
    <Button
      onClick={onClick}
      variant={variant}
      color={color}
      startIcon={<CheckIcon />}
      {...other}
    >
      {children}
    </Button>
  );
}
