
const event = require('../models/event')


const getEventos = async (req, res) => {
    const eventos = await event.find()
        .populate('user', 'name');

    res.json(
        {
            ok:true,
            eventos
        }
    );
}


const crearEvento = async (req, res) => {
    console.log(req.body);
    try {
        const result = new event(req.body)
        result.user = req.uid
        const eventoGuardado = await result.save()
        res.json({
            ok: true,
            evento: eventoGuardado
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: error
        });
    }


}


const actualizarEvento = async (req, res) => {
    try {
        const eventoId = req.params.id;
        const uid = req.uid;
        const evento = await event.findById(eventoId);
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }
        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }
        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await event.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } );

        res.json({
            ok: true,
            evento: eventoActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}


const eliminarEvento =  async (req,res) => {
    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await event.findById( eventoId );

        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este evento'
            });
        }


        await event.findByIdAndDelete( eventoId );

        res.json({ ok: true });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}