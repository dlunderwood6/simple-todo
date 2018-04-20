import express from 'express'
import taskApis from './taskApis'

const app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(taskApis);
app.listen(3000, () => console.log('Example app listening on port 3000!'))
