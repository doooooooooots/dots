import AreaField from './area-field';
import AreaSea from './area-sea';
import AreaSnow from './area-snow';
import AreaWind from './area-wind';
import FrameType from './frame-type';
import ProjectStep from './project-step';
import PurlinType from './purlin-type';
import Status from './status';
import Progress from './progress';
import Reaction from './reaction';
import enums from '../utils/enums';

const enumSchema = enums({
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
