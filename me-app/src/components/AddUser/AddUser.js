import React, { Component, Fragment } from 'react';
import './css/AddUser.css';
import { NavLink } from 'react-router-dom';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';

const ADD_USER = gql`
    mutation AddUser($email: String!, $password: String!,  $type_role: Int!){
        addUser(email:$email, password:$password, type_role: $type_role){
            id
            email
            password
            type_role
        }
    }
`;

const ROLES_QUERY = gql`
    query RolesQuery {
        roles{
            id
            libelle
        }
    }
`;
class AddUser extends Component {
    state = {
        email : '',
        password : '',
        type_role : ''
    }
    render() {
        return (
            <Fragment>
            <div className="addUser">
                <div className="header-addUser">
                    <h1 className="title-addUser">Add User</h1>
                    <NavLink to="/users" className="btn-back">Go Back</NavLink>
                </div>
                <Mutation mutation={ADD_USER}>
                    {
                        (addUser, {data}) => (
                            <div className="content-addUser">
                            <form
                            onSubmit={
                                (event) => {
                                    event.preventDefault();
                                    addUser({
                                        variables : {
                                            email : this.state.email,
                                            password : this.state.password,
                                            type_role : parseInt(this.state.type_role)
                                        }
                                    })
                                }
                            }
                            >
                                <div className="myGroup">
                                    <label htmlFor="email" className="myLabel">Email :</label>
                                    <input 
                                    type="email" 
                                    required="required" 
                                    placeholder="Email"
                                    id="email" 
                                    name="email" 
                                    className="myInput" 
                                    value = {this.state.email}
                                    onChange={
                                        event => this.setState({email : event.target.value})
                                    }
                                    />
                                </div>
                                <div className="myGroup">
                                    <label htmlFor="password" className="myLabel">Password :</label>
                                    <input 
                                    type="password" 
                                    required="required" 
                                    placeholder="Password"
                                    id="password" 
                                    name="password" 
                                    className="myInput" 
                                    value={this.state.password} 
                                    onChange={
                                        event => this.setState({password : event.target.value})
                                    }

                                    />
                                </div>
                                <div className="myGroup">
                                    <label htmlFor="typeRole" className="myLabel">Type Rôle :</label>
                                    <select 
                                    name="typeRole" 
                                    id="typeRole" 
                                    className="myInput" 
                                    value={this.state.type_role} 
                                    onChange={
                                        event => this.setState({type_role : event.target.value})
                                    }
                                    >
                                        <Query query={ROLES_QUERY}>
                                            {
                                                ({loading, error, data}) => {
                                                    if(loading) {return <option>Loading...</option>}
                                                    if(error){return console.log(error)}
                                                    console.log(data);
                                                    return (
                                                        data.roles.map(role => 
                                                            <option value={role.id} key={role.id}>{role.libelle}</option>
                                                        )
                                                    )
                                                }
                                            }
                                        </Query>
                                    </select>
                                </div>
                                <div className="myGroup">
                                    <button type="submit" className="btn-add">Add User</button>
                                </div>
                            </form>
                        </div>
                        )
                    }
                </Mutation>        
            </div>
            </Fragment>
        );
    }
}

export default AddUser;