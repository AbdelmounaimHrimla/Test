import React, { Component, Fragment } from 'react';
import './css/EditUser.css';
import { NavLink } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

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
class EditUser extends Component {
    state = {
        id:'',
        email : '',
        password : '',
        type_role : ''
    }
    render() {
        let {id} = this.props.match.params;
        id = parseInt(id);
        return (
            <Fragment>
            <div className="editUser">
                <div className="header-editUser">
                    <h1 className="title-editUser">Edit User</h1>
                    <NavLink to="/users" className="btn-back">Go Back</NavLink>
                </div>
                <Query query={ONE_USER_QUERY} variables={{id}}>
                    {
                        ({loading, error, data}) => {
                            if(loading){return <h1>Loading...</h1>}
                            if(error){return console.log(error)}
                            console.log(data)
                            const {
                                email,
                                password,
                                type_role
                            }= data.oneUser;
                            return(
                                <div className="content-editUser">
                                    <form>
                                        <div className="myGroup">
                                            <label htmlFor="email" className="myLabel">Email :</label>
                                            <input 
                                            type="email" 
                                            required="required" 
                                            placeholder="Email"
                                            id="email" 
                                            name="email" 
                                            className="myInput"
                                            value={email}
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
                                            value={password}
                                            />
                                        </div>
                                        <div className="myGroup">
                                            <label htmlFor="typeRole" className="myLabel">Type Rôle :</label>
                                            <select 
                                            name="typeRole" 
                                            id="typeRole" 
                                            className="myInput" 
                                            >
                                                <option>{type_role}</option>
                                            </select>
                                        </div>
                                        <div className="myGroup">
                                            <button type="submit" className="btn-edit">Edit User</button>
                                        </div>
                                    </form>
                                </div>
                            )
                        }
                    }
                </Query>     
            </div>
            </Fragment>
        );
    }
}

export default EditUser;