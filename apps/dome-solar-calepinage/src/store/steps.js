const withSteps = (app) => ({

  ...app,

  steps: [
    'isLayoutOf',
    'hasTechnician',
    'useSolarPanel',
    'hasProduct',
    'useCladding',
    'template',
    'layout',
    'rails',
    'markup',
    'summary',
    'pdf'
  ]
})

export default withSteps