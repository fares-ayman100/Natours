require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./index');
const qs = require('qs');

app.set('query parser', (str) => qs.parse(str));
const DB = process.env.DATABASE;
mongoose.connect(DB).then(() => {
  console.log('Connection Successful');
});
const Port = process.env.PORT || 3000;
app.listen(Port, () => {
  console.log(`🚀 Server running on port ${Port}`);
});
