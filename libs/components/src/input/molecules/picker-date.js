import React from "react";
import PropTypes from "prop-types";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import { Box, TextField } from "@mui/material";

const PickerDate = (props) => (
  <Box
    flex="0 0 100%"
    sx={{
      "& > div:first-of-type": {
        backgroundColor: "background.default",
      },
      "& .PrivatePickersToolbar-root": {
        maxWidth: 180,
      },
      "& [class*=PrivatePicker-root] > div": {
        m: 0,
      },
      "& .PrivatePickersToolbar-dateTitleContainer": {
        "& .MuiButtonBase-root": {
          display: "none",
        },
      },
      "& .MuiPickerStaticWrapper-root > div > div:last-of-type": {
        margin: 0,
      },
    }}
  >
    <StaticDatePicker
      orientation="landscape"
      openTo="day"
      toolbarTitle=""
      renderInput={(params) => <TextField {...params} />}
      {...props}
    />
  </Box>
);

PickerDate.propTypes = {
  onChange: PropTypes.func,
};

export default PickerDate;
