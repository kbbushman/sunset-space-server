const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AvatarSchema = new Schema({
    
    imgUrl: {
        type: String,
        default: '/uploads/default-avatar.jpg'
    }
    
});

const Avatar = mongoose.model('Avatar', AvatarSchema);
module.exports = Avatar;