function errorHandler(err, req, res, next) {
    return {
        status: err.status || 500,
        messsagem: err.message || 'Erro interno do servidor',
        errors: err.errors || []
    };
}

module.exports = errorHandler;
