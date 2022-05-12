import { styled, Tabs } from "@mui/material";

const BrowserTabs = styled(Tabs)(({ theme }) => ({
  minHeight: "auto",
  "& .MuiTabs-flexContainer": {
    borderBottom: "1px solid",
    borderColor: `${theme.palette.divider}`,
  },
  "& .MuiTabs-indicator": {
    backgroundColor: theme.palette.background.default,
    transition: "none",
  },
  "& .MuiTabs-scrollButtons.Mui-disabled": {
    opacity: 0.2,
  },
}));

export default BrowserTabs;
