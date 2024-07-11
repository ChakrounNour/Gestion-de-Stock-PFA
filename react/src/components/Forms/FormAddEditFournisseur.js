import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddEditFormFour extends React.Component {
  state = {
    id: 0,
    nomF: '',
    adresseF: '',
    matriculeFiscale: ''  

  }
  onChange = e => {
    let nam = e.target.name;
    let val = e.target.value;
    let err = '';
    let err1 = '';
    let err3 = '';
    if (nam === "nomF"){
  
      if (val !="" && Number(val)) {
        err = <strong>Votre nom doit contenir des chaînes de caractères </strong>;
      }
    }
  

   else if (nam === "adresseF"){

    if (val !="") {
      err1 = <strong>Verifier adresse </strong>;
    }

  }
  else   if (nam === "matriculeFiscale") {
    if (val !=""  ) {
      err3 = <strong>Verifier matricule Fiscale </strong>;
      }

  }
    this.setState({errormessage: err});
    this.setState({errormessage1: err1});
    this.setState({errormessage3: err3});
    this.setState({ [e.target.name]: val});
    this.setState({ [e.target.name]: e.target.value })
}
   submitFormEdit = e => {
    e.preventDefault()
    let user = JSON.parse(localStorage.getItem('user'));    
    fetch('http://localhost:4000/api/fournisseur/'+this.state.id, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      },
      method: 'put',
      body: JSON.stringify({
        nomF: this.state.nomF,
        adresseF: this.state.adresseF,
        matriculeFiscale: this.state.matriculeFiscale
      })
    })
    .then(() => {
      this.props.toggle();
      this.props.updateState(this.state.id);
  })
  .catch(err => console.log(err));
}
 
  submitFormAdd = e => {
    e.preventDefault()
    let user = JSON.parse(localStorage.getItem('user'));
    fetch('http://localhost:4000/api/fournisseur/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      },
      method: 'post',
      body: JSON.stringify({
        nomF: this.state.nomF,
        adresseF: this.state.adresseF,
        matriculeFiscale: this.state.matriculeFiscale
      })
    })
    .then(res => res.json())
            .then(item => {
                this.props.addItemToState(item);
                this.props.toggle();
            })
            .catch(err => console.log(err));
    }
  
  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
      const {id, nomF, adresseF, matriculeFiscale  } = this.props.item
      this.setState({ id, nomF, adresseF, matriculeFiscale })
    }
  }
  
  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd} onInvalidSubmit={this.handleInvalidSubmit}>
        <FormGroup>
          <Label for="nomF">Nom de société</Label>
          <Input type="text" name="nomF"  maxlength="15" id="nomF" onChange={this.onChange} value={this.state.nomF === null ? '' : this.state.nomF} required/>
          {this.state.errormessage}
        </FormGroup>
        <FormGroup>
          <Label for="adresseF">Adresse</Label>
          <Input type="text" name="adresseF"  maxlength="50" id="adresseF" onChange={this.onChange} value={this.state.adresseF === null ? '' : this.state.adresseF}required  />
          {this.state.errormessage1}
        </FormGroup>
        <FormGroup>
          <Label for="matriculeFiscale">Matricule Fiscale</Label>
          <Input type="matriculeFiscale"  maxlength="9" name="matriculeFiscale" id="matriculeFiscale" onChange={this.onChange} value={this.state.matriculeFiscale === null ? '' : this.state.matriculeFiscale} required/>
          {this.state.errormessage3}
        </FormGroup>
        <Button >Valider</Button>
      </Form>
    );
  }
}


export default AddEditFormFour