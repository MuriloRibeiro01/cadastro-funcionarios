import React, { useEffect, useState } from "react";
import { Button } from "./Button";

export function FormFuncionario({ isOpen, onClose, onSave, children, funcionarioParaEditar }) {    

    useEffect(() => {
        if (isOpen) {
            if(funcionarioParaEditar) {
                setFuncionario(funcionarioParaEditar);
            } else {
                setFuncionario({ cpf: "", nome: "", email: "", telefone: "", cargo: "", cep: "", rua: "", bairro: "", localidade: "", uf: "" });
                setErros({});
            }
        }
    }, [isOpen, funcionarioParaEditar]);

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

        const dispararErroCpf = () => {
            setErros(prev => ({ ...prev, cpf: "CPF Inválido." }));
            return false;
        };

        if(cpfLimpo.length !== 11 ||
            cpfLimpo === "00000000000" || 
            cpfLimpo === "11111111111" || 
            cpfLimpo === "22222222222" || 
            cpfLimpo === "33333333333" || 
            cpfLimpo === "44444444444" || 
            cpfLimpo === "55555555555" || 
            cpfLimpo === "66666666666" || 
            cpfLimpo === "77777777777" || 
            cpfLimpo === "88888888888" || 
            cpfLimpo === "99999999999"
        ) { 
            return dispararErroCpf();                
        }

        let soma = 0;
        let resto;

        // calcula o primeiro dígito verificador
        for (let i = 1; i <= 9; i++ ) {
            // CORREÇÃO: Adicionado o ", i" no substring
            soma += parseInt(cpfLimpo.substring(i - 1, i)) * (11 - i);
        }
        resto = (soma * 10) % 11;
        if((resto === 10) || (resto === 11)) resto = 0;
        if (resto !== parseInt(cpfLimpo.substring(9, 10))) return dispararErroCpf();

        // Calcula o segundo dígito verificador
        soma = 0;
        for (let i = 1; i <= 10; i++) {
            soma = soma + parseInt(cpfLimpo.substring(i - 1, i)) * (12 - i);
        }
        resto = (soma * 10) % 11;
        if ((resto === 10) || (resto === 11)) resto = 0;
        if (resto !== parseInt(cpfLimpo.substring(10, 11))) return dispararErroCpf();

        setErros(prev => {
            const novoErro = {...prev};
            delete novoErro.cpf;
            return novoErro;
        });

        return true;
    }

    const validaNome = async () => {
        const nomeDigitado = funcionario.nome.trim();
        
        const partes = nomeDigitado.split(" ").filter(parte => parte !== "");

        if (partes.length < 2 || partes[1].length < 2) {
            setErros(prev => ({
                ...prev,
                nome: "Informe nome e sobrenome"
            }));
            return false;
        }

        setErros(prev => ({
            ...prev,
            nome: ""
        }));

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
                setErros(prev => ({...prev, cep: "CEP não encontrado."}));
                return false;
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
        <div className="formulario-overlay">
            <div className="formulario-adicao-content">
                {/* Cabeçalho do Modal */}
                <div className="modal-header">
                    <h2>{funcionarioParaEditar ? "Editar Funcionário" : "Cadastrar Funcionário"}</h2>
                    <button type="button" className="close-button" onClick={onClose}>×</button>
                </div>
                
                <p className="modal-subtitle">Preencha os dados abaixo.</p> 

                {/* --- ADICIONE ESTE BLOCO DE LOADING AQUI --- */}
                {loading && (
                    <div className="loading-overlay">
                        <div className="spinner"></div>
                        <p>Buscando CEP...</p>
                    </div>
                )}
                {/* ------------------------------------------- */}

                {/* O Formulário de verdade continua aqui... */}
                <form onSubmit={clickButton}>
                    <section>
                        <h3>Dados Pessoais</h3>
                        <div className="input-group">
                            {/* Célula 1: CPF e seu Erro */}
                            <div className="input-wrapper">
                                <input 
                                    name="cpf" 
                                    value={funcionario.cpf} 
                                    onChange={handleChange} 
                                    onBlur={validarCPF} 
                                    className={`input-form ${erros.cpf ? 'input-erro' : ''}`} 
                                    placeholder="CPF" 
                                    type="text" 
                                    required 
                                />
                                {erros.cpf && <span className="error-message">{erros.cpf}</span>}
                            </div>
                            
                            {/* Célula 2: Nome e seu Erro */}
                            <div className="input-wrapper">
                                <input 
                                    name="nome"
                                    value={funcionario.nome} 
                                    onChange={handleChange} 
                                    onBlur={validaNome} 
                                    className={`input-form ${erros.nome ? 'input-erro' : ''}`} 
                                    placeholder="Nome Completo" 
                                    type="text" 
                                    required 
                                />
                                {erros.nome && <span className="error-message">{erros.nome}</span>}
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3>Contato</h3>
                        <div className="input-group">
                            <input
                                value={funcionario.email} 
                                onChange={handleChange} 
                                onBlur={validaEmail} 
                                name="email" 
                                className={`input-form ${erros.email ? 'input-erro' : ''}`} placeholder="E-Mail" type="email" required 
                            />
                            <input value={funcionario.telefone} onChange={handleChange} name="telefone" className="input-form" placeholder="Telefone" type="text" />
                        </div>
                        {erros.email && <span className="error-message">{erros.email}</span>}
                    </section>

                    <section>
                        <h3>Atuação</h3>
                        <input value={funcionario.cargo} onChange={handleChange} name="cargo" className="input-form" placeholder="Cargo Ocupado" type="text" required />
                    </section>

                    <section>
                        <h3>Endereço</h3>
                        <input
                            value={funcionario.cep} 
                            onChange={handleChange} 
                            onBlur={handleCepBlur} 
                            name="cep" 
                            className="input-form cep-input" 
                            placeholder="CEP" 
                            type="text" 
                        />
                        {erros.cep && <span className="error-message">{erros.cep}</span>}
                        <div className="cep-data">
                            <input value={funcionario.rua} onChange={handleChange} name="rua" className="input-form" placeholder="Rua" readOnly />
                            <input value={funcionario.bairro} onChange={handleChange} name="bairro" className="input-form" placeholder="Bairro" readOnly />
                            <input value={funcionario.localidade} onChange={handleChange} name="localidade" className="input-form" placeholder="Cidade" readOnly />
                            <input value={funcionario.uf} onChange={handleChange} name="uf" className="input-form uf-input" placeholder="UF" readOnly />
                        </div>
                    </section>     
                    
                    <div className="form-actions">
                        <Button className="btn-salvar" texto="Salvar" />
                    </div>
                </form>
            </div>
        </div>
    );
}