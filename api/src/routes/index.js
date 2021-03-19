const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogRoutes = require('./dogs.js');


const router = Router();

// Configurar los routers
router.use('/', dogRoutes)
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
