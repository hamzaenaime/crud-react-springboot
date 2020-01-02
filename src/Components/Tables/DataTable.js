import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import ModalForm from "../Modals/Modal";

class DataTable extends Component {
  deleteItem = id => {
    let confirmDelete = window.confirm("Delete item forever?");
    if (confirmDelete) {
      fetch("http://localhost:9000/produit/delete/" + id, {
        method: "delete",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => this.props.updateState())
        .catch(err => console.log(err));
    }
  };

  render() {
    const items = this.props.items.map((item, id) => {
      return (
        <tr key={id}>
          <th scope="row">{item.produitId}</th>
          <td>{item.designation}</td>
          <td>
            <div style={{ width: "110px" }}>
              <ModalForm
                buttonLabel="Modifier"
                item={item}
                updateState={this.props.updateState}
              />{" "}
              <Button
                color="danger"
                onClick={() => this.deleteItem(item.produitId)}
              >
                Supprimer
              </Button>
            </div>
          </td>
        </tr>
      );
    });

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>ID produit</th>
            <th>Designation</th>
          </tr>
        </thead>
        <tbody>{items}</tbody>
      </Table>
    );
  }
}

export default DataTable;
