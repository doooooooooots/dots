import { useCallback } from 'react';
import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { People } from '@mui/icons-material';
import { PAGE_PROJECT } from '../../constants';
import { useStore } from '../context/useStore';
import { isEmpty } from 'lodash';
import { Stack } from '@mui/material';
import PopperSelectFromDb from '../popper-select-from-db';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import Tag from '../tag';
import FielGroup from '../field-group';
import { observer } from 'mobx-react';
import TabPopperChangeButton from './tab-popper-change-button';

const GET_PROJECTS = gql`
  query GetProjects {
    rows: projects {
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
  const { onChange } = props;
  const { getRelatedData } = useStore();

  //-> Get Project Id from Url
  const router = useRouter();
  const { id } = router.query;

  const handleChoiceClick = useCallback(
    (element) => () => {
      onChange(element);
    },
    [onChange]
  );

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
          getRowDatas={(row) => ({
            id: row.id,
            name: row.name,
          })}
          canAdd
        />
      ) : (
        <>
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
                value={new Date(project.dateReception).toLocaleDateString('fr')}
              />
              <FielGroup
                icon={<EventNoteOutlinedIcon />}
                label={'Date de livraison'}
                value={new Date(project.dateDelivery).toLocaleDateString('fr')}
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
          </Stack>
          <TabPopperChangeButton name="project" />
        </>
      )}
    </>
  );
};

export default observer(TabProject);
