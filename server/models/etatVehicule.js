const connection = require('./connect.js');
const graphql = require('graphql');
const {

GraphQLID,
         GraphQLString,
         GraphQLSchema,
         GraphQLInt,
         GraphQLList,
         GraphQLNonNull,
         GraphQLObjectType

} = graphql;

const EtatVehiculeType = new GraphQLObjectType({
   name : "EtatVehicule",
   fields : () => ({
           id : {type : GraphQLID},
           libelle : {type : GraphQLString},
       })
});

module.exports = EtatVehiculeType;

module.exports.etatVehicules = {
    type : GraphQLList(EtatVehiculeType),
     resolve(parent, args) {
         return new Promise(
             function(resolve, reject){
                 var selectAllEtatVehicule = "SELECT * FROM etatvehicule";
                 connection.query(selectAllEtatVehicule, function(error, result){
                     if(error) {
                        return reject(error);
                     } else {
                         console.log(result);
                         return resolve(result);
                     }
                 });
             }   
         )
     }
 }