const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                tittle: "Validation Failed",
                message: err.message,
                stackTrace: process.env.NODE_ENV === 'production' ? null : err.stack,
            });
            break;
        case constants.NOT_FOUND:
            res.json({
                tittle: "Not Found",
                message: err.message,
                stackTrace: process.env.NODE_ENV === 'production' ? null : err.stack,
            });
            break;  // Missing break statement
        default:
            res.json({  // Missing default case handling
                tittle: "Server Error",
                message: err.message,
                stackTrace: process.env.NODE_ENV === 'production' ? null : err.stack,
            });
            break;
    }
}

module.exports = errorHandler;