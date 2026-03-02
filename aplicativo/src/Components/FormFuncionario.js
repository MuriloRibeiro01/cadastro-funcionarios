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
                <section>
                    <h3>Dados Pessoais</h3>
                    <input className="input-form" placeholder="CPF" type="text"></input>
                    <input className="input-form" placeholder="Nome" type="text"></input>
                </section>
                <section>
                    <h3>Contato</h3>
                    <input className="input-form" placeholder="E-Mail" type="text"></input>
                    <input className="input-form" placeholder="Telefone" type="text"></input>
                </section>
                <section>
                    <h3>Áreac Ocupante</h3>
                    <input className="input-form" placeholder="Cargo" type="text"></input>
                </section>
                <section>
                    <h3>Endereço</h3>
                    <input className="input-form" placeholder="CEP" type="text"></input>
                    <div className="cep-data">
                        <input className="input-form" placeholder="Rua"></input>
                        <input className="input-form" placeholder="Bairro"></input>
                        <input className="input-form" placeholder="Cidade"></input>
                        <input className="input-form" placeholder="Estado"></input>
                    </div>
                </section>     
                
                <Button texto="Salvar Conteúdo" />
            </form>

        </div>
    );
}

// Campos a serem chamados pela API:
// logradouro "rua"
// bairro
// localidade
// estado