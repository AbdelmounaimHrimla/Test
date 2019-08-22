import React, { Component } from 'react';
import './css/Vehicule.css';
import { NavLink } from 'react-router-dom';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const VEHICULE_QUERY = gql`
    query VehiculeQuery($id : Int!) {
        vehicule(id: $id) {
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

class Vehicule extends Component {

    render() {
        let {id} = this.props.match.params;
        id = parseInt(id);
        return (
            <div className="vehicule">
                <div className="header-vehicule">
                    <h1 className="title-vehicule">Véhicule</h1>
                    <NavLink to="/vehicules" className="btn-back">Go Back</NavLink>
                </div>
                <div className="content-vehicule">
                <Query query={VEHICULE_QUERY} variables={{id}}>
                        {
                            ({loading, error, data}) => {
                                if(loading) return <h1>It's Loading...</h1>
                                if(error) console.log(error)
                                console.log("Vehicule", data);
                                const {
                                    matricule,
                                    marque,
                                    module,
                                    etatVehicule,
                                    kilometrage
                                } = data.vehicule;
                                return(
                                    <div className="card-vehicule">
                                        <table className="table-vehicule">
                                            <tbody>
                                                <tr className="myGroup">
                                                    <td className="label">Matricule :</td>
                                                    <td className="span">{matricule}</td>
                                                </tr>
                                                <tr className="myGroup">
                                                    <td className="label">Marque :</td>
                                                    <td className="span">{marque.libelle}</td>
                                                </tr>
                                                <tr className="myGroup">
                                                    <td className="label">Module :</td>
                                                    <td className="span">{module.libelle}</td>
                                                </tr>
                                                <tr className="myGroup">
                                                    <td className="label">Etat Véhicule :</td>
                                                    <td className="span">{etatVehicule.libelle}</td>
                                                </tr>
                                                <tr className="myGroup">
                                                    <td className="label">Kilométrage :</td>
                                                    <td className="span">{kilometrage} km</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <NavLink to="/vehicules"><button type="submit" className="btn-delete">Delete</button></NavLink>
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

export default Vehicule;
