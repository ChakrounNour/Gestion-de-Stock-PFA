import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { isEmail } from "validator";

class AddEditFormR extends React.Component {
      
    
    state = {
      id:"0",
      nom: "",
      prenom: "",
      tel: "",
      email: "",
      password: "",
      role :"responsable",
      successful: false,
      message: ""
    
  }

  onChange = e => {
    let nam = e.target.name;
    let val = e.target.value;
    let err = '';
    let err1 = '';
    let err2 = '';
    let err3 = '';
    let err4 = '';
    if (nam === "nom"){
  
      if (val !="" && Number(val)) {
        err = <strong>Votre nom doit être un caractere </strong>;
      }
    }
  

   else if (nam === "prenom"){

    if (val !="" && Number(val)) {
      err1 = <strong>Votre prénom doit être un caractere </strong>;
    }

  }
  else   if (nam === "tel") {
    if (val !="" && !Number(val) ) {
      err2 = <strong>Votre numero tel doit être un nombre</strong>;
    }
  }
  else if (nam === "email"){
  
    if (val !="" && !isEmail(val))  {
      err3= <strong>verifier votre email  </strong>;
    }
  }
 

  
    this.setState({errormessage: err});
    this.setState({errormessage1: err1});

    this.setState({errormessage2: err2});
    this.setState({errormessage3: err3});

    this.setState({ [e.target.name]: val});
  }


  submitFormAdd = e => {
    let user = JSON.parse(localStorage.getItem('user'));

    e.preventDefault()
    fetch('http://localhost:4000/users/register', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      },
      method: 'post',
      body: JSON.stringify({
        id: this.state.id,
        nom: this.state.nom,
        prenom: this.state.prenom,
        tel: this.state.tel,
        email:  this.state.email,
        password:  this.state.password,
        role : 'responsable de magasin',
      })
    })
    .then(res => res.json())
    .then(item => {
        this.props.toggle();
    })
    .catch(err => {
      const resMessage =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
          err.message ||
          err.toString();

      this.setState({
        successful: false,
        message: resMessage
      });
    } )
}
  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
      const { id, nom, prenom, tel ,email,password,role} = this.props.item
      this.setState({ id, nom, prenom, tel ,email,password,role})
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd} >
        <FormGroup>
          <Label for="nom">Nom </Label>
          <Input type="text" name="nom"  maxlength="15" id="nom" onChange={this.onChange} value={this.state.nom === null ? '' : this.state.nom} required/>
          {this.state.errormessage}

        </FormGroup>
        <FormGroup>
          <Label for="prenom">Prénom</Label>
          <Input type="text" name="prenom"  maxlength="15" id="prenom" onChange={this.onChange} value={this.state.prenom === null ? '' : this.state.prenom} required />
          {this.state.errormessage1}

        </FormGroup>
        <FormGroup>
          <Label for="tel">Téléphone</Label>
          <Input type="text" name="tel" id="tel"  maxlength="8" onChange={this.onChange} value={this.state.tel === null ? '' : this.state.tel}required />
          {this.state.errormessage2}

        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" onChange={this.onChange} value={this.state.email === null ? '' : this.state.email} required />
          {this.state.errormessage3}

        </FormGroup>
        <FormGroup>
          <Label for="password">Mot de passe</Label>
          <Input type="password"  maxlength="15" name="password" id="password" onChange={this.onChange} value={this.state.password === null ? '' : this.state.password} required />

        </FormGroup>
                
        <Button type="submit"  class="btn btn-primary" >Ajouter</Button>
        {this.state.message && (
          <div className="form-group">
            <div
              className={
                this.state.successful
                  ? "alert alert-success"
                  : "alert alert-danger"
              }
              role="alert"
            >
              {this.state.message}
            </div>
          </div>
        )}
      </Form>
     
    );
  }
}

export default  AddEditFormR