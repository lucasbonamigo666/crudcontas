import React, { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";
import Card from "./components/cards/card";
import minhaImagem from "./imagem/transferir.jpg"; // Substitua pelo caminho correto

export default function App() {
  const [values, setValues] = useState({
    renda: 0,
    gastofixo: 0,
    descricaofixo: ""
  });
  const [listCard, setListCard] = useState([]);
  console.log(listCard);

  const handleRegisterConta = () => {
    Axios.post("http://localhost:3001/register", {
      renda: values.renda,
      gastofixo: values.gastofixo,
      descricaofixo: values.descricaofixo
    }).then(() => {
      Axios.post("http://localhost:3001/search", {
        renda: values.renda,
        gastofixo: values.gastofixo,
        descricaofixo: values.descricaofixo
      }).then((response) => {
        setListCard([
          ...listCard,
          {
            id: response.data[0].id,
            renda: values.renda,
            gastofixo: values.gastofixo,
            descricaofixo: values.descricaofixo
          },
        ]);
      });
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getRecords").then((response) => {
      setListCard(response.data);
    });
  }, []);

  const handleAddValues = (event) => {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="app-container" style={{ backgroundImage: `url(${minhaImagem})` }}>
      <div className="register-container">
        <h1 className="register-title">CRUD Conta</h1>

        <input
          type="number"
          name="renda"
          placeholder="Renda"
          className="register-input"
          onChange={handleAddValues}
        />
        <input
          type="number"
          placeholder="Gasto Fixo"
          name="gastofixo"
          className="register-input"
          onChange={handleAddValues}
        />
        <input
          type="text"
          placeholder="Descrição Fixa"
          name="descricaofixo"
          className="register-input"
          onChange={handleAddValues}
        />

        <button onClick={handleRegisterConta} className="register-button">
          Cadastrar
        </button>
      </div>

      {listCard.map((val) => (
        <Card
          listCard={listCard}
          setListCard={setListCard}
          key={val.id}
          id={val.id}
          renda={val.renda}
          gastofixo={val.gastofixo}
          descricaofixo={val.descricaofixo}
        />
      ))}
    </div>
  );
}
