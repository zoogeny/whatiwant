const { serverError } = require("./helpers");
const { getAllWants } = require("../data/want");

const getAll = async (req, res) => {
    let wants;
    try {
        wants = await getAllWants();
    } catch(err) {
        serverError(`Unable to load wants: ${ err.description }`);
        return;
    }

    res.json({
        error: null,
        wants
    });
};

module.exports = getAll;
