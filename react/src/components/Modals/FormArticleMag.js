import React, { Component, Fragment } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import AddForm from '../Forms/AddForm';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';

class FormArticleMag extends Component {
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
    let title = 'Ajouter article au magasin '+this.props.item.nom;
    let button = '';
    if (isNew) {
        title = 'Ajouter Magasin';
        button =  <button type="button" onClick={this.toggle}
        class="btn-info">
            <i class="fa fa-plus" aria-hidden="true">
                </i> Magasin </button>
    } else {
        button = <AddIcon

            onClick={this.toggle}></AddIcon>;
    }
    return <Fragment>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
            <ModalBody>
                <AddForm
                    addItemToState={this.props.addItemToState}
                    updateState={this.props.updateState}
                    toggle={this.toggle}
                    item={this.props.item} />
            </ModalBody>
        </Modal>
    </Fragment>;
}

}
export default FormArticleMag