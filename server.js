//Uncaught Exception
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});

const dotenv = require('dotenv');
const mongoose = require('mongoose');
const qs = require('qs');
const app = require('./index');

app.set('query parser', (str) => qs.parse(str));
dotenv.config();
const DB = process.env.DATABASE;
mongoose.connect(DB).then(() => {
  console.log('Connection Successful');
});
const Port = process.env.PORT || 3000;
const server = app.listen(Port, () => {
  console.log(`🚀 Server running on port ${Port}`);
});

//Unhandled Rejection
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('Unhandled Rejection !💥Shutdown...');
  server.close(() => {
    process.exit(1);
  });
});
