import './App.css';
import { Button } from './Components/Button'
import { FormFuncionario } from './Components/FormFuncionario';
import UserAction from './Components/UserAction';
import { useState } from "react";

function App() {
  const [isModalOpen, setModalIsOpen] = useState(false);
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
