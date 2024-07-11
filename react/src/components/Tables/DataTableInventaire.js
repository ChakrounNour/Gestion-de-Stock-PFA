import { Modal } from 'bootstrap';
import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalInventaire from '../Modals/ModalInventaire';
import {
  Badge,
  Card,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import  jsPDF  from  'jspdf'
import { CSVLink } from "react-csv";
export const ExportReactCSV = ({csvData, fileName}) => {
  return (
      <button  class="btn btn-success info2">
          <CSVLink data={csvData} filename={fileName}>Exporter csv</CSVLink>
      </button>
  )
}
const headers = [["ID", "Nom Article","Année","prixVente", "Type","Etat de stock", "Qte Stock"]];


class DataTableInventaire extends Component {
  state={
    filename:''
  }
  customers = () => {
    let custs = []
    for (let i = 0; i <= 25; i++) {
      this.props.items.inventaire_art.push({nomA: `nomA${i}`, prixTTC: `prixTTC${i}`,
   });
    }
    return custs;
  }
  exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new CSVLink(orientation, unit, size);


    const title = "Rapport Inventaire";
    const headers = [["IDENTIFIANT", "Nom Article","Année","prixVente", "Type","Etat de stock", "Qte Stock"]];

    var data=[]
    var element 
    var nouvelleCellule
    var nouvelleLigne
    
    this.props.items.map(item => (
      item.inventaire_art.map(el =>
        data.push(
          [
      [ el.inventaire_article.id,'           '
        , item.annee,  '           '
        ,         el.nomA,el.prixTTC,'           ',             
       el.sscategorie.nomSSC,'           ',
 el.inventaire_article.etat,'           ',
 ,el.inventaire_article.qte]
     
    ]),


    )

    // Insère une cellule dans la ligne à l'indice 0

    ))
    let content = {
      body: data
    };

    doc.autoTable(content);
    doc.save("report.pdf")
  }
  render() {
    const items = this.props.items;
    var qte
    const data=[]
    const headers = [
      { label: "ID", key: "ID" },
      { label: "Année", key: "annee" },
      { label: "Nom d'article", key: "article" },
      { label: "Prix de vente", key: "prixvente" },
      { label: "Type", key: "type" },
      { label: "Etat de stock", key: "etat" },
      { label: "Quantité de stock", key: "qtestock" }];
      this.props.items.map(item => (
        item.inventaire_art.map(el =>
          data.push(
            [
        {ID: el.inventaire_article.id,
          annee: item.annee,  
              article:     el.nomA,prixvente:el.prixTTC,             
        type: el.sscategorie.nomSSC,etat:
   el.inventaire_article.etat,qtestock:el.inventaire_article.qte}]
       
      ))))
      const data2 = [
     
        
           { ID:"0", annee: "Tomi", article: "ah@smthing.co.com" , prixvente: "Raed", 
        type: "Labes", etat: "rl@smthing.co.com" ,qtestock:""  }     ];    


    return <div>

  

 

      <Table className="table-hover table-striped">


    <thead>
      <tr>
        <th className="border-0">Année</th>

        <th className="border-0">Nom article</th>
        <th className="border-0">Prix Vente</th>
        <th className="border-0">Type</th>

        <th className="border-0">Etat de stock</th>
        <th className="border-0">Quantité de stock</th>

      </tr>
    </thead>
    <tbody>


{  items.map(item => (
    item.inventaire_art.map(el =>

    <tr key={
      el.inventaire_article.id
    }>
   
      <td>{item.annee}</td>
      <td>{
        el.nomA
      }</td>

      <td>{
        el.prixTTC
      }</td>
   <td>{
        el.sscategorie.nomSSC
      }</td>

      <td>{
        el.inventaire_article.etat
      }</td>
          
          <td>{
         qte=el.inventaire_article.qte
      }</td>
      {console.log(el.stock_art)}
              <td align="center">
                <div>
               
                     <ModalInventaire
                    isNew={false}
                    item={el.stock_art}
                    historiqueState={this.props.historiqueState} />
                  &nbsp;&nbsp;&nbsp;
                </div>
              </td>
            </tr>
          )))}
      </tbody>
    </Table></div>;
  }
}
   
export default DataTableInventaire