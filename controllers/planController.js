const db = require('../models');
const Plan = db.Plan;

const index = (req, res) => {
    Plan.find({}, (err, plans) => {
        if (err) res.send({ err: true, message: `Non-matchable plan, shoots bruh...`});
        res.json(plans);
    });
};

const show = (req, res) => {
    const {id} = req.params;
    Plan.findById(id, (err, plan) => {
        if (err) res.send({ err: true, message: `Wait?! There is no plan with ID:${id}....` });
        res.json(plan);
    });
};

const create = (req, res) => {
    Plan.create(req.body, (err, newPlan) => {
        if (err) res.send({ err: true, message: `mmmrrrppkkk errrror, does not compute...` });
        res.json(newPlan);
    });
};


module.exports = {
    index, show, create
}