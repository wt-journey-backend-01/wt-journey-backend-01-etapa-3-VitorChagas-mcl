async function errorHandler(res, errors ) {
    return res.status(400).json({ status: 400, message: "Parâmetros inválidos", errors });
}

module.exports = errorHandler;
