import React, { Component, Fragment } from 'react';
import './css/AddConducteur.css';
import { NavLink } from 'react-router-dom';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const ADD_CONDUCTEUR = gql`
mutation AddConducteur($nom: String!, $prenom: String!, $dateNais: Date!, $salaire: Float!, $dateEmbauche: Date!, $image: String!) {
    addConducteur(     nom: $nom, prenom: $prenom, dateNais: $dateNais, salaire : $salaire, dateEmbauche: $dateEmbauche, image: $image) {
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


class AddConducteur extends Component {
    state = {
        nom : '',
        prenom : '',
        dateNais : '',
        salaire : '',
        dateEmbauche : '',
        image  : ''
    }
    render() {
        return (
            <Fragment>
            <div className="addConducteur">
                <div className="header-addConducteur">
                    <h1 className="title-addConducteur">Add Conducteur</h1>
                    <NavLink to="/conducteur" className="btn-back">Go Back</NavLink>
                </div>
                <Mutation mutation={ADD_CONDUCTEUR}>
                    {
                        (addConducteur, {data}) => (
                            <div className="content-addConducteur">
                                <form
                                    onSubmit={
                                        (event) => {
                                            event.preventDefault();
                                            addConducteur({
                                                variables : {
                                                    nom : this.state.nom,
                                                    prenom : this.state.prenom,
                                                    dateNais : this.state.dateNais,
                                                    salaire : parseFloat(this.state.salaire),
                                                    dateEmbauche : this.state.dateEmbauche,
                                                    image  : this.state.image
                                                }
                                            })
                                        }
                                    }
                                >
                                    <div className="myGroup">
                                        <label htmlFor="nom" className="myLabel">Nom :</label>
                                        <input 
                                        type="text" 
                                        id="nom" 
                                        name="nom" 
                                        className="myInput" 
                                        value={this.state.nom} 
                                        onChange={
                                            event => this.setState({nom : event.target.value})
                                        }
                                        />
                                    </div>
                                    <div className="myGroup">
                                        <label htmlFor="prenom" className="myLabel">Prénom :</label>
                                        <input 
                                        type="text" 
                                        id="prenom" 
                                        name="prenom" 
                                        className="myInput" 
                                        value={this.state.prenom} 
                                        onChange={
                                            event => this.setState({prenom : event.target.value})
                                        }
                                        />
                                    </div>
                                    <div className="myGroup">
                                        <label htmlFor="dateNais" className="myLabel">Date Naissance :</label>
                                        <input 
                                        type="date" 
                                        id="dateNais" 
                                        name="dateNais" 
                                        className="myInput" 
                                        value={this.state.dateNais} 
                                        onChange={
                                            event => this.setState({dateNais : event.target.value})
                                        }
                                        />
                                    </div>
                                    <div className="myGroup">
                                        <label htmlFor="salaire" className="myLabel">Salaire :</label>
                                        <input 
                                        type="text" 
                                        id="salaire" 
                                        name="salaire" 
                                        className="myInput" 
                                        value={this.state.salaire} 
                                        onChange={
                                            event => this.setState({salaire : event.target.value})
                                        }
                                        />
                                    </div>
                                    <div className="myGroup">
                                        <label htmlFor="dateEmbauche" className="myLabel">Date D'embauche :</label>
                                        <input 
                                        type="date" 
                                        id="dateEmbauche" 
                                        name="dateEmbauche" 
                                        className="myInput" 
                                        value={this.state.dateEmbauche} 
                                        onChange={
                                            event => this.setState({dateEmbauche : event.target.value})
                                        }
                                        />
                                    </div>
                                    <div className="myGroup">
                                        <label htmlFor="image" className="myLabel">Image :</label>
                                        <input 
                                        type="text" 
                                        id="image" 
                                        name="image" 
                                        className="myInput" 
                                        value={this.state.image} 
                                        onChange={
                                            event => this.setState({image : event.target.value})
                                        }
                                        />
                                    </div>
                                    <div className="myGroup">
                                        <button type="submit" className="btn-add">Add Conducteur</button>
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

export default AddConducteur;