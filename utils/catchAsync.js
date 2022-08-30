// Wrapper function for async functions to exec try and catch async functions
module.exports = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};