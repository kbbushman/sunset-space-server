const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlanSchema = new Schema({
    type: String,
    cost: Number,
    username: String,
});

const Plan = mongoose.model('Plan', PlanSchema);
module.exports = Plan;