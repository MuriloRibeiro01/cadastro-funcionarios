import './App.css';
import { Button } from './Components/Button'
import { FormFuncionario } from './Components/FormFuncionario';
import UserAction from './Components/UserAction';
import {  useEffect, useState } from "react";

function App() {
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [setData, data] = useState(null);

  useEffect(() =>{
    fetch('https://viacep.com.br/ws/')
    .then(response => response.json())
    .then(json => setData(json))
    .catch(error => console.error(error));
  }, []);

  return (    
    <div className="App">
      <header className="App-header">
        <h1>EmploYEE</h1>
      </header>

      <main>
        <div>
          <Button
            texto="Adicionar Funcionario"
            onClick={() => setModalIsOpen(true)}
          />
          <FormFuncionario 
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
