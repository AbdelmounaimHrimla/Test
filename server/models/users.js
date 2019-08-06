const connection = require('./connect.js');
const graphql = require('graphql');
const jwt = require('jsonwebtoken');
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


const UsersType = new GraphQLObjectType({
	name : "Users",
	fields : () => ({
        id : {type : GraphQLID},
        email : {type : GraphQLString},
        password : {type : GraphQLString},
        type_role : {type : GraphQLInt}
    })
});

module.exports.users = {
    type : GraphQLList(UsersType),
    // args : {
    //     first : {type : GraphQLInt},
    //     offset : {type : GraphQLInt}
    // },
    resolve(parent, args) {
        return new Promise(
            function(resolve, reject){
                // var first = args.first;
                // var offset = args.offset;
                 var selectUsers = "SELECT * FROM users"; //LIMIT ? OFFSET ?", first, offset[first, offset], 
                connection.query(selectUsers, function(error, result){
                    if(error){
                        return reject(error);
                    } else {
                        return resolve(result);           
                    }
                })
            }
        )
    }
}



module.exports.user = {
    type : UsersType,
    args : {
        email : {type : GraphQLString},
        password : {type : GraphQLString},
        type_role : {type : GraphQLInt}
    },
    resolve(parent, args){
        return new Promise(
            function(resolve, reject){
                var email = args.email;
                var password = args.password;
                var selectUser = "SELECT * FROM users WHERE email = ? AND password = sha1(?)", email, password;
                connection.query(selectUser, [email, password], function(error, result){
                    
                    if(error){
                        return reject(error);
                    } else if(result[0].type_role == 1){
                        console.log('Admin');
                        return resolve(result[0]);
                    }else {
                        console.log("Not Admin");
                        return resolve(result[0]);
                    }
                })
            }
        )
    }
}

module.exports.oneUser = {
    type : UsersType,
    args : {
        id : {type : GraphQLInt}
    },
    resolve(parent, args){
        return new Promise(
            function(resolve, reject){
                var id = args.id;
                var selectOneUser = "SELECT * FROM users WHERE id = "+id;
                connection.query(selectOneUser, id, function(error, result){
                    
                    if(error){
                        return reject(error);
                    } else {
                        
                        return resolve(result[0]);
                    }
                })
            }
        )
    }
}

module.exports.addUser = {
    type : UsersType,
    args : {
        email : {type : GraphQLString},
        password : {type : GraphQLString},
        type_role : {type : GraphQLInt}
    },
    resolve(parent, args) {
        return new Promise(
            function(resolve, reject){
                var   email = args.email;
                var   password = args.password;
                var  type_role = args.type_role;
                var addUserQuery = "INSERT INTO users VALUES (id, ?, sha1(?), ?)", email, password, type_role;
                connection.query(addUserQuery, [email, password, type_role], function(error, result){
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

module.exports.deleteUser = {
    type : UsersType,
    args : {
        id : {type : GraphQLInt}
    },
    resolve(parent, args) {
        return new Promise(
            function(resolve, reject){
                var   id = args.id
                var deleteUserQuery = "DELETE FROM users WHERE id = " +id;
                connection.query(deleteUserQuery, id, function(error, result){
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

