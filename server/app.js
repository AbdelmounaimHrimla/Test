const express = require('express');
const cors = require('cors');

const app = express();
const graphqlHTTP = require('express-graphql');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLSchema } = graphql;
const vehicules = require('./models/vehicules');
const modules = require('./models/modules');
const marques = require('./models/marque');
const roles = require('./models/roles');
const users = require('./models/users');
const etatVehicules = require('./models/etatVehicule');
const conducteurs = require('./models/conducteurs');
const RootQuery = new GraphQLObjectType({
    name : 'RootQuery',
    fields : {
        vehicules : vehicules.vehicules,
        vehicule : vehicules.vehicule,
        module : modules.module,
        modules : modules.modules,
        oneModule : modules.oneModule,
        marque : marques.marque,
        marques : marques.marques,
        users : users.users,
        user : users.user,
        oneUser : users.oneUser,
        conducteurs : conducteurs.conducteurs,
        conducteur : conducteurs.conducteur,
        etatVehicules : etatVehicules.etatVehicules,
        roles : roles.roles

    }
});


const mutation = new GraphQLObjectType({
    name : 'Mutation',
    fields : {
        addUser : users.addUser,
        addConducteur : conducteurs.addConducteur,
        deleteConducteur : conducteurs.deleteConducteur,
        updateConducteur: conducteurs.updateConducteur,
        deleteUser : users.deleteUser
    }
});

app.use(cors());
app.options('*', cors());

app.use('/mygraphiql', graphqlHTTP ({
    graphiql : true,
    schema : new GraphQLSchema({
        query : RootQuery,
       mutation
    })
}));


const port = 8000;
app.listen(port, () =>  
    {
        console.log(`Now You Can See  Us On http://localhost:${port}/mygraphiql` ),
        console.log(`---------------------------` )
    }   
);