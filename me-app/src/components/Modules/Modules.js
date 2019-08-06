import React, { Component, Fragment } from 'react';
import './css/Modules.css';
import { NavLink } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query} from 'react-apollo';

const MODULES_QUERY = gql`
    query ModulesQuery {
        modules {
            id
           libelle
           marque{
               id
               libelle
           }
        }
    }
`;
class Modules extends Component {
    render() {
        return (
            <Fragment>
            <div className="modules">
                <div className="header-modules">
                    <h1 className="title-modules">Modules</h1>
                    <NavLink to="modules" className="btn-new">+ Nouveau Module</NavLink>
                </div>
                <div className="content-modules">
                    <table className="table-modules">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Libelle</th>
                                <th>Marque</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <Query query={MODULES_QUERY}>
                                {
                                    ({loading, error, data}) =>{
                                        if(loading){return <tr><td>Loading...</td></tr>}
                                        if(error) {return console.log(error)}
                                        console.log(data)
                                        return (
                                            data.modules.map(modules =>
                                                <tr key={modules.id}>
                                                    <td>{modules.id}</td>
                                                    <td>{modules.libelle}</td>
                                                    <td>{modules.marque.libelle}</td>
                                                    <td>
                                                        <NavLink to="/module" className="btn-show">Show</NavLink>
                                                        <NavLink to="/module" className="btn-edit">Edit</NavLink>
                                                        <NavLink to="/delete" className="btn-delete">Delete</NavLink>
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

export default Modules;