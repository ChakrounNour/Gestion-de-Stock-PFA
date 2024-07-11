import React, { useState } from "react";
import  { Component } from 'react'
import { Table } from 'reactstrap';
import axios from 'axios';  
import '../style.css'  ;
import { Container, Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';
import Select from 'react-select';
import ModalForm from '../Modals/Modal'
import ModalF from '../Modals/ModalF'

class HistForm extends React.Component{  
  
    state = {
       items:[],
       items2:[],
       commandes:[],
       itemsCommande:[]
        }
 
GetCommande (){
  //const id=this.props.item.id
  let user = JSON.parse(localStorage.getItem('user'));
  fetch('http://localhost:4000/api/commande/'+this.props.item.id,{   
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.token
    }})
  .then(res => res.json())
  .then(res => this.setState({ itemsCommande: res }))
  .catch(err => console.log(err))
}

  
      componentDidMount(){
        // if item exists, populate the state with proper data
        if(this.props.item){
          const { id, nomCli, prenomCli, telCli, adresseCli } = this.props.item
          this.setState({ id, nomCli, prenomCli, telCli, adresseCli})
        }
        console.log("client id "+this.state.id)

        this.GetCommande()


      }
    
      
      
      render() {
      console.log(this.state.itemsCommande)
      console.log(this.state.client_id)

      const commandes = this.state.itemsCommande
      var count=0
        console.log(commandes)
        console.log(this.state.id)
        return (
          <Table  >
          <thead>
            <tr>
            <th>ID</th>
            <th>Date de Commande</th>
            <th>Article</th>

                <th>Quantité commandée</th>
                
                <th>Montant</th>
                <th>Date Facture</th>
                <th>FACTURE PDF</th>
            </tr>
          </thead>
          <br></br>
          <tbody>

            {!commandes || commandes.length <= 0 ?
              <tr>
                <td colSpan="6" align="center"><b>Pas de commandes</b></td>
              </tr>
              : commandes.map(c => (
                <tr key={c.id}>
                  <th scope="row">
                    {c.id}
                  </th>
                  <td>{c.dateC}</td>
                  <td>{ c.factureClient.map(
                    cm => cm.nomA
                  ) }</td>
    <td>{ c.factureClient.map(
                    cm => cm.quantite_commande.qteC
                  ) }</td>


              <td>{c.montant}</td>
              <td>{ c.factureClient.map(
                    cm => cm.quantite_commande.date
                  ) }</td>
                <td>
            <div className = "App">
              { c.factureClient.map(
                    cm => 
                    <a href = {'http://localhost:4000/uploads/'+ cm.quantite_commande.file} target = "_blank">Facture Pdf</a>

                   
                  ) 
              }
       </div> 
 </td>
            

                </tr>
              ))}
              
          </tbody>
        </Table>
        );
      }
    }
    
  
   
export default HistForm;