const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A book must have a name'],
        unique: true,
        trim: true,
        maxlength:[40, 'A book name must have lest then 40 characters']
    },
    description: {
        type: String,
        required: [true, 'A book must have a description']
    },
    price: {
        type: Number,
        required: [true, 'A book must have a price']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});


const Book = mongoose.model('book', bookSchema);

module.exports = Book;