import { Box } from '@mui/system';
import React from 'react';
import {
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarResults,
  KBarSearch,
  useMatches,
} from 'kbar';

const searchStyle = {
  padding: '12px 16px',
  fontSize: '16px',
  width: '100%',
  // boxSizing: 'border-box',
  outline: 'none',
  border: 'none',
  background: 'white',
  color: 'black',
};

const animatorStyle = {
  maxWidth: '600px',
  width: '100%',
  background: 'white',
  color: 'black',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0px 6px 20px rgb(0 0 0 / 20%)',
};

const groupNameStyle = {
  padding: '8px 16px',
  fontSize: '10px',
  textTransform: 'uppercase',
  opacity: 0.5,
};

function CommandBar() {
  return (
    <KBarPortal>
      <KBarPositioner>
        <KBarAnimator style={animatorStyle}>
          <KBarSearch style={searchStyle} />
          <RenderResults />
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  );
}

function RenderResults() {
  const { results, rootActionId } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === 'string' ? (
          <Box sx={groupNameStyle}>{item}</Box>
        ) : (
          <ResultItem
            action={item}
            active={active}
            currentRootActionId={rootActionId}
          />
        )
      }
    />
  );
}

// eslint-disable-next-line react/display-name
const ResultItem: any = React.forwardRef((props, ref) => {
  const { action, active, currentRootActionId } = props as any;
  const ancestors = React.useMemo(() => {
    if (!currentRootActionId) return action.ancestors;
    const index = action.ancestors.findIndex(
      (ancestor) => ancestor.id === currentRootActionId
    );
    return action.ancestors.slice(index + 1);
  }, [action.ancestors, currentRootActionId]);

  return (
    <Box
      ref={ref}
      sx={{
        padding: '12px 16px',
        background: active ? '#fafafa' : 'transparent',
        borderLeft: `2px solid ${active ? 'black' : 'transparent'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          fontSize: 14,
        }}
      >
        {action.icon && action.icon}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            {ancestors.length > 0 &&
              ancestors.map((ancestor) => (
                <React.Fragment key={ancestor.id}>
                  <span
                    style={{
                      opacity: 0.5,
                      marginRight: 8,
                    }}
                  >
                    {ancestor.name}@
                  </span>
                  <span
                    style={{
                      marginRight: 8,
                    }}
                  >
                    &rsaquo;
                  </span>
                </React.Fragment>
              ))}
            <span>{action.name}</span>
          </div>
          {action.subtitle && (
            <span style={{ fontSize: 12 }}>{action.subtitle}</span>
          )}
        </div>
      </div>
      {action.shortcut?.length ? (
        <div
          aria-hidden
          style={{ display: 'grid', gridAutoFlow: 'column', gap: '4px' }}
        >
          {action.shortcut.map((sc) => (
            <kbd
              key={sc}
              style={{
                padding: '4px 6px',
                background: 'rgba(0 0 0 / .1)',
                borderRadius: '4px',
                fontSize: 14,
              }}
            >
              {sc}
            </kbd>
          ))}
        </div>
      ) : null}
    </Box>
  );
});

export default CommandBar;
