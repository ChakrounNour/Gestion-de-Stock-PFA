import React, { Component, Fragment } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
import cellEditFactory from 'react-bootstrap-table2-editor';
import DeleteIcon from '@material-ui/icons/Delete';
import AuthService from "../services/auth.service";
import {Modal } from 'react-bootstrap';
import { Container, Col, Form, Row, FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select';
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";

import filterFactory, {
  selectFilter,
  Comparator,
} from "react-bootstrap-table2-filter";
import ToolkitProvider, {
  CSVExport,
  Search,
} from "react-bootstrap-table2-toolkit";
import Button from 'react-bootstrap/Button'
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
class Magasin extends Component {
  constructor(props) {
    super();
    this.state = {
      isOpen: false,
      selectOptions:'',
      selectedRow: null,
      showResponsable: false,
      showAdmin: false,
      items: [],
      selectOptions : [],
      nomCli: '',
      prenomCli: '',
      telCli: '',
      adresseCli:'',
      id: 0,

    };
  }
  async getOptions(){
    let user = JSON.parse(localStorage.getItem('user'));
  const res =  await axios.get('http://localhost:4000/users/getallresponsable',  
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
  handleChange(e){
    this.setState({userId:e.value, email:e.label})
   }
  UpdateMagasin (oldValue, newValue, row, column,rows)  {
    let user = JSON.parse(localStorage.getItem('user'));    
    console.log(row.userId)
    console.log(column.dataField)

    fetch('http://localhost:4000/api/magasin/'+row.id, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      },
      method: 'put',
      
      body: JSON.stringify({
       
        nom:( column.dataField=='nom' ?  newValue: row.nom),
        adresseLocal:column.dataField=='adresseLocal' ? newValue : row.adresseLocal,
        userId :column.dataField=='user.email' ? newValue: row.userId,
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
handleChange= (e)=> {  
  this.setState({[e.target.name]:e.target.value});  
  } 
 
openModel = ()=>this.setState({isOpen:true});
closeModel = ()=>this.setState({isOpen:false});

  getItems(){
    let user = JSON.parse(localStorage.getItem('user'));

    fetch('http://localhost:4000/api/magasin/',{   
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      }})
      .then(response => response.json())
      .then(items => this.setState({items}))
      .catch(err => console.log(err))
  }
  
  AddMagasin=()=>{  
  let user = JSON.parse(localStorage.getItem('user'));
  fetch('http://localhost:4000/api/magasin/'+this.state.id, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.token
    },
    method: 'put',
    body: JSON.stringify({
      id: this.state.id,
      nom: this.state.nom,
      adresseLocal: this.state.adresseLocal,
      nom:this.state.nom,
      userId: this.state.userId
    })
  })
  .then(res => res.json())
          .then(item => {
              this.props.addItemToState(item);
              this.props.toggle();
          })
          .catch(err => console.log(err));
  
alert('new Client'+this.state.nomCli+'is saved successfully..');
this.closeModel();
}

 componentDidMount(){
    const user = AuthService.getCurrentUser();
    this.getItems()
    if (user) {
      this.setState({
        showResponsable: user.role.includes("Responsable"),
        showAdmin: user.role.includes("Admin"),
        showSousAdministrateur: user.role.includes("sous-administrateur"),

      });
    }
  }

  
  render() 
  {
    console.log(this.state.items)
    const { showResponsable , showAdmin } = this.state;
    const defaultSorted = [
      {
        dataField: "id",
        order: "asc",
      },
    ];
    const products = this.state.items;
    const cellEdit = cellEditFactory({
      mode: 'click',
      
    });
    const rowEvents = {
      onClick: (e, row, rowIndex) => {
      }
    };
      
    function deleteFormatter(cell, row ,rows, e) {  
      const id=row.id
        return (
         <DeleteIcon  onClick={() =>  
            { 
            let user = JSON.parse(localStorage.getItem('user'));
            let confirmDelete = window.confirm('Supprimer définitivement cet élément?')
      if(confirmDelete){
          fetch('http://localhost:4000/api/magasin/'+id, {
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
        
      }  ></DeleteIcon>
         
        )
        
          }
          
    const columns = [
      { dataField: "id", text: "Id"},
      {
        dataField: "nom",
        text: "Nom",
      },
      { dataField: "adresseLocal", text: "Adresse Local" },
      { dataField: "user.email", text: "Responsable" },

       { dataField: "id", text: "Actions", formatter:deleteFormatter},


    ];
  ;
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
        <div>
          <button className="btn btn-success" onClick={ handleClick }>Click me to export CSV</button>
        </div>
      );
    };
    

    return (
      <Fragment>
            <div><br>
        </br></div>
        <div><br>
        </br></div>
        <div><br>
        </br></div>
        <div><br>
        </br></div>
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
                <div>
 <Button variant="secondary" style={{ float: 'right' }}  onClick={this.openModel}> Ajouter Magasin </Button> 
      <Modal show = {this.state.isOpen} onExit={reload}
      >
        <Modal.Header closeButton onClick={this.closeModel}>
          <Modal.Title>Ajouter Magasin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form className="form"> 
        <Col>  
        <FormGroup row>   
          <Label for="nomM">Nom Magasin</Label>
          <Col sm={10}>  

          <Input type="text" name="nomM" id="nomM" onChange={this.onChange} value={this.state.nomM === null ? '' : this.state.nomM} />
              </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="adresseLocalM">Adresse local</Label>
          <Col sm={10}>  

          <Input type="text" name="adresseLocalM" id="adresseLocalM" onChange={this.onChange} value={this.state.adresseLocalM === null ? '' : this.state.adresseLocalM}   />
          </Col>
        </FormGroup>
  
        <FormGroup row>
        <div>

        <Select name="userId" id="userId" options={this.state.selectOptions} onChange={this.handleChange.bind(this)}  />
    <p>Vous avez sélectionné <strong>{this.state.email} </strong> ID {this.state.userId}</p>
      </div>
        </FormGroup >
        </Col>
      </Form>
      
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.closeModel} >
            Close
          </Button>
          <Button variant="success" onClick={this.AddMagasin}>Save</Button>
        </Modal.Footer>
      </Modal>

</div>
)}

                <PaginationProvider pagination={paginationFactory(options)}>
                  {({ paginationProps, paginationTableProps }) => (
                    <div>
                      <div className='btn-list'>
                        <div>

                          <SearchBar
                            {...props.searchProps}
                            className='custome-search-field'
                            delay={1000}
                            placeholder='Recherche'
                          />
                        </div>
                        <MyExportCSV { ...props.csvProps } />

                        <ExportCSV {...props.csvProps} /> &nbsp; &nbsp;
                    
                      </div>

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
                          cellEdit={ cellEditFactory({ mode: 'dbclick' ,
                          blurToSave: true,
                          onStartEdit: (row, column, rowIndex, columnIndex) => { console.log('start to edit!!!'); },
                                    beforeSaveCell: (oldValue, newValue, row, column) => {  this.UpdateMagasin(oldValue, newValue, row, column);
                                    console.log(oldValue, newValue, row, column) },
                                    afterSaveCell: (oldValue, newValue, row, column) => { console.log('After Saving Cell!!');
                                    }
                        } )
                        }

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
                          <br></br>
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
export default Magasin;