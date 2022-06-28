import { Alignment } from '@dots.cool/schema';
import React from 'react';

import BottomCenter from './align-bottom-center';
import BottomLeft from './align-bottom-left';
import BottomRight from './align-bottom-right';
import MiddleCenter from './align-middle-center';
import MiddleLeft from './align-middle-left';
import MiddleRight from './align-middle-right';
import TopCenter from './align-top-center';
import TopLeft from './align-top-left';
import TopRight from './align-top-right';

type AlignmentsIconsPropsType = {
  variant: number;
};

function AlignmentsIcons(props: AlignmentsIconsPropsType) {
  const { variant } = props;

  const {
    BOTTOM_CENTER,
    BOTTOM_LEFT,
    BOTTOM_RIGHT,
    MIDDLE_CENTER,
    MIDDLE_LEFT,
    MIDDLE_RIGHT,
    TOP_CENTER,
    TOP_LEFT,
    TOP_RIGHT,
  } = Alignment.getValues();

  switch (variant) {
    case BOTTOM_CENTER:
      return <BottomCenter />;
    case BOTTOM_LEFT:
      return <BottomLeft />;
    case BOTTOM_RIGHT:
      return <BottomRight />;
    case MIDDLE_CENTER:
      return <MiddleCenter />;
    case MIDDLE_LEFT:
      return <MiddleLeft />;
    case MIDDLE_RIGHT:
      return <MiddleRight />;
    case TOP_CENTER:
      return <TopCenter />;
    case TOP_LEFT:
      return <TopLeft />;
    case TOP_RIGHT:
      return <TopRight />;
    default:
      return null;
  }
}

AlignmentsIcons.bindProps = ({ label, value, color }) => ({
  variant: value,
});

export default AlignmentsIcons;
