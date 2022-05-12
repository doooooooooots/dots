import React from "react";
import { Button } from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

export default function BtnGotIt(props) {
  const {
    onClick,
    variant = "contained",
    color = "primary",
    children = "J'ai capté",
    ...other
  } = props;
  return (
    <Button
      onClick={onClick}
      variant={variant}
      color={color}
      startIcon={<EmojiEmotionsIcon />}
      {...other}
    >
      {children}
    </Button>
  );
}
