const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const bookRouter = require('./routes/bookRoutes');
const userRouter = require('./routes/userRoutes');
const orderRouter = require('./routes/orderRoutes');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
};

app.use(express.json());

app.use('/api/books', bookRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Cant find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;