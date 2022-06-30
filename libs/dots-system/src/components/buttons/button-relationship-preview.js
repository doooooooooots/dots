import React from 'react';

import { Button } from '@mui/material';

import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EuroOutlinedIcon from '@mui/icons-material/EuroOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import MarkAsUnreadOutlinedIcon from '@mui/icons-material/MarkAsUnreadOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import ElectricBoltOutlinedIcon from '@mui/icons-material/ElectricBoltOutlined';
import FilePresentOutlinedIcon from '@mui/icons-material/FilePresentOutlined';
import PanoramaOutlinedIcon from '@mui/icons-material/PanoramaOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined';

function ButtonRelationshipPreview(props) {
  const { entityName, count, onClick } = props;

  console.log(entityName);
  let Icon;
  switch (entityName.toLowerCase()) {
    case 'project':
      Icon = AssignmentOutlinedIcon;
      break;
    case 'person':
      Icon = PersonOutlineOutlinedIcon;
      break;
    case 'buyaction':
      Icon = EuroOutlinedIcon;
      break;
    case 'organisation':
      Icon = StoreOutlinedIcon;
      break;
    case 'postaladdress':
      Icon = MarkAsUnreadOutlinedIcon;
      break;
    case 'task':
    case 'tasks':
      Icon = AssignmentTurnedInOutlinedIcon;
      break;
    case 'action':
      Icon = ElectricBoltOutlinedIcon;
      break;
    case 'file':
      Icon = FilePresentOutlinedIcon;
      break;
    case 'image':
      Icon = PanoramaOutlinedIcon;
      break;
    case 'product':
      Icon = Inventory2OutlinedIcon;
      break;
    case 'mediaobject':
      Icon = PermMediaOutlinedIcon;
      break;
    default:
      Icon = null;
      break;
  }

  return (
    <Button
      color="neutral"
      size="small"
      startIcon={Icon && <Icon />}
      variant="outlined"
      onClick={onClick}
      sx={{ height: 32 }}
    >
      {count}
    </Button>
  );
}

export default ButtonRelationshipPreview;
