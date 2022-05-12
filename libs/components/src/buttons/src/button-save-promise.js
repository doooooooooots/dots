import React from "react";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";

export default function BtnSavePromise(props) {
  const {
    onClick,
    loading,
    variant = "contained",
    color = "primary",
    children = "Save",
    ...other
  } = props;
  return (
    <LoadingButton
      onClick={onClick}
      loading={loading}
      loadingPosition="start"
      startIcon={<SaveIcon />}
      variant={variant}
      color={color}
      {...other}
    >
      {children}
    </LoadingButton>
  );
}
