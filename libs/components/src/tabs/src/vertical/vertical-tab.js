import { styled, Tab } from "@mui/material";

const VerticalTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  fontSize: 14,
  fontWeight: 400,
  color: theme.palette.text.primary,
  padding: "2px 10px 2px 12px",
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

export default VerticalTab;
