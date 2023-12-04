import React, { useState } from "react";
import "./card.css";
import FormDialog from "../dialog/dialogForm";

export default function Card(props) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <FormDialog
        open={open}
        setOpen={setOpen}
        title={`Conta #${props.id}`}
        renda={props.renda}
        gastofixo={props.gastofixo}
        descricaofixo={props.descricaofixo}
        listCard={props.listCard}
        setListCard={props.setListCard}
        id={props.id}
      />
      <div className="card-container" onClick={() => setOpen(true)}>
        <h1 className="card-title">Conta #{props.id}</h1>
        <p className="card-id">{props.id}</p>
        <p className="card-cartegory">Descrição Fixa: {props.descricaofixo}</p>
        <h3 className="card-cost">Renda: R${props.renda}</h3>
        <h3 className="card-cost">Gasto Fixo: R${props.gastofixo}</h3>
      </div>
    </div>
  );
}
