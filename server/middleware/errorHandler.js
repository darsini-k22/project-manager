const { constants } = require("../constants");
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 501;
  switch (statusCode) {
    case constants.NOT_FOUND:
      res.json({
        title: "Not found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.VALIDATION_ERROR:
      req.json({
        title: "Validation error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.FORBIDDEN:
      req.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });

    case constants.UNAUTHORIZED:
      req.json({
        title: "Unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });
      
      case constants.INTERNAL_SERVER_ERROR:
        req.json({
            title:"Internal server error",
            message:err.message,
            stackTrace:err.stack
        })
    default:
        console.log("No errors!")
      break;
  }
};

module.exports=errorHandler;
