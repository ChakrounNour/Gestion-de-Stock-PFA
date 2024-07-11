import { Table } from 'reactstrap';
import '../style.css'  ;
import Select from 'react-select';
import ModalForm from '../Modals/Modal'
import ModalF from '../Modals/ModalF'
import React, { Component, Fragment } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
import cellEditFactory from 'react-bootstrap-table2-editor';
import DeleteIcon from '@material-ui/icons/Delete';
import {Modal } from 'react-bootstrap';
import { Container, Col, Form, Row, FormGroup, Label, Input } from 'reactstrap';
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
class HistArticle extends React.Component{  
  
    state = {
       items:[],
       items2:[],
       commandes:[],
       listeArticles:[]
        }
        handleAddEvent(evt) {
            var product = {
              nomA: "empty row",
              descriptionA: "mpty row"
            }
            this.state.listeArticles.push(product);
            this.setState(this.state.listeArticles);
        
          }    
getArticleByMagasin (){
  //const id=this.props.item.id
  let user = JSON.parse(localStorage.getItem('user'));
  fetch('http://localhost:4000/api/magasin/'+this.props.item.id,{   
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.token
    }})
  .then(res => res.json())
  .then(res => this.setState({ listeArticles: res.stock1 }))
  .catch(err => console.log(err))
}
UpdateMagasin (oldValue, newValue, row, column)  {
  console.log("**")
  console.log("id"+row.stock_article.id)
  console.log(column.id)
  console.log("newValue"+newValue)



  let user = JSON.parse(localStorage.getItem('user'));    
  fetch('http://localhost:4000/api/magasin/stock_article/'+row.stock_article.id, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.token
    },
    method: 'put',
    body: JSON.stringify({
      qteArticle: newValue,
  

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

  
      componentDidMount(){
        // if item exists, populate the state with proper data
        if(this.props.item){
          const { id, nom, adresseLocal, label} = this.props.item
          this.setState({ id, nom, adresseLocal, label})
        }
        console.log("article id "+this.state.id)

        this.getArticleByMagasin()


      }
    
      
      
      render() {
        console.log(this.state.listeArticles)
    
        function ImageFormatter(cell, row) {
            return (
              <img alt="scan"  width="100" height="100" src={'http://localhost:4000/uploads/'+cell} alt="img" />
            )
          }
        const defaultSorted = [
          {
            dataField: "id",
            order: "asc",
          },
        ];
        const products = this.state.listeArticles;
      
          
     
        const columns = [
          { dataField: "stock_article.id", text: "Id"},
          {
            dataField: "nomA",
            text: "Nom",
          },
          { dataField: "image", text: "Image"    ,    formatter: ImageFormatter},

          { dataField: "stock_article.qteArticle", text: "Quantité magasin" },




    
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
       
        
    
        return (
            
          <Fragment>
            
            <ToolkitProvider
              keyField='id'
              data={products}
              columns={columns}
              headerClasses='header-class'
              bootstrap4={true}
              
            >
              {(props) => (
                <div className='row'>
                  
    
                  <div className='col-md-12'>
   
    
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
    
                            <ExportCSV {...props.csvProps} /> &nbsp; &nbsp;
                        
                          </div>

                          <div>
                            <BootstrapTable 
                              ref={(n) => (this.node = n)}
                              noDataIndication='Aucun enregistrement trouvé'
                              defaultSorted={defaultSorted}
                              {...paginationTableProps}
                              {...props.baseProps}
                              onRowAdd={this.handleAddEvent.bind(this)}
                              columns={columns}
                              classes='comparisonTable table table-bordered table-striped'
                              bootstrap4={true}
                              wrapperClasses='table-responsive'
                              filterPosition={"top"}
                              filter={filterFactory()}
                              bordered={false}
                              selectRow={selectRow}
                              cellEdit={ cellEditFactory({ mode: 'dbclick' ,
                              blurToSave: true,
                              onStartEdit: (row, column, rowIndex, columnIndex) => { console.log('start to edit!!!'); },
        beforeSaveCell: (oldValue, newValue, row, column) => {  this.UpdateMagasin(oldValue, newValue, row, column) },
        afterSaveCell: (oldValue, newValue, row, column) => { console.log('After Saving Cell!!');}
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
    
  
   
export default HistArticle;