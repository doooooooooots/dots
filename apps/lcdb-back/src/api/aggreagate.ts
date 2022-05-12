// TYPES
import type { Request, Response } from 'express';
import { KeystoneContext } from '@keystone-6/core/types';

export default async function aggregate(req:Request, res:Response) {
  const context = (req as any).context as KeystoneContext;

  try {
    const aggregates = await context.prisma.quantity.aggregate({
      _count: {
        _all: true,
      },
      _max: {
        value: true,
      },
      _min: {
        value: true,
      },
      _sum: {
        value: true,
      },
    });
    res.json(aggregates)
  } catch(err) {
    return res.json(err.message)
  }
}