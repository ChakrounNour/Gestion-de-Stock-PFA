import React, { Component, Fragment } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
import cellEditFactory from 'react-bootstrap-table2-editor';


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
class  DetailArticle extends Component {
  constructor(props) {
    super();
    this.state = {
      selectedRow: null,
codes:[],
      items: [],
      selectOptions : [],
      id: 0,
      art_id:0
 

    };
  }
 
  getItems(){
    let user = JSON.parse(localStorage.getItem('user'));
console.log(this.props.item.id)
    fetch('http://localhost:4000/api/article/code/'+this.props.item.id,{   
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      }})
      .then(response => response.json())
      .then(items => this.setState({items}))
      .catch(err => console.log(err))
  }
  
     
  UpdateArticle (oldValue, newValue, row, column)  {
    console.log("**")

    console.log("id"+row.id)
    console.log("qte"+row.qte)
    console.log("newValue"+newValue)



    let user = JSON.parse(localStorage.getItem('user'));    
    fetch('http://localhost:4000/api/code/'+row.id, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      },
      method: 'put',
      body: JSON.stringify({
        qte:( column.dataField=='qte' ?  newValue: row.qte),
        dateExpiration:(column.dataField=='dateExpiration' ?  newValue: row.dateExpiration),

    

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
    console.log(this.props.item.row)
    if(this.props.item){
      const { id,nomA} = this.props.item
      this.setState({ id,nomA})
    }
 

    console.log(this.props.item.id)
    this.getItems()

    console.log("aa"+this.state.codes)

  }

  
  render() 
  {
 
    const defaultSorted = [
      {
        dataField: "id",
        order: "asc",
      },
    ];
    const products = this.state.items;
  
    const rowEvents = {
      onClick: (e, row, rowIndex) => {
      }
    };
    const columns = [
      { dataField: "id", text: "Id"},
      {
        dataField: "qte",
        text: "Quantité",
      },
      { dataField: "dateExpiration", text: "date expiration" },
    

    ];
  ;
    let user = JSON.parse(localStorage.getItem('user'));
  
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
   
    

    return (
      <Fragment>
       
        <ToolkitProvider
          keyField='id'
          data={products}
          columns={columns}
          headerClasses='header-class'
          bootstrap4={true}
          search
        >
          {(props) => (
            <div className='row'>
              

              <div className='col-md-12'>
              <br></br>

                <PaginationProvider pagination={paginationFactory(options)}>
                  {({ paginationProps, paginationTableProps }) => (
                                       
                

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
    beforeSaveCell: (oldValue, newValue, row, column) => {  this.UpdateArticle(oldValue, newValue, row, column) },
    afterSaveCell: (oldValue, newValue, row, column) => { console.log('After Saving Cell!!');}
                       } )
                        }
                        />
                         
                 
                      <div
                        style={{
                          margin: "-12px",
                          marginTop: "-20px",
                          marginRight: "40px",
                          right :"142px",
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
export default  DetailArticle;