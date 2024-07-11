import React, { useState } from "react";
import  { Component } from 'react'
import { Table } from 'reactstrap';
import axios from 'axios';  
import '../style.css'  ;
import { Container, Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';
import Select from 'react-select';
import ModalForm from '../Modals/Modal'
import ModalF from '../Modals/ModalF'

class ArticleDepot extends React.Component{  
  
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
          const { id, nom, adresseLocal, stock1 } = this.props.item
          this.setState({ id, nom, adresseLocal, stock1})
        }
      }
    
      
      
      render() {
      
        const stock = this.state.stock1;
      
        console.log(this.state.stock1)
        return (
          <Table  >
          <thead>
            <tr>
            <th>ID</th>
            <th>Nom Article</th>
            <th>Quantité Article</th>

                
                <th>Marque</th>

            </tr>
          </thead>
          <br></br>
          <tbody>

            {!stock || stock.length <= 0 ?
              <tr>
                <td colSpan="6" align="center"><b>Pas  d'articles de dépôt de stock</b></td>
              </tr>
              : stock.map(c => (
                <tr key={c.id}>
                  <th scope="row">
                    {c.id}
                  </th>
                  <td>{c.nomA}</td>
                  <td>{c.stock_article.qteArticle}</td>

                  


              <td>{ c.marque.nomM }</td>

            

                </tr>
              ))}
              
          </tbody>
        </Table>
        );
      }
    }
    
  
   
export default ArticleDepot;