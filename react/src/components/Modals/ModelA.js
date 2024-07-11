import React, { Component, Fragment } from 'react'
import {Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

import AddArticle from '../Forms/FormAddArticle';

class ModalA extends Component {
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
    let title = 'Modifier Article';
    let button = '';
    if (isNew) {
        title = 'Ajouter Article';
        button =  <button type="button" 
        onClick={this.toggle}
        className="dropdown-item" >
       Article</button>
    } else {
        button = <button
            onClick={this.toggle}></button>;
    }

    return <Fragment>
      
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
            <ModalBody>
                <AddArticle
                    updateState={this.props.updateState}
                    toggle={this.toggle}
                    item={this.props.item} />
            </ModalBody>
        </Modal>
    </Fragment>;

}

}

export default ModalA