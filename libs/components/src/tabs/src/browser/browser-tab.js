import { styled, Tab } from "@mui/material";

const BrowserTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  borderRight: `1px solid ${theme.palette.divider}`,
  minHeight: "auto",
  borderTop: "2px solid transparent",
  padding: `${theme.spacing(1.5)} ${theme.spacing(3)}`,
  "&:first-of-type": {
    borderLeft: `1px solid ${theme.palette.divider}`,
  },
  "&.Mui-Tab": {
    margin: 0,
  },
  "&.Mui-selected": {
    borderTopColor: `${theme.palette.primary.main}`,
  },
}));

export default BrowserTab;
