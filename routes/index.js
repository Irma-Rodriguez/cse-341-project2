const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Students']
    res.send('Hello World');
});

router.use('/students', require('./students'));
router.use('/teachers', require('./teachers'));

module.exports = router;