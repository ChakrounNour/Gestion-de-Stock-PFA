import React, { Component, Fragment } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import HistForm from './HistoriqueStock';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

class ModalInventaire extends Component {
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
    let title = '';
    let button = '';
    if (isNew) {
     
    } else {
        button = <MoreHorizIcon
            onClick={this.toggle} />;
    }
    return <Fragment>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-dialog modal-lg" >
            <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
            <ModalBody>
                <HistForm
                    historiqueState={this.props.historiqueState}
                    toggle={this.toggle}
                    item={this.props.item} />
            </ModalBody>
        </Modal>
    </Fragment>;
}

}

export default ModalInventaire