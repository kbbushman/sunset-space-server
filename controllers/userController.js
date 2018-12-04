const db = require('../models');
const express = require('express');
const app = express();
const User = db.User;
const Avatar = db.Avatar;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const JWT_TOKEN = process.env.JWT_TOKEN;

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const index = (req, res) => {
    User.find({}, (err, users) => {
        if (err) res.send({ err: true, message: `Did not find any Users...`});
        res.json(users);
    });
};

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const show = (req, res) => {
    const { id } = req.params;
    
    User.findById(id)
        .populate('avatar')
        .exec((err, user) => {
            if(err) res.send({ err: true, message: `A user with ID:${id} does not exist.`});
            res.json(user);
        })
};

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

//Create new user on Log in, with default profile
const create = (req, res) => {
    User.findOne({username: req.body.username})
        .then(user => {
            if (user) {
                return res.status(400).json({ username:`Looks like that username is already being used.` });
            } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) res.status(500).json({ error: err, message: `Cannot create user` });

                const avatar = new Avatar({
                    _id: new mongoose.Types.ObjectId(),
                });

                avatar.save(function (err) {
                    if (err) throw err;

                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        username: req.body.username,
                        password: hash,
                        email: req.body.email,
                        phone: req.body.phone,
                        website: req.body.website,
                        avatar: avatar._id,
                        tour: [],
                        plan: [], 
                    })

                    user.save()
                        .then(result => {
                            // console.log(result);
                            res.status(200).json({ success: `Successful new user guy...`});
                        })
                        .catch(error => {
                            res.status(500).json({ error: err });
                    }); 
                });
            });
        }
    });
};

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const update = (req,res) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedUser) => {
        if (err) res.send({ err: true, message: `Meeerrrpppp, Cannot update the user...`});
        res.json(updatedUser);
    });
};

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const destroy = (req, res) => {
    User.findByIdAndDelete(req.params.id, (err, deletedUser) => {
        if (err) res.send({ err: true, message: `Meeerrrpppp, Cannot delete the user...`});
        res.json({ error: false, message: `Righteous, User deleted to the max...`});
    });
};

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

//Sign in the user to the app...
const signIn = (req,res) => {
    User.findOne({ username: req.body.username })
    .exec()
    .then(user => {
    //Is this really a member
    if (!user) {
        return res.status(404).json({ username: `Not able to find user`});
    }
    // console.log(user);
    bcrypt.compare(req.body.password, user.password, (err, result) => {
        // console.log(result);
        if (err) {
            return res.status(401).json({ failed: `Access not authorized` });
        }
    /***** SEND a jwt token if the password matches ****/
        if (result) {
            const JWTToken = jwt.sign({
                username: user.username,
                _id: user._id
            },
            'secret',
            {
            expiresIn: '2h'
            });
            return res.status(200).json({ success: `Cowabunga. JWT working...`, token: JWTToken });
        }
        return res.status(401).json({ failed: `We're going to need to see some Authorization`});
        });
    })
    .catch(err => res.status(500).json({ error: err }));
}


            
module.exports = {
    index, show, create, update, destroy, signIn,
}