import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import NavBar from '../../components/NavBar/NavBar';
import Home from '../../components/Home/Home';
import Users from '../../components/Users/Users';
import User from '../../components/User/User';
import AddUser from '../../components/AddUser/AddUser';
import Vehicules from '../../components/Vehicules/Vehicules';
import Marques from '../../components/Marques/Marques';
import Modules from '../../components/Modules/Modules';
import EtatVehicule from '../../components/EtatVehicule/EtatVehicule';
import Conducteurs from '../../components/Conducteurs/Conducteurs';
import AddVehicule from '../../components/AddVehicule/AddVehicule';
import Vehicule from '../../components/Vehicule/Vehicule';
import Conducteur from '../../components/Conducteur/Conducteur';
import AddConducteur from '../../components/AddConducteur/AddConducteur';
import EditUser from '../../components/EditUser/EditUser';





class Blog extends Component {
    render() {
        return (
            <div className="myBlog">
                <NavBar />

                <Switch>

                   <Route path="/" component={Home} exact/>
                    <Route path="/users" component={Users} />
                    <Route path="/user/:id" component={User} />
                    <Route path="/addUser" component={AddUser} />
                    <Route path="/editUser/:id" component={EditUser} />
                    <Route path="/vehicules" component={Vehicules} />
                    <Route path="/marques" component={Marques} />
                    <Route path="/modules" component={Modules} />
                    <Route path="/etatVehicule" component={EtatVehicule} />
                    <Route path="/conducteurs" component={Conducteurs} />
                    <Route path="/addConducteur" component={AddConducteur} />
                    <Route path="/conducteur/:id" component={Conducteur} />
                    <Route path="/addVehicule" component={AddVehicule} />
                    <Route path="/vehicule/:id" component={Vehicule} />


                            
                </Switch>    
            </div>
        );
    }
}

export default Blog;