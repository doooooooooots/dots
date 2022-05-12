import { styled, Tabs } from "@mui/material";

const VerticalTabs = styled(Tabs)(({ theme }) => ({
  "&.MuiTabs-vertical": {
    border: 0,
    boxShadow: `inset 1px 0 ${theme.palette.neutral[100]}`,
  },
  "& .MuiTabs-indicator": {
    left: 0,
  },
}));

export default VerticalTabs;
