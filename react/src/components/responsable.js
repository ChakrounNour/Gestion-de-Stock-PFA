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
class Responsable extends Component {
  constructor(props) {
    super();
    this.state = {
      selectedRow: null,
      
      items: [],
      selectOptions : [],
      id: 0,
 

    };
  }
 
  getItems(){
    let user = JSON.parse(localStorage.getItem('user'));

    fetch('http://localhost:4000/users/getallresponsable',{   
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      }})
      .then(response => response.json())
      .then(items => this.setState({items}))
      .catch(err => console.log(err))
  }


 componentDidMount(){
    this.getItems()

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
        dataField: "nom",
        text: "Nom",
      },
      { dataField: "prenom", text: "Prénom" },
      { dataField: "tel", text: "Téléphone" },
      { dataField: "email", text: "Adresse Email" },
      { dataField: "role", text: "Rôle" },

    ];
  ;
    let user = JSON.parse(localStorage.getItem('user'));
    const op = products.map(d => ({
      "image" :console.log(d.image)
    }))
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
export default Responsable;