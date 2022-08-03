import dotenv from 'dotenv';
import app from './src/app.js';
import { handleError } from './src/utils/errorsHandler.js';

/**
  * Load environment variables from .env file,
  */
dotenv.config({ path: '.env' });

app.set('port', process.env.PORT || 3000);

/**
  * Error Handler.
  */
app.use((err, req, res, next) => {
  handleError({
    err, req, res, next,
  });
});

/**
    * Start Express server.
    */
app.listen(app.get('port'), () => {
  console.info(
    'App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env'),
  );
  console.info('  Press CTRL-C to stop\n');
});
