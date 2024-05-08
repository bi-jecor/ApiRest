const { Schema, model } = require('mongoose');

const reportsjecor = Schema({
    Empresa: { 
        type: String,
        required: true,
    },
    Almacen: { 
        type: String,
        required: true,
    },
    Clave_Articulo: { 
        type: String,
        required: true,
    },
    Nombre: { 
        type: String,
        required: true,
    },
    Unidad_Compra: { 
        type: String,
        required: true,
    },
    Contenido_Unidad_Compra: { 
        type: Number,
        required: true,
    },
    porComprar: { 
        type: Number,
        required: true,
    },
    uVendidas: { 
        type: Number,
        required: true,
    },
    Punto_Venta: { 
        type: Number,
        required: true,
    },
    Ventas: { 
        type: Number,
        required: true,
    },
    Existencia: { 
        type: Number,
        required: true,
    },
    Compras_Pendientes: { 
        type: Number,
        required: true,
    },
    Estadistica: { 
        type: Number,
        required: true,
    },
    Fecha_upd: { 
        type: String,
        required: true,
    }
});

module.exports = model('reportsjecor', reportsjecor)