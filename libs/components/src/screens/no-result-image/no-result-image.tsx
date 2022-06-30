import React from 'react';
import Image from 'next/image';

function NoResultImage() {
  return (
    <Image
      alt="no-result-image"
      title="No result"
      src={'/assets/illustrations/no-result.svg'}
      width={90}
      height={90}
    />
  );
}

export default NoResultImage;
