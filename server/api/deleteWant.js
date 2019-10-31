const { getWantById, removeWant } = require("../data/want");
const { serverError } = require("./helpers");

const deleteWant = async (req, res) => {
    const requestId = req.params.id;

    let want;
    try {
        want = await getWantById(requestId);
    } catch(error) {
        serverError(res, `Unable to find want with id ${ requestId }: ${ error }`);
        return;
    }

    try {
        await removeWant(requestId);
    } catch(error) {
        serverError(res, `Unable to delete want from data store: ${ error }`);
        return;
    }

    res.json({
        error: null,
        ...want 
    });
};

module.exports = deleteWant;
