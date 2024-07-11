import React, { Component } from "react";
import AuthService from "../services/auth.service";
import {
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";

import {FormGroup, Label, Input } from 'reactstrap';
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.onChangeNom = this.onChangeNom.bind(this);
    this.onChangePrenom = this.onChangePrenom.bind(this);
    this.onChangeTel = this.onChangeTel.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { id:"",nom: "", prenom:"",tel:"",email: "",password:"",token:"" },
      message:"",
      nom:"",
      prenom:"",
      tel:"",
      email:"",
      password:"",
      showSousAdministrateur:"",
      showResponsableDepot:"",
      adresse:"",
      showResponsable:"",
      showAdmin:""

    }; }

 componentDidUpdate(prevProps) {
    // Utilisation classique (pensez bien à comparer les props) :
    console.log(prevProps) }
  getMagasin(){
    let user = JSON.parse(localStorage.getItem('user'));
    console.log(user)
    fetch('http://localhost:4000/api/magasin/ByResponsable/'+user.id,{   
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      }})
      .then(response => response.json())
      .then(items => this.setState({items}))
      .catch(err => console.log(err))
  }
  getDepot(){
    let user = JSON.parse(localStorage.getItem('user'));
    console.log(user)
    fetch('http://localhost:4000/api/depot/findByResp/'+user.id,{   
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      }})
      .then(response => response.json())
      .then(itemsdepots => this.setState({itemsdepots}))
      .catch(err => console.log(err))
  }
  componentWillUnmount(){
    const currentUser = AuthService.getCurrentUser();

    console.log(currentUser)

    this.setState({ currentUser: currentUser, userReady: true })
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    this.getMagasin()
    this.getDepot()
    if (currentUser!= AuthService.getCurrentUser()){
        const currentUser = AuthService.getCurrentUser();

    console.log(currentUser)
    if (currentUser) {
      this.setState({
        showResponsableDepot: currentUser.role.includes("responsable de dépôt"),  
        showResponsable: currentUser.role.includes("responsable de magasin"),
        showAdmin: currentUser.role.includes("Admin"),
        showSousAdministrateur: currentUser.role.includes("sous-administrateur"),

      });
    }
    this.setState({ currentUser: currentUser, userReady: true })
    }
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
}
  onChangeNom(e) {
    const nom = e.target.value;

    this.setState(function(prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          nom: nom
        }
      };
    });
  }
  onChangeTel(e) {
    const tel = e.target.value;

    this.setState(function(prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          tel: tel
        }
      };
    });
  }
  onChangeEmail(e) {
    const email = e.target.value;

    this.setState(function(prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          email: email
        }
      };
    });
  }
  onChangePassword(e) {
    const password = e.target.value;

    this.setState(function(prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          password: password
        }
      };
    });
  }

  SubmitUpdate = e =>  {

     console.log(e)
    let user = JSON.parse(localStorage.getItem('user'));    
    fetch('http://localhost:4000/users/'+user.id
, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      },
      method: 'put',
      body: JSON.stringify({
        nom: this.state.nom,
        prenom: this.state.prenom,
        tel: this.state.tel,
        adresse: this.state.adresse,
        email:this.state.email,
        password:this.state.password
      })
    })
    .then(()=> {
      alert('Utilisateur ajouté avec succès!')
      this.setState({
        message: "Utilisateur ajouté avec succès!"
      });
    })
    .catch(e => {
      console.log(e);
    });

}


  onChangePrenom(e) {
    const prenom = e.target.value;
    
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        prenom: prenom
      }
    }));
  }


  render() {
 
    const { showResponsable , showAdmin ,showSousAdministrateur,showResponsableDepot} = this.state; 
    const magasin = this.state.items;
    const depot=this.state.itemsdepots;
    const { currentUser } = this.state;
    console.log("c"+currentUser)
    console.log(magasin)
    console.log("res"+showResponsable)
    console.log("dept"+showResponsableDepot)

    return (
 
      <>
         <div className="col-md-9">
      <div><br></br>
      <br></br>
      <br></br>
    </div> 
            <Container>
            <Card>
            { showResponsable && (
         (magasin!=null)&& ( 
                 magasin.map(item => (
                  <tr key={item.id}>
                  
              <Card.Body>
              <Col className="pl-3" md="20">
                      <Form.Group>
                        <label>Nom Magasin</label>
              <Form.Control placeholder={item.nomS} disabled />
                      </Form.Group>
                    </Col>
                 
                    <Col className="pl-3" md="20">
                      <Form.Group>
                        <label>Adresse Local Magasin</label>
              <Form.Control placeholder={item.adresseLocal} disabled />
              </Form.Group>
                    </Col>
                 
       </Card.Body>
      
        
          
                  </tr>
                ))))}

{ showResponsableDepot && (
         
         (depot!=null)&& (   
                 depot.map(item => (
                  <tr key={item.id}>
                    <Card.Header>
                <Card.Title as="h4">Votre dépôt</Card.Title>
              </Card.Header>
              <Card.Body>
              <Col className="pl-3" md="20">
                      <Form.Group>
                        <label>Nom dépôt </label>
              <Form.Control placeholder={item.nomS} disabled />
                      </Form.Group>
                    </Col>
                 
                    <Col className="pl-3" md="20">
                      <Form.Group>
                        <label>Adresse Local dépôt</label>
              <Form.Control placeholder={item.adresseLocal} disabled />
              </Form.Group>
                    </Col>
                 
       </Card.Body>
      
        
          
                  </tr>
                ))))}
              <Card.Header>
                <Card.Title as="h4">Modifier votre Profil</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={this.SubmitUpdate}>
              

                    <Col className="pl-3" md="20">
                      <Form.Group>
                        <label>Nom</label>
                        <Form.Control
                        name="nom" id="nom"  value={currentUser.nom}
                          disabled
                          placeholder="Nom"
                          type="text"
                          onChange={this.onChange} 
                        ></Form.Control>
                                   
                   
                      </Form.Group>
                    </Col>
                 

                    <Col className="pl-3" md="20">
                      <Form.Group>
                        <label>Prenom</label>
                        <Form.Control
                         name="prenom" id="prenom"   value={currentUser.prenom}
                         onChange={this.onChange}
                         disabled
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
            
            
                    <Col className="pl-3" md="20">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          Adresse Email 
                        </label>
                        <Form.Control
                          placeholder="Email"
                          name="email" id="email"    value={currentUser.email}
                  onChange={this.onChange} 
                          type="email"
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                
                    <Col className="pl-3" md="20">
                      <Form.Group>
                        <label>Téléphone</label>
                        <Form.Control
                          name="tel" id="tel" 
                          onChange={this.onChange}                         
                          placeholder={currentUser.tel}
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                  
                    </Col>
                  
                    {showAdmin &&(
      <FormGroup>
  <Col className="pl-3" md="20">
                      <Form.Group>
                        <label>Mot de passe</label>
                        <Form.Control
 name="password" id="password"     value={currentUser.password}
 onChange={this.onChange}                        
 placeholder="Mot de passe"
                          type="Password"
                        ></Form.Control>
                      </Form.Group>
                    </Col>  
                    
      </FormGroup>
)}   
                 
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
Modifier                   </Button>
               
                  
                  <div className="clearfix"></div>
                </Form>
                
                
              </Card.Body>
              
            </Card>
 
         
        
      </Container>
      </div> 
    </>
    );
  }
}