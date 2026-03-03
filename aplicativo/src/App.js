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

  const [funcionarioEmEdicao, setFuncionarioEmEdicao] = useState(null);

  const salvarNovoFuncionario = (dadosFormulario) => {    
    console.log("Dados recebidos: ", dadosFormulario);

    const funcionarioComId = {...dadosFormulario, id: Date.now() };
    let novaLista;

    if(dadosFormulario.id) {
      novaLista = listaFuncionario.map((func) => {
        if (func.id === dadosFormulario.id) {
          return dadosFormulario;
        }
        return func;
      });
      alert("Funcionário atualizado com sucesso!");
    } else {
      const funcionarioComId = {...dadosFormulario, id: Date.now() };
      novaLista = [...listaFuncionario, funcionarioComId];
      alert("Funcionário cadastrado com sucesso!");
    }

    setListaFuncionario(novaLista);
    localStorage.setItem("funcionarios_db", JSON.stringify(novaLista));
    setFuncionarioEmEdicao(null);
  };

  const deletarFuncionarioExistente = (idDoBotao) => {
    const listaAtualizada = listaFuncionario.filter((func) => {
      return func.id !== idDoBotao;
    });

    setListaFuncionario(listaAtualizada);

    localStorage.setItem("funcionarios_db", JSON.stringify(listaAtualizada));
  }

  const editarFuncionarioExistente = (idEditBotao) => {
    const funcionarioSeleciona = listaFuncionario.find((func) =>{
      return func.id === idEditBotao;
    });

    setFuncionarioEmEdicao(funcionarioSeleciona);

    setModalIsOpen(true);
  }

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
          <EmployeeList onEdit={editarFuncionarioExistente} onDelete={deletarFuncionarioExistente} funcionarios={listaFuncionario}  />
          
          <div className='btn-adicionar-fixo'>
            <Button
              texto="+"
              onClick={() => {
                setFuncionarioEmEdicao(null);
                setModalIsOpen(true);
              }}
            />
          </div>
          
          <FormFuncionario 
          funcionarioParaEditar={funcionarioEmEdicao}
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