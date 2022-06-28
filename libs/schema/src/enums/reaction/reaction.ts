import enumList from '../../utils/enum-list';

const Reaction = enumList({
  type: 'category',
  values: {
    '+2': 101,
    '+1': 100,
    '-1': 200,
    '-2': 201,
    SMILE: 110,
    TADA: 120,
    THINKING_FACE: 130,
    HEART: 140,
    ROCKET: 150,
    EYES: 160,
    FIRE: 170,
    BRAIN: 180,
    CREATIVE: 190,
    CHECKED: 102,
    ERROR: 202,
  },
  labels: {
    fr: {
      '+2': '😍',
      '+1': '👍',
      '-1': '👎',
      '-2': '😱',
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
