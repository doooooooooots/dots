// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({
    status: 200,
    paths: ['constants/[constantName]', 'constants/[constantName]/label'],
    constantNames: [
      'alignment',
      'area-wind',
      'area-sea',
      'area-field',
      'area-snow',
      'frame-type',
      'project-step',
      'purlin-type',
      'status',
    ],
    message: 'please indicate a constant name',
  });
}
