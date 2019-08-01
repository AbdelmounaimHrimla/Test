const connection = require('./connect.js');
const MarquesType = require('./marque');
const ModulesType = require('./modules');
const graphql = require('graphql');
const {

    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLInt,
    GraphQLFloat,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType

} = graphql;

VehiculesType = new GraphQLObjectType({
	name : "Vehicules",
	fields : () => ({
            id : {type : GraphQLID},
            matricule : {type : GraphQLString},
            marque : {
                type : MarquesType,
                resolve(parent, args){
                    return new Promise(
                        function(resolve, reject){
                            console.log("Type me : ", MarquesType);
                            var selectMarque = "SELECT * FROM vehicules INNER JOIN marques ON vehicules.marqueId = marques.id WHERE vehicules.id = " + parent.id;
                            connection.query(selectMarque, parent.id, function(error, result){
                                if(error){
                                    return reject(error);
                                } else{
                                    console.log("Marque",result);
                                    return resolve(result[0]);
                                }
                            }) 
                        }
                    )
                } 
            },
            module : {
                type : ModulesType,
                resolve(parent, args){
                    return new Promise(
                        function(resolve, reject){
                            var selectModule = "SELECT * FROM vehicules INNER JOIN modules ON vehicules.moduleId = modules.id WHERE vehicules.id = " + parent.id;
                            connection.query(selectModule, parent.id,function(error, result){
                                if(error){
                                    return reject(error);
                                } else{
                                    return resolve(result[0]);
                                }
                            }) 
                        }
                    )
                } 
            },
            kilometrage : {type : GraphQLFloat}
        })
})

module.exports.vehicules = {
    type : GraphQLList(VehiculesType),
    resolve(parent, args) {
        return new Promise(
            function(resolve, reject){
                var selectVehicules = "SELECT * FROM vehicules";
                connection.query(selectVehicules, function(error, result){
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

module.exports.vehicule = {
    type : GraphQLList(VehiculesType),
    args : {
        id : {type : GraphQLInt}
    },
    resolve(parent, args) {
        return new Promise(
            function(resolve, reject){
                var id = args.id;
                var selectVehicules = "SELECT * FROM vehicules where id = " + id;
                connection.query(selectVehicules, id, function(error, result){
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