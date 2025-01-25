const express = require('express');
const expressproxy = require('express-http-proxy');

const app = express();

const PORT = process.env.PORT || 3000;

app.use('/user', expressproxy('http://localhost:3001'));

app.listen(PORT, () => {
  console.log(`Gateway running on port ${PORT}`);
});
