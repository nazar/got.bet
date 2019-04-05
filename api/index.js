import http from 'http';

import logger from 'services/logger';
import app, { apolloServer } from 'app';

const PORT = app.get('port');
const httpServer = http.createServer(app);


apolloServer.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  logger.info(`🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`);
  logger.info(`🚀 Subscriptions ready at ws://localhost:${PORT}${apolloServer.subscriptionsPath}`);
});
