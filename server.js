const app = require('./app');
// START SERVER
const port = 3000;
app.listen(port, '127.0.0.1', () => {
  console.log(`App is running on port ${port}...`);
});
