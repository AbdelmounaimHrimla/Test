const connection = require('./connect.js');
const graphql = require('graphql');
const graphqlIsoDate = require('graphql-iso-date');
const {GraphQLDate, GraphQLTime, GraphQLDateTime} = graphqlIsoDate;
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


const DemandeMissionType = new GraphQLObjectType({
	name : "DemandeMission",
	fields : () => ({
       //chi fields hena
    })
});