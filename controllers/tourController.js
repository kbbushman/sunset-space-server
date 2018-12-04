const db = require('../models');
const Tour = db.Tour;

const index = (req, res) => {
    Tour.find({}, (err, tours) => {
        if (err) res.send({ err: true, message: `Tour not found...` });
        res.json(tours);
    });
};

const show = (req, res) => {
    const {id} = req.params;
    Tour.findById(id, (err, city) => {
        if (err) res.send({ err: true, message: `Did not match a tour with ID:${id}...` });
        res.json(tour);
    });
};

const create = (req, res) => {
    Tour.create(req.body, (err, newTour) => {
        if (err) res.send({ err: true, message: `Error, cannot create tour...` });
        res.json(newTour);
    });
};

module.exports = {
    index, show, create
}