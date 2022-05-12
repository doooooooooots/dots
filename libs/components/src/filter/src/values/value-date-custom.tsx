import { Input } from "@mui/material";
import React from "react";

const RuleDateCustomValue = (props) => {
  const { variant } = props;
  return <Input placeholder={variant} />;
};

export default RuleDateCustomValue;
