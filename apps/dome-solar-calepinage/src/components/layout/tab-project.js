import { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { People } from '@mui/icons-material';
import { PAGE_PROJECT } from '../../constants/constants';
import { useStore } from '../../context/useStore';
import { isEmpty } from 'lodash';
import PopperSelectFromDb from '../popper-select-from-db';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import Tag from '../tag';
import FielInput from '../dots-system/components/field-input';
import { observer } from 'mobx-react';
import TabPopperChangeButton from './tab-popper-change-button';
import toast from 'react-hot-toast';
import FieldGroupContainer from '../dots-system/components/field-group-container';
import FieldSelect from '../dots-system/components/field-select';
import FieldLink from '../dots-system/components/field-link';

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
            <FielInput
              icon={EventNoteOutlinedIcon}
              label={'Ref'}
              value={project.identifier}
              renderValue={(value) => <Tag type="ref">{value}</Tag>}
              readOnly
            />
            <FielInput
              icon={EventNoteOutlinedIcon}
              label={'Step'}
              value={project.step}
              renderValue={(value) => <Tag type="step">{value}</Tag>}
              onConfirm={handleChangeConfirm('Step')}
            />
            <FielInput
              icon={EventNoteOutlinedIcon}
              label={'Emergency'}
              value={project.emergency}
              renderValue={(value) => <Tag type="emergency" />}
              onConfirm={handleChangeConfirm('Emergency')}
            />
            <FielInput
              label={'Date de réception'}
              type="date"
              value={new Date(project.dateReception).toLocaleDateString('fr')}
              onConfirm={handleChangeConfirm('dateReception')}
            />
            <FielInput
              label={'Date de livraison'}
              type="date"
              value={new Date(project.dateDelivery).toLocaleDateString('fr')}
              onConfirm={handleChangeConfirm('dateDelivery')}
            />
            <FielInput
              label={'Area field'}
              value={project.areaField}
              type="number"
              onConfirm={handleChangeConfirm('areaField')}
            />
            <FielInput
              label={'Area snow'}
              value={project.areaSnow}
              type="number"
              onConfirm={handleChangeConfirm('areaSnow')}
            />
            <FielInput
              label={'Area sea'}
              value={project.areaSea}
              type="number"
              onConfirm={handleChangeConfirm('areaSea')}
            />
            <FielInput
              label={'Area wind'}
              value={project.areaWind}
              type="number"
              onConfirm={handleChangeConfirm('areaWind')}
            />
            <FielInput
              label={'Altitude'}
              value={project.altitude}
              type="dimension"
              onConfirm={handleChangeConfirm('altitude')}
            />
            <FielInput
              icon={EventNoteOutlinedIcon}
              label={'Client'}
              value={project.customer?.name}
              readOnly
            />
            <FieldLink
              icon={EventNoteOutlinedIcon}
              label={'Link'}
              query={'person'}
              fields={['id', 'givenName', 'familyName']}
              filterAttributes={['givenName', 'familyName']}
              getOptionLabel={(option) =>
                `${option.givenName} ${option.familyName}`
              }
              value={project.customer?.name}
              readOnly
              multiple
            />
            <FieldSelect
              icon={EventNoteOutlinedIcon}
              label={'Client'}
              value={'ham'}
              options={[
                'ham',
                'stram',
                'gram',
                'pick',
                'etpick',
                'a',
                'z',
                'e',
                'r',
                't',
                'y',
                'u',
                'i',
              ]}
              onConfirm={(value) => console.log(value)}
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
