import React, { Component, Fragment } from 'react';
import './css/Users.css';
import { NavLink } from 'react-router-dom';

import gql from 'graphql-tag';
import { Query, Mutation} from 'react-apollo';

const USERS_QUERY = gql`
    query UsersQuery {
        users{
            id
            email
            password
            type_role
        }
    }
`;

const DELETE_USER = gql`
    mutation DeleteUser($id: Int!){
        deleteUser(id: $id){
            id
            email
            password
            type_role
        }
    }
`;
class Users extends Component {
    render() {
        return (
            <Fragment>
            <div className="users">
                <div className="header-users">
                    <h1 className="title-users">Users</h1>
                    <NavLink to="/addUser" className="btn-new">+ Nouveau Utilisateur</NavLink>
                </div>
                <div className="content-users">
                    <table className="table-users">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Type Rôle</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <Query query={USERS_QUERY}>
                                {
                                    ({loading, error, data}) => {
                                        if(loading) {return <tr><td>Loading</td></tr>}
                                        if(error) {return console.log(error)}
                                        return (
                                            data.users.map(user => 
                                                <tr key={user.id}>
                                                    <td>{user.id}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.password}</td>
                                                    <td>{user.type_role}</td>
                                                    <td>
                                                        <NavLink to={`/user/${user.id}`} className="btn-show">Show</NavLink>
                                                        <NavLink to={`/editUser/${user.id}`} className="btn-edit">Edit</NavLink>
                                                        <Mutation mutation={DELETE_USER}>
                                                        {
                                                                (deleteUser, {loading, error}) => {
                                                                    return (
                                                                        <button 
                                                                        className="btn-delete" 
                                                                        onClick={
                                                                            event => {
                                                                                deleteUser({
                                                                                    variables : {
                                                                                        id : parseInt(user.id)
                                                                                    }
                                                                                })
                                                                            }
                                                                        }
                                                                        >Delete</button>
                                                                    )
                                                                }
                                                            }
                                                        </Mutation>
                                                    </td>
                                                </tr>
                                            )
                                        )
                                    }
                                }
                            </Query>
                        </tbody>
                    </table>
                </div>         
            </div>
            </Fragment>
        );
    }
}

export default Users;