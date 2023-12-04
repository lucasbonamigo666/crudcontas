import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";

export default function FormDialog(props) {
  const [editValues, setEditValues] = useState({
    id: props.id,
    renda: props.title,
    gastofixo: props.cost,
    descricaofixo: props.category,
  });

  const handleChangeValues = (values) => {
    setEditValues((prevValues) => ({
      ...prevValues,
      [values.target.id]: values.target.value,
    }));
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleEditConta = () => {
    Axios.put("http://localhost:3001/edit", {
      id: editValues.id,
      renda: editValues.renda,
      gastofixo: editValues.gastofixo,
      descricaofixo: editValues.descricaofixo,
    }).then(() => {
      props.setListCard(
        props.listCard.map((value) => {
          return value.id === editValues.id
            ? {
                id: editValues.id,
                renda: editValues.renda,
                gastofixo: editValues.gastofixo,
                descricaofixo: editValues.descricaofixo,
              }
            : value;
        })
      );
    });
    handleClose();
  };

  const handleDeleteConta = () => {
    Axios.delete(`http://localhost:3001/delete/${editValues.id}`).then(() => {
      props.setListCard(
        props.listCard.filter((value) => {
          return value.id !== editValues.id;
        })
      );
    });
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Editar</DialogTitle>
        
        <DialogContent>
          <TextField
            disabled
            margin="dense"
            id="id"
            label="id"
            defaultValue={props.id}
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="renda"
            label="Renda"
            defaultValue={props.title}
            type="number"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="gastofixo"
            label="Gasto Fixo"
            defaultValue={props.cost}
            type="number"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="descricaofixo"
            label="Descrição Fixa"
            defaultValue={props.category}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button color="primary" onClick={handleDeleteConta}>
            Excluir
          </Button>
          <Button color="primary" onClick={handleEditConta}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
