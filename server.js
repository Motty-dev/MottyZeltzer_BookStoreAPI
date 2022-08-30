const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const app = require('./app');
const mongoose = require('mongoose');

// Global uncaught exceptions errors handler
process.on('uncaughtException', (err) => {
  console.log('Uncaught exception !');
  console.log(err.name, err.message);
  
  server.close(() => {
    process.exit(1);
  });
});


const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    //useFindModify: false,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(con => console.log('Connected to remote database...'));

const port = 3000 || process.env.PORT;

const server = app.listen(port, () => {
    console.log(`Server is running on ${port}... `);
});

// Global Promise rejection handler (safty net)
process.on('unhandledRejection', (err) => {
  console.log('Unhandled rejection !');
  console.log(err.name, err.message);
  
  server.close(() => {
    process.exit(1);
  });
});