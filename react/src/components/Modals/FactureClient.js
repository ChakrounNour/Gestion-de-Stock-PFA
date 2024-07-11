import React, { Component, Fragment } from 'react'
import {Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import UploadFactureClient from '../Forms/UploadFactureClient';
import AuthService from "../../services/auth.service";

class FactureClient extends Component {
  state = {
    modal: false
}
toggle = () => {
    this.setState(previous => ({
        modal: !previous.modal
    }));
}
componentDidMount(){
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        showResponsable: user.role.includes("Responsable"),
        showAdmin: user.role.includes("Admin"),
        showSousAdministrateur: user.role.includes("sous-administrateur"),

      });
    }
}
  render() {
    const isNew = this.props.isNew;
    let title = 'Modifier facture';
    let button = '';

    if (isNew) {
        title = 'Ajouter Facture';
        button =  <button type="button" onClick={this.toggle}
        class="btn-info">
            <i class="fa fa-plus" aria-hidden="true">
                </i> Facture</button>
       
    } else {
        button = <button
            onClick={this.toggle}></button>;
    }

    return <Fragment>
      
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}  size={"lg"} >
            <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
            <ModalBody>
                <UploadFactureClient
                    updateState={this.props.updateState}
                    toggle={this.toggle}
                    item={this.props.item} />
            </ModalBody>
        </Modal>
    </Fragment>;

}

}

export default FactureClient