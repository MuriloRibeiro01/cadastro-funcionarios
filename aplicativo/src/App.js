import './App.css';
import { Button } from './Components/Button'
import { FormFuncionario } from './Components/FormFuncionario';
import UserAction from './Components/UserAction';
import {  useEffect, useState } from "react";
import EmployeeList from './Components/EmployeeList';

function App() {
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [data, setData] = useState(null);

  const [listaFuncionario, setListaFuncionario] = useState([]);

  const salvarNovoFuncionario = (novoFuncionario) => {    
    console.log("Dados recebidos: ", novoFuncionario);

    const funcionarioComId = {...novoFuncionario, id: Date.now() };
    const novaLista = [...listaFuncionario, funcionarioComId];

    setListaFuncionario(novaLista);

    localStorage.setItem("funcionarios_db", JSON.stringify(novaLista));

    alert("Funcionário cadastrado com sucesso!");
  };

  useEffect(() => {
    const dadosSalvos = localStorage.getItem("funcionarios_db");
    if (dadosSalvos) {
      setListaFuncionario(JSON.parse(dadosSalvos));
    }
  }, []);

  return (    
    <div className="App">
      <header className="App-header">
        <h1>EmploYEE</h1>
      </header>

      <main>
        <div>
          <EmployeeList funcionarios={listaFuncionario} />
          <Button
            texto="Adicionar Funcionario"
            onClick={() => setModalIsOpen(true)}
          />
          <FormFuncionario 
            onSave={salvarNovoFuncionario}
            isOpen={isModalOpen}
            onClose={() => setModalIsOpen(false)}
          />
        </div>
      </main>

      <footer className='App-footer'>

      </footer>
    </div>
  );
}

export default App;