import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { memo } from 'react';

import RuleDateCustomValue from '../values/value-date-custom';
import RuleOperator from './rule-operator';
import RuleProperty from './rule-property';
import RuleValue from './rule-value';

import {
  CUSTOM,
  IS_EMPTY,
  IS_NOT_EMPTY,
  IS_NOT_WITHIN,
  IS_WITHIN,
  PROPERTY_IDS,
  TYPE_BY_PROPERTY_ID,
} from '../../constants';

const elementStyle = {
  userSelect: 'none',
  transition: 'background 20ms ease-in 0s',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  whiteSpace: 'nowrap',
  borderRadius: '3px',
  height: '32px',
  fontSize: '14px',
  lineHeight: '1.2',
  marginRight: '0px',
  maxWidth: '100%',
};

const RuleItem = (props) => {
  const {
    rule,
    entityName,
    onChangeRuleOperator,
    onChangeRuleValue,
    onChangeProperty,
  } = props;

  return (
    <>
      <Box item sx={elementStyle}>
        <RuleProperty
          propertyList={PROPERTY_IDS}
          property={rule.property}
          onChange={onChangeProperty}
        />
      </Box>

      <Box
        sx={{
          alignItems: 'center',
          display: 'grid',
          gridAutoFlow: 'column',
          gridAutoColumns: '1fr',
          gridColumnEnd: 'span 2',
          columnGap: '8px',
          gridTemplateRows: '32px',
          gridTemplateColumns:
            // eslint-disable-next-line no-multi-str
            '[value-start] max-content auto \
             [value-end operator-start] auto',
        }}
      >
        <Box sx={elementStyle}>
          <RuleOperator
            variant={TYPE_BY_PROPERTY_ID[rule.property]}
            operator={rule.filter.operator}
            onChange={onChangeRuleOperator}
            updateValue={onChangeRuleValue}
          />
        </Box>

        {![IS_EMPTY, IS_NOT_EMPTY].includes(rule.filter.operator) && (
          <>
            {/**
             *  For date properties
             *  > if user wants to enter custom date or range
             * */}
            {rule.filter.value === CUSTOM ? (
              <Box
                sx={{
                  display: 'grid',
                  justifyContent: 'stretch',
                  gridTemplateColumns: 'inherit',
                  columnGap: '8px',
                  width: '100%',
                }}
              >
                <Box sx={elementStyle}>
                  <RuleValue
                    entityName={entityName}
                    type={TYPE_BY_PROPERTY_ID[rule.property]}
                    operator={rule.filter.operator}
                    value={rule.filter.value}
                    onChange={onChangeRuleValue}
                  />
                </Box>
                <Box sx={{ ...elementStyle, minWidth: '165px' }}>
                  <RuleDateCustomValue
                    variant={
                      [IS_NOT_WITHIN, IS_WITHIN].includes(rule.filter.operator)
                        ? 'range'
                        : 'single'
                    }
                  />
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  margin: '0px',
                  width: '100%',
                  height: '100%',
                  fontSize: '14px',
                  lineHeight: '1.2',
                  transition: 'background 120ms ease-in 0s',
                }}
              >
                <RuleValue
                  type={TYPE_BY_PROPERTY_ID[rule.property]}
                  operator={rule.filter.operator}
                  value={rule.filter.value}
                  onChange={onChangeRuleValue}
                />
              </Box>
            )}
          </>
        )}
      </Box>
    </>
  );
};

RuleItem.propTypes = {
  onClick: PropTypes.any,
  onDelete: PropTypes.any,
  onChange: PropTypes.any,
  field: PropTypes.any,
  operator: PropTypes.any,
  link: PropTypes.any,
  value: PropTypes.any,
};

export default memo(RuleItem);
