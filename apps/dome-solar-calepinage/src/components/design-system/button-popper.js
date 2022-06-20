import * as React from "react";
import Popper from "@mui/material/Popper";
import Grow from "@mui/material/Grow";
import { Box, Button, ClickAwayListener } from "@mui/material";

// https://mui.com/components/menus/#menulist-composition

export default function ButtonPopper(props) {
  const { children, variant, placement, sx, renderPopper, ...other } =
    props;
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const id = "transition-popper";

  return (
    <>
      <Button
        aria-describedby={id}
        type="button"
        onClick={handleClick}
        {...other}
        sx={[
          sx,
          variant === "action" && {
            textAlign: "left",
            justifyContent: "flex-start",
            color: "neutral.500",
            py: 0.5,
            borderRadius: 0,
            "&:hover": {
              bgcolor: "neutral.100",
            },
          },
        ]}
      >
        {children}
      </Button>
      <Popper
        id={id}
        open={!!open}
        anchorEl={anchorEl}
        placement={placement || "bottom-start"}
        transition
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClose}>
            <Grow direction="left" {...TransitionProps} timeout={250}>
              <Box
                sx={{
                  backgroundColor: "background.default",
                  boxShadow: (theme) => theme.shadows[18],
                }}
              >
                {renderPopper}
              </Box>
            </Grow>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
}
