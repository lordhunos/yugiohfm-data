const scraper = require('../utils/scraper');
const CardModel = require('../models/Card');
const RivalModel = require('../models/Rival');
const DeckModel = require('../models/Deck');
const DropModel = require('../models/Drop');
const FusionModel = require('../models/Fusion');
const RitualModel = require('../models/Ritual');
const EquipmentModel = require('../models/Equipment');
const fs = require('fs');

class Tea {
    constructor() {
        this.getCard = this.getCard.bind(this);
        this.saveCard = this.saveCard.bind(this);
        this.saveRival = this.saveRival.bind(this);
        this.saveDeck = this.saveDeck.bind(this);
        this.saveDrops = this.saveDrops.bind(this);
        this.saveFusions = this.saveFusions.bind(this);
        this.saveRituals = this.saveRituals.bind(this);
        this.saveEquipments = this.saveEquipments.bind(this);
    }

    async getCard(card) {
        let query;
        switch(typeof(card)){
            case 'number': query = {num:card}; break;
            case 'string': query = {name:card}; break;
        }
        return await CardModel.findOne(query);
    }

    async saveCard(mode, cardID) {
        try {
            const resJson = await scraper(mode, cardID);
            let cardObj = { num: resJson.card.Numero, name: resJson.card.Nombre, type: { prim: resJson.card.Tipo }, pass: resJson.card.Password, price: resJson.card.Precio, desc: resJson.card.Comentario, atr: resJson.card.Atributo, level: resJson.card.Nivel };
            if(resJson.card.Atk !== '-') cardObj = Object.assign(cardObj, { atk: resJson.card.Atk, def: resJson.card.Def, gs: { prim: resJson.card.St1, sec: resJson.card.St2 } });
            const newCard = new CardModel(cardObj);
            await newCard.save();
            return newCard.num + '. ' + newCard.name;
        } catch (e) {
            console.log('[SAVE CARD ERROR]', e);
        }
    }

    async saveRival(mode, rivalID) {
        try {
            const resJson = await scraper(mode, rivalID);
            const rivalObj = { battle: resJson.npc.numero, name: resJson.npc.nombre };
            const newRival = new RivalModel(rivalObj);
            await newRival.save();
            await this.saveDeck(newRival._id, resJson.deck);
            await this.saveDrops(newRival._id, resJson.sapow, 'sapow');
            await this.saveDrops(newRival._id, resJson.bcdpt, 'bcdpt');
            await this.saveDrops(newRival._id, resJson.satec, 'satec');
            return newRival.battle + '. ' + newRival.name;
        } catch (e) {
            console.log('[SAVE RIVAL ERROR]', e);
        }
    }

    async saveDeck(rivalObjID, deck) {
        try{
            for(let i=0; i<deck.length; i++){
                const card = await this.getCard(deck[i].nombre);
                const deckObj = { rival: rivalObjID, card: card._id, prob: deck[i].prob };
                const newDeck = new DeckModel(deckObj);
                await newDeck.save();
            }
        } catch (e) {
            console.log('[SAVE DECK ERROR]', e);
        }
    }

    async saveDrops(rivalObjID, drops, dropRank) {
        try{
            for(let i=0; i<drops.length; i++){
                const card = await this.getCard(drops[i].nombre);
                const dropObj = { rival: rivalObjID, card: card._id, prob: drops[i].prob, rank: dropRank };
                const newDrop = new DropModel(dropObj);
                await newDrop.save();
            }
        } catch (e) {
            console.log('[SAVE DROP ERROR]', e);
        }
    }

    async saveFusions() {
        let controlID = 1;
        const jsonFusions = fs.readFileSync('./data/fusions.json');
        const arrayFusions = JSON.parse(jsonFusions);
        
        for(let i=0; i<arrayFusions.length; i++){
            const blockFusions = arrayFusions[i].sort((a, b)=>parseInt(a.c2.id)-parseInt(b.c2.id));
            while (parseInt(blockFusions[0].c1.id) !== controlID && parseInt(blockFusions[0].f.id) !== controlID) controlID++;
            for(let j=0; j<blockFusions.length; j++){
                var c1ID = parseInt(blockFusions[j].c1.id);
                var c2ID = parseInt(blockFusions[j].c2.id);
                if(c1ID === controlID && c1ID < c2ID){
                    const c1 = await this.getCard(blockFusions[j].c1.nombre);
                    const c2 = await this.getCard(blockFusions[j].c2.nombre);
                    const f = await this.getCard(blockFusions[j].f.nombre);
                    const fusionObj = { c1: c1._id, c2: c2._id, f: f._id };
                    const newFusion = new FusionModel(fusionObj);
                    await newFusion.save();
                }
            }
        }
        
    }

    async saveRituals() {
        const jsonRituals = fs.readFileSync('./data/rituals.json');
        const arrayRituals = JSON.parse(jsonRituals);
        for(let i=0; i<arrayRituals.length; i++){
            const ritual = arrayRituals[i];
            const cr = await this.getCard(ritual.Ri.Nombre);
            const c1 = await this.getCard(ritual.c1.Nombre);
            const c2 = await this.getCard(ritual.c2.Nombre);
            const c3 = await this.getCard(ritual.c3.Nombre);
            const cf = await this.getCard(ritual.Rf.Nombre);
            const ritualObj = { cr:cr._id, c1:c1._id, c2:c2._id, c3:c3._id, cf:cf._id };
            const newRitual = new RitualModel(ritualObj);
            await newRitual.save();
        }
    }

    async saveEquipments(){
        let card;
        let controlID = 0;
        const avoidPrimTypes=["Equip", "Magic", "Ritual", "Trap"];
        const jsonEquipments = fs.readFileSync('./data/equips.json');
        const arrayEquipments = JSON.parse(jsonEquipments);

        for(let i=1; i<arrayEquipments.length; i++){
            do{
                controlID++;
                card = await this.getCard(controlID);
            } while(avoidPrimTypes.includes(card.type.prim));
            const cardIDObj = card._id;
            for(let j=0; j<arrayEquipments[i].length; j++){
                const equipName = arrayEquipments[i][j].nombre;
                const equipIDObj = (await this.getCard(equipName))._id;
                const equipmentObj = { card: cardIDObj, equip: equipIDObj };
                const newEquipment = new EquipmentModel(equipmentObj);
                await newEquipment.save();
            }
        }    
    }
    
}

module.exports = new Tea();