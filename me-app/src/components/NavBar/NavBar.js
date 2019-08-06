import React, { Component } from 'react';
import './css/NavBar.css';
import { NavLink } from 'react-router-dom';
class NavBar extends Component {
    render() {
        return (
            <div className="myNavBar">
                <ul className="myNav">
                    <NavLink to="/"><li className="item">Home</li></NavLink>
                    <NavLink to="/users"><li className="item">Users</li></NavLink>
                    <NavLink to="/vehicules"><li className="item">Véhicules</li></NavLink>
                    <NavLink to="/modules"><li className="item">Modules</li></NavLink>
                    <NavLink to="/marques"><li className="item">Marques</li></NavLink>
                    <NavLink to="/etatVehicule"><li className="item">Etat Véhicule</li></NavLink>
                    <NavLink to="/conducteurs"><li className="item">Conducteurs</li></NavLink>
                </ul>
            </div>
        );
    }
}

export default NavBar;