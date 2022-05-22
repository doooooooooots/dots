import React, { useCallback, useEffect, useRef } from 'react';
import { debounce, isEmpty } from 'lodash';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Stage, Layer, Group, Rect } from 'react-konva';
import { useStore } from '../context/useStore';
import Markup from '../Markup';

const Canvas = (props) => {
  const { markups = [], isCentred, children } = props;

  const store = useStore();

  // Refs
  const stageRef = useRef();
  const canvasRef = useRef();
  const selectionRef = useRef();
  const renderRef = useRef(children);
  const buffer = useRef();

  // Markups - Stage padding
  const markupMaxLevel = markups.reduce((acc, current) => (current.level > acc ? current.level : acc), 0);

  const paddingX = (markupMaxLevel - (markupMaxLevel >= 2) || 1) * store.config.markupPadding.x;
  const paddingY = (markupMaxLevel - (markupMaxLevel >= 2) || 1) * store.config.markupPadding.y;

  // Canvas Zone
  const canvasZoneX = store.getStageState().x - 2 * paddingX;
  const canvasZoneY = store.getStageState().y - 2 * paddingY;

  // Pointer position - relative to Stage
  const getPointer = useCallback(() => {
    const pointerPosition = stageRef.current && stageRef.current.getPointerPosition();
    if (!pointerPosition) return { x: 0, y: 0 };
    return {
      x: pointerPosition.x,
      y: pointerPosition.y
    };
  }, []);

  const isDraggable = store.getViewMode() === 'pan' || store.getKeyboardState('isSpaceDown');

  /**
   * *Events -- Mouse
   * -------
   */
  const handleMouseDown = (e) => {
    if (store.getViewMode() !== 'select' || store.getKeyboardState('isSpaceDown')) {
      return;
    }
    e.evt.preventDefault();
    const pointer = getPointer();
    store.updateSelectionState({
      x0: pointer.x,
      y0: pointer.y,
      x1: pointer.x,
      y1: pointer.y,
      visible: true
    });
  };

  const handleMouseMove = (e) => {
    // do nothing if we didn't start selection
    const pointer = getPointer();
    if (!store.getSelectionState().visible) {
      return;
    }
    e.evt.preventDefault();
    store.updateSelectionState({
      x1: (pointer.x - store.getCanvasState().x) / store.getCanvasState().scale,
      y1: (pointer.y - store.getCanvasState().y) / store.getCanvasState().scale
    });
  };

  const handleMouseUp = (e) => {
    const clickedIndex = e.target.attrs.index;

    switch (store.getViewMode()) {
      case 'select':
        store.getSelected(selectionRef.current.attrs);
        break;

      case 'default':
        if (clickedIndex === undefined) return;

        if (store.getKeyboardState('isShiftDown') && !store.getKeyboardState('isSpaceDown')) {
          store.toggleAllRange(clickedIndex, true);
        } else {
          store.toggleModule(clickedIndex);
        }
        break;

      case 'pan':
      default:
        return;
    }

    store.updateSelectionState({
      visible: false
    });
    store.updateLastSelectedIndex(clickedIndex);
  };

  const handleOnWheel = (e) => {
    e.evt.preventDefault();

    const oldScale = canvasRef.current.scaleX();
    const pointer = getPointer();

    const mousePointTo = {
      x: (pointer.x - canvasRef.current.x()) / oldScale,
      y: (pointer.y - canvasRef.current.y()) / oldScale
    };

    const newScale = e.evt.deltaY > 0 ? oldScale / 1.04 : oldScale * 1.04;

    store.updateCanvasState({
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
      scale: newScale
    });
  };

  /**
   * *Draw
   * -----
   * ?Calculate position and ratio in order to display canvas centered and fit view size
   * ? To re-render the scene, call store.draw() in order to make a new cacheId
   */
  useEffect(() => {
    if (buffer.current) {
      const clientRect = buffer.current.getClientRect();

      const ratioX = canvasZoneX / clientRect.width;
      const ratioY = canvasZoneY / clientRect.height;
      let newRatio = Math.min(ratioX, ratioY);

      let posX = 0;
      let posY = 0;

      if (isCentred) {
        posX = (1 / 2) * (canvasZoneX - clientRect.width * newRatio);
        posY = (1 / 2) * (canvasZoneY - clientRect.height * newRatio);
      }

      posX = Number.isNaN(parseFloat(posX, 10)) ? 0 : parseFloat(posX, 10);
      posY = Number.isNaN(parseFloat(posY, 10)) ? 0 : parseFloat(posY, 10);

      newRatio = Number.isNaN(parseFloat(newRatio, 10)) ? 1 : parseFloat(newRatio, 10);

      store.updateRenderZoneState({ x: posX, y: posY, scale: newRatio });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.app.cacheId]);

  /**
   * *Init Refs and switch to isRendered state
   * --------------
   */

  useEffect(() => {
    if (stageRef && stageRef.current && !store.isRendered()) {
      store.setRefs({
        stage: stageRef,
        canvas: canvasRef,
        selection: selectionRef,
        render: renderRef
      });
      store.setIsRendered(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stageRef.current]);

  /**
   * *Events -- Keyboard
   * --------------
   */

  useEffect(() => {
    store.init();

    const handleKeyDown = (event) => {
      if (event.key === 'Shift' && store.getKeyboardState('isShiftDown') === false) {
        store.updateKeyboardState({ isShiftDown: true });
      }

      if (event.key === ' ' && store.getKeyboardState('isSpaceDown') === false) {
        store.updateKeyboardState({ isSpaceDown: true });
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === 'Shift') {
        store.updateKeyboardState({ isShiftDown: false });
      }
      if (event.key === ' ') {
        store.updateKeyboardState({ isSpaceDown: false });
      }
    };

    const debouncedHandleResize = debounce(() => {
      store.reloadSize();
    }, store.getConfig().debounceTime);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('resize', debouncedHandleResize);
    store.setIsReady(true);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('resize', debouncedHandleResize);

      store.setIsReady(false);
      store.setIsRendered(false);

      store.setRefs({
        stage: null,
        canvas: null,
        selection: null,
        render: null
      });
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Render
   */

  if (!store.isReady()) {
    console.log('CANVAS -- NOT READY')
    return null;
  }

  return (
    <>
      {/* Container */}
      <Stage
        id='container'
        ref={stageRef}
        width={store.getStageState().x}
        height={store.getStageState().y}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleOnWheel}
      >
        <Layer>
          <Rect y={0} x={0} width={store.getStageState().x} height={store.getStageState().y} fill='white' />
        </Layer>

        {/* Buffer */}
        <Layer scaleX={1} scaleY={1} ref={buffer} visible={false} fill='transparent'>
          {renderRef.current}
        </Layer>

        {/* Canvas */}
        <Layer
          ref={canvasRef}
          x={store.getCanvasState().x}
          y={store.getCanvasState().y}
          scaleX={store.getCanvasState().scale}
          scaleY={store.getCanvasState().scale}
          onDragStart={() =>
            store.updateCanvasState({
              isDragging: true
            })
          }
          onDragEnd={(e) =>
            store.updateCanvasState({
              isDragging: false,
              x: e.target.x(),
              y: e.target.y()
            })
          }
          draggable={isDraggable}
        >
          {/* Padding for markups */}
          <Group id='markupZone' x={paddingX} y={paddingY}>
            {/* Make background white */}
            <Rect x={0} y={0} width={canvasZoneX} height={canvasZoneY} fill='white' />

            {/* Scale and position group */}
            <Group
              id='renderZone'
              x={store.getRenderZoneState().x}
              y={store.getRenderZoneState().y}
              scaleX={store.getRenderZoneState().scale}
              scaleY={store.getRenderZoneState().scale}
            >
              <Group>{renderRef.current}</Group>
            </Group>

            {!isEmpty(markups) &&
              markups.map((markup, index) =>
                !isEmpty(markup) ? (
                  <Group
                    key={index.toString()}
                    x={store.toPx(markup?.offset?.x || 0) + (!!markup.isInner && store.getRenderZoneState().x)}
                    y={store.toPx(markup?.offset?.y || 0) + (!!markup.isInner && store.getRenderZoneState().y)}
                  >
                    <Markup markup={markup} store={store} />
                  </Group>
                ) : null
              )}
          </Group>

          {/* Select visualisation rectangle */}
          <Group x={paddingX + store.getRenderZoneState().x} y={paddingY + store.getRenderZoneState().y}>
            <Rect
              ref={selectionRef}
              fill='rgba(0,0,255,0.5)'
              visible={store.getSelectionState().visible}
              x={
                Math.min(store.getSelectionState().x0, store.getSelectionState().x1) -
                  paddingX -
                  store.getRenderZoneState().x || 0
              }
              y={
                Math.min(store.getSelectionState().y0, store.getSelectionState().y1) -
                  paddingY -
                  store.getRenderZoneState().y || 0
              }
              width={Math.abs(store.getSelectionState().x1 - store.getSelectionState().x0) || 0}
              height={Math.abs(store.getSelectionState().y1 - store.getSelectionState().y0) || 0}
            />
          </Group>
        </Layer>
      </Stage>
    </>
  );
};

Canvas.propTypes = {
  markups: PropTypes.any,
  children: PropTypes.any
};

export default observer(Canvas);
