const express = require('express');
const TaskController = require('./controller/TaskController');
const server = express();
server.use(express.json()); // Aqui serve para a nossa API entender que as informações são em formato JSON

const TaskRoutes  = require('./routes/TaskRoutes');
server.use('/task', TaskRoutes);

server.listen(3002, () => {
 console.log('API ONLINE PORT 3002')
})