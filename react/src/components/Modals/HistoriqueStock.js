import React, { useState } from "react";
import  { Component } from 'react'
import { Table } from 'reactstrap';


class HistoriqueStock extends React.Component{  
  
    state = {
       items:[],
       items2:[],
       qte_commandes:[],
       id:'',
       nom:"", 
       adresseLocal:"", stock1:""
        }
    
  
    
  
    
      componentDidMount(){
        // if item exists, populate the state with proper data
        if(this.props.item){
          const item= this.props.item
          this.setState({ item})
        }
      }
    
      
      
      render() {
      
        const stock = this.state.item;
      console.log(stock)
        return (
          <Table  >
          <thead>
            <tr>
            <th></th>
            <th>Nom de dépôt</th>
            <th>Adresse local de dépôt</th>
            <th>Zone de dépôt</th>

            <th>Quantité Article</th>

                

            </tr>
          </thead>
          <br></br>
          <tbody>

            {!stock || stock.length <= 0 ?
              <tr>
                <td colSpan="6" align="center"><b>Stock épuisé</b></td>
              </tr>
              : stock.map(c => (

    
            
                <tr key={c.id}>
                  

                  <td>     </td>


              <td>  {
                    c.nom
                  }   </td>
              <td>   {
                    c.adresseLocal
                  }</td>
 <td>   {
                    c.zone.nomZ               
                  }</td>

<td>   {
                    c.stock_article.qteArticle               
                  }</td>

                </tr>
              ))}
              
          </tbody>
        </Table>
        );
      }
    }
    
  
   
export default HistoriqueStock;