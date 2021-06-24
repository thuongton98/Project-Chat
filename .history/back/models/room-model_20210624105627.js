const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema({
   
   
    mess: {
        type: String,
        required: true,
        },
    room_id:[]

},{
    timestamps: true,
});

const Room = mongoose.model('Room', messSchema);

module.exports = Room;