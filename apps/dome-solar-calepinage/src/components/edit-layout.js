import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { observer } from 'mobx-react';
import { findAction } from '../../utils/entity-model';
import App from './app';
import { stringifyQuery } from '../../utils/stringify-query';
import fetchGQL from '../../database/fetch-gql';
import { useStore } from '../contexts/useStore';

function EditLayout() {
  const { id } = useParams();
  const store = useStore();

  useEffect(() => {
    const loadDatas = async () => {
      /**
       * Get current layout entity
       */
      const getEntityDetailed = stringifyQuery({
        type: 'query',
        inputName: 'entity',
        inputParams: '($id: ID!)',
        outputName: 'entity',
        outputParams: '(id: $id)',
        outputFields: [
          'id',
          'name',
          'guid',
          'status',
          'entityFields { name value }',
          'defaultActions {id target { id typeOf name entityFields { name value } } property {guid}}',
          'mediaObjects {name}',
        ],
      });

      const layoutRes = await fetchGQL(getEntityDetailed, 'post', { id });
      const layout = layoutRes.entity;

      /**
       * Find linked project informations
       */
      const isLayoutOf = findAction(layout, 'isLayoutOf');

      /**
       * If a project is linked, extract all informations to be printed in pdf
       */
      if (isLayoutOf) {
        const projectRes = await fetchGQL(getEntityDetailed, 'post', {
          id: isLayoutOf.target.id,
        });
        const project = projectRes.entity;
        layout.project = project;
        layout.client = findAction(project, 'hasClient')?.target;
        layout.location = findAction(project, 'isLocated')?.target;
        layout.commercial = findAction(project, 'hasCommercial')?.target;
      }
      store.loadDatas(layout);
    };
    loadDatas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!store.isReady) return null;

  return <App mode="edit" />;
}

export default observer(EditLayout);
