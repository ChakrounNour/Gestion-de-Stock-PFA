import React, { Component , useState }  from "react";
import { useLocation, NavLink } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Nav } from "react-bootstrap";
import { MapSharp } from "@material-ui/icons";
import { Redirect } from 'react-router';
import axios from 'axios' ;
import {NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';

//const location = useLocation();
const activeRoute = (routeName) => {
  //return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  // const [dropdownOpen, setDropdownOpen] = useState(false);

// const toggle = () => setDropdownOpen(!dropdownOpen);

};
const ExportCSV = (props) => {
  const handleClick = () => {
    props.onExport();
  };}

// const toggle = (props) => {setDropdownOpen(!dropdownOpen)};
// const toggle = () => setIsOpen(!isOpen);
// const [isOpen, setIsOpen] = useState(false);


export default class Sidebar extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      isOpen:false,
      redirection:false,
      idURL:'',
      content: "",
      color:'',
      routes:'',
      items:[],
      aboutProps:"",
      id:[],
      isOpenMenu :false,
    }
    this.getMagasins=this.getMagasins.bind(this)
    this.dropdownOpen=this.dropdownOpen.bind(this)
    this.display=this.display.bind(this)

  }
  getMagasins(){
    var id=0,nom=""
    var loopData=[]
     let user = JSON.parse(localStorage.getItem('user'));
     fetch('http://localhost:4000/api/magasin/ByResponsable/'+user.id,{   
     headers: {
       'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + user.token
     }})
     .then(response => response.json())
     .then(response => response.map(r =>(
       id=r.ids,
       nom=r.nomS,
       loopData.push({id,nom}))))
       .then(response => this.setState({ items: loopData }))
       .catch(err => console.log(err))
  }
  dropdownOpen(){
    this.setState({
      isOpen: true
    });
  }
  
  display = () => {
    
    this.setState({ isOpenMenu: !this.state.isOpenMenu });
    console.log(this.state.isOpenMenu)
  }
  componentWillMount() {
  
    this.getMagasins()
  }

  render() {
    if (this.state.redirection) 
      return <Redirect to={'/responsable/magasins/m'+this.state.idURL}/>;
    
        return (
                
      <div className="sidebar" data-color={this.props.color}> 
  
     <div className="sidebar-wrapper">
     
        <Nav>
          {this.props.routes.map((prop, key) => {
                        if (!prop.redirect && prop.name!=="Magasins")

              return (
                <li
                  className={
                    prop.upgrade
                      ? "active active-pro"
                      : activeRoute(prop.layout + prop.path)
                  }
                  key={key}>
                  <NavLink 
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active">
                    <i className={prop.icon} />
                    <p>{prop.name}</p>                  
                  </NavLink>
                  </li>
                  )
                  else if (!prop.redirect && prop.name==="Magasins") {
                  return (
                  <li
                  
                  key={key}>
                    <NavLink 
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                    onClick={this.display} 
                    >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>                  
                  </NavLink>
                   { (this.state.isOpenMenu===true) &&
                                             
        this.state.items.map( test=> { 
          return(      
          
            <NavLink    
            className="nav-link"
            to={{
              pathname:'/responsable/magasins/m' +test.id,
              // state: {id:test.id}  
              aboutProps:{
                id:test.id
               }
          
            }}>    
            <ul> <h6>{ test.nom}</h6>       </ul>       
            </NavLink>
            
          //   <NavLink
          //   to={prop.layout + prop.path+'m'}
          //   className="nav-link"
          //   activeClassName="active"
          // >
       
          //   <p>{ test.nom}</p>             
          //  </NavLink>
          //   <navLink>
          //   <button onClick={()=> 
          //    this.setState({ redirection: true , idURL :test.id })
          //   }>
          //     {test.nom}
          // </button>
          //     </navLink>

              )
          })
        }             
                </li>
              );}
             
          })}
        </Nav>
      
        </div>
    </div>

    );
  }
}