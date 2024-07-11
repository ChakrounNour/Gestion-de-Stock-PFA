import React, { Component, Fragment } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import AddCategorie from '../Forms/AddCategorie';
import AuthService from "../../services/auth.service";
class ModalCat extends Component {
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
    let title = 'Modifier categorie';
    let button = '';
    if (isNew) {
        title = 'Ajouter categorie';
        button =  <button type="button" 
        onClick={this.toggle}
        className="dropdown-item" >
        categorie</button>
    } else {
        button = <button
            onClick={this.toggle}></button>;
    }

    return <Fragment>
      
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
            <ModalBody>
                <AddCategorie
                    updateState={this.props.updateState}
                    toggle={this.toggle}
                    item={this.props.item} />
            </ModalBody>
        </Modal>
    </Fragment>;

}

}

export default ModalCat