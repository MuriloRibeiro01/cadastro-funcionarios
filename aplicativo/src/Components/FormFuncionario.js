import React, { useState } from "react";
import { Button } from "./Button";

export function FormFuncionario({ isOpen, onClose, onSave, children, adicionarFuncionario }) {    

    // recupera dados e aloca aos objetos
    const [funcionario, setFuncionario] = useState({
        cpf: "",
        nome: "",
        email: "",
        telefone: "",
        cargo: "",
        cep: "",
        rua: "",
        bairro: "",
        localidade: "",
        uf: ""
    });

    const [loading, setLoading] = useState(false)
    const [erros, setErros] = useState({});

    // recupera os dados e aloca os novos
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFuncionario({
            ...funcionario,
            [name]: value
        });
    };

    const validarCPF = async () => {
        const cpfLimpo = funcionario.cpf.replace(/[^\d]+/g, '');

        if(cpfLimpo.length !== 11 ||
            funcionario.cpf === "00000000000" || 
            funcionario.cpf === "11111111111" || 
            funcionario.cpf === "22222222222" || 
            funcionario.cpf === "33333333333" || 
            funcionario.cpf === "44444444444" || 
            funcionario.cpf === "55555555555" || 
            funcionario.cpf === "66666666666" || 
            funcionario.cpf === "77777777777" || 
            funcionario.cpf === "88888888888" || 
            funcionario.cpf === "99999999999"
        ) {
            alert("CPF inválido.");    
            return false;                
        }

        let soma = 0;
        let resto;

        // calcula o primeiro dígito verificador
        for (let i = 1; i <= 9; i++ ) {
            soma += parseInt(funcionario.cpf.substring(i - 1)) * (11 - i);
        }
        resto = (soma * 10) % 11;
        if((resto == 10) || (resto == 11)) resto = 0;
        if (resto != parseInt(funcionario.cpf.substring(9, 10))) return false;

        // Calcula o segundo dígito verificador
        soma = 0;
        for (let i = 1; i <= 10; i++) {
            soma = soma + parseInt(funcionario.cpf.substring(i - 1, i)) * (12 - i);
        }
        resto = (soma * 10) % 11;
        if ((resto === 10) || (resto === 11)) resto = 0;
        if (resto !== parseInt(funcionario.cpf.substring(10, 11))) return false;

        return true;
    }

    const validaNome = async () => {
        const nomeDigitado = funcionario.nome; 

        let espacosEmBranco = nomeDigitado.split(" ");

        if(espacosEmBranco.length < 2) {
            alert("Nome não está completo");
            return false;
        }
        return true;
    }

    const validaEmail = async () => {
        
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!funcionario.email || !emailValido.test(funcionario.email)) {
            setErros(prev => ({ ...prev, email: "Formato de e-mail inválido." }));
            return false;
        }

        setErros(prev => {
            const novoErro = {...prev};
            delete novoErro.email;
            return novoErro;
        });
        return true;
    };

    // recupera os dados da api e aloca nos inputs, validando erros
    const handleCepBlur = async () => {

        const cepLimpo = funcionario.cep.replace(/\D/g, "");

        console.log("Buscando endereço...", cepLimpo);

        if(cepLimpo.length !== 8) return;

        setLoading(true);

        try{
            const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
            const data = await response.json();

            if(data.erro) {
                alert("CEP não encontrado.");
            } else {
                setFuncionario({
                    ...funcionario,
                    rua: data.logradouro,
                    bairro: data.bairro,
                    localidade: data.localidade,
                    uf: data.uf
                });
            }
        }
        catch (e) {
            console.error("Erro na requisição: ", e);
        }
        finally {
            setLoading(false);
        }
    };

    const clickButton = async (e) => {

        console.log("botão clicado");

        e.preventDefault();

        const cpfValidado = await validarCPF();
        const emailValidado = await validaEmail();
        const nomeValidado = await validaNome();

        if (cpfValidado && emailValidado && nomeValidado) {
            onSave(funcionario);
            onClose();
        }
        return true;
    }

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
                    <input value={funcionario.cpf} onChange={handleChange} onBlur={validarCPF} name="cpf" className="input-form" placeholder="CPF" type="text" required></input>
                    <input value={funcionario.nome} onChange={handleChange} onBlur={validaNome} name="nome" className="input-form" placeholder="Nome" type="text" required></input>
                </section>
                <section>
                    <h3>Contato</h3>
                    <input 
                        name="email" 
                        value={funcionario.email} 
                        onChange={handleChange} 
                        onBlur={validaEmail} 
                        className={`input-form ${erros.email ? 'input-erro' : ''}`} 
                        placeholder="E-Mail" 
                        type="text"
                        required 
                    /> {/* Fechamento aqui! */}
                    {erros.email && <span className="error-message">{erros.email}</span>}
                    <input value={funcionario.telefone} onChange={handleChange} name="telefone" className="input-form" placeholder="Telefone" type="text"></input>
                </section>
                <section>
                    <h3>Áreac Ocupante</h3>
                    <input value={funcionario.cargo} onChange={handleChange} name="cargo" className="input-form" placeholder="Cargo" type="text" required></input>
                </section>
                <section>
                    <h3>Endereço</h3>
                    <input value={funcionario.cep} onChange={handleChange} onBlur={handleCepBlur} name="cep" className="input-form" placeholder="CEP" type="text"></input>
                    <div className="cep-data">
                        <input value={funcionario.rua} onChange={handleChange} name="rua" className="input-form" placeholder="Rua"></input>
                        <input value={funcionario.bairro} onChange={handleChange} name="bairro" className="input-form" placeholder="Bairro"></input>
                        <input value={funcionario.localidade} onChange={handleChange} name="localidade" className="input-form" placeholder="Cidade"></input>
                        <input value={funcionario.uf} onChange={handleChange} name="uf" className="input-form" placeholder="UF"></input>
                    </div>
                </section>     
                
                <Button onClick={clickButton} texto="Salvar Conteúdo" />
            </form>

        </div>
    );
}