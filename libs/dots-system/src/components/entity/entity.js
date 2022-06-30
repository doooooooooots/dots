import React, { useCallback, useEffect, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import toast from 'react-hot-toast';
import { isArray, isEmpty } from 'lodash';
import { FIELD_TYPES, GRAPHQL_ACTIONS } from '@dots.cool/tokens';
import { useDots } from '@dots.cool/schema';
import { ErrorPage, Loading } from '@dots.cool/components';
import Field from './field';
import Button from './button';
import Container from './container';

function Entity(props) {
  const {
    select: singular,
    direction = 'column',
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

  const { getSchema } = useDots();
  const { fields, graphql } = getSchema(singular);

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
    return <ErrorPage message={error} />;
  }

  return (
    <Container direction={direction}>
      {!isEmpty(entity) &&
        fieldToPrint.map((fieldName) => {
          // [ ](Adrien): create id input component
          if (fieldName === 'id') return null;
          if (!fields[fieldName]) return null;

          const { type, label, options, multiple, getter } = fields[fieldName];

          const fieldProps = {
            type: type,
            name: fieldName,
            label: label,
          };

          if (type === FIELD_TYPES.relationship) {
            fieldProps.getter = getter;
          }

          if (
            type === FIELD_TYPES.select ||
            type === FIELD_TYPES.relationship
          ) {
            fieldProps.options = options;
            fieldProps.multiple = multiple;
          }

          return (
            <>
              {direction === 'column' && (
                <Field
                  key={fieldName}
                  value={entity[fieldName]}
                  loading={loadingSave === fieldName}
                  onChange={
                    type === FIELD_TYPES.relationship
                      ? handleChangeLinkConfirm
                      : saveData
                  }
                  {...fieldProps}
                />
              )}
              {direction === 'row' && (
                <Button
                  key={fieldName}
                  value={entity[fieldName]}
                  loading={loadingSave === fieldName}
                  onChange={
                    type === FIELD_TYPES.relationship
                      ? handleChangeLinkConfirm
                      : saveData
                  }
                  {...fieldProps}
                />
              )}
            </>
          );
        })}
    </Container>
  );
}

export default Entity;
