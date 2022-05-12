import React from "react";
import { Button } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";

export default function BtnWarning(props) {
  const {
    onClick,
    variant = "contained",
    color = "warning",
    children = "Je comprends, et continue",
    ...other
  } = props;
  return (
    <Button
      onClick={onClick}
      variant={variant}
      color={color}
      startIcon={<WarningIcon />}
      {...other}
    >
      {children}
    </Button>
  );
}
