import {
  styled,
  ToggleButton as ToggleButtonMui,
  ToggleButtonGroup as ToggleButtonGroupMui,
} from "@mui/material";

export const ToggleButtonGroup = styled(ToggleButtonGroupMui)(({ theme }) => ({
  // backgroundColor: theme.palette.grey[100],
  padding: 4,
  borderRadius: 8,
  width: "fit-content",
  "& > button.MuiButtonBase-root.MuiToggleButton-root": {
    borderRadius: 8,
    padding: "8px 12px",
    textTransform: "none",
    lineHeight: "100%",
    border: "1px solid",
    borderColor: theme.palette.grey[300],
  },
  "& .MuiToggleButtonGroup-grouped": {
    marginRight: theme.spacing(0.5),
    "&:hover": {
      backgroundColor: theme.palette.grey[200],
    },
    "&.Mui-selected": {
      "&, &:hover": {
        backgroundColor: theme.palette.primary.main,
        color: "white",
      },
    },
    "&.Mui-disabled": {
      border: 0,
    },
  },
}));

export const ToggleButton = styled(ToggleButtonMui)(() => ({}));
