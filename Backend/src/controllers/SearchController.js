const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

// Buscar todos os devs no raio de 30km & Filtrar por tecnologias
module.exports = {
    async index(req, res){
       const { latitude, longitude, techs } = req.query;
       const techsArray = parseStringAsArray(techs);

       const devs = await Dev.find({
           techs: {
               $in: techsArray,
           },
           location: {
               $near:{
                   $geometry:{
                       type: 'Point',
                       coordinates: [longitude, latitude],
                   },
                   $maxDistance: 30000,
               },
           },
       });
       
       return res.json({ devs });
    }
}
