import { styled, Tabs, Tab } from "@mui/material";

const TabsVertical = styled(Tabs)(({ theme }) => ({
  "&.MuiTabs-vertical": {
    border: 0,
    boxShadow: `inset 1px 0 ${theme.palette.neutral[100]}`,
  },
  "& .MuiTabs-indicator": {
    left: 0,
  },
}));

const TabVertical = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  fontSize: 14,
  fontWeight: 400,
  color: theme.palette.text.primary,
  padding: "2px 0 2px 24px",
  marginBottom: 8,
  minHeight: 20,
  alignItems: "baseline",
  "&:hover": {
    boxShadow: `inset 1px 0 ${theme.palette.primary.main}`,
  },
  "&.Mui-selected": {
    fontWeight: 600,
  },
}));

export { TabsVertical, TabVertical };
