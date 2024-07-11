import React, { useState } from "react";

import axios from 'axios';  
import '../style.css'  ;
import { Container, Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';
import Select from 'react-select';

class AddArticle extends React.Component{  
  
constructor(props){  
super(props)  

this.state = {  
  article:[],
  data:'',
  res:'',
  id: 0,
  nomA: '',
  descriptionA: '',
  prixTTC: '',
  dateExpiration: '',
  prixUnitaireInitial:'',
  TVA:'',
  qte:'',
  image:null,
  sscategorieId:'',
  fournisseurId:'',
  nomSSC:'',
  promotion:'',
  nomF:'',
  file:'',
  url:'',
  filename:'',
  selectOptions:'',
  selectOptions1:'',
  selectOptions6:'',
  successful: false,
      message: "",
  name: '',
  marque:'',
  filePDF:'',
  nomPDF:'',
  selectDepot:[]

}  
    this.handleChang = this.handleChang.bind(this);
    this.handleChang1 = this.handleChang1.bind(this);
    this.onFileChangeHandler=this.onFileChangeHandler.bind(this)
    this.onFileChangeHandler2=this.onFileChangeHandler2.bind(this)
    this.handleChangD=this.handleChangD.bind(this)
    this.handleChangM=this.handleChangM.bind(this)

  
}

handleChangD(e){
  this.setState({stock_id:e.value, nom:e.label})

 }
 handleChangM(e){
  this.setState({marque_id:e.value, nomM:e.label})

 }    
onFileChangeHandler = (e) => {
  this.setState({ file: e.target.files[0] });   

}
 
onFileChangeHandler2 = (e) => {
  this.setState({ filePDF: e.target.files[0] });   

}
async getDepot(){
  let user = JSON.parse(localStorage.getItem('user'));
const res =  await axios.get('http://localhost:4000/api/depot',  
  {headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + user.token
  },
})
  const data = res.data

  const options1= data.map(d => ({
    "value" : d.id,
    "label" : d.nom

  }))

  this.setState({selectDepot: options1})

}
async getOptions(){
  let user = JSON.parse(localStorage.getItem('user'));
const res =  await axios.get('http://localhost:4000/api/sscategorie',  
  {headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + user.token
  },
})
  const data = res.data

  const options = data.map(d => ({
    "value" : d.id,
    "label" : d.nomSSC

  }))
  console.log(options)
  console.log(data)

  this.setState({selectOptions: options})

}

async getArticle(){
  let user = JSON.parse(localStorage.getItem('user'));
const res =  await axios.get('http://localhost:4000/api/article/',  
  {headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + user.token
  },
})
  const data = res.data

  const options = data.map(d => ({
    "value" : d.id,
    "label" : d.article
  }))

  this.setState({article: options})
}
async getOptions1(){
  let user = JSON.parse(localStorage.getItem('user'));
const res =  await axios.get('http://localhost:4000/api/fournisseur',  
  {headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + user.token
  },
})
  const data = res.data

  const options1= data.map(d => ({
    "value" : d.id,
    "label" : d.nomF

  }))

  this.setState({selectOptions1: options1})

}
handleChang(e){
  this.setState({sscategorieId:e.value, nomSSC:e.label})
 }
   
 
handleChang1(e){
  this.setState({fournisseurId:e.value, nomF:e.label})
 }
   
 submitFormAdd = e => {
  e.preventDefault()
  let user = JSON.parse(localStorage.getItem('user'));
  console.log(user)
  if (this.state.file && this.state.filePDF) {
    console.log(this.state.file)
    let data = new FormData();
    data.append("image", this.state.file);
    data.set("data", this.state.text);
    let dataForm= new FormData()
    dataForm.append("file",this.state.filePDF)
    dataForm.set("data", this.state.text);
    let name=this.state.nomA

    axios
      .post("http://localhost:4000/images/upload", data ,
      {
        headers : {
          'Authorization': 'Bearer ' + user.token,
        }}
      )
     
      .then( console.log(data))

      .then(
        (data) => {
          this.setState({
            image: data.data.url
          });

          console.log(data.data.url)
          this.setState({image: data.data.url})
          fetch('http://localhost:4000/api/article/'+this.state.sscategorieId+'/'+this.state.fournisseurId+'/'+this.state.stock_id+'/'+this.state.marque_id, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + user.token
            },
            method: 'post',
              body: JSON.stringify({ nomA:this.state.nomA,descriptionA:this.state.descriptionA,  
            prixTTC:this.state.prixTTC, dateExpiration:this.state.dateExpiration,
            prixUnitaireInitial:this.state.prixUnitaireInitial,TVA:this.state.TVA,qte:this.state.qte,
            image: data.data.url,nomSSC:this.state.nomSSC, marque:this.state.marque,promotion:this.state.promotion,nomF:this.state.nomF
            })
          })
       
          .then(res => res.json())
          .then(item => {
              this.props.toggle();
          })

          this.getArticle(this.state.nomA)
          
          
            


          axios
          .post("http://localhost:4000/images/uploadPDF", dataForm ,
          {
            headers : {
              'Authorization': 'Bearer ' + user.token,
            }}
          )
          
          .then(console.log(dataForm))
          .then(
            (dataForm,name) => {
          
            
             
 
            console.log(this.state.article)
             
            
          fetch('http://localhost:4000/api/qte_ajout/'+this.state.fournisseurId+'/'+this.state.article.id, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + user.token
            },
            method: 'post',
              body: JSON.stringify({ 
               file:dataForm.data.filename
            })
          })
        })
      
        alert('new Article '+this.state.nomA+'is saved successfully..');
      })       
        
      .catch(error => console.log(error));
  }
}


 async getMarque(){
  let user = JSON.parse(localStorage.getItem('user'));
const res =  await axios.get('http://localhost:4000/api/marque/',  
  {headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + user.token
  },
})
  const data = res.data

  const options = data.map(d => ({
    "value" : d.id,
    "label" : d.nomM

  }))

  this.setState({marques: options})

}
handleChange= (e)=> {  
  let nam = e.target.name;
  let val = e.target.value;
  let err = '';
  let err1 = '';
  let err3 = '';
  let err4= '';
  let err5 = '';
  let err6 = '';


  if (nam === "nomA"){

    if (val !="" && Number(val)) {
      err = <strong>Votre nom doit être un caractere </strong>;
    }
  }


 else if (nam === "descriptionA"){

  if (val !=""  && Number(val)) {
    err1 = <strong> verifier votre Description  </strong>;
  }

}
else if (nam === "promotion"){

  if (val !="" && !Number(val)) {
    err6= <strong>Votre promotion doit être un chiffre </strong>;
  }
}else if (nam === "prixUnitaireInitial"){

  if (val !="" && !Number(val)) {
    err3= <strong>Votre prix Unitaire Initial doit être un chiifre </strong>;
  }
}
else if (nam === "qte"){

  if (val !="" && !Number(val)) {
    err5= <strong>Votre quantite doit être un chiffre </strong>;
  }
}

else if (nam === "TVA"){

  if (val !="" && !Number(val)) {
    err4= <strong>Votre TVA doit être un chiffre </strong>;
  }
}


  this.setState({errormessage: err});
  this.setState({errormessage1: err1});
  this.setState({errormessage3: err3});
  this.setState({errormessage4: err4});
  this.setState({errormessage6: err6});
  this.setState({errormessage5: err5});


  this.setState({ [e.target.name]: val});}  

  async getOptions6(){
    let user = JSON.parse(localStorage.getItem('user'));
  const res =  await axios.get('http://localhost:4000/api/sscategorie',  
    {headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.token
    },
  })
    const data = res.data
  
    const options = data.map(d => ({
      "value" : d.id,
      "label" : d.nomSSC
  
    }))
  
    this.setState({selectOptions6: options})
  
  }
componentDidMount(){
  this.getOptions()
  this.getOptions1()
  this.getOptions6()
  this.getDepot()
  this.getMarque()
  this.getArticle()
}
render() {  
  console.log(this.state.selectOptions)
  console.log(this.state.selectOptions1)

  const AddArticle= () => {
    const [name, setName] = useState("");
    const [file, setFile] = useState(null);
  }

return (  
  
   <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd} onInvalidSubmit={this.handleInvalidSubmit}>
      
   
<Col>  
        <FormGroup row>  
          <Col sm={10}>  
            <Input type="text" name="nomA"  maxlength="15" onChange={this.handleChange} value={this.state.nomA === null ? '' : this.state.nomA} placeholder="Nom" />  
            {this.state.errormessage}

          </Col>  
        </FormGroup>  
        <FormGroup row>  
          <Col sm={10}>  
            <Input type="text" name="descriptionA"  maxlength="40" onChange={this.handleChange} value={this.state.descriptionA === null ? '' : this.state.descriptionA} placeholder="Description" />  
            {this.state.errormessage1}

          </Col>  
        </FormGroup>  
        
        <FormGroup row>  
          <Col sm={10}>  
            <Input type="text" name="promotion"  maxlength="2" onChange={this.handleChange} value={this.state.promotion === null ? '' : this.state.promotion} placeholder="Promotion" />  
            {this.state.errormessage6}
          </Col>  
        </FormGroup>  
        <FormGroup row>  
          <Col sm={10}>  
            <Input type="date" name="dateExpiration" onChange={this.handleChange} value={this.state.dateExpiration === null ? '' : this.state.dateExpiration} placeholder="24/03/2022" />  
          </Col>  
        </FormGroup>  
        <FormGroup row>  
          <Col sm={10}>  
            <Input type="text" name="prixUnitaireInitial"  maxlength="10" onChange={this.handleChange}  value={this.state.prixUnitaireInitial === null ? '' : this.state.prixUnitaireInitial} placeholder="Prix unitaire" />  
            {this.state.errormessage3}

          </Col>  
        </FormGroup>  
        <FormGroup row>  
          <Col sm={10}>  
            <Input type="text" name="TVA"  maxlength="2" onChange={this.handleChange} value={this.state.TVA === null ? '' : this.state.TVA} placeholder="TVA" />  
            {this.state.errormessage4}

          </Col>  
        </FormGroup>  
        <FormGroup row>  
          <Col sm={10}>  
            <Input type="text" name="qte"  maxlength="15" onChange={this.handleChange} value={this.state.qte === null ? '' : this.state.qte} placeholder="Quantité" />  
            {this.state.errormessage5}

          </Col>  
        </FormGroup>  
        <FormGroup row>
        <Col sm={10}>
        <Input type="file" className="form-control" name="image" onChange={this.onFileChangeHandler}/>

        </Col>
      </FormGroup>
        <FormGroup row>  
          <Col sm={10}>  
          <Select name="sscategorieId" id="sscategorieId" 
          options={this.state.selectOptions6} onChange={this.handleChang.bind(this)} 
          placeholder="Choisir sous-sous-categorie"/>
    <p>Vous avez sélectionné <strong>{this.state.nomSSC} {this.state.sscategorieId}  </strong> </p>
          </Col>  
        </FormGroup>  
        <FormGroup row>  
          <Col sm={10}>  
 
          <Select name="fournisseurId" id="fournisseurId" options={this.state.selectOptions1} 
          onChange={this.handleChang1.bind(this)} 
        placeholder="Choisir fournisseur"/>
    <p>Vous avez sélectionné <strong>{this.state.nomF} {this.state.fournisseurId}  </strong> </p>
          </Col>  
        </FormGroup> 
        <FormGroup row>  
          <Col sm={10}>  
          <Select name="depot" id="depot" options={this.state.selectDepot} 
          onChange={this.handleChangD.bind(this)} 
          placeholder="Choisir dépôt"/>
    <p>Vous avez sélectionné <strong>{this.state.nom} {this.state.stock_id}  </strong> </p>
          </Col>  
        </FormGroup>
        <FormGroup row>  
          <Col sm={10}>  
          <Select name="marq" id="marq" options={this.state.marques} 
          onChange={this.handleChangM.bind(this)} 
          placeholder="Choisir marque"/>
    <p>Vous avez sélectionné <strong>{this.state.nomM} {this.state.marque_id}  </strong> </p>
          </Col>  
        </FormGroup>  
    
        <FormGroup row>
        <Col sm={10}>
        <Input type="file" className="form-control" name="file" onChange={this.onFileChangeHandler2}/>

        </Col>
      </FormGroup>
      </Col>  

    
        <Button >Valider</Button>
 
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
   
export default AddArticle;




      