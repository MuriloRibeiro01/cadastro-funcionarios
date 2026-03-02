import { Button } from "./Button";

export function FormFuncionario({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="formulario-funcionario">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                <h1>Cadastrar Funcionário</h1>
            </div>
            <form className="formulario-adicao-content">
                <p>Adicione os dados do funcionário.</p> 
                <input placeholder="CPF" type="text"></input>
                <input placeholder="Nome" type="text"></input>
                <input placeholder="E-Mail" type="text"></input>
                <input placeholder="Cargo" type="text"></input>
                <input placeholder="CEP" type="text"></input>
                <div className="cep-data">
                    <input placeholder="Rua"></input>
                    <input placeholder="Bairro"></input>
                    <input placeholder="Cidade"></input>
                    <input placeholder="Estado"></input>
                </div>
                
                <Button texto="Salvar Conteúdo" />
            </form>

        </div>
    );
}