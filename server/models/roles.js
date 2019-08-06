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

const RolesType = new GraphQLObjectType({
   name : "Roles",
   fields : () => ({
           id : {type : GraphQLID},
           libelle : {type : GraphQLString}      
       })
});

module.exports = RolesType;


module.exports.roles = {
   type : GraphQLList(RolesType),
    resolve(parent, args) {
        return new Promise(
            function(resolve, reject){
                var selectAllRoles = "SELECT * FROM roles";
                connection.query(selectAllRoles, function(error, result){
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