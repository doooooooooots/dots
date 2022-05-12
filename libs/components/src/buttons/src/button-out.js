import React from "react";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

export default function BtnOut(props) {
  const {
    onClick,
    variant = "contained",
    color = "error",
    children = "Sortir",
    ...other
  } = props;
  return (
    <Button
      onClick={onClick}
      variant={variant}
      color={color}
      startIcon={<LogoutIcon />}
      {...other}
    >
      {children}
    </Button>
  );
}
