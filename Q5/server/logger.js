const pino = require('pino');
const logger = pino({
  transport: {
    targets: [
      {
        target: 'pino-pretty',
        options: { colorize: true },
        level: 'info',
      },
      {
        target: 'pino/file',
        options: { destination: './log.json' },
        level: 'info',
      },
    ],
  },
});

module.exports = logger;