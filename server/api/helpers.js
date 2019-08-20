const serverError = (res, description, status=500) => {
    res.status(status);
    res.json({ "error": { description } });
};

module.exports = {
    serverError
};
