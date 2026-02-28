import { Button } from "./Button";

export function FormularioFuncionario({ isOpen, onClose, children }) {
    if(!isOpen) return null;

    return (
        <div className="formulario-funcionario">
            <section onClick={onClose}>
                <div className="headerForm" onClick={onClose}>
                    <h1>Cadastrar Funcionário</h1>
                    <button onClick={onClose}>x</button>
                    <Button texto="Cadastrar"/>
                    {children}
                </div>
            </section>
        </div>
    );
}