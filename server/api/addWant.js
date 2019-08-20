const { addWant } = require("../data/want");
const { serverError } = require("./helpers");

const add = async (req, res) => {
    const thing = req.body.thing;
    const category = req.body.category;
    const cost = req.body.cost;

    let id;
    try {
        id = await addWant(thing, category, cost);
    } catch(error) {
        serverError(res, `Unable to add want to data store: ${ error }`);
        return;
    }

    res.json({
        error: null,
        id
    });
};

module.exports = add;
