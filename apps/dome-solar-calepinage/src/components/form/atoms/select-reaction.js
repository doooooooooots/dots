import React, { useCallback, useState } from 'react';
import { MenuItem, Stack, Typography } from '@mui/material';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import ButtonBase from './button-base';
import PopperGrowWithClickaway from '../../popper-grow-with-clickaway';
import usePopper from '../../../hooks/use-popper';
import { uniqueId, isEmpty, remove } from 'lodash';
import ButtonBaseUnstyled from './button-base-unstyled';

const ICONS = {
  '+1': '👍',
  '-1': '👎',
  smile: '😁',
  tada: '🎉',
  thinking_face: '🤔',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
  fire: '🔥',
  brain: '🧠',
  creative: '🎨',
  checked: '✅',
  error: '❌',
};

const ReactionIcon = ({ variant, count, onClick, isActive }) => {
  if (variant === '' || variant === 'default') {
    return <AddReactionOutlinedIcon />;
  }
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      onClick={onClick}
      sx={[
        {
          borderRadius: 1,
          px: 0.75,
          py: 0.35,
          cursor: 'pointer',
          border: '1px solid',
          borderColor: 'divider',
          color: 'neutral.500',
        },
        isActive && {
          borderColor: 'neutral.main',
          bgcolor: 'neutral.25',
        },
      ]}
    >
      <Typography>{ICONS[variant]}</Typography>
      <Typography variant="body2">{count}</Typography>
    </Stack>
  );
};

function SelectReaction(props) {
  const { tooltip = 'add a reaction' } = props;
  const { open, anchorEl, onOpen, onClose } = usePopper(false);

  const [reacts, setReacts] = useState([
    {
      id: 1,
      variant: 'fire',
      people: [{ id: '__my__ID__', name: 'My Name' }],
      countPeople: 1,
    },
    {
      id: 2,
      variant: 'brain',
      people: [{ id: '__not__my__ID__', name: 'Other Name' }],
      countPeople: 1,
    },
  ]);

  //* Add a new reaction
  const handleAddClick = useCallback(
    (variant) => () => {
      setReacts((current) => {
        const _current = [...current];
        const existingReaction = _current.find(
          (item) => item.variant === variant
        );

        if (!isEmpty(existingReaction)) {
          const didUserAlreadyVoted = existingReaction.people.find(
            ({ id }) => id === '__my__ID__'
          );
          if (isEmpty(didUserAlreadyVoted)) {
            existingReaction.countPeople++;
            existingReaction.people.push({ id: '__my__ID__', name: 'name' });
            return _current;
          } else {
            return _current;
          }
        }

        _current.push({
          id: uniqueId('___REACT_'),
          variant: variant,
          people: [{ id: '__my__ID__', name: 'name' }],
          countPeople: 1,
        });

        return _current;
      });
      onClose();
    },
    [onClose]
  );

  //* UpVote a reaction
  const upVote = useCallback(
    (reaction) => () => {
      setReacts((current) => {
        const _current = [...current];
        const _reaction = _current.find(({ id }) => id === reaction.id);
        _reaction.people.push({ id: '__my__ID__', name: 'name' });
        _reaction.countPeople++;
        return _current;
      });
    },
    []
  );

  //* DownVote a reaction
  const downVote = useCallback(
    (reaction) => () => {
      setReacts((current) => {
        const _current = [...current];
        const _reaction = _current.find(({ id }) => id === reaction.id);
        remove(_reaction.people, ({ id }) => id === '__my__ID__');
        _reaction.countPeople--;
        return _current;
      });
    },
    []
  );

  return (
    <>
      {reacts.map((reaction) => {
        const { people } = reaction;
        const mine = people.find(({ id }) => id === '__my__ID__');
        const didIVote = !isEmpty(mine);
        return (
          <ButtonBaseUnstyled key={reaction.id} tooltip={reaction.variant}>
            <ReactionIcon
              variant={reaction.variant}
              count={reaction.countPeople}
              onClick={didIVote ? downVote(reaction) : upVote(reaction)}
              isActive={didIVote}
            />
          </ButtonBaseUnstyled>
        );
      })}
      <ButtonBase
        tooltip={tooltip}
        icon={<AddReactionOutlinedIcon />}
        onClick={onOpen}
      />
      <PopperGrowWithClickaway
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        p={0}
      >
        <Stack direction="row">
          {Object.entries(ICONS).map(([key, emoji]) => (
            <MenuItem
              key={key}
              value={key}
              onClick={handleAddClick(key)}
              sx={{ px: 1 }}
            >
              {emoji}
            </MenuItem>
          ))}
        </Stack>
      </PopperGrowWithClickaway>
    </>
  );
}

export default SelectReaction;
