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

        case constants.UNAUTHORIZED:
            res.json({
                tittle: "Unauthorized",
                message: err.message,
                stackTrace: process.env.NODE_ENV === 'production' ? null : err.stack,
            });
            break;
        case constants.FORBIDDEN:
            res.json({
                tittle: "Forbidden",
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
            break;
        case constants.SERVER_ERROR:
            res.json({
                tittle: "Server Error",
                message: err.message,
                stackTrace: process.env.NODE_ENV === 'production' ? null : err.stack,
            });
            break;
        default:
            console.log("no error found")
            break;
    }
}

module.exports = errorHandler;