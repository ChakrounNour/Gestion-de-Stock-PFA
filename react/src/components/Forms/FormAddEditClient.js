import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddEditForm extends React.Component {
  constructor(props) {
    super(props);
  this.state = {
    id: 0,
    nomCli: '',
    prenomCli: '',
    telCli: '',
    adresseCli: '',
    };

}

  onChange = e => {
    let nam = e.target.name;
    let val = e.target.value;
    let err = '';
    let err1 = '';
    let err2 = '';
    let err3 = '';
    if (nam === "nomCli"){
  
      if (val !="" && Number(val)) {
        err = <strong>Votre nom doit contenir des chaînes de caractères</strong>;
      }
    }
  

   else if (nam === "prenom"){

    if (val !="" && Number(val)) {
      err1 = <strong>Votre prénom doit contenir des chaînes de caractères </strong>;
    }

  }
  else   if (nam === "telCli") {
    if (val !="" && !Number(val) ) {
      err2 = <strong>Votre numero tel doit être contenir des nombres</strong>;
    }
  }
  else if (nam === "adresseCli"){
  
    if (val !="" && Number(val)) {
      err3= <strong>Votre adresse doit contenir des chaînes de caractères </strong>;
    }
  }
    this.setState({errormessage: err});
    this.setState({errormessage1: err1});

    this.setState({errormessage2: err2});
    this.setState({errormessage3: err3});
    this.setState({ [e.target.name]: val});
}
   submitFormEdit = e => {
    e.preventDefault()
    let user = JSON.parse(localStorage.getItem('user'));    
    fetch('http://localhost:4000/api/client/'+this.state.id, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      },
      method: 'put',
      body: JSON.stringify({
        nomCli: this.state.nomCli,
        prenomCli: this.state.prenomCli,
        telCli: this.state.telCli,
        adresseCli: this.state.adresseCli
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
    fetch('http://localhost:4000/api/client', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      },
      method: 'post',
      body: JSON.stringify({
        nomCli: this.state.nomCli,
        prenomCli: this.state.prenomCli,
        telCli: this.state.telCli,
        adresseCli: this.state.adresseCli,
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
      const { id, nomCli, prenomCli, telCli, adresseCli } = this.props.item
      this.setState({ id, nomCli, prenomCli, telCli, adresseCli})
    }
  }
  
  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd} >
        <FormGroup>
          <Label for="nomCli">Nom</Label>
          <Input type="text" name="nomCli"  maxlength="15" id="nomCli" onChange={this.onChange} value={this.state.nomCli === null ? '' : this.state.nomCli} required/>
          {this.state.errormessage}

      </FormGroup>
        <FormGroup>
          <Label for="prenomCli">Prénom</Label>
          <Input type="text" name="prenomCli"  id="prenomCli" maxlength="15" onChange={this.onChange} value={this.state.prenomCli === null ? '' : this.state.prenomCli} required />
          {this.state.errormessage1}

        </FormGroup>
        <FormGroup>
          <Label for="telCli">Téléphone</Label>
          <Input type="telCli" name="telCli" id="telCli" maxlength="8" onChange={this.onChange} value={this.state.telCli === null ? '' : this.state.telCli}  required/>
          {this.state.errormessage2}
        </FormGroup>
        <FormGroup>
          <Label for="adresseCli">Adresse</Label>
          <Input type="text" name="adresseCli" id="adresseCli" maxlength="50"  onChange={this.onChange} value={this.state.adresseCli === null ? '' : this.state.adresseCli} required/>
          {this.state.errormessage3}
        </FormGroup>
        <Button >Ajouter</Button>
      </Form>
    );
  }
}

export default AddEditForm