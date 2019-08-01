const connection = require('./connect.js');
const MarquesType = require('./marque');
const graphql = require('graphql');
const {

    GraphQLID, 
    GraphQLString,
    GraphQLSchema,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    
} = graphql;



const ModulesType = new GraphQLObjectType({
	name : "Modules",
	fields : () => ({
			id : {type : GraphQLID},
            libelle : {type : GraphQLString},
            marque : {
                type : MarquesType,
                resolve(parent, args) {
                    return new Promise(
                        function(resolve, reject){
                            console.log(parent.id);
                            console.log(MarquesType);
                            var selectMarque = "SELECT * FROM modules INNER JOIN marques ON modules.marqueId = marques.id WHERE modules.id = " +parent.id;
                            ;
                            connection.query(selectMarque, parent.id, function(error, result){
                                if(error) {
                                    return reject(error);
                                } else {
                                    console.log(result[0]);
                                    console.log(result);
                                    return resolve(result[0]);
                                }
                            });       
                        }
                    )
                }
            },
		})
});
module.exports = ModulesType;


 module.exports.module = {
    type : ModulesType,
     args : {
         id : {type : GraphQLInt}
     },
     resolve(parent, args) {
         return new Promise(
             function(resolve, reject){
                var id = args.id;
                 var selectModule = "SELECT * FROM modules WHERE id = " +id;
                 connection.query(selectModule, id, function(error, result){
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

 module.exports.modules = {
    type : GraphQLList(ModulesType),
     resolve(parent, args) {
         return new Promise(
             function(resolve, reject){
                 var selectAllModule = "SELECT * FROM modules";
                 connection.query(selectAllModule, function(error, result){
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