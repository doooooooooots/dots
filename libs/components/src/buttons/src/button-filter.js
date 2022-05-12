import React from "react";
import { Button } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

export default function BtnFilter(props) {
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
      startIcon={<FilterAltIcon />}
      {...other}
    >
      {children}
    </Button>
  );
}
