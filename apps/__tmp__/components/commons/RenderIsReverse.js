import { ButtonBase } from '@mui/material';
import reverseLogo from '@public/assets/reverse_logo.svg';
import Image from 'next/image';

export default function renderIsReverse(params) {
  return (
    <ButtonBase sx={{ width: '100%', height: '100%' }}>
      {params.value ? <Image alt='reverse button' src={reverseLogo} width={16} height={16} /> : null}
    </ButtonBase>
  );
}
