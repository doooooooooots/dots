import { createSvgIcon } from "@mui/material";

const Cursor = createSvgIcon(
  <svg
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
    xmlSpace='preserve'
  >
    <path
      d='m4 0 16 12.279-6.951 1.17 4.325 8.817L13.778 24l-4.35-8.879L4 19.823V0Z'
      style={{
        fillRule: 'nonzero'
      }}
      transform='matrix(.684 0 0 .684 3.792 3.792)'
    />
  </svg>,
  'Cursor'
);

export default Cursor;