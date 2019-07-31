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

ModulesType = new GraphQLObjectType({
	name : "Modules",
	fields : () => ({
			id : {type : GraphQLID},
			libelle : {type : GraphQLString},
			marque : {type : GraphQLObjectType /*Marque Object*/},
		})
});