import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { uniqueId } from 'lodash';
import { HorizontalMarkup } from './horizontal-markup';
import { VerticalMarkup } from './vertical-markup';
import HorizontalMarks from './horizontal-marks';

function Markup(props) {
  const { markup, store } = props;

  if (!markup) return null;

  if (markup?.variant === 'marks') {
    return (
      <HorizontalMarks store={store} marks={markup.marks} markup={markup} />
    );
  }

  return (
    <>
      {markup.marks.map((element) => {
        const keys = Object.keys(element);
        let offset = 0;
        let attrs;

        /**
         * Get element by Id
         */
        if (keys.includes('id')) {
          if (!store.getUserDatas(element.id)) return null;

          attrs = {
            key: element.id,
            length: store.px(element.id),
            label: store.userDatas[element.id],
          };
          if (element.offset) {
            offset =
              typeof element.offset === 'string'
                ? store.getUserDatas(element.offset)
                : element.offset;
          }

          /**
           * User gives a size with real dimensions
           */
        } else if (keys.includes('size')) {
          attrs = {
            key: uniqueId(),
            length: store.toPx(element.size),
            label: element.label || element.size,
          };
          offset = element.offset;

          /**
           * User gives a range
           */
        } else if (keys.includes('from')) {
          if (typeof element.from === 'string') {
            element.from = store.getUserDatas(element.from);
          }

          if (typeof element.to === 'string') {
            element.to = store.getUserDatas(element.to);
          }

          if (element.from > element.to) {
            [element.from, element.to] = [element.to, element.from];
          }
          attrs = {
            key: uniqueId(),
            length: store.toPx(element.to - element.from),
            label: element.to - element.from,
          };
          offset = element.from;
        }

        return ['up', 'down'].includes(element.side || markup.side) ? (
          <HorizontalMarkup
            {...attrs}
            fontSize={element.fontSize || markup.fontSize || 12}
            size={store.config.markupSize.x}
            side={element.side || markup.side || 'up'}
            offset={store.toPx(offset) || 0}
            level={element.level || markup.level || 1}
          />
        ) : (
          <VerticalMarkup
            {...attrs}
            fontSize={element.fontSize || markup.fontSize || 12}
            size={(markup.size || markup.size || 0) + store.config.markupSize.y}
            side={element.side || markup.side || 'left'}
            offset={store.toPx(offset) || 0}
            level={element.level || markup.level || 1}
          />
        );
      })}
    </>
  );
}

Markup.propTypes = {
  markup: PropTypes.any,
  isInner: PropTypes.any,
  marks: PropTypes.any,
  size: PropTypes.any,
  store: PropTypes.any,
};
export default observer(Markup);
