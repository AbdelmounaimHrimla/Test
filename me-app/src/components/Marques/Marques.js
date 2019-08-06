import React, { Component, Fragment } from 'react';
import './css/Marques.css';
import { NavLink } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query} from 'react-apollo';

const MARQUES_QUERY = gql`
    query MarquesQuery {
        marques {
            id
           libelle
           module {
               id
               libelle
           }
        }
    }
`;
class Marques extends Component {
    render() {
        return (
            <Fragment>
            <div className="marques">
                <div className="header-marques">
                    <h1 className="title-marques">Marques</h1>
                    <NavLink to="marques" className="btn-new">+ Nouveau Marque</NavLink>
                </div>
                <div className="content-marques">
                    <table className="table-marques">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Libelle</th>
                                <th>Modules</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <Query query={MARQUES_QUERY}>
                                {
                                    ({loading, error, data}) => {
                                        if(loading) {return <tr><td>Loading....</td></tr>}
                                        if(error){return console.log(error)}
                                        console.log(data);
                                        return (
                                            data.marques.map(marque => 
                                                <tr key={marque.id}>
                                                    <td>{marque.id}</td>
                                                    <td>{marque.libelle}</td>
                                                    <td>
                                                        {marque.module.map(item => 
                                                           ' - ' + item.libelle
                                                        )}
                                                    </td>
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

export default Marques;