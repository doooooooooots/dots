import dynamic from 'next/dynamic';
import React from 'react';

const RuleValueDate = dynamic(() => import('../values/value-date'));
const RuleValueCheckbox = dynamic(() => import('../values/value-checkbox'));
const RuleValueInteger = dynamic(() => import('../values/value-integer'));
const RuleValueFloat = dynamic(() => import('../values/value-float'));
const RuleValueSelect = dynamic(() => import('../values/value-select'));
const RuleValueSelectText = dynamic(() => import('../values/value-text'));
// const RuleValueSelectMultiple = dynamic(() =>
//   import("./rule-value-select-multiple")
// );

const RuleValue = (props) => {
  const { operator, type, value, onChange } = props;

  let RenderComponent = null;
  switch (type) {
    case 'timestamp':
      return (
        <RuleValueDate operator={operator} value={value} onChange={onChange} />
      );
    case 'checkbox':
      RenderComponent = RuleValueCheckbox;
      break;
    case 'integer':
      RenderComponent = RuleValueInteger;
      break;
    case 'float':
      RenderComponent = RuleValueFloat;
      break;
    case 'select':
      RenderComponent = RuleValueSelect;
      break;
    case 'text':
      RenderComponent = RuleValueSelectText;
      break;
    case 'password':
    case 'relationship':
    case 'virtual':
    case 'file':
    case 'image':
    case 'document':
    case 'cloudinaryImage':
    case 'json':
    default:
      return null;
  }

  return <RenderComponent value={value} onChange={onChange} />;
};

export default RuleValue;
