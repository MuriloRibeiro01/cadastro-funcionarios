import React from 'react'
import { Button } from './Button';

export default function EmployeeList({ funcionarios, onDelete, onEdit }) {



    if (funcionarios.length === 0) {
        return (
            <p>Nenhum funcionário cadastrado ainda. Clique no botão acima para começar!</p>
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

    const nomeSeguro = nome || "Sem Nome";

    const iniciais = nomeSeguro.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

    const deletarFuncionario = (e) => {
        e.preventDefault();
        onDelete(id);
    }

    const editarFuncionario = () => {
        onEdit(id);
    }


    return (
        <div className='card-funcionario'>
            <div className='header-card-funcionario'>
                <Button texto="X" onClick={deletarFuncionario} />
                <Button texto="editar" onClick={editarFuncionario} />
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