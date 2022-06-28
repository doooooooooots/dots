import {
  Alignment,
  AreaField,
  AreaSea,
  AreaSnow,
  AreaWind,
  FrameType,
  ProjectStep,
  PurlinType,
  Reaction,
  Progress,
  Status,
  formatEnums,
} from '@dots.cool/schema';

const enumSchema = formatEnums({
  Alignment,
  AreaField,
  AreaSea,
  AreaSnow,
  AreaWind,
  FrameType,
  ProjectStep,
  PurlinType,
  Reaction,
  Progress,
  Status,
});

export default enumSchema;
