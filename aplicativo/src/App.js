import './App.css';
import { Button } from './Components/Button'
import { FormularioFuncionario } from './Components/FormFuncionario';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>EmploYEE</h1>
      </header>

      <main>
        <div>
          <FormularioFuncionario />
        </div>
      </main>

      <footer className='App-footer'>

      </footer>
    </div>
  );
}

export default App;
