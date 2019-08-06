import React, { Component, Fragment } from 'react';
import './css/AddVehicule.css';
import { NavLink } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const MARQUES_QUERY = gql`
    query MarquesQuery{
        marques{
            id
            libelle
        }
    }
`;

class AddVehicule extends Component {
    render() {
        return (
            <Fragment>
            <div className="addVehicule">
                <div className="header-addVehicule">
                    <h1 className="title-addVehicule">Add Véhicule</h1>
                    <NavLink to="/vehicules" className="btn-back">Go Back</NavLink>
                </div>
                <div className="content-addVehicule">
                    <form>
                        <div className="myGroup">
                            <label htmlFor="matricule" className="myLabel">Matrticule :</label>
                            <input type="text" id="matricule" name="matricule" className="myInput" />
                        </div>
                        <div className="myGroup">
                            <label htmlFor="marque" className="myLabel">Marque :</label>
                                <select className="myInput" id="marque" name="marque">
                                    <Query query={MARQUES_QUERY}>
                                        {
                                            ({loading, error, data}) => {
                                                if(loading){return console.log('Loading')}
                                                if(error){return console.log(error)}
                                                return (
                                                    data.marques.map(marque =>
                                                        <option key={marque.id}>{marque.libelle}</option>    
                                                    )
                                                )
                                            }
                                        }
                                    </Query>
                                </select>   
                        </div>
                        <div className="myGroup">
                            <label htmlFor="module" className="myLabel">Module :</label>
                            <select className="myInput" id="module" name="module">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                        </div>
                        <div className="myGroup">
                            <label htmlFor="etatVehicule" className="myLabel">Etat Véhicule :</label>
                            <select className="myInput" id="etatVehicule" name="etatVehicule">
                                <option>Disponible</option>
                                <option>En Mission</option>
                            </select>
                        </div>
                        <div className="myGroup">
                            <label htmlFor="kilometrage" className="myLabel">Kilométrage :</label>
                            <input type="text" id="kilometrage" name="kilometrage" className="myInput" />
                        </div>
                        <div className="myGroup">
                            <NavLink to="/vehicules" ><button type="submit" className="btn-add">Add Véhicule</button></NavLink>
                        </div>
                    </form>
                </div>         
            </div>
            </Fragment>
        );
    }
}

export default AddVehicule;