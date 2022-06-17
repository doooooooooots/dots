import enumList from '../../../utils/enum-list';

const Reaction = enumList({
  type: 'category',
  values: {
    '+1': 100,
    '-1': 200,
    SMILE: 101,
    TADA: 102,
    THINKING_FACE: 103,
    HEART: 104,
    ROCKET: 105,
    EYES: 106,
    FIRE: 107,
    BRAIN: 108,
    CREATIVE: 109,
    CHECKED: 110,
    ERROR: 201,
  },
  labels: {
    fr: {
      '+1': '👍',
      '-1': '👎',
      SMILE: '😁',
      TADA: '🎉',
      THINKING_FACE: '🤔',
      HEART: '❤️',
      ROCKET: '🚀',
      EYES: '👀',
      FIRE: '🔥',
      BRAIN: '🧠',
      CREATIVE: '🎨',
      CHECKED: '✅',
      ERROR: '❌',
    },
  },
});

export default Reaction;
