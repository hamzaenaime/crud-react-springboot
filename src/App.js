import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import ModalForm from "./Components/Modals/Modal";
import DataTable from "./Components/Tables/DataTable";
import { CSVLink } from "react-csv";
import { Button } from "reactstrap";

import SimpleSnackbar from "./Components/Snackbar/Snackbar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }
  child = React.createRef();

  getItems() {
    fetch("http://localhost:9000/produit/list")
      .then(response => response.json())
      .then(items => this.setState({ items }))
      .catch(err => console.log(err));
  }

  addItemToState = item => {
    this.setState(prevState => ({
      items: [...prevState.items, item]
    }));
  };

  updateState = () => {
    this.getItems();
  };

  deleteItemFromState = id => {
    const updatedItems = this.state.items.filter(item => item.id !== id);
    this.setState({ items: updatedItems });
  };

  componentDidMount() {
    this.getItems();
  }

  render() {
    return (
      <Container className="App">
        <Row>
          <Col>
            <h1 style={{ margin: "20px 0" }}>Gestion des produits</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <ModalForm
              buttonLabel="Ajouter un produit"
              updateState={this.updateState}
            />
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col>
            <DataTable
              items={this.state.items}
              updateState={this.updateState}
              deleteItemFromState={this.deleteItemFromState}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
