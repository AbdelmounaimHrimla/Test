const connection = require('./connect.js');
const graphql = require('graphql');
const graphqlIsoDate = require('graphql-iso-date');
const {
         GraphQLID,
         GraphQLString,
         GraphQLSchema,
         GraphQLInt,
         GraphQLList,
         GraphQLNonNull,
         GraphQLObjectType,
         GraphQLFloat

} = graphql;

const {GraphQLDate, GraphQLTime, GraphQLDateTime} = graphqlIsoDate;

const ConducteursType = new GraphQLObjectType({
   name : "Conducteurs",
   fields : () => ({
           id : {type : GraphQLID},      
           nom : {type : GraphQLString},      
           prenom : {type : GraphQLString},      
           dateNais : {type : GraphQLDate},      
           salaire : {type : GraphQLFloat},      
           dateEmbauche : {type : GraphQLDate},
           image : {type : GraphQLString}      
       })
});

module.exports.conducteurs = {
    type : GraphQLList(ConducteursType),
     resolve(parent, args) {
         return new Promise(
             function(resolve, reject){
                 var selectAllConducteurs = "SELECT * FROM conducteurs";
                 connection.query(selectAllConducteurs, function(error, result){
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


 module.exports.conducteur = {
    type : ConducteursType,
    args : {
        id : {type : GraphQLInt}
    },
     resolve(parent, args) {
         return new Promise(
             function(resolve, reject){
                 var id =  args.id;
                 var selectAllConducteur = "SELECT * FROM conducteurs WHERE id = " +id;
                 connection.query(selectAllConducteur, id, function(error, result){
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

 module.exports.addConducteur = {
    type : ConducteursType,
    args : {
        nom : {type : GraphQLString},      
        prenom : {type : GraphQLString},      
        dateNais : {type : GraphQLDate},      
        salaire : {type : GraphQLFloat},      
        dateEmbauche : {type : GraphQLDate},
        image : {type : GraphQLString}      
    },
    resolve(parent, args) {
        var myValues = {
            nom : args.nom,
            prenom : args.prenom,
            dateNais : args.dateNais,
            salaire : args.salaire,
            dateEmbauche : args.dateEmbauche,
            image : args.image
        }
        return new Promise(
            function(resolve, reject){
                var addConducteurQuery = "INSERT INTO conducteurs SET ?";
                connection.query(addConducteurQuery, myValues, function(error, result){
                    if(error) {
                        return reject(error);
                    } else {
                        return resolve(result);
                    }
                });
            }   
        )
    }
}

module.exports.deleteConducteur = {
    type : ConducteursType,
    args : {
        id : {type : GraphQLInt}     
    },
    resolve(parent, args) {
        return new Promise(
            function(resolve, reject){
                var id  = args.id;
                var deleteConducteurQuery = "DELETE FROM conducteurs WHERE id = "+id;
                connection.query(deleteConducteurQuery, id, function(error, result){
                    if(error) {
                        return reject(error);
                    } else {
                        return resolve(result);
                    }
                });
            }   
        )
    }
}

module.exports.updateConducteur = {
    type : ConducteursType,
    args : {
        id : {type : new GraphQLNonNull(GraphQLInt)},
        nom : {type : new GraphQLNonNull(GraphQLString)},      
        prenom : {type : new GraphQLNonNull(GraphQLString)},      
        dateNais : {type : new GraphQLNonNull(GraphQLDate)},      
        salaire : {type : new GraphQLNonNull(GraphQLFloat)},      
        dateEmbauche : {type : new GraphQLNonNull(GraphQLDate)},
        image : {type : new GraphQLNonNull(GraphQLString)}
    },
    resolve(parent, args) {
        var id  = args.id;
        var nom  = args.nom;
        var prenom  = args.prenom;
        var dateNais  = args.dateNais;
        var salaire  = args.salaire;
        var dateEmbauche  = args.dateEmbauche;
        var image  = args.image;
        return new Promise(
            function(resolve, reject){
                connection.query(
                "UPDATE conducteurs SET nom = ?, prenom = ?, dateNais = ?, salaire = ?, dateEmbauche = ?, image=? WHERE id = ?", 
                [nom, prenom, dateNais, salaire, dateEmbauche, image, id], 
                function(error, result){
                    if(error) {
                        return reject(error);
                    } else {
                        return resolve(result);
                    }
                });
            }   
        )
    }
}

