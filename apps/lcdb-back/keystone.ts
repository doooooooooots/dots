import 'dotenv/config'; /// Attention utilisé parce que le .env n'était pas chargé dès le début du script

import { config } from '@keystone-6/core';
import { statelessSessions } from '@keystone-6/core/session';
import { createAuth } from '@keystone-6/auth';
import { lists } from './schema';
import { PORT, DATABASE_URL, SESSION_MAX_AGE, SESSION_SECRET } from './config';
import seedDatabase from './src/api/root/seed';
import seedStockfile from './src/api/root/seed-stockfile';
import aggregate from './src/api/aggreagate';
import { extendGraphqlSchema } from './src/graphql/extend-graphql-schema';
import tmpChangePids from './src/api/root/tmp-change-pids';

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password']
  }
});

const session = statelessSessions({
  maxAge: SESSION_MAX_AGE,
  secret: SESSION_SECRET
});

export default withAuth(
  config({
    db: {
      provider: 'postgresql',
      useMigrations: true,
      url: DATABASE_URL
    },
    server: {
      port: PORT,
      cors: {
        origin: true,
        credentials: true
      },
      extendExpressApp: (app, createContext) => {
        app.use('/api', async (req, res, next) => {
          (req as any).context = await createContext(req, res);
          next();
        });
        app.get('/api/seed', seedDatabase);
        app.get('/api/seed-stockfile', seedStockfile);
        app.get('/api/aggregate', aggregate);
        app.get('/api/tmp-change-pids', tmpChangePids);
      }
    },
    lists,
    session,
    extendGraphqlSchema
  })
);
