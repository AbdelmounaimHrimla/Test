import React, { Component } from 'react';
import './css/Conducteur.css';
import { NavLink } from 'react-router-dom';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const CONDUCTEUR_QUERY = gql`
    query ConducteurQuery($id : Int!) {
        conducteur(id : $id){
                id
                nom
                prenom
                dateNais
                salaire
                dateEmbauche
                image
            }
    }
`;

class Conducteur extends Component {
    render() {
        let {id} = this.props.match.params;
        id = parseInt(id);
        return (
            <div className="conducteur">
                <div className="header-conducteur">
                    <h1 className="title-conducteur">Conducteur</h1>
                    <NavLink to="/conducteurs" className="btn-back">Go Back</NavLink>
                </div>
                <div className="content-conducteur">
                <Query query={CONDUCTEUR_QUERY} variables={{id}}>
                        {
                            ({loading, error, data}) => {
                                if(loading) return <h1>It's Loading...</h1>
                                if(error) console.log(error)
                                console.log("Conducteur", data);
                                const {
                                    nom,
                                    prenom,
                                    dateNais,
                                    salaire,
                                    dateEmbauche,
                                    image
                                } = data.conducteur;
                                return(
                                    <div className="card-vehicule">
                                        <table className="table-vehicule">
                                            <tbody>
                                                <tr className="myGroup">
                                                    <td className="label">Image :</td>
                                                    <td className="span"><img src={image}  alt={nom} title={nom + ' ' +prenom} /></td>
                                                </tr>
                                                <tr className="myGroup">
                                                    <td className="label">Nom :</td>
                                                    <td className="span">{nom}</td>
                                                </tr>
                                                <tr className="myGroup">
                                                    <td className="label">Prénom :</td>
                                                    <td className="span">{prenom}</td>
                                                </tr>
                                                <tr className="myGroup">
                                                    <td className="label">Date Naissance :</td>
                                                    <td className="span">{dateNais}</td>
                                                </tr>
                                                <tr className="myGroup">
                                                    <td className="label">Salaire :</td>
                                                    <td className="span">{salaire} DH</td>
                                                </tr>
                                                <tr className="myGroup">
                                                    <td className="label">Date d'embauche :</td>
                                                    <td className="span">{dateEmbauche}</td>
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

export default Conducteur;
