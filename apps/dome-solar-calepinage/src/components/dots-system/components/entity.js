import React, { useCallback, useEffect, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import toast from 'react-hot-toast';
import ErrorPage from '../../design-system/screens/error-page';
import { useDots } from '../context/dots-context';
import Field from './field';
import FieldContainer from './container';
import { isArray, isEmpty } from 'lodash';
import { GRAPHQL_ACTIONS } from '@dots.cool/tokens';
import { ucFirst } from '@dots.cool/utils';
import Loading from '../../design-system/screens/loading';

function Entity(props) {
  const {
    select: singular,
    query,
    where,
    onLoadSuccess,
    onUpdateSuccess,
  } = props;

  // Extract fields from query
  let fieldToPrint = gql(
    `{ Entity {${query}}}`
  ).definitions[0].selectionSet.selections[0].selectionSet.selections.map(
    (item) => item.name.value
  );

  if (!singular) {
    throw new Error('singular is missing');
  }

  const entityName = ucFirst(singular);
  const { [entityName]: model } = useDots();
  const { fields, graphql } = model;

  const [loadingSave, setLoadingSave] = useState(false);

  /**
   * Create GET ONE request
   */
  const _query = graphql[GRAPHQL_ACTIONS.FindOne](query);
  const {
    data = {},
    loading,
    error,
  } = useQuery(_query, {
    variables: { where: where },
    skip: isEmpty(where),
  });
  const { entity = {} } = data;
  const { id } = entity;

  /**
   * Create UPDATE request
   */
  const _mutation = graphql[GRAPHQL_ACTIONS.UpdateOne](query);
  const [update] = useMutation(_mutation);
  const saveData = useCallback(
    (key, newValue) => {
      if (id) {
        setLoadingSave(key);
        toast.promise(
          update({
            variables: {
              where: where,
              data: { [key]: newValue },
            },
          }).then(({ data, error }) => {
            if (typeof onUpdateSuccess === 'function') {
              onUpdateSuccess(data.entity);
            }
            setLoadingSave(false);
          }),
          {
            loading: 'Sauvegarde ...',
            success: 'Le projet a été mis à jour',
            error: 'Erreur lors de la mise à jour',
          }
        );
      }
    },
    [id, onUpdateSuccess, update, where]
  );

  /**
   * If type is Relationship, we need to transform value to set graphQL object
   */
  const handleChangeLinkConfirm = useCallback(
    async (key, newValue) => {
      // Transform data to set type
      let dataOutput;

      if (isArray(newValue)) {
        dataOutput = {
          set: newValue.map(({ id: _id }) => ({
            id: _id,
          })),
        };
      } else {
        if (newValue) {
          dataOutput = { connect: { id: newValue?.id || null } };
        } else {
          dataOutput = { disconnect: true };
        }
      }

      saveData(key, dataOutput);
    },
    [saveData]
  );

  useEffect(() => {
    if (typeof onLoadSuccess === 'function') {
      if (!loading && !isEmpty(entity)) {
        onLoadSuccess(entity);
      }
    }
  }, [loading, entity, onLoadSuccess]);

  /**
   * Browser is fetching data
   */
  if (loading) return <Loading minWidth={350} />;

  /**
   * Error while fetching data
   */
  if (error) {
    <ErrorPage message={error} />;
  }

  return (
    <FieldContainer>
      {!isEmpty(entity) &&
        fieldToPrint.map((fieldName) => {
          // [ ](Adrien): create id input component
          if (fieldName === 'id') return;
          if (!fields[fieldName]) return;

          const { type, label, options, multiple, getter } = fields[fieldName];

          const fieldProps = {
            type: type,
            name: fieldName,
            label: label,
          };

          if (type === 'relationship') {
            fieldProps.getter = getter;
          }

          if (type === 'select' || type === 'relationship') {
            fieldProps.options = options;
            fieldProps.multiple = multiple;
          }

          return (
            <Field
              key={fieldName}
              value={entity[fieldName]}
              loading={loadingSave === fieldName}
              onChange={
                type === 'relationship' ? handleChangeLinkConfirm : saveData
              }
              {...fieldProps}
            />
          );
        })}
    </FieldContainer>
  );
}

export default Entity;
