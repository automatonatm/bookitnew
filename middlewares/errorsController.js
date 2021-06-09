import AppError from  '../utils/errorHandler'

const sendDevError =  (err, res) => {
    //console.log(err);
    res.status(err.statusCode)
        .json({
            status: err.status,
            message: err.message,
            err: err,
            stack: err.stack
        });

    /* if(err.isOperational) {

         res.status(err.statusCode)
             .json({
                 status: err.status,
                 message: err.message,
                 err: err,
                 stack: err.stack
             });
     }else {
         res.status(500).json({
             status: "error",
             message: "Something went very wrong!",
         })
     }*/
};

const sendProdError =  (err, res) => {

    //console.log(err);

    if(err.isOperational) {
        res.status(err.statusCode)
            .json({
                status: false,
                message: err.message,
                err: err,
                stack: err.stack
            });
    }else{
        res.status(500).json({
            status: false,
            message: "Something went very wrong!",

        })
    }
};

const  handleCastErrorDB = (err) => {
    const  message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message, 400 )
};

const handleDuplicateFieldDB = (err) => {

    //Get the error object and iterate
    const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
    const message = `${value.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')} Already exists`;
    return new AppError(message, 400 )
};

const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el => el.message);
    const  message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
};

const handleAuthError = (err) =>  new AppError(err.message, 401);

const handleBadRequest = (err) =>  new AppError(err.message, 400);

const handleForbidden = (err) =>  new AppError(err.message, 403);

const handle404NotFound = (err) =>  new AppError(err.message, 404);

const errorsHandlers =    (err, req, res, next) => {


    err.statusCode = err.statusCode || 500;
    err.status = err.status || false;

    if(process.env.NODE_ENV === 'development') {

        sendDevError(err, res)


    }else if(process.env.NODE_ENV === 'production') {


        let error = { ...err };



        if(err.name === 'CastError') error = handleCastErrorDB(error);

        if(err.code === 11000) error = handleDuplicateFieldDB(err);

        if(err.name === "ValidationError") error = handleValidationErrorDB(error);

        if(err.statusCode === 401) error = handleAuthError(err);

        if(err.statusCode === 400) error = handleBadRequest(err);

        if(err.statusCode === 403) error = handleForbidden(err);

        if(err.statusCode === 404) error = handle404NotFound(err);

        sendProdError(error, res)
    }


};

export  default errorsHandlers;