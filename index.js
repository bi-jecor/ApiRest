const express = require('express');
const expressFileUpload = require('express-fileupload');
require('dotenv').config();
// const { dbConnection } = require('./database/config');
// const { startRutines } = require('./schedule/schedule');
const cors = require('cors');

// Creacion del servidor express
const app = express();

// Configurar CORS
app.use(cors());

// Lectura y parseo del body
app.use( express.json({ limit : '1000mb' }) );

// Conexion Base de Datos
// dbConnection();

// ============================================================
// Rutas
// ============================================================
app.use('/jecor/api/auth', require('./routes/auth'));
app.use('/jecor/api/connections', require('./routes/connections'));
app.use('/jecor/api/users', require('./routes/users'));
app.use('/jecor/api/applications', require('./routes/applications'));
app.use('/jecor/api/permissions', require('./routes/permissions'));
app.use('/jecor/api/roles', require('./routes/roles'));
app.use('/jecor/api/stores', require('./routes/stores'));
app.use('/jecor/api/departaments', require('./routes/departaments'));
app.use('/jecor/api/reports', require('./routes/reports'));
app.use('/jecor/api/reports/jecor', require('./routes/reports.jecor'));
app.use('/jecor/api/uploads', require('./routes/uploads'));
app.use('/jecor/api/cedis', require('./routes/cedis'));
app.use('/jecor/api/emails', require('./routes/emails'));
// app.use('/jecor/api/emails', require('./routes/sendEmails'));
// app.use('/jecor/api/whatsapp', require('./routes/sendWhatsApps'));
app.use('/jecor/api/sales', require('./routes/pvSales'));
app.use('/jecor/api/sesions', require('./routes/sesions'));

// app.use('/jecor/api/aisle', require('./routes/aisleOrder'));

// Vivero
app.use('/jecor/api/nursery/branchs', require('./routes/nurseryBranchs'));
app.use('/jecor/api/nursery/products', require('./routes/nurseryProducts'));
app.use('/jecor/api/nursery/catalogs', require('./routes/nurseryCatalog'));
app.use('/jecor/api/nursery/purchases', require('./routes/nurseryPurchases'));
app.use('/jecor/api/nursery/sales', require('./routes/nurserySales'));
app.use('/jecor/api/nursery/providers', require('./routes/nurseryProviders'));

// Pedido
app.use('/jecor/api/aisle/', require('./routes/aisleOrder'));

//All in one
app.use('/jecor/api/pricesLists', require('./routes/pricesLists'));
app.use('/jecor/api/pricesListsOrders', require('./routes/pricesListsOrder'));
app.use('/jecor/api/pricesListsMarkets', require('./routes/pricesListMarkets'));
app.use('/jecor/api/inventory', require('./routes/inventory'));
app.use('/jecor/api/lifting', require('./routes/lifting'));

// Reports 
app.use('/jecor/api/reportsjecor', require('./routes/reports.jecor'));

app.use('/jecor/api/formBuilders/surveys', require('./routes/surveys'));
app.use('/jecor/api/formBuilders/surveyAnswers', require('./routes/surveyAnswers') );
app.use('/jecor/api/formBuilders/surveyQuestions', require('./routes/surveyQuestions') );

// Accounting Reports
app.use('/jecor/api/accountingReports', require('./routes/accountingReports'));

// Visual Minimun
app.use('/jecor/api/visualMinimun', require('./routes/visualMinimun'));

// jecor apps
app.use('/jecor/api/forecast', require('./routes/forecast'));
app.use('/jecor/api/fillRate', require('./routes/fillRate'));
app.use('/jecor/api/averageCost', require('./routes/averageCost'));

// App de renta de locales
app.use('/jecor/api/eventosAgenda', require('./routes/eventosAgenda'));
app.use('/jecor/api/eventosLocales', require('./routes/eventosLocales'));
app.use('/jecor/api/eventosArticulos', require('./routes/eventosArticulos'));
app.use('/jecor/api/eventosCombos', require('./routes/eventosCombos'));
app.use('/jecor/api/eventosCombosArticulos', require('./routes/eventosCombosArticulos'));

// Control de estacionamientos
app.use('/jecor/api/estacionamientosAperturasCierres', require('./routes/estacionamientosAperturasCierres'));
app.use('/jecor/api/estacionamientosDoctos', require('./routes/estacionamientosDoctos'));
app.use('/jecor/api/estacionamientosTiendas', require('./routes/estacionamientosTiendas'));

// Ventas
app.use('/jecor/api/ventasArticulos', require('./routes/ventasArticulos'));
app.use('/jecor/api/ventasMovimientos', require('./routes/ventasMovimientos'));
app.use('/jecor/api/ventasExistencias', require('./routes/ventasExistencias'));
app.use('/jecor/api/ventasAperturasCierres', require('./routes/ventasAperturasCierres'));
app.use('/jecor/api/ventasDoctosTemporales', require('./routes/ventasDoctosTemporales'));
app.use('/jecor/api/ventasDoctos', require('./routes/ventasDoctos'));
app.use('/jecor/api/ventasRetiros', require('./routes/ventasRetiros'));

// Configuracion de sistema JECOR BI
app.use('/jecor/api/sistemaTiendas', require('./routes/sistemaTiendas'));
app.use('/jecor/api/resportesOperativos', require('./routes/reportes'));




// --------------------------------------------------------------------------------

app.listen( process.env.PORT, () => {
    console.log( 'Servidor Corriendo en el puerto ' + process.env.PORT );
})

// const socketMain = require('./socket/main');
// const socket = socketMain( server );
