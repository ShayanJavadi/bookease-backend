import {Logger, transports} from 'winston';
import isDevelopment from '../config/isDevelopment';

const logger = new Logger({
  level: isDevelopment() ? 'info' : 'warn',
  transports: [
    new (transports.Console)(),
  ],
});

export default logger;
