const axios = require('axios');
const fs = require('fs');

class CardImg {
    constructor(){
        const self = this;
    }
    
    async getImages(){
        try{
            for(let i=1; i<723; i++){
                const image = await axios({
                    method: 'get',
                    url: `https://www.basededatostea.xyz/img/original/${i}.jpg`,
                    responseType: 'stream'
                });
                image.data.pipe(fs.createWriteStream(`./public/img/${i}.jpg`));
            }
        } catch(e) {
            throw new Error(e);
        }
    }
}

module.exports = new CardImg();