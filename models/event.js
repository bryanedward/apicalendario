const { Schema, model } = require('mongoose');

const EventoSchema = Schema({

    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'usuarios',
        required: true
    }
});

EventoSchema.method('toJSON', function () {
    //modificar el _id 
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Evento', EventoSchema);