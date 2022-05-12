import type { Request, Response } from 'express';
import { KeystoneContext } from '@keystone-6/core/types';
import { makeArticlePid } from '../../helpers/mkm/pids';
import sendByChunk from '../../utils/send-by-chunk';
import { isEmpty } from 'lodash';

export default async function tmpChangePids(req: Request, res: Response) {
  const context = (req as any).context as KeystoneContext;

  try {
    const input = {
      data: {
        create: {
          isFirstEd: true,
          isReverseHolo: false,
          condition: {
            connect: {
              code: 'NM'
            }
          },
          language: {
            connect: {
              code: 'fr'
            }
          },
          product: {
            connect: {
              id: 'cl1y5gud0701070mwgjdrvvi0e'
            }
          },
          stockUnits: {
            create: {
              quantity: {
                create: {
                  value: 4
                }
              },
              storage: {
                connect: {
                  id: 'cl20q8a1u35120myol8umxa4t'
                }
              }
            }
          }
        },
        update: {
          stockUnits: {
            create: {
              quantity: {
                create: {
                  value: 4
                }
              },
              storage: {
                connect: {
                  id: 'cl20q8a1u35120myol8umxa4t'
                }
              }
            }
          }
        }
      },
      where: {
        product: {
          is: {
            id: {
              equals: 'cl1yrmw5010863950m0auanp1uwk'
            }
          }
        },
        condition: {
          is: {
            code: {
              equals: 'GD'
            }
          }
        },
        language: {
          is: {
            code: {
              equals: 'fr'
            }
          }
        },
        isFirstEd: true,
        isReverseHolo: false
      }
    };

    const {
      data: { create, update },
      where
    } = input;

    const articles = await context.prisma.article.findMany({
      where: where
    });

    let output;

    if (!isEmpty(articles)) {
      const articleId = articles[0].id;
      output = await context.prisma.article.update({
        data: { ...update },
        where: { id: articleId }
      });
    } else {
      output = await context.prisma.article.create({
        data: { ...create }
      });
    }

    return res.json(output);

    // *ARTICLES
    // const articles = await context.prisma.article.findMany({
    //   include: {
    //     condition: true,
    //     language: true,
    //     product: {
    //       include: {
    //         reconciliations: {
    //           include: {
    //             plateform: true
    //           }
    //         }
    //       }
    //     }
    //   }
    // });

    // const output = articles.map((item) => {
    //   const {
    //     product: { reconciliations },
    //     condition: { code: conditionCode },
    //     language: { code: languageCode },
    //     isFirstEd
    //   } = item;

    //   const mkmReconciliation = reconciliations.find((item) => item.plateform.pid === 'CM');

    //   return {
    //     ...item,
    //     pid: makeArticlePid(mkmReconciliation.localPid, conditionCode, languageCode, isFirstEd)
    //   };
    // });

    // const updateArticles = async (article: any) =>
    //   await context.prisma.article.update({
    //     where: { id: article.id },
    //     data: {
    //       reconciliations: {
    //         create: {
    //           localPid: article.pid,
    //           plateform: { connect: { pid: 'CM' } }
    //         }
    //       }
    //     }
    //   });

    // await sendByChunk(updateArticles, output, 100);

    // *EXPANSION
    // const expansions = await context.prisma.expansion.findMany({});

    // const updateExpansion = async (expansion: any) =>
    //   await context.prisma.expansion.update({
    //     where: { id: expansion.id },
    //     data: {
    //       reconciliations: {
    //         create: {
    //           localPid: expansion.idMkm,
    //           plateform: { connect: { pid: 'CM' } }
    //         }
    //       }
    //     }
    //   });

    // await sendByChunk(updateExpansion, expansions, 100);

    // *RECONCILIATIONS
    // const reconciliations = await context.prisma.productReconciliation.findMany({});

    // const updateReconciliation = async (rec: any) =>
    //   await context.prisma.productReconciliation.update({
    //     where: { id: rec.id },
    //     data: {
    //       localPid: rec.localId
    //     }
    //   });

    // await sendByChunk(updateReconciliation, reconciliations, 100);

    // *PRODUCTS
    // const products = await context.prisma.product.findMany({
    //   include: {
    //     reconciliations: {
    //       include: {
    //         plateform: true
    //       }
    //     }
    //   }
    // });

    // const updateProduct = async (product: any) =>
    //   await context.prisma.product.update({
    //     where: { id: product.id },
    //     data: {
    //       reconciliations: {
    //         update: {
    //           localId: product.idMkm,
    //           plateform: { connect: { pid: 'CM' } }
    //         }
    //       }
    //     }
    //   });

    // *ARTICLES
    // const articles = await context.prisma.article.findMany({
    //   include: {
    //     product: {
    //       include: {
    //         reconciliations: {
    //           include: {
    //             plateform: {
    //               select: {
    //                 pid: true
    //               }
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    // });

    // const updateArticle = async (article: any) =>
    //   await context.prisma.article.update({
    //     where: { id: article.id },
    //     data: {
    //       reconciliations: {
    //         create: {
    //           localPid: article.product.reconciliations.find((item) => item.plateform.pid === 'CM').localPid,
    //           plateform: { connect: { pid: 'CM' } }
    //         }
    //       }
    //     }
    //   });

    // await sendByChunk(updateArticle, articles, 80);

    return res.json({ status: 200, message: 'articles OK' });
  } catch (err) {
    return res.json({ status: 400, message: err.message });
  }
  res.json({ status: 400 });
}
