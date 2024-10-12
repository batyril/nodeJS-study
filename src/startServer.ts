import { appStart } from './server.js';

(async () => {
  try {
    await appStart();
    console.log('Server started successfully.');
  } catch (error) {
    console.error('Error starting server:', error);
  }
})();
