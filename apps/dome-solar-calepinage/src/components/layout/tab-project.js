import { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { People } from '@mui/icons-material';
import { PAGE_PROJECT } from '../../constants/constants';
import { useStore } from '../context/useStore';
import { isEmpty } from 'lodash';
import PopperSelectFromDb from '../popper-select-from-db';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import Tag from '../tag';
import FielGroup from '../field-group';
import { observer } from 'mobx-react';
import TabPopperChangeButton from './tab-popper-change-button';
import toast from 'react-hot-toast';
import FieldGroupContainer from './field-group-container';

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
      areaWind
      altitude
      customer {
        id
        name
      }
    }
  }
`;

const UPDATE_PROJECT = gql`
  mutation UpdateProject(
    $where: ProjectWhereUniqueInput!
    $data: ProjectUpdateInput!
  ) {
    updateProject(where: $where, data: $data) {
      id
    }
  }
`;

const TabProject = (props) => {
  const { onChange } = props;
  const { getRelatedData, updateRelatedData } = useStore();

  const project = getRelatedData('project');

  const router = useRouter();
  const { id } = router.query;

  /**
   * Create mutation function
   */
  const [update] = useMutation(UPDATE_PROJECT);

  /**
   * Save clicked project from project list
   */
  const handleChoiceClick = useCallback(
    (element) => () => {
      onChange(element);
    },
    [onChange]
  );

  /**
   * Send updates to db
   */
  const handleChangeConfirm = useCallback(
    (key) => async (newValue) => {
      if (project?.id) {
        updateRelatedData(`project.${key}`, newValue);
        toast.promise(
          update({
            variables: {
              where: { id: project?.id },
              data: { [key]: newValue },
            },
          }),
          {
            loading: 'Sauvegarde ...',
            success: 'Le projet a été mise à jour',
            error: 'Erreur lors de la mise à jour',
          }
        );
      }
    },
    [project?.id, update, updateRelatedData]
  );

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
          <FieldGroupContainer>
            <FielGroup
              icon={<EventNoteOutlinedIcon />}
              label={'Ref'}
              value={<Tag type="ref">{project.identifier}</Tag>}
              onConfirm={handleChangeConfirm('dateReception')}
              readOnly
            />
            <FielGroup
              icon={<EventNoteOutlinedIcon />}
              label={'Step'}
              value={<Tag type="step">{project.step}</Tag>}
              onConfirm={handleChangeConfirm('dateReception')}
              readOnly
            />
            <FielGroup
              icon={<EventNoteOutlinedIcon />}
              label={'Emergency'}
              value={<Tag type="emergency" />}
              onConfirm={handleChangeConfirm('dateReception')}
              readOnly
            />
            <FielGroup
              label={'Date de réception'}
              type="date"
              value={new Date(project.dateReception).toLocaleDateString('fr')}
              onConfirm={handleChangeConfirm('dateReception')}
            />
            <FielGroup
              label={'Date de livraison'}
              type="date"
              value={new Date(project.dateDelivery).toLocaleDateString('fr')}
              onConfirm={handleChangeConfirm('dateDelivery')}
            />
            <FielGroup
              label={'Area field'}
              value={project.areaField}
              type="number"
              onConfirm={handleChangeConfirm('areaField')}
            />
            <FielGroup
              label={'Area snow'}
              value={project.areaSnow}
              type="number"
              onConfirm={handleChangeConfirm('areaSnow')}
            />
            <FielGroup
              label={'Area sea'}
              value={project.areaSea}
              type="number"
              onConfirm={handleChangeConfirm('areaSea')}
            />
            <FielGroup
              label={'Area wind'}
              value={project.areaWind}
              type="number"
              onConfirm={handleChangeConfirm('areaWind')}
            />
            <FielGroup
              label={'Altitude'}
              value={project.altitude}
              type="dimension"
              onConfirm={handleChangeConfirm('altitude')}
            />
            <FielGroup
              icon={<EventNoteOutlinedIcon />}
              label={'Client'}
              value={project.customer?.name}
              readOnly
            />
          </FieldGroupContainer>
          <TabPopperChangeButton name="project" />
        </>
      )}
    </>
  );
};

export default observer(TabProject);
