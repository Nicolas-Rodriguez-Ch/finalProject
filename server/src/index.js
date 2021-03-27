const express = require('express');

const app = express();
require('./database/database.config')

const usersRouter = require(`./routes/users.routes`);
const projectsRouter = require('./routes/projects.routes');
app.use(express.json());

// routes
app.use(usersRouter);
app.use(projectsRouter);

// TODO: crear variable de entorno
app.listen(3000, ()=>console.log(`running on port 3000`));