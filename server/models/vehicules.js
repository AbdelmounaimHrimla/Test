const connection = require('./connect.js');
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
            marqueId : {type : GraphQLInt /*Object Marque*/},
            moduleId : {type : GraphQLInt /*Object Modules*/},
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