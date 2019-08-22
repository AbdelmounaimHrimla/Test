 const connection = require('./connect.js');
 const graphql = require('graphql');
 const modules = require('./modules');
const {

GraphQLID,
          GraphQLString,
          GraphQLSchema,
          GraphQLInt,
          GraphQLList,
          GraphQLNonNull,
          GraphQLObjectType

 } = graphql;

 const MarquesType = new GraphQLObjectType({
	name : "Marques",
	fields : () => ({
            id : {type : GraphQLID},
            libelle : {type : GraphQLString},
            module : {
                type : modules.modulesType,
                resolve(parent, args){
                    return new Promise(
                        function(resolve, reject){
                            var selectModules = "SELECT * FROM  marques INNER JOIN modules ON marques.id = modules.marqueId WHERE marques.id = "+parent.id;
                            connection.query(selectModules, parent.id, function(error, result){
                                if(error){
                                    return reject(error);
                                } else {
                                    return resolve(result);
                                }
                            })
                        }
                    )
                }
            }      
        })
});

module.exports = MarquesType;


module.exports.marque = {
    type : MarquesType,
     args : {
         id : {type : GraphQLInt}
     },
     resolve(parent, args) {
         return new Promise(
             function(resolve, reject){
                var id = args.id;
                 var selectMarque = "SELECT * FROM marques WHERE id = " +id;
                 connection.query(selectMarque, id, function(error, result){
                     if(error) {
                        return reject(error);
                     } else {
                         console.log(result[0]);
                         return resolve(result[0]);
                     }
                 });
             }   
         )
     }
 }

 module.exports.marques = {
    type : GraphQLList(MarquesType),
     resolve(parent, args) {
         return new Promise(
             function(resolve, reject){
                 var selectAllMarque = "SELECT * FROM marques";
                 connection.query(selectAllMarque, function(error, result){
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