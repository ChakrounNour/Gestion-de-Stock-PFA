import React, { Component,useState  , Fragment } from "react";
import { Document, Page } from 'react-pdf';
import ModalSCategorie from './Modals/ModalSCategorie';
import ModalCat from './Modals/ModalCategorie';
import ModalSSCategorie from './Modals/ModalSSCategorie';
import ModalA from './Modals/ModelA';


import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
import cellEditFactory from 'react-bootstrap-table2-editor';
import AuthService from "../services/auth.service";
import {Modal } from 'react-bootstrap';
import { Container, Col, Form, Row,Button ,FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select';
import DeleteIcon from '@material-ui/icons/Delete';
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";
import DetailArticle from "./detail.js";

import filterFactory, {
  selectFilter,
  Comparator,
} from "react-bootstrap-table2-filter";
import ToolkitProvider, {
  CSVExport,
  Search,
} from "react-bootstrap-table2-toolkit";

const reload=()=>window.location.reload();



const { SearchBar } = Search;

const ExportCSV = (props) => {
  const handleClick = () => {
    props.onExport();
  };
  return (
    <span>
     
    </span>
  );
};
class Article extends Component {
  
  constructor(props) {

    super(props);

   this.state = {
      selectedRow: null,    
      items: [],somme:0,
      facture:'',
      loopQte:[],
      options:[],
      selectOptions : [],
      selectOptions2 : [],
      selectOptions3 : [],
      quantitetotale:[],
      currentId:'',
      image:'',
      id: "",
      name: '',
      row:'',
      qte:'',
      sscatgorie: [],
        id: 0,
        nomSSC: '',
        show: false,

        isOpen: false,
        isOpen10:false,
        isOpen1: false,
        isOpen5: false,
        isOpen4: false,
        sscategorie: '',
        nomC:'',
        nomSC:'',
        nomF:'',
  categorieSId:'',
        fournisseur:'',
          showResponsable: false,
          showAdmin: false,
          img:'',
          data:'',
          res:'',
          nomA: '',
          descriptionA: '',
          prixTTC: '',
          dateExpiration: '',
          prixUnitaireInitial:'',
          TVA:'',
          image:null,
          sscategorieId:'',
          fournisseurId:'',
          promotion:'',
          marque:'',
          file:'',
          url:'',
          filename:'',
          filePDF:'',
          nomPDF:'',
          selectDepot:[]

    };
    this.handleChang = this.handleChang.bind(this);

    this.handleChang1 = this.handleChang1.bind(this);
    this.onFileChangeHandler=this.onFileChangeHandler.bind(this)
    this.onFileChangeHandler2=this.onFileChangeHandler2.bind(this)
    this.handleChang2 = this.handleChang2.bind(this);
    this.handleChangD=this.handleChangD.bind(this)

  }
  getQuantiteTotal(){
    let user = JSON.parse(localStorage.getItem('user'));
    fetch('http://localhost:4000/api/article/qte/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      }})
    
      .then(res => res.json())
      .then(res => this.setState({ loopQte: res }))
      .then(console.log(this.state.loopQte))
      .catch(err => console.log(err))
     
  }
  
  componentWillUnmount() {
    //clear the interval when/if component unmounts
    clearInterval(this.intervalId);
}
    componentDidMount() {
      this.getItems1()
      this.getItems2()
      this.intervalId = setInterval(() => this.getItems2(),10000);
      this.getDepot()
      this.getMarque()
      if(this.props.sscategories){
        const { id, nomSSC} = this.props.sscategories
         this.setState({ id, nomSSC})
     
      }
      this.getQuantiteTotal()
      this.getArticle(this.state.nomA)
      this.getOptions7()
      this.getOptions();
      this.getOptions5();
      this.getOptions2();
      this.getOptions1();
      this.getOptions3();
      this.getOptions6();
      const user = AuthService.getCurrentUser();
  
      if (user) {
        this.setState({
          showResponsable: user.role.includes("Responsable"),
          showAdmin: user.role.includes("Admin"),
          showResponsable: user.role.includes("Responsable de dépot"),

        });
      }
  
    }
    
    

  
onFileChangeHandler = (e) => {
  this.setState({ file: e.target.files[0] });   

}
 
onFileChangeHandler2 = (e) => {
  this.setState({ filePDF: e.target.files[0] });   

}
async getOptions5(){
  let user = JSON.parse(localStorage.getItem('user'));
const res =  await axios.get('http://localhost:4000/api/categorie/',  
  {headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + user.token
  },
})
.catch(err => console.log(err));
  const data = res.data

  const options = data.map(d => ({
    "value" : d.id,
    "label" : d.nomC

  }))
  
  this.setState({selectOptions5: options})

}
addItemToState = (item) => {
  this.setState(prevState => ({
    selectOptions5: [...prevState.selectOptions5, item]
  }))
}

updateState = (id) => {
  this.getOptions5();
}

 handleChangD(e){
  this.setState({stock_id:e.value, nom:e.label})

 }
 handleChangM(e){
  this.setState({marque_id:e.value, nomM:e.label})

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
handleChang(e){
  this.setState({sscategorieId:e.value, nomSSC:e.label})
 }
 AddArticle=()=>{  
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
AddFACTURE=(fournisseur,article)=>{  

  let user = JSON.parse(localStorage.getItem('user'));
  fetch('http://localhost:4000/api/qte_ajout/'+fournisseur+'/'+article, {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + user.token
  },
  method: 'post',
    body: JSON.stringify({ 
      date:this.state.date, 
      date:this.state.date, 

  })
})
    
alert('new categorie'+this.state.nomC+'is saved successfully..');
window.location.reload(false);

}

 handleChang2(e){
  this.setState({categorieSId:e.value, nomSC:e.label})
 }
   
 
handleChang1(e){
  this.setState({fournisseurId:e.value, nomF:e.label})
 }
 
  
handleChange= (e)=> {  
  let nam = e.target.name;
  let val = e.target.value;
  let err = '';
  let err1 = '';
  let err2 = '';
  let err3 = '';
  let err4= '';
  let err5 = '';
  let err6 = '';
  let err11 = '';
  let err12 = '';
  let err13 = '';


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
else if (nam === "prixTTC") {
  if (val !="" && !Number(val) ) {
    err2 = <strong>Votre prixTTC tel doit être un chiffre</strong>;
  }
}

else if (nam === "TVA"){

  if (val !="" && !Number(val)) {
    err4= <strong>Votre TVA doit être un chiffre </strong>;
  }
}

if (nam === "nomC"){
  
  if (val !="" && Number(val)) {
    err11 = <strong>Votre nom doit être un caractere </strong>;
  }
}
if (nam === "nomSC"){
  
  if (val !="" && Number(val)) {
    err12 = <strong>Votre nom doit être un caractere </strong>;
  }
}
if (nam === "nomSSC"){
  
  if (val !="" && Number(val)) {
    err13 = <strong>Votre nom doit être un caractere </strong>;
  }
}


  this.setState({errormessage: err});
  this.setState({errormessage1: err1});

  this.setState({errormessage2: err2});
  this.setState({errormessage3: err3});
  this.setState({errormessage4: err4});
  this.setState({errormessage6: err6});
  this.setState({errormessage5: err5});
  this.setState({errormessage11: err11});
  this.setState({errormessage12: err12});
  this.setState({errormessage13: err13});


  this.setState({ [e.target.name]: val});}  


  getCategorie(){
    let user = JSON.parse(localStorage.getItem('user'));

    fetch('http://localhost:4000/api/sscategorie',{   
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      }})
      .then(response => response.json())
      .then(sscategories => this.setState({sscategories}))
      .catch(err => console.log(err))
  }

    getCodeByArticle(){
      let user = JSON.parse(localStorage.getItem('user'));

      fetch('http://localhost:4000/api/article/code/'+this.state.currentId,{   
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + user.token
        }})
        .then(res => res.json())
        .then(res => this.setState({ items: res }))
        .catch(err => console.log(err))

    }
    getItems1(){
    let user = JSON.parse(localStorage.getItem('user'));

    fetch('http://localhost:4000/api/article/',{   
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      }})
      .then(res => res.json())
      .then(res => this.setState({ items: res }))
      .catch(err => console.log(err))
      fetch('http://localhost:4000/api/article/qte',{   
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + user.token
        }})
        .then(res => res.json())
        .then(res => this.setState({ quantitetotale: res }))
        .catch(err => console.log(err))
  }
  getItems2(){
    let user = JSON.parse(localStorage.getItem('user'));

    fetch('http://localhost:4000/api/article/',{   
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      }})
      .then(res => res.json())
      .then(res => this.setState({ items: res }))
      .catch(err => console.log(err))
      fetch('http://localhost:4000/api/article/qte',{   
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + user.token
        }})
        .then(res => res.json())
        .then(res => this.setState({ quantitetotale: res }))
        .catch(err => console.log(err))
  }
  
     
  UpdateArticle (oldValue, newValue, row, column)  {
    console.log("**")

    console.log("id"+row.id)
    console.log("qte"+row.qte)
    console.log("newValue"+newValue)



    let user = JSON.parse(localStorage.getItem('user'));    
    fetch('http://localhost:4000/api/article/'+row.id, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      },
      method: 'put',
      body: JSON.stringify({
        qte:( column.dataField=='qte' ?  newValue: row.qte),
        nomA:(column.dataField=='nomA' ?  newValue: row.nomA),
        descriptionA:(column.dataField=='descriptionA' ?  newValue: row.descriptionA),
        dateExpiration:(column.dataField=='dateExpiration' ?  newValue: row.dateExpiration),

        prixUnitaireInitial:(column.dataField=='prixUnitaireInitial' ?  newValue: row.prixUnitaireInitial),
        TVA:(column.dataField=='TVA' ?  newValue: row.TVA),
        promotion:(column.dataField=='promotion' ?  newValue: row.promotion),
        marque:(column.dataField=='marque' ?  newValue: row.marque),

        })

  
    })
    .then(row => this.setState({row}))

    .then(() => {

      this.setState({
        message: "The article was updated successfully!"

      })
      console.log("the article is updating");


  })
  .catch(err => console.log(err));
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
  
    this.setState({selectOptions: options})
  }
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
  async getArticle(nomA){
    console.log(nomA)
    console.log(this.state.nomA)
  
    let user = JSON.parse(localStorage.getItem('user'));
  const res =  await axios.get('http://localhost:4000/api/article/find/'+this.state.nomA,  
    {headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.token
    },
  })
    const data = res.data
  
    console.log(data)
    this.setState({article: data})
    console.log(this.state.article)
  
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
  async getOptions7(){
    let user = JSON.parse(localStorage.getItem('user'));
  const res =  await axios.get('http://localhost:4000/api/scategorie/',  
    {headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.token
    },
  })
    const data = res.data
  
    const options = data.map(d => ({
      "value" : d.id,
      "label" : d.nomSC
  
    }))
  
    this.setState({selectOptions7: options})
  
  }
  
  async getOptions2(){
    let user = JSON.parse(localStorage.getItem('user'));

    const res = await axios.get('http://localhost:4000/api/scategorie',{   
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
    }})
    const data = res.data

    const options = data.map(d => ({
      "value" : d.nomSC,
      "label" : d.nomSC
    }))
    this.setState({selectOptions2: options})
  }
  async getOptions3(){
    let user = JSON.parse(localStorage.getItem('user'));

    const res = await axios.get('http://localhost:4000/api/categorie',{   
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
    }})
    const data = res.data

    const options = data.map(d => ({
      "value" : d.id,
      "label" : d.nomC
    }))
    this.setState({selectOptions3: options})

  }


  componentDidUpdate(prevState){
   /*if (prevState.selectOptions3 != this.state.selectOptions3){
      this.getOptions3();
    }*/
   
  }

  

  render() 
  {     

    const { showResponsable , showAdmin } = this.state; 
    const defaultSorted = [
      {
        dataField: "id",
        text: "ID",
      }
    ];
    const qteTotal=this.state.loopQte;
    console.log(qteTotal)
    let products = this.state.items;
    const quantiteT=this.state.quantitetotale;
    const hiddenStaff = [];

    function ImageFormatter(cell, row) {
        return (
          <img alt="scan"  width="150" height="150" src={'http://localhost:4000/uploads/'+cell} alt="img" />
        )
      }
      function GetQuantite(cell, row) {
        var qte

             return (
              qteTotal.forEach(valeur => {
                if (valeur.id==row.id){
                  qte=valeur.sum 
                }
           }),
           <p>{qte}</p>
          
         
          
        )
      }
    
   
      
      function deleteFormatter(cell, row ,rows, e) {  
       
      const arrayCopy=[]
        console.log(row)
        const id=row.id
        return (

         <DeleteIcon  onClick={() =>  
            { 
              let user = JSON.parse(localStorage.getItem('user'));
            let confirmDelete = window.confirm('Supprimer définitivement cet élément?')
     if(confirmDelete){
          fetch('http://localhost:4000/api/article/'+id, {
            method: 'delete',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + user.token
            },
            body: JSON.stringify({
              id
            })
          })

          .then(res => console.log(res))
          .catch(err => console.log(err))}
          window.location.reload(false);


        }
        
      } 
          
          ></DeleteIcon>
         
        )
        
          }

         

              
                
      
     const columns = [
      { dataField: "id", text: "Id",
     },
      {
        dataField: "nomA",
        text: "nom",
      },
      { dataField: 'image', text: "Image" , 
       formatter: ImageFormatter

    },
    /*  { dataField:"id", text: "Quantité totale" ,       formatter: GetQuantite
    },*/


      { dataField: "prixTTC", text: "Prix Vente"	, sort: true },

      { dataField: "sscategorie.nomSSC", text: "SSCategorie",
      
      filter: selectFilter({
        options: this.state.selectOptions,
        placeholder: " ",
        //   className: "test-classname",
        //   withoutEmptyOption: true,
        defaultValue: 2,
        comparator: Comparator.LIKE,
        getFilter: (filter) => {
          // qualityFilter was assigned once the component has been mounted.
               },
        onFilter: (filterValue) => {
           //filter = filterValue;
          //...
        },
      }), sort: true },
      
      { dataField: "sscategorie.sous-categorie.nomSC", text: "SCategorie", 
      filter: selectFilter({
        options: this.state.selectOptions2,
        placeholder: " ",
        //   className: "test-classname",
        //   withoutEmptyOption: true,
        defaultValue: 2,
        comparator: Comparator.LIKE,
        getFilter: (filter) => {
          // qualityFilter was assigned once the component has been mounted.
          // qualityFilter = filter;
        },
        onFilter: (filterValue) => {
          // filter = filterValue;
          //...
        },
      }), sort: true ,sort: true },
      { dataField: "sscategorie.sous-categorie.categorie.nomC", text: "Categorie", 
      filter: selectFilter({
        options: this.state.selectOptions3,
        placeholder: " ",
        //   className: "test-classname",
        //   withoutEmptyOption: true,
        defaultValue: 2,
        comparator: Comparator.LIKE,
        getFilter: (filter) => {
          // qualityFilter was assigned once the component has been mounted.
          // qualityFilter = filter;
        },
        onFilter: (filterValue) => {
          // filter = filterValue;
          //...
        },
      }), sort: true ,sort: true },
      { dataField: "id", text: "Actions", formatter:deleteFormatter},

    ];
  ;
    
    let user = JSON.parse(localStorage.getItem('user'));
        
const openModel10 = ()=>this.setState({isOpen10:true});
const closeModel10 = ()=>this.setState({isOpen10:false});

const openModel = ()=>this.setState({isOpen:true});
const closeModel = ()=>this.setState({isOpen:false});
    const handleClose = () => this.setState({show:false});
    const handleShow = () => this.setState({show:true});     
const expandRow = {
 
   renderer:  row => ( 
    showAdmin && (  <div>
     

      <p>{ `Description: ${row.descriptionA}` }</p>
            <p> { `Fournisseur: ${row.fournisseur.nomF}` } </p>
            <p>   { `Prix Achat: ${row.prixUnitaireInitial}` }  </p>
            <p>   { `Prix vente sans promo : ${row.prixTTC}` }  </p>
            <p>   { `Promotion: ${row.promotion}` }  </p>
            <p>   { `TVA: ${row.TVA}` }  </p>
            <p>Facture:
          { (row.facture[0]!=null) &&
            <div className = "App">
          <a href = {'http://localhost:4000/uploads/'+row.facture[0].quantite_ajout.file} target = "_blank">Facture Pdf</a>
        </div> 
}   
<br></br>
      <div>
<Button variant="primary" onClick={handleShow}>
        Detail
      </Button>


      <Modal show={this.state.show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>  
     <DetailArticle
                 isNew={false}
                 item={row}
                  />
</Modal.Body>
      
        <Modal.Footer>
        
    
        </Modal.Footer>
      </Modal>
        <Button className="btnnn"  variant="secondary" style={{ float: 'right' }}  onClick={openModel10}> Ajouter Facture </Button> 
      <Modal show = {this.state.isOpen10}>
        <Modal.Header closeButton onClick={closeModel10}>
          <Modal.Title>Ajouter Facture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form className="form">  
      <Col> 
      <FormGroup row>  
          <Label for="Référence facture" sm={2}>Référence facture</Label>  
          <Col sm={10}>  
            <Input type="text" name="Référence facture" onChange={this.handleChange} value={this.state.modalitePaiement} placeholder="Enter référence facture" />  
          </Col>  
        </FormGroup>   
        <FormGroup row>  
          <Label for="date" sm={2}>Date</Label>  
          <Col sm={10}>  
            <Input type="date" name="date" onChange={this.onChange} value={this.state.date} placeholder="Enter Date FACTURE" />  
          </Col>  
        </FormGroup>  
  
     
        
      </Col>  
     </Form>  
        </Modal.Body>
        <Modal.Footer>
        <Button variant="success" onClick={this.AddFACTURE}>Valider</Button>
      
      
        </Modal.Footer>
      </Modal>
      </div></p>
    </div>) ||
        showResponsable && (  <div>
          <p>{ `Description: ${row.descriptionA}` }</p>
         </div>)
  ),
  showExpandColumn: true ,
};
    const selectRow = {
      mode: "checkbox",
      clickToSelect: true,
      clickToEdit: true,
      clickToExpand: true,

      style: { backgroundColor: "#CCCCCC" },
      onSelect: (row, isSelect, rowIndex, e) => {
        e.preventDefault();
        console.log("====onSelect====");
        console.log("row=>", row);
        console.log("isSelect=>", isSelect);
        
        console.log("rowIndex=>", rowIndex);
        this.setState({ selectedRow: row });
        hiddenStaff.push(rowIndex)  


      },
      onSelectAll: (isSelect, rows, e) => {
        e.preventDefault();
        console.log("====onSelectAll====");
        console.log("rows=>", rows);
        console.log("isSelect=>", isSelect);
        this.setState({ selectedRow: rows });
      },
    
    };
    
    const options = {
      custom: true,
      sizePerPage: 3,
      totalSize: products.length,
      showTotal: true, // display pagination information
      firstPageText: "First", // the text of first page button
      prePageText: "Prev", // the text of previous page button
      nextPageText: "Next", // the text of next page button
      lastPageText: "Last", // the text of last page button
      nextPageTitle: "Go to next", // the title of next page button
      prePageTitle: "Go to previous", // the title of previous page button
      firstPageTitle: "Go to first", // the title of first page button
      lastPageTitle: "Go to last", // the title of last page button


    };

    const MyExportCSV = (props) => {
      const handleClick = () => {
        props.onExport();
      };
      return (
        
 <button className="btn-ino" onClick={ handleClick }>Exporter CSV</button>       
      );
    };
    


    return (
      <Fragment>
       <Row><Col><br></br> <br></br>
      <br></br>
      <br></br>
      <br></br>
      </Col></Row>
        <ToolkitProvider
          keyField='id'
        data={products}
          columns={columns}
          headerClasses='header-class'
          bootstrap4={true}
          
          exportCSV={{ onlyExportFiltered: true, exportAll: false } }
          search
        >
         {(props) => (
            <div className='row'>
              
              <div className='col-md-12'>
              {showAdmin && (
                    <div class="dropdown">

                    <button class="btn-info dropdown-toggle"  type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fa fa-plus" aria-hidden="true">
                     </i></button>
                      
<MyExportCSV { ...props.csvProps } />

<ExportCSV {...props.csvProps} />  
    <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
    <li>  <ModalA  buttonLabel="Add Article" isNew={true}  /></li>
    <li>   <ModalCat  selectOptions5={this.state.selectOptions5} buttonLabel="Add Categorie" isNew={true} addItemToState={this.addItemToState} /></li>
    <li>  <ModalSCategorie buttonLabel="Add Sous Categorie" isNew={true}  /> </li> 
      <li><ModalSSCategorie buttonLabel="Add sous sous Categorie" isNew={true} /></li> 
      <li><ModalSSCategorie buttonLabel="Add sous sous Categorie" isNew={true} /></li> 


              </ul>
              </div>
              )}
        
                <PaginationProvider pagination={paginationFactory(options)}>
                  {({ paginationProps, paginationTableProps }) => (
                    <div>
                   

                          <SearchBar
                            {...props.searchProps}
                            className=' info'
                            delay={1000}
                            placeholder='Recherche'
                          />
                    
                       

                      <div>

                        <BootstrapTable 
                        
                          ref={(n) => (this.node = n)}
                          noDataIndication='Aucun enregistrement trouvé '
                          defaultSorted={defaultSorted}
                          {...paginationTableProps}
                          {...props.baseProps}
                          columns={columns}
                          data={products}
                          classes='comparisonTable table table-bordered table-striped'
                          bootstrap4={true}
                          wrapperClasses='table-responsive'
                          filterPosition={"top"}
                          filter={filterFactory()}
                          bordered={false}
                          selectRow={selectRow}
                          remote={ {
                            data: true,
                            selectRow:true,
                            formatter:true
                          } }
                          rowEvents={ this.rowEvents }
                          loading={ true }  //only loading is true, react-bootstrap-table will render overlay
                          expandRow=   { expandRow }
                          cellEdit={ cellEditFactory({ mode: 'dbclick' ,
                          blurToSave: true,
                          onStartEdit: (row, column, rowIndex, columnIndex) => { console.log('start to edit!!!'); },
    beforeSaveCell: (oldValue, newValue, row, column) => {  this.UpdateArticle(oldValue, newValue, row, column) },
    afterSaveCell: (oldValue, newValue, row, column) => { console.log('After Saving Cell!!');}
                       } )
                        }
                        
                        deleteRow/>
                

                      </div>
                      <div
                        style={{
                          margin: "-12px",
                          marginTop: "-20px",
                          marginRight: "0px",
                          float: "right",
                        }}
                      >
                        <PaginationListStandalone {...paginationProps} />
                      </div>
                    </div>
                  )}
                </PaginationProvider>
              </div>
            </div>
          )}
        </ToolkitProvider>
      </Fragment>

    );
  }
}
export default Article;