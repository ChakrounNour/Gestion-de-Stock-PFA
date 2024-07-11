import React, { Component, Fragment } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import ArticleDepot from './ArticleDepot';

import HistoryIcon from '@material-ui/icons/History';
class ModalArticleDepot extends Component {
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
    let title = 'Les articles du dépôt  ';
    let button = '';
    if (isNew) {
     
    } else {
        button = <HistoryIcon
            onClick={this.toggle} />;
    }
    return <Fragment>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-dialog modal-lg" >
            <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
            <ModalBody>
                <ArticleDepot
                    addItemToState={this.props.addItemToState}
                    articleState={this.props.articleState}
                    toggle={this.toggle}
                    item={this.props.item} />
            </ModalBody>
        </Modal>
    </Fragment>;
}

}

export default ModalArticleDepot