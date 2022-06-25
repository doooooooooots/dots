import enumList from '../utils/enum-list';

const ProjectStep = enumList({
  type: 'category',
  values: {
    PRE_STUDY_TODO: 1,
    PRE_STUDY_DONE: 2,
    PRE_STUDY_SENT: 3,
    CF_TODO: 4,
    CF_SENT: 5,
    CF_APPROVED: 6,
  },
  labels: {
    fr: {
      PRE_STUDY_TODO: 'Pre-étude à faire',
      PRE_STUDY_DONE: 'Pre-étude faite',
      PRE_STUDY_SENT: 'Pre-étude envoyée',
      CF_TODO: 'cf à faire',
      CF_SENT: 'cf envoyé',
      CF_APPROVED: 'cf approuvé',
    },
  },
});

export default ProjectStep;
