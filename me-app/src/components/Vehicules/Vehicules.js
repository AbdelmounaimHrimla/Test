import React, { Component, Fragment } from 'react';
import './css/Vehicules.css';
import { NavLink } from 'react-router-dom';

import gql from 'graphql-tag';
import { Query} from 'react-apollo';

const VEHICULES_QUERY = gql`
    query VehiculesQuery {
        vehicules{
                id
                matricule
                marque{
                    id
                    libelle
                }
                module{
                    id
                    libelle
                }
                etatVehicule{
                    id
                    libelle
                }
                kilometrage
            }
        }
`;
class Vehicules extends Component {
    render() {
        return (
            <Fragment>
            <div className="vehicules">
                <div className="header-vehicules">
                    <h1 className="title-vehicules">Véhicules</h1>
                    <NavLink to="/addVehicule" className="btn-new">+ Nouveau Véhicule</NavLink>
                </div>
                <div className="content-vehicules">
                    <table className="table-vehicules">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Matricule</th>
                                <th>Marque</th>
                                <th>Module</th>
                                <th>Etat</th>
                                <th>Kilométrage</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <Query query={VEHICULES_QUERY}>
                                {
                                    ({loading, error, data}) => {
                                        if(loading){return <tr><td>Loading...</td></tr>}
                                        if(error) {return console.log(error)}
                                        console.log(data);
                                        return (
                                            data.vehicules.map(vehicule=>
                                                <tr key={vehicule.id}>
                                                    <td>{vehicule.id}</td>
                                                    <td>{vehicule.matricule}</td>
                                                    <td>{vehicule.marque.libelle}</td>
                                                    <td>{vehicule.module.libelle}</td>
                                                    <td>{vehicule.etatVehicule.libelle}</td>
                                                    <td>{vehicule.kilometrage} km</td>
                                                    <td>
                                                        <NavLink to={`/vehicule/${vehicule.id}`} className="btn-show">Show</NavLink>
                                                        <NavLink to="/vehicule" className="btn-edit">Edit</NavLink>
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

export default Vehicules;