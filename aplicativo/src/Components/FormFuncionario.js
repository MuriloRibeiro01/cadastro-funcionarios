import React, { useState } from "react";
import { Button } from "./Button";

export function FormFuncionario({ isOpen, onClose }) {    

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

    // recupera os dados e aloca os novos
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFuncionario({
            ...funcionario,
            [name]: value
        });
    }

    // recupera os dados da api e aloca nos inputs, validando erros
    const handleCepBlur = async () => {
        const cepLimpo = funcionario.cep.replace(/\D/g, "");

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
                    <input value={funcionario.cpf} onChange={handleChange} name="cpf" className="input-form" placeholder="CPF" type="text"></input>
                    <input value={funcionario.nome} onChange={handleChange} name="nome" className="input-form" placeholder="Nome" type="text"></input>
                </section>
                <section>
                    <h3>Contato</h3>
                    <input value={funcionario.email} onChange={handleChange} name="email" className="input-form" placeholder="E-Mail" type="text"></input>
                    <input value={funcionario.telefone} onChange={handleChange} name="telefone" className="input-form" placeholder="Telefone" type="text"></input>
                </section>
                <section>
                    <h3>Áreac Ocupante</h3>
                    <input value={funcionario.cargo} onChange={handleChange} name="cargo" className="input-form" placeholder="Cargo" type="text"></input>
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
                
                <Button texto="Salvar Conteúdo" />
            </form>

        </div>
    );
}