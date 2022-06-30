import { Add, AddToPhotos } from '@mui/icons-material';
import Delete from '@mui/icons-material/Delete';
import { Box, Divider, Stack } from '@mui/material';
import { isEmpty } from 'lodash';
import { ButtonAction } from '../../../buttons';
import Trash from '../../../icons/trash';
import { Select, StyledOption } from '../../../input';
import MenuListAction from '../../../menu-lists/menu-list';
import RuleItem from './rule-item';

interface RulesProps {
  items;
  onAddRuleClick;
  onAddBlockClick;
  onDeleteClick;
  onChangeToGroupClick;
  onChangeBlockOperator;
  onChangeRuleOperator;
  onChangeRuleValue;
  onChangeProperty;
}

interface AddButtonsProps {}
interface renderRulesProps {}
interface renderBlockProps {}

const containerStyle = {
  display: 'grid',
  gridTemplateColumns: `
    [boolean-start] 50px
    [boolean-end property-start] 120px
    [property-end opererator-start] 110px
    [operator-end value-start] auto
    [value-end menu-start] 32px
    [menu-end]
  `,
  gridAutoRows: 'minmax(32px, auto)',
  gap: '8px',
  padding: '8px 8px 0px',
  placeItems: 'start stretch',
};

const renderBlock = (props: renderBlockProps) => {
  const {
    entityName,
    depth = 0,
    items,
    onAddRuleClick,
    onAddBlockClick,
    onDeleteClick,
    onChangeToGroupClick,
    onChangeBlockOperator,
    onChangeRuleOperator,
    onChangeRuleValue,
    onChangeProperty,
  } = props;
  const { id: parentId, filters, operator } = items;

  const childs =
    !isEmpty(filters) &&
    filters.reduce(
      (acc, item, index) =>
        renderRules({
          acc,
          item,
          index,
          depth,
          parentId,
          operator,
          entityName,
          onAddRuleClick,
          onAddBlockClick,
          onDeleteClick,
          onChangeToGroupClick,
          onChangeBlockOperator,
          onChangeRuleOperator,
          onChangeRuleValue,
          onChangeProperty,
        }),
      []
    );

  return (
    <>
      <Box sx={containerStyle}>{childs}</Box>
      <AddButtons
        depth={depth}
        onAddRuleClick={onAddRuleClick(parentId)}
        onAddBlockClick={onAddBlockClick(parentId)}
      />
    </>
  );
};

const renderRules = (props: renderRulesProps) => {
  const {
    acc,
    item,
    index,
    depth,
    parentId,
    operator,
    entityName,
    onAddRuleClick,
    onAddBlockClick,
    onDeleteClick,
    onChangeToGroupClick,
    onChangeBlockOperator,
    onChangeRuleOperator,
    onChangeRuleValue,
    onChangeProperty,
  } = props;

  const key = item.id;

  const WithContainer = ({ children }) => (
    <>
      {index === 0 && (
        <Stack
          direction="row"
          spacing={1}
          sx={{
            fontSize: (theme) => theme.typography.body2.fontSize,
            lineHeight: '32px',
            color: 'rgb(55, 53, 47)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            justifySelf: 'end',
            paddingRight: '4px',
          }}
        >
          Si
        </Stack>
      )}
      {index === 1 && (
        <Box sx={{ justifySelf: 'end' }}>
          <Select
            size="small"
            value={operator}
            onChange={onChangeBlockOperator(parentId)}
          >
            <StyledOption value="and">et</StyledOption>
            <StyledOption value="or">ou</StyledOption>
          </Select>
        </Box>
      )}

      {index > 1 && (
        <Box
          sx={{
            fontSize: '14px',
            lineHeight: '32px',
            color: 'rgb(55, 53, 47)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            justifySelf: 'end',
            paddingRight: '4px',
          }}
        >
          {operator}
        </Box>
      )}

      {children}

      <Box
        sx={{
          userSelect: 'none',
          transition: 'background 20ms ease-in 0s',
          cursor: 'pointer',
          display: 'inlineFlex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: '0',
          borderRadius: '3px',
          height: '32px',
          width: '100%',
          padding: '0px',
        }}
      >
        <MenuListAction
          variant="more"
          actions={[
            {
              label: 'Supprimer',
              onClick: onDeleteClick(item.id),
              icon: Delete,
            },
            depth < 2 && {
              label: 'Transformer en groupe',
              onClick: onChangeToGroupClick(item.id),
              icon: AddToPhotos,
            },
          ]}
        />
      </Box>
    </>
  );

  if ('filters' in item) {
    acc.push(
      <WithContainer key={key} variant="block">
        <Box
          sx={{
            gridColumn: 'property-start / value-end',
            background: 'rgba(0, 0, 0, 0.02)',
            borderRadius: '3px',
            boxShadow: 'rgb(55 53 47 / 10%) 0px 0px 0px 1px',
            margin: '1px',
            alignSelf: 'stretch',
          }}
        >
          {renderBlock({
            entityName,
            items: item,
            depth: depth + 1,
            onAddRuleClick,
            onAddBlockClick,
            onDeleteClick,
            onChangeToGroupClick,
            onChangeBlockOperator,
            onChangeRuleOperator,
            onChangeRuleValue,
            onChangeProperty,
          })}
        </Box>
      </WithContainer>
    );
  } else {
    acc.push(
      <WithContainer key={key} variant="rule">
        <RuleItem
          key={key}
          depth={depth}
          index={index}
          rule={item}
          entityName={entityName}
          onChangeRuleOperator={onChangeRuleOperator(item.id)}
          onChangeRuleValue={onChangeRuleValue(item.id)}
          onChangeProperty={onChangeProperty(item.id)}
        />
      </WithContainer>
    );
  }

  return acc;
};

const AddButtons = (props: AddButtonsProps) => {
  const { onAddRuleClick, onAddBlockClick, depth } = props;
  return (
    <MenuListAction
      variant="row"
      fullWidth
      actions={[
        {
          label: 'Ajouter une règle',
          onClick: onAddRuleClick,
          icon: Add,
        },
        depth < 2 && {
          label: 'Ajouter un groupe de règles',
          onClick: onAddBlockClick,
          icon: AddToPhotos,
        },
      ]}
      sx={{ mt: 1 }}
    >
      Ajouter un filtre
    </MenuListAction>
  );
};

const Rules = (props: RulesProps) => {
  const {
    entityName,
    items,
    onAddRuleClick,
    onAddBlockClick,
    onDeleteClick,
    onChangeToGroupClick,
    onChangeBlockOperator,
    onChangeRuleOperator,
    onChangeRuleValue,
    onChangeProperty,
  } = props;

  return (
    <Box
      minWidth={500}
      sx={{
        p: 1,
        borderRadius: 1,
        boxShadow: (theme) => theme.shadows[20],
      }}
    >
      {renderBlock({
        entityName,
        items,
        onAddRuleClick,
        onAddBlockClick,
        onDeleteClick,
        onChangeToGroupClick,
        onChangeBlockOperator,
        onChangeRuleOperator,
        onChangeRuleValue,
        onChangeProperty,
      })}
      <Divider sx={{ my: 1 }} />
      <ButtonAction startIcon={<Trash />} fullWidth>
        Delete Filter
      </ButtonAction>
    </Box>
  );
};

export default Rules;
