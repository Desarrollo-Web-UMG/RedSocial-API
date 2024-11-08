const {Schema, model} = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const UserSchema =  Schema({
    name: {
        type: String,
        required: true
    },
    surname: String,
    nick: {
        type: String,
        required: true
    },
    genero:{
        type: Number,

    },
    nacionalidad: {
        type: Number,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    descripcion: {
        type: String
    },
    role: {
        type: String,
        default: "role_user"
    },
    image: {
        type: String,
        default: "default.png"
    },
    created_at:{
        type: Date,
        default: Date.now
    }
});

UserSchema.plugin(mongoosePaginate);

module.exports = model("User", UserSchema, "users");
                //Coleccion: user users