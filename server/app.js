const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLInt, GraphQLSchema } = graphql;
const vehicules = require('./models/vehicules');
const RootQuery = new GraphQLObjectType({
    name : 'RootQuery',
    fields : {
    	vehicules : vehicules.vehicules
    }
});


/*const mutation = new GraphQLObjectType({
    name : 'Mutation',
    fields : {

    }
});*/

app.use('/mygraphiql', graphqlHTTP ({
    graphiql : true,
    schema : new GraphQLSchema({
        query : RootQuery,
       // mutation
    })
}));

const port = 8000;
app.listen(port, () =>  
    {
        console.log(`Now You Can See  Us On http://localhost:${port}/mygraphiql` ),
        console.log(`---------------------------` )
    }   
);