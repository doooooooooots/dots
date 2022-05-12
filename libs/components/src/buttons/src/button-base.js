import { Button as MuiButton } from "@mui/material";
import { styled } from "@mui/system";

const ButtonStyled = styled(MuiButton)(({ theme }) => {});

export default function Button(props) {
  const { variant, size = "medium" } = props;
  return (
    <ButtonStyled
      sx={[
        size === "xSmall" && {
          paddingTop: 0.2,
          paddingBottom: 0.2,
          paddingLeft: 2,
          paddingRight: 2,
          minHeight: "auto",
          height: 30,
        },
      ]}
      {...props}
    />
  );
}
