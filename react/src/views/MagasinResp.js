import React, { Component,useState , Fragment } from "react";
import FilterListIcon from '@material-ui/icons/FilterList';
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
import DetailArticle from "../components/detail.js";
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

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
class MagasinResp extends Component {
  
  constructor(props) {

    super(props);

   this.state = {
      idSmagasin:this.props.location.aboutProps ===undefined? null:this.props.location.aboutProps.id,
    // idSmagasin:this.props.location.aboutProps.id,
      selectedRow: null,    
      items: [],somme:0,
      facture:'',
      loopQte:[],
      selectOptions : [],
      selectOptions2 : [],
      selectOptions3 : [],
      quantitetotale:[],
      currentId:'',
      image:'',
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
          showSousAdministrateur:false,
          showResponsableDepot:false,
          articles: [],
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
          selectDepot:[],
          sscategorieAll:[],
          scategroiesAll:[],
          categoriesAll:[],
          marqueAll:[]

    };
    this.handleChang = this.handleChang.bind(this);
    this.handleChang1 = this.handleChang1.bind(this);
    this.onFileChangeHandler=this.onFileChangeHandler.bind(this)
    this.onFileChangeHandler2=this.onFileChangeHandler2.bind(this)
    this.handleChang2 = this.handleChang2.bind(this);
    this.handleChang5 = this.handleChang5.bind(this);
    this.handleChangD=this.handleChangD.bind(this)
    this.getArticleMagasin=this.getArticleMagasin.bind(this)
    this.getAllSSCategorie=this.getAllSSCategorie.bind(this)
    this.getAllSCategorie=this.getAllSCategorie.bind(this)
    this.getMarque=this.getMarque.bind(this)
    this.getAllcatgorie=this.getAllcatgorie.bind(this)


  }

     componentWillMount(){
      if(this.props.sscategories){
        const { id, nomSSC} = this.props.sscategories
         this.setState({ id, nomSSC})
     
      }
     
      const user = AuthService.getCurrentUser();
  
      if (user) {
        this.setState({
          showResponsable: user.role.includes("responsable de magasin"),
          showResponsableDepot: user.role.includes("responsable de dépôt"),
          showAdmin: user.role.includes("Admin"),
          showSousAdministrateur: user.role.includes("sous-administrateur"),

        });
      }
      console.log(this.props.location.aboutProps)
        console.log(this.props.location.aboutProps)

      if (this.state.idSmagasin!=null)
        this.getArticleMagasin(this.state.idSmagasin)
        this.getAllSSCategorie()
        this.getAllSCategorie()
        this.getMarque();
        this.getAllcatgorie()
    }
    
    componentDidUpdate(prevProps, prevState) {
      // Utilisation classique (pensez bien à comparer les props) :
      if (this.state.idSmagasin !=undefined && this.props.location.aboutProps.id!= undefined){
        console.log("idSmagasin"+this.state.idSmagasin)
      if (this.props.location.aboutProps.id !== prevProps.location.aboutProps.id ) {
        this.getArticleMagasin(this.props.location.aboutProps.id)
      }
      }
    }
  async getArticleMagasin (id){
      let user = JSON.parse(localStorage.getItem('user'));
      const res = await axios.get('http://localhost:4000/api/article/ByMagasin/'+id,  
        {headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + user.token
         },
        })
      
      this.setState({ articles: res.data })
      console.log(this.state.articles)

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
  const data = res.data

  const options = data.map(d => ({
    "value" : d.id,
    "label" : d.nomC

  }))

  this.setState({selectOptions5: options})

}

handleChang5(e){
  this.setState({categorieId:e.value, nomC:e.label})
 }
 handleChangD(e){
  this.setState({stock_id:e.value, nom:e.label})

 }
 handleChangM(e){
  this.setState({marque_id:e.value, nomM:e.label})

 }    
 
   
AddSCategorie=()=>{  
  let user = JSON.parse(localStorage.getItem('user'));
  fetch('http://localhost:4000/api/scategorie/'+this.state.categorieId, {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + user.token
  },
  method: 'post',
    body: JSON.stringify({ nomSC:this.state.nomSC,nomC:this.state.nomC
  })
})
    
alert('new Sous categorie '+this.state.nomSC+'is saved successfully..');
window.location.reload(false);
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
 AddCategorie=()=>{  

  let user = JSON.parse(localStorage.getItem('user'));
  fetch('http://localhost:4000/api/categorie', {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + user.token
  },
  method: 'post',
    body: JSON.stringify({ nomC:this.state.nomC, 
  })
})
    
alert('new categorie'+this.state.nomC+'is saved successfully..');
window.location.reload(false);

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

 AddSSCategorie=()=>{  
  let user = JSON.parse(localStorage.getItem('user'));
  fetch('http://localhost:4000/api/sscategorie/'+this.state.categorieSId, {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + user.token
  },
  method: 'post',
    body: JSON.stringify({ nomSC:this.state.nomSC,nomSSC:this.state.nomSSC,
  })
})
alert('new sscategorie'+this.state.nomSSC+'is saved successfully..');
window.location.reload(false);
}
   
 handleChang2(e){
  this.setState({categorieSId:e.value, nomSC:e.label})
 }
   
 
handleChang1(e){
  this.setState({fournisseurId:e.value, nomF:e.label})
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
       
      
            
          
          .then(res=>console.log(res))

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
        window.location.reload(false);
      })       
        
      .catch(error => console.log(error));
  }
}

openModel10 = ()=>this.setState({isOpen10:true});
closeModel10 = ()=>this.setState({isOpen10:false});
openModel4 = ()=>this.setState({isOpen4:true});
closeModel4 = ()=>this.setState({isOpen4:false});
openModel5 = ()=>this.setState({isOpen5:true});
closeModel5 = ()=>this.setState({isOpen5:false});
closeModel7 = ()=>this.setState({isOpen7:false});

openModel1 = ()=>this.setState({isOpen1:true});
closeModel1 = ()=>this.setState({isOpen1:false});
openModel = ()=>this.setState({isOpen:true});
closeModel = ()=>this.setState({isOpen:false});


  


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
  
     
  UpdateArticle (oldValue, newValue, row, column)  {
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

    const res = await axios.get('http://localhost:4000/api/sscategorie',{   
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
    }})
    const data = res.data
  
    
    const options = data.map(d => ({
      "value" : d.nomSSC,
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
      "value" : d.nomM,
      "label" : d.nomM
  
    }))
  
    this.setState({marqueAll: options})
  
  }
  async getAllcatgorie(){
    let user = JSON.parse(localStorage.getItem('user'));
  const res =  await axios.get('http://localhost:4000/api/categorie/',  
    {headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.token
    },
  })
    const data = res.data
  
    const options = data.map(d => ({
      "value" : d.nomC,
      "label" : d.nomC
  
    }))
  
    this.setState({categoriesAll: options})
  
  }
  
  async getAllSCategorie(){
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
    this.setState({scategroiesAll: options})
  }
  async getAllSSCategorie(){
    let user = JSON.parse(localStorage.getItem('user'));

    const res = await axios.get('http://localhost:4000/api/sscategorie',{   
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
    }})
    const data = res.data

    const options = data.map(d => ({
      "value" : d.nomSSC,
      "label" : d.nomSSC
    }))
    this.setState({sscategorieAll: options})
  }

  render() 
  {    
    const defaultSorted = [
      {
        dataField: "id",
        order: "asc",
      },
    ];
    const products = this.state.articles;
    const cellEdit = cellEditFactory({
      mode: 'click',
      
    });
    const rowEvents = {
      onClick: (e, row, rowIndex) => {
      }
    };
    const columns = [
      { dataField: "id", text: "Id"},
      {
        dataField: "nomA",
        text: "Nom",
      },
      { dataField: "descriptionA", text: "Description" },
      { dataField: "prixTTC", text: "Prix de vente" },
      { dataField: 'image', text: "Image" , 
      formatter: ImageFormatter

      },      
      { dataField: "nomSSC", text: "nomSSC",
      
      filter: selectFilter({
        options: this.state.sscategorieAll,
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
      { dataField: "nomSC", text: "nomSC" ,
      filter: selectFilter({
        options: this.state.scategroiesAll,
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
      }), sort: true},

      { dataField: "nomC", text: "nomC" ,
      filter: selectFilter({
        options: this.state.categoriesAll,
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
      }), sort: true},
      { dataField:"nomM",text :"nomM",
      filter: selectFilter({
        options: this.state.marqueAll,
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
      }), sort: true}


    ];
  ;
  function ImageFormatter(cell, row) {
    return (
      <img alt="scan"  width="150" height="150" src={'http://localhost:4000/uploads/'+cell} alt="img" />
    )
  }

    const selectRow = {
      mode: "checkbox",
      clickToSelect: true,
      style: { backgroundColor: "#CCCCCC" },
      onSelect: (row, isSelect, rowIndex, e) => {
        e.preventDefault();
        console.log("====onSelect====");
        console.log("row=>", row);
        console.log("isSelect=>", isSelect);
        console.log("rowIndex=>", rowIndex);
        this.setState({ selectedRow: row });
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
      sizePerPage: 10,
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
        <div>
          
 <button className="btn-info" onClick={ handleClick }>Exporter CSV</button>       
        </div>
      );
    };
    

    return (
      <Fragment>
        <div><br></br>
        </div>
        <div><br></br>
        </div> 
        <div><br></br>
        </div> 
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
              <br></br><br></br>
              <MyExportCSV { ...props.csvProps } />

<ExportCSV {...props.csvProps} /> 
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
                          classes='comparisonTable table table-bordered table-striped'
                          bootstrap4={true}
                          wrapperClasses='table-responsive'
                          filterPosition={"top"}
                          filter={filterFactory()}
                          bordered={false}
                          selectRow={selectRow}
                          rowEvents={ rowEvents } 

                        />
                         
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
export default MagasinResp;