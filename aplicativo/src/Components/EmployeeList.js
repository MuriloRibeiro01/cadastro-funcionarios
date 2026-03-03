import React from 'react'

export default function EmployeeList({ funcionarios }) {

    if (funcionarios.length === 0) {
        return (
            <p>Nenhum funcionário cadastrado ainda. Clique no botão acima para começar!</p>
        );
    }

    // Aqui eu recupero os dados enviados ao App.js

  return (
    <div className='campo-listagem-funcionarios'>
        {funcionarios.map((func) => (
            <EmployeeCard
                key={func.id}
                nome={func.nome}
                cargo={func.cargo}
            />
        ))}
    </div>
  )
}

export function EmployeeCard({ nome, cargo }) {
    return (
        <div>
            <h3>{nome}</h3>
            <p>{cargo}</p> 
        </div>
    );
}