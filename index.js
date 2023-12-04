const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/authRouter');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 8080;

const app = express();
app.use(
  cors({
    origin: '*',
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', router);

async function start(req, res, next) {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECT_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(PORT, () => {
      console.log('listening on port' + PORT);
    });
  } catch (e) {
    console.log(e);
  }
}
start();
