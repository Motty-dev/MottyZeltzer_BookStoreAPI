const Book = require('../models/bookModel');
const factory = require('./handlerFactory');


exports.getAllBooks = factory.getAll(Book);
exports.getBook = factory.getOne(Book);         // options to populate: {property: '<field name>'}
exports.createBook = factory.createOne(Book);
exports.updateBook = factory.updateOne(Book);
exports.deleteBook = factory.deleteOne(Book);
