import React from 'react'
import { Button } from './Button';

export default function EmployeeList({ funcionarios, onDelete, onEdit }) {

    if (funcionarios.length === 0) {
        return (
            <h3 className='msg-nenhum-funcionario'>Nenhum funcionário cadastrado ainda. Clique no botão abaixo para começar!</h3>
        );
    }

  return (
    <div className='campo-listagem-funcionarios'>
        {funcionarios.map((func) => (
            <EmployeeCard
                key={func.id}
                id={func.id}
                nome={func.nome}
                cargo={func.cargo}
                email={func.email}
                telefone={func.telefone}
                localidade={func.localidade}
                uf={func.uf}
                onDelete={onDelete}
                onEdit={onEdit}
            />
        ))}
    </div>
  )
}

export function EmployeeCard({ id, nome, cargo, email, telefone, localidade, uf, onDelete, onEdit }) {

    // evita que a página quebre por funcionários sem nome
    const nomeSeguro = nome || "Sem Nome";

    // pega iniciais e aloca no ícone do card
    const iniciais = nomeSeguro.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

    // aloca o id ao detele
    const deletarFuncionario = () => {
        onDelete(id);
    }

    // aloca o id ao edit
    const editarFuncionario = () => {
        onEdit(id);
    }


    return (
        <div className='card-funcionario'>
            <div className="acoes-card">
                <Button 
                    className="btn-icon btn-editar" 
                    texto="✏" 
                    onClick={editarFuncionario} 
                />
                
                <Button 
                    className="btn-icon btn-excluir" 
                    texto="🗑" 
                    onClick={deletarFuncionario} 
                />
            </div>
            <div className='avatar-circulo'>
                {iniciais}
            </div>
            <div className='info-princiapl'>
                <h3>{nome}</h3>
                <span className='tag-cargo'>{cargo}</span>
            </div>

            <div className='divisor' />

            <div className='info-contato'>
                <p>{email}</p>
                <p>{telefone}</p>
            </div>
            <div className='info-local'>
                <p>{localidade} - {uf}</p>
            </div>             
        </div>
    );
}