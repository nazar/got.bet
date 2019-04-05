import _ from 'lodash';
import morgan from 'morgan';

import logger from 'services/logger';

export default function () {
  const logging = morgan(':method :url :status :res[content-length] - :response-time ms - :requestPayload', {
    stream: {
      write: (message) => {
        logger.request(message);
      }
    }
  });

  morgan.token('requestPayload', (req) => {
    let payload;

    if (req.method.toUpperCase() === 'GET') {
      payload = req.query;
    } else {
      payload = req.body;
    }

    try {
      payload = JSON.stringify(payload, null, 2);
    } catch (e) {
      payload = 'Not stringifiable';
    }

    return payload;
  });

  return logging;
}
