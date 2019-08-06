const connection = require('./connect.js');
const MarquesType = require('./marque');
const ModulesType = require('./modules');
const EtatVehicule = require('./etatVehicule');
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
            etatVehicule : {
                type : EtatVehicule,
                resolve(parent, args){
                    return new Promise(
                        function(resolve, reject){
                            var selectEtatVehicule = "SELECT * FROM vehicules INNER JOIN etatvehicule ON vehicules.etatvehiculeId = etatvehicule.id WHERE vehicules.id = " + parent.id;
                            connection.query(selectEtatVehicule, parent.id, function(error, result){
                                if(error){
                                    return reject(error);
                                } else {
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
    // args : {
    //     first : {type : GraphQLInt},
    //     offset : {type : GraphQLInt}
    // },
    resolve(parent, args) {
        return new Promise(
            function(resolve, reject){
                // var first = args.first;
                // var offset = args.offset;
                var selectVehicules = "SELECT * FROM vehicules"; //LIMIT ? OFFSET ?, first, offset, [first, offset]
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
    type : VehiculesType,
    args : {
        id : {type : GraphQLInt}
    },
    resolve(parent, args) {
        return new Promise(
            function(resolve, reject){
                var id = args.id;
                var selectVehicule = "SELECT * FROM vehicules where id = " + id;
                connection.query(selectVehicule, id, function(error, result){
                    if(error) {
                        return reject(error);
                    } else {
                        console.log(result);
                        return resolve(result[0]);
                    }
                });
            }   
        )
    }
}