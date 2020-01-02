import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import SimpleSnackbar from "../Snackbar/Snackbar";

class AddEditForm extends React.Component {
  state = {
    produitId: "",
    designation: ""
  };
  child = React.createRef();

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitFormAdd = e => {
    e.preventDefault();
    fetch("http://localhost:9000/produit/add", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        produitId: this.state.produitId,
        designation: this.state.designation
      })
    })
      .then(response => {
        if (response.status === 500) {
          this.child.handleOpen(
            "Le produit avec id ::" + this.state.produitId + " existe deja",
            "error"
          );
        } else {
          this.props.updateState();
          this.props.toggle();
        }
      })

      .catch(err => {
        console.log(err);
      });
  };

  submitFormEdit = e => {
    e.preventDefault();
    fetch("http://localhost:9000/produit/update/" + this.state.produitId, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        designation: this.state.designation
      })
    })
      .then(response => {
        this.props.updateState();
        this.props.toggle();
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    // if item exists, populate the state with proper data
    if (this.props.item) {
      const { produitId, designation } = this.props.item;
      this.setState({ produitId, designation });
    }
  }

  render() {
    const label = this.props.item ? "Modifier" : "Ajouter";
    return (
      <Form
        onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}
      >
        <FormGroup>
          <Label for="produitId">Id produit</Label>
          <Input
            type="text"
            name="produitId"
            id="produitId"
            disabled={label === "Modifier"}
            onChange={this.onChange}
            value={this.state.produitId === null ? "" : this.state.produitId}
          />
        </FormGroup>
        <FormGroup>
          <Label for="designation">Designation</Label>
          <Input
            type="text"
            name="designation"
            id="designation"
            onChange={this.onChange}
            value={
              this.state.designation === null ? "" : this.state.designation
            }
          />
        </FormGroup>
        <Button>{label}</Button>
        <SimpleSnackbar
          variant={"error"}
          message={"success"}
          ref={ti => {
            this.child = ti;
          }}
          childRef={ref => (this.child = ref)}
        />
      </Form>
    );
  }
}

export default AddEditForm;
