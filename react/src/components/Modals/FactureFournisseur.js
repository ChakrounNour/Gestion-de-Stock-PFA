import React, { Component, Fragment } from 'react'
import {Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import UploadFactureFournisseur from '../Forms/UploadFactureFournisseur';
class FactureFournisseur extends Component {
  state = {
    modal: false
}
toggle = () => {
    this.setState(previous => ({
        modal: !previous.modal
    }));
}
  render() {
    const isNew = this.props.isNew;
    let title = 'Modifier facture';
    let button = '';
    if (isNew) {
        title = 'Ajouter Facture';
        button =   <button type="button" onClick={this.toggle}
        class="btn-info">
            <i class="fa fa-plus" aria-hidden="true">
                </i> Facture </button>
    } else {
        button = <button
            onClick={this.toggle}></button>;
    }

    return <Fragment>
      
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
            <ModalBody>
                <UploadFactureFournisseur
                    updateState={this.props.updateState}
                    toggle={this.toggle}
                    item={this.props.item} />
            </ModalBody>
        </Modal>
    </Fragment>;

}

}

export default FactureFournisseur