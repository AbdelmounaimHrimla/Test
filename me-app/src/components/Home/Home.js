import React, { Component } from 'react';
import './css/Home.css';
import { NavLink } from 'react-router-dom';

class Home extends Component {

    render() {
        return (
            <div className="myHome">
                <div className="inside-myHome">
                    <h1 className="title-myHome">Home</h1>
                    <span className="user-myHome">Hrimla</span>
                </div>
                <div className="content-myHome">
                    <NavLink to="/vehicules">
                        <div className="card home-vehicules">
                            Véhicules
                        </div>
                    </NavLink>
                    <NavLink to="/modules">
                        <div className="card home-modules">
                            Modules
                        </div>
                    </NavLink>
                    <NavLink to="/marques">
                        <div className="card home-marques">
                            Marques
                        </div>
                    </NavLink>
                    <NavLink to="/users">
                        <div className="card home-users">
                           Users
                        </div>
                    </NavLink>
                    <NavLink to="/etatVehicule">
                        <div className="card home-etatVehicule">
                           Etat Véhicule
                        </div>
                    </NavLink>
                    <NavLink to="/conducteurs">
                        <div className="card home-conducteurs">
                            Conducteurs
                        </div>
                    </NavLink>
                </div>
            </div>
        );
    }
}

export default Home;