import React from 'react';
import { Container, Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';  
import Select from 'react-select';

class FormCommandeFacture extends React.Component {
      
  constructor(props){  
    super(props)  
    this.state = {  
      id:"0",
      OptionsArticle:[],
      OptionsCommande:[],

      valueNon:'',
      transporteurOui:'',
      successful: false,
      message: ""
    }  
        this.handleChang = this.handleChang.bind(this);
        this.handleInvalidSubmit = this.handleInvalidSubmit.bind(this)
        this.onFileChangeHandler2=this.onFileChangeHandler2.bind(this)
        this.handleInvalidSubmit = this.handleInvalidSubmit.bind(this)

    }
 
  handleChang(e){
    this.setState({commande_id:e.value, dateC:e.label})
   }

   onFileChangeHandler2 = (e) => {
    this.setState({ filePDF: e.target.files[0] });   
  
  }

  async getCommande(){
    let user = JSON.parse(localStorage.getItem('user'));
  const res =  await axios.get('http://localhost:4000/api/commande/',  
    {headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.token
    },
  })
    const data = res.data
  
    const options = data.map(d => ({
      "value" : d.id,
      "label" : "Date="+d.dateC + " ,Montant=" +d.montant
  
    }))
  
    this.setState({OptionsCommande: options})
  
  }
  

  handleInvalidSubmit(event, errors, values) {
    this.setState({errors, values});
  }
  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }
  getFacture(){
    let user = JSON.parse(localStorage.getItem('user'));

    fetch('http://localhost:4000/api/qte_commander/'+this.state.commande_id, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + user.token
          }})
    .then(res => res.json())
    .then(res => this.setState({ valeurFac: res }))
    .then(res => console.log(this.state.valeurFac))

    .catch(err => console.log(err)); 
  }
  

 
  submitFormAdd = e => {
    e.preventDefault()
    var id=0
    let user = JSON.parse(localStorage.getItem('user'));
        if (this.state.filePDF) {
            let dataForm= new FormData()
            dataForm.append("file",this.state.filePDF)
            dataForm.set("data", this.state.text)   
            this.getFacture()
            axios
            .post("http://localhost:4000/images/uploadPDF", dataForm ,
            {
              headers : {
                'Authorization': 'Bearer ' + user.token,
              }}
            )
                 
            .then(console.log(dataForm))
            .then(
              (dataForm) => {   
                  console.log("ff"+this.state.valeurFac)
                  this.state.valeurFac.map(i=>
                    id=i.id)
                    console.log(id)
                fetch('http://localhost:4000/api/qte_commander/'+id, {
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + user.token
                    },
                    method: 'put',
                    body: JSON.stringify({
                      file: dataForm.data.filename,
                      date: this.state.date
                    })

      })
      .then(res => res.json())
            .then(res=>console.log(res))

      .then(item => {
        this.props.toggle();
    })
    .catch(err => console.log(err));


    })}
              
    }
  componentDidMount(){
    // if item exists, populate the state with proper data
    this.getCommande()
 
  }

  render() {
    return (
        <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd} onInvalidSubmit={this.handleInvalidSubmit}>
        <FormGroup row>  
          <Label for="text" sm={2}>Commande</Label>  
          <Col sm={10}>  
          <Select name="commande" id="commande" options={this.state.OptionsCommande} onChange={this.handleChang.bind(this)} value={this.state.id} />
    <p>Vous avez sélectionné <strong>{this.state.dateC} ID {this.state.commande_id}  </strong> </p>
          </Col>  
        </FormGroup> 
     
        <FormGroup row>
        <Label for="text" sm={2}>Date</Label>
        <Col sm={10}>  
  
          <Input type="date" name="dateC" id="dateC" onChange={this.onChange} value={this.state.date === null ? '' : this.state.date} required />
        </Col>
        </FormGroup>
        <FormGroup row>
        <Label for="text" sm={2}>PDF</Label>

        <Col sm={10}>
        <Input type="file" className="form-control" name="file" onChange={this.onFileChangeHandler2}/>

        </Col>
      </FormGroup>
                
        <Button type="submit"  class="btn btn-primary" >Valider</Button>
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

export default  FormCommandeFacture