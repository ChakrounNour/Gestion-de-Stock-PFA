import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select'
import axios from 'axios'
const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
const nom = value => {
  if (value.length < 4 || value.length > 100) {
    return (
      <div className="alert alert-danger" role="alert">
        Invalide nom.
     </div>
    );
  }
};

class AddEditFormDepot extends React.Component {
  state = {
    id: 0,
    email:'',
    adresseLocal: '',
    nom: '',
    nomZ:'',
    userId:'', 
    OptionsZones:[],

  }
  
  async getOptions(){
    let user = JSON.parse(localStorage.getItem('user'));
  const res =  await axios.get('http://localhost:4000/users/getResponsableDepot',  
    {headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.token
    },
  })
    const data = res.data

    const options = data.map(d => ({
      "value" : d.id,
      "label" : d.email

    }))

    this.setState({selectOptions: options})

  }
  async getZones(){
    let user = JSON.parse(localStorage.getItem('user'));
  const res =  await axios.get('http://localhost:4000/api/zone',  
    {headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.token
    },
  })
    const data = res.data

    const options = data.map(d => ({
      "value" : d.id,
      "label" : d.nomZ

    }))

    this.setState({OptionsZones: options})

  }
  handleChange(e){
    this.setState({userId:e.value, email:e.label})
   }
   handleChange2(e){
    this.setState({zoneId:e.value, nomZ:e.label})
   }

 
    onChange = e => {
      let nam = e.target.name;
      let val = e.target.value;
      let err = '';
      let err3 = '';
      if (nam === "nom"){
    
        if (val !="" && Number(val)) {
          err = <strong>Votre nom doit contenir des chaînes de caractères </strong>;
        }
      }
    else if (nam === "adresseLocal"){
    
      if (val !="" && Number(val)) {
        err3= <strong>Votre adresse doit contenir des chaînes de caractères  </strong>;
      }
    }
      this.setState({errormessage: err});
     
      this.setState({errormessage3: err3});
      this.setState({ [e.target.name]: val});
  }  
 
  submitFormEdit = e => {
    let user = JSON.parse(localStorage.getItem('user'));

    e.preventDefault()
    
    fetch('http://localhost:4000/api/depot/'+this.state.id, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      },
      method: 'put',
      body: JSON.stringify({
        id: this.state.id,
        nom: this.state.nom,
        adresseLocal: this.state.adresseLocal,
        userId: this.state.userId,
        zoneId: this.state.zoneId

      })
    })
    .then(() => {
      this.props.toggle();
      this.props.updateState(this.state.id);
  })
  .catch(err => console.log(err));
}

  submitFormAdd = e => {
    let user = JSON.parse(localStorage.getItem('user'));

    e.preventDefault()
    fetch('http://localhost:4000/api/depot/'+this.state.userId+'/'+this.state.zoneId, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      },
      method: 'post',
      body: JSON.stringify({
        nom: this.state.nom,
        adresseLocal: this.state.adresseLocal,
        userId: this.state.userId,
        zoneId: this.state.zoneId


      })
    })
    .then(res => res.json())
    .then(item => {
        this.props.addItemToState(item);
        this.props.toggle();
    })
    .catch(err => console.log(err))
   
    
    

}
  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
      const { id, nom, adresseLocal,userId,zoneId } = this.props.item
      this.setState({ id, nom, adresseLocal,userId,zoneId})}
      this.getOptions()
      this.getZones()

    }
 
  render() {
    console.log(this.state.selectOptions)
    return (
      <Form  onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd} >
        <FormGroup>
          <Label for="nomM">Nom Depot</Label>
          <Input type="text" maxlength="15" name="nom" id="nom" 
          onChange={this.onChange} value={this.state.nom === null ? '' : this.state.nom}  
          validations={[required, nom]}/>
          {this.state.errormessage}

        </FormGroup>
        <FormGroup>
          <Label for="adresseLocal">Adresse local</Label>
          <Input type="text" maxlength="50" name="adresseLocal" id="adresseLocal" onChange={this.onChange} value={this.state.adresseLocal === null ? '' : this.state.adresseLocal}  required />
          {this.state.errormessage3}

        </FormGroup>
        <FormGroup>
        <div>
        <Label for="zone">Zone</Label>

        <Select  maxMenuHeight={180}     menuPlacement="auto" name="zoneId" id="zoneId" options={this.state.OptionsZones} onChange={this.handleChange2.bind(this)} required />
    <p>Vous avez sélectionné <strong>{this.state.nomZ} </strong> ID {this.state.zoneId}</p>
      </div>


        </FormGroup>
        <FormGroup>
        <div>
        <Label for="adresseLocal">Responsable</Label>

<Select   maxMenuHeight={180}     menuPlacement="auto"
name="userId" id="userId" options={this.state.selectOptions} onChange={this.handleChange.bind(this)} required required />
<p>Vous avez sélectionné <strong>{this.state.email} </strong> ID {this.state.userId}</p>
</div>

        </FormGroup>
        <Button class="btn btn-secondary">Valider</Button>
      </Form>
      
    );
  }
}

export default AddEditFormDepot