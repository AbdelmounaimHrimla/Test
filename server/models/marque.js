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

MarquesType = new GraphQLObjectType({
	name : "Marques",
	fields : () => ({
            id : {type : GraphQLID},
            libelle : {type : GraphQLString},
        })
});

module.exports.marquesType = {
    MarquesType = new GraphQLObjectType({
    name : "Marques",
    fields : () => ({
            id : {type : GraphQLID},
            libelle : {type : GraphQLString},
        })
    });
}