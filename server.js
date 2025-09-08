require('dotenv').config();
const app = require('./index');
const Port = process.env.PORT || 3000;
app.listen(Port, () => {
  console.log(`🚀 Listening On Port ${Port}`);
});
