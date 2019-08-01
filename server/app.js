const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLSchema } = graphql;
const vehicules = require('./models/vehicules');
const modules = require('./models/modules');
const marques = require('./models/marque');
const RootQuery = new GraphQLObjectType({
    name : 'RootQuery',
    fields : {
        vehicules : vehicules.vehicules,
        vehicule : vehicules.vehicule,
        module : modules.module,
        modules : modules.modules,
        marque : marques.marque,
        marques : marques.marques
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