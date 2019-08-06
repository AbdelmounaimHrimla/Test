import React, { Component, Fragment } from 'react';
import './css/EtatVehicule.css';
import { NavLink } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query} from 'react-apollo';

const ETAT_VEHICULES_QUERY = gql`
    query EtatVehiculesQuery {
        etatVehicules {
            id
           libelle
        }
    }
`;

class EtatVehicule extends Component {
    render() {
        return (
            <Fragment>
            <div className="etatVehicule">
                <div className="header-etatVehicule">
                    <h1 className="title-etatVehicule">Etat Véhicule</h1>
                    <NavLink to="etatVehicule" className="btn-new">+ Nouveau Etat Véhicule</NavLink>
                </div>
                <div className="content-etatVehicule">
                    <table className="table-etatVehicule">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Libelle</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <Query query={ETAT_VEHICULES_QUERY}>
                                {
                                    ({loading, error, data}) => {
                                        if(loading){return <tr><td>Loading...</td></tr>}
                                        if(error) {return console.log(error)}
                                        return (
                                            data.etatVehicules.map(etatVehicule => 
                                                <tr key={etatVehicule.id}>
                                                    <td>{etatVehicule.id}</td>
                                                    <td>{etatVehicule.libelle}</td>
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

export default EtatVehicule;