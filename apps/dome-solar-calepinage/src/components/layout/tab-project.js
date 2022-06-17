import { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { People } from '@mui/icons-material';
import { PAGE_PROJECT } from '../../constants/constants';
import { useStore } from '../../contexts/useStore';
import { isEmpty } from 'lodash';
import PopperSelectFromDb from '../popper-select-from-db';
import FielInput from '../dots-system/components/field-input';
import { observer } from 'mobx-react';
import TabPopperChangeButton from './tab-popper-change-button';
import toast from 'react-hot-toast';
import FieldGroupContainer from '../dots-system/components/container';
import FieldLink from '../dots-system/components/field-link';
import FieldSelect from '../dots-system/components/field-select';

import { useDots } from '../dots-system/context/dots-context';

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
  const { Project } = useDots();

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
            {Project.fields.map((field) => {
              if (field.type === 'link')
                return (
                  <FieldLink
                    key={field.name}
                    {...field}
                    value={project[field.name]}
                    withPreview
                    readOnly
                    multiple
                  />
                );

              if (field.type === 'enum')
                return (
                  <FieldSelect
                    key={field.name}
                    {...field}
                    onConfirm={(data) => console.log(data)}
                    multiple
                  />
                );

              return (
                <FielInput
                  key={field.name}
                  {...field}
                  value={project[field.name]}
                  onConfirm={handleChangeConfirm(field.name)}
                />
              );
            })}
          </FieldGroupContainer>
          <TabPopperChangeButton name="project" />
        </>
      )}
    </>
  );
};

export default observer(TabProject);
