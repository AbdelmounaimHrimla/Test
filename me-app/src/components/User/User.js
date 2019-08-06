import React, { Component } from 'react';
import './css/User.css';
import { NavLink } from 'react-router-dom';

import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

const ONE_USER_QUERY = gql`
    query OneUserQuery($id : Int!) {
        oneUser(id : $id){
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

class User extends Component {
    render() {
        let {id} = this.props.match.params;
        id = parseInt(id);
        return (
            <div className="user">
                <div className="header-user">
                    <h1 className="title-user">User</h1>
                    <NavLink to="/users" className="btn-back">Go Back</NavLink>
                </div>
                <div className="content-user">
                <Query query={ONE_USER_QUERY} variables={{id}}>
                        {
                            ({loading, error, data}) => {
                                if(loading) return <h1>It's Loading...</h1>
                                if(error) console.log(error)
                                console.log("User", data);
                                const {
                                    email,
                                    password,
                                    type_role
                                } = data.oneUser;
                                return(
                                    <div className="card-user">
                                        <table className="table-user">
                                            <tbody>
                                                <tr className="myGroup">
                                                    <td className="label">Email :</td>
                                                    <td className="span">{email}</td>
                                                </tr>
                                                <tr className="myGroup">
                                                    <td className="label">Pasword :</td>
                                                    <td className="span">{password}</td>
                                                </tr>
                                                <tr className="myGroup">
                                                    <td className="label">Type Rôle :</td>
                                                    <td className="span">{type_role}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <Mutation mutation={DELETE_USER}>
                                            {
                                                (deleteUser, {loading, error}) => (
                                                    <NavLink to="/users">
                                                    <button 
                                                    className="btn-delete"
                                                    onClick={
                                                        event =>  {
                                                            deleteUser({
                                                                variables: {
                                                                    id:id
                                                                }
                                                            })
                                                        }
                                                    }
                                                    >Delete</button></NavLink>
                                                    
                                                )
                                            }
                                        </Mutation>
                                    </div>
                                );
                            }
                        }

                    </Query>
                </div>
            </div>
        )
    }
}

export default User;
