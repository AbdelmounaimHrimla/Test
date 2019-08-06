import React, { Component, Fragment } from 'react';
import './css/Conducteurs.css';
import { NavLink } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query} from 'react-apollo';


const CONDUCTEURS_QUERY = gql`
    query ConducteursQuery {
        conducteurs {
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
class Conducteurs extends Component {
    render() {
        return (
            <Fragment>
            <div className="conducteurs">
                <div className="header-conducteurs">
                    <h1 className="title-conducteurs">Conducteurs</h1>
                    <NavLink to="/addConducteur" className="btn-new">+ Nouveau Conducteur</NavLink>
                </div>
                <div className="content-conducteurs">
                    <table className="table-conducteurs">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nom</th>
                                <th>Prénom</th>
                                <th>Date Naissance</th>
                                <th>Salaire</th>
                                <th>Date d'embauche</th>
                                <th>Image</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <Query query={CONDUCTEURS_QUERY}>
                                {
                                    ({loading, error, data}) => {
                                        if(loading){ return <tr><td>Loading...</td></tr>}
                                        if(error) {return console.log(error)}
                                        return (
                                            data.conducteurs.map(conducteur => 
                                                <tr key={conducteur.id}>
                                                    <td>{conducteur.id}</td>
                                                    <td>{conducteur.nom}</td>
                                                    <td>{conducteur.prenom}</td>
                                                    <td>{conducteur.dateNais}</td>
                                                    <td>{conducteur.salaire} DH</td>
                                                    <td>{conducteur.dateEmbauche}</td>
                                                    <td><img src={conducteur.image} alt={conducteur.nom} title={conducteur.nom+' '+conducteur.prenom}/></td>
                                                    <td>
                                                        <NavLink to={`/conducteur/${conducteur.id}`} className="btn-show">Show</NavLink>
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

export default Conducteurs;