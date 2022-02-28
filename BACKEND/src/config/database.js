const mongoose = require('mongoose');

const url ='mongodb://127.0.0.1:27017/todo';
// Esta url é para ter compatibilidade com outras versões de mongo
mongoose.connect(url, { useNewUrlParser: true });

module.exports = mongoose;
