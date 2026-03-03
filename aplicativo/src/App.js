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

  const [toastMensagem, setToastMensagem] = useState(null);

  const [idParaExcluir, setIdParaExcluir] = useState(null);

  const solicitarExclusao = (idDoBotao) => {
    setIdParaExcluir(idDoBotao);
  };

  const mostrarToast = (mensagem) => {
    setToastMensagem(mensagem);
    setTimeout(() => {
      setToastMensagem(null);
    }, 3000); // 3 segundos
  };

  const salvarNovoFuncionario = (dadosFormulario) => {    
    console.log("Dados recebidos: ", dadosFormulario);

    let novaLista;

    if(dadosFormulario.id) {
      novaLista = listaFuncionario.map((func) => {
        if (func.id === dadosFormulario.id) {
          return dadosFormulario;
        }
        return func;
      });
      mostrarToast("Funcionário atualizado com sucesso!");
    } else {
      const funcionarioComId = {...dadosFormulario, id: Date.now() };
      novaLista = [...listaFuncionario, funcionarioComId];
      mostrarToast("Funcionário cadastrado com sucesso!");
    }

    setListaFuncionario(novaLista);
    localStorage.setItem("funcionarios_db", JSON.stringify(novaLista));
    setFuncionarioEmEdicao(null);
  };

  const confirmarEDeletar = () => {
    const listaAtualizada = listaFuncionario.filter((func) => {
      return func.id !== idParaExcluir;
    });

    setListaFuncionario(listaAtualizada);
    localStorage.setItem("funcionarios_db", JSON.stringify(listaAtualizada));
    
    setIdParaExcluir(null); // Fecha o modal
    mostrarToast("Funcionário excluído com sucesso!"); // Usa o toast que acabamos de criar
  };

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
          <EmployeeList onEdit={editarFuncionarioExistente} onDelete={solicitarExclusao} funcionarios={listaFuncionario}  />

            <Button
            className="btn-adicionar-fixo"
              texto="+"
              onClick={() => {
                setFuncionarioEmEdicao(null);
                setModalIsOpen(true);
              }}
            />
          
          <FormFuncionario 
          funcionarioParaEditar={funcionarioEmEdicao}
            onSave={salvarNovoFuncionario}
            isOpen={isModalOpen}
            onClose={() => setModalIsOpen(false)}
          />
        </div>
        
      {toastMensagem && (
          <div className="toast-nordico">
            {toastMensagem}
          </div>
        )}

        {idParaExcluir && (
          <div className="formulario-overlay">
            <div className="modal-confirmacao">
              <h2 className="titulo-perigo">⚠️ Confirmar Exclusão</h2>
              <p>Tem certeza que deseja demitir este funcionário? Essa ação não pode ser desfeita.</p>
              
              <div className="form-actions-confirm">
                <Button 
                  className="btn-cancelar" 
                  texto="Cancelar" 
                  onClick={() => setIdParaExcluir(null)} 
                />
                <Button 
                  className="btn-excluir-confirm" 
                  texto="Sim, Excluir" 
                  onClick={confirmarEDeletar} 
                />
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className='App-footer'>

      </footer>
    </div>
  );
}

export default App;