import { useCallback } from 'react';
import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { People } from '@mui/icons-material';
import { PAGE_PROJECT } from '../../constants';
import { useStore } from '../context/useStore';
import { isEmpty } from 'lodash';
import { Stack, Box, Button, Divider } from '@mui/material';
import PopperSelectFromDb from '../popper-select-from-db';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import Tag from '../tag';
import FielGroup from '../field-group';

const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      identifier
      name
      dateReception
      dateDelivery
      typeEmergency
      step
      areaField
      areaSnow
      areaSea
      altitude
      customer {
        id
        name
      }
    }
  }
`;

const TabProject = (props) => {
  const { onClose } = props;
  const { getRelatedData, setRelatedData, setUserData } = useStore();

  //-> Get Project Id from Url
  const router = useRouter();
  const { id } = router.query;

  const handleChoiceClick = useCallback(
    (element) => () => {
      setRelatedData('project', element);
    },
    [setRelatedData]
  );

  const handleRemoveClick = useCallback(() => {
    setRelatedData('project', {});
  }, [setRelatedData]);

  const project = getRelatedData('project');

  return (
    <>
      {isEmpty(project) ? (
        <PopperSelectFromDb
          name={PAGE_PROJECT}
          query={GET_PROJECTS}
          variables={{ id }}
          icon={<People />}
          skip={!id}
          onClick={handleChoiceClick}
          getDatas={(data) => data?.projects}
          getRowDatas={(row) => ({
            id: row.id,
            name: row.name,
          })}
          canAdd
        />
      ) : (
        <Stack spacing={1} sx={{ p: 2, minWidth: 385 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Tag type="ref">{project.identifier}</Tag>
            <Tag type="step">{project.step}</Tag>
            {project.typeEmergency && <Tag type="emergency" />}
          </Stack>
          <Stack direction="column" mt={2}>
            <FielGroup
              icon={<EventNoteOutlinedIcon />}
              label={'Date de réception'}
              value={project.dateReception}
            />
            <FielGroup
              icon={<EventNoteOutlinedIcon />}
              label={'Date de livraison'}
              value={project.dateDelivery}
            />
            <FielGroup
              icon={<EventNoteOutlinedIcon />}
              label={'Area field'}
              value={project.areaField}
            />
            <FielGroup
              icon={<EventNoteOutlinedIcon />}
              label={'Area snow'}
              value={project.areaSnow}
            />
            <FielGroup
              icon={<EventNoteOutlinedIcon />}
              label={'Area sea'}
              value={project.areaSea}
            />
            <FielGroup
              icon={<EventNoteOutlinedIcon />}
              label={'Altitude'}
              value={project.altitude}
            />
            <FielGroup
              icon={<EventNoteOutlinedIcon />}
              label={'Client'}
              value={project.customer?.name}
            />
          </Stack>
          <Divider />
          <Box>
            <Button
              onClick={handleRemoveClick}
              startIcon={<CompareArrowsOutlinedIcon fontSize="small" />}
              sx={{
                color: 'grey.500',
                borderColor: 'grey.500',
                p: 0,
                px: 1,
              }}
            >
              Changer de projet
            </Button>
          </Box>
        </Stack>
      )}
    </>
  );
};

export default TabProject;
