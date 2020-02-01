const teaRouter = require('express').Router();
const teaCtrl = require('../controllers/').tea;
const cardImgCtrl = require('../controllers/').cardImg;

teaRouter.get('/', (req, res, next) => {
    res.render('index'); //TODO
});

teaRouter.get('/getCardInfo/:id', async (req, res, next) => {
    let card = await teaCtrl.saveCard(0, req.params.id);
    res.send(card);
});

teaRouter.get('/getRivalInfo/:id', async (req, res, next) => {
    let rival = await teaCtrl.saveRival(1, req.params.id);
    res.send(rival);
});

teaRouter.get('/getFusionsJSON', async (req, res, next) => {
    let fusions = await teaCtrl.saveFusions();
    res.send(fusions);
});

teaRouter.get('/getRitualsJSON', async (req, res, next) => {
    let rituals = await teaCtrl.saveRituals();
    res.send(rituals);
});

teaRouter.get('/getEquipsJSON', async (req, res, next) => {
    let equips = await teaCtrl.saveEquipments();
    res.send(equips);
});

teaRouter.get('/cards', async (req, res, net) => {
    let cards = new Array();
    for(let i=1; i<723; i++){
        cards.push(await teaCtrl.getCard(i));
    }
    res.type('json');
    res.send(cards);
});

teaRouter.get('/getImages', async (req, res, net) => {
    await cardImgCtrl.getImages();
    res.send('SUCCESS!');
});

module.exports = teaRouter;