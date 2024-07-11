import React, { Component } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {  Navbar,Nav,NavbarToggler,Col, Container, Collapse } from 'reactstrap';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItem,
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import Responsable1 from "./components/layouts/Responsable";
import ResponsableDepot from "./components/layouts/ResponsableDepot";
import StickyHeader from 'react-sticky-header';
import "./Navbar.css";
import "react-sticky-header";
import AuthService from "./services/auth.service";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import Login from "./components/login.component";
import Register from "./components/register.component";
import Profile from "./components/profile.component";
import AdminLayout from "./components/layouts/Admin";
import Client from "./components/client";
import Fournisseur from "./components/fournisseur";
import Magasin from "./components/magasin";
import article from "./components/article";
import MagasinR from "./components/magasinR";
import AddCategorie from "./components/Forms/AddCategorie";
import FormAddSCategorie from "./components/Forms/FormAddSCategorie";
import FormAddSSCategorie from "./components/Forms/FormAddSSCategorie";
import Responsable from "./components/responsable";
import Notifications from './containers/Notifications/Notifications';
// Import Bootstrap css
import "./theme.scss";
// Import themify Icon
import "./assets/css/themify-icons.css";

// Import Custom Css
import "./assets/css/style.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showResponsableBoard: false,
      showAdminBoard: false,
      showResponsableDepotBoard: false,
      showSousAdminBoard:false,
      currentUser: undefined,
      isOpenMenu :false,
      menuAnchorEl: null,
      NoUser:false,


    };
  }

  toggle = () => {
    this.setState({ isOpenMenu: !this.state.isOpenMenu });
}
  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
       
      
      this.setState({
        currentUser: user,
        showResponsableDepot: user.role.includes("responsable de dépôt"), 
        showResponsableBoard: user.role.includes("responsable de magasin"),
        showAdminBoard: user.role.includes("Admin"),
        showSousAdminBoard: user.role.includes("sous-administrateur"),

      });
    }
    else {
      this.setState({
        NoUser: true
      });
    }
  }

  logOut() {
    AuthService.logout();
  }
  
  handleMenuOpen = event => this.setState({ menuAnchorEl: event.currentTarget });
  handleMenuClose = () => this.setState({ menuAnchorEl: null });

  render() {
    const { currentUser, showResponsableBoard ,showResponsableDepot,
      showSousAdminBoard, showAdminBoard ,menuAnchorEl,NoUser} = this.state;
    const menuPosition = {
      vertical: 'top',
      horizontal: 'right',
    };
    return (
      <React.Fragment>
      <StickyHeader
 header = {
  <Navbar expand="lg" fixed="top" className="navbar-custom sticky">
  <Container>
  {    showAdminBoard && (
  <NavLink to={"/Admin/dashboard"} className="logo">
          Parapharmacie
          </NavLink>
  )}
   {    showSousAdminBoard && (
  <NavLink to={"/Admin/dashboard"} className="logo">
          Parapharmacie
          </NavLink>
  )}
   {    showResponsableBoard && (
  <NavLink to={"/Responsable/dashboardRes"} className="logo">
         Magasin
          </NavLink>
  )}
  {
    showResponsableDepot && (
      <NavLink to={"/ResponsableDep/dashboardRes"} className="logo">
             Dépôt
              </NavLink>
      )
  }
     {    NoUser && (
  <NavLink to={"/login"} className="logo">
          Parapharmacie
          </NavLink>
  )}

 
          <NavbarToggler onClick={this.toggle} ><i className="ti-menu"></i></NavbarToggler>
          <Collapse id="data-scroll" isOpen={this.state.isOpenMenu} navbar>

         
               <Nav navbar className="ml-auto navbar-center" id="mySidenav">

          <div className="navbar-nav mr-auto">
        
            {    showResponsableBoard && (
             
              
              <li className="navbar-nav">
               
                      
           
              </li>
            )}

            {showAdminBoard && (
         
            <li className="navbar-nav">
           
              <NavLink to={"/client"} className="nav-link">
              Client
              </NavLink>
              <NavLink to={"/fournisseur"} className="nav-link">
              Fournisseur
        </NavLink>
             <NavLink to={"/MagasinR"} className="nav-link">
             Magasin
              </NavLink>
        
             <NavLink to={"/article"} className="nav-link">
                Article
              </NavLink>
              <NavLink to={"/res"} className="nav-link">
                Responsable
              </NavLink>
          </li>

                
            )}

{showSousAdminBoard && (
         
         <li className="navbar-nav">
        
           <NavLink to={"/client"} className="nav-link">
           Client
           </NavLink>
           <NavLink to={"/fournisseur"} className="nav-link">
           Fournisseur
     </NavLink>
          <NavLink to={"/MagasinR"} className="nav-link">
          Magasin
           </NavLink>
     
          <NavLink to={"/article"} className="nav-link">
             Article
           </NavLink>
           <NavLink to={"/res"} className="nav-link">
             Responsable
           </NavLink>
       </li>

             
         )}

     
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
               <AccountCircleOutlinedIcon onClick={this.handleMenuOpen} color="inherit" >
          <AccountCircle />
        </AccountCircleOutlinedIcon>
              <li className="nav-item">
             
        <Menu
          anchorEl={menuAnchorEl}
          anchorOrigin={menuPosition}
          transformOrigin={menuPosition}
          open={!!menuAnchorEl}
          onClose={this.handleMenuClose}
        >  
        <MenuItem onClick={this.logout}>
        <Col>
        <NavLink to={"/profile"} className="nav-link">
          Mon compte
        </NavLink> 
        {    showAdminBoard && (
                          <li className="nav-item">
                <NavLink to={"/register"} className="nav-link">
                  Ajouter sous admin
                </NavLink>
              </li>
        )}
              <a href="/login" className="nav-link" onClick={this.logOut}>
                  Se déconnecter
                </a>
              </Col>
      </MenuItem>
    </Menu>
 
              </li>

            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink to={"/login"} className="nav-link">
                  Se connecter
                </NavLink>
              </li>

            
            </div>
          )}
         </Nav>
                                    </Collapse>
                                </Container>
                            </Navbar>
    }
    stickyOffset = {-100}
>
</StickyHeader>

        <div className="container mt-3">
          <Switch>
            <Route exact path= "/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/client" component={Client} />
            <Route path="/fournisseur" component={Fournisseur} />
            <Route path="/magasin" component={Magasin} />
            <Route path="/article" component={article} />
            <Route path="/AddCategorie" component={AddCategorie} />
            <Route path="/AddSCategorie" component={FormAddSCategorie} />
            <Route path="/AddSSCategorie" component={FormAddSSCategorie} />
            <Route path="/AddSSCategorie" component={FormAddSSCategorie} />
            <Route path="/MagasinR" component={MagasinR} />
            <Route path="/client" component={Client} />
            <Route path="/articleR" component={article} />
            <Route path="/res" component={Responsable} />
            <Route path="/admin" component={AdminLayout} />
            <Route path="/responsable/" component={Responsable1} />
            <Route path="/responsableDep/" component={ResponsableDepot} />


          </Switch>
        </div>
        </React.Fragment>

    );
  }
}

export default App;
