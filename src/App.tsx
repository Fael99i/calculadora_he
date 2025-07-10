import React, { useState } from 'react';
import './App.css';

function App() {
  // Estados que guardam os valores digitados pelo usuário
  const [horasNoMes, setHorasNoMes] = useState('');
  const [salarioMensal, setSalarioMensal] = useState('');
  const [horasExtras, setHorasExtras] = useState('');

  // Converter os valores para números (ou 0 se estiver vazio ou inválido)
  const horasNum = parseFloat(horasNoMes) || 0;
  const salarioNum = parseFloat(salarioMensal) || 0;
  const extrasNum = parseFloat(horasExtras) || 0;

  // Calcular o valor de uma hora normal de trabalho
  const valorHoraNormal = horasNum > 0 ? salarioNum / horasNum : 0;

  // Calcular o valor total das horas extras com os adicionais
  const totalExtras60 = valorHoraNormal * 1.6 * extrasNum;
  const totalExtras65 = valorHoraNormal * 1.65 * extrasNum;
  const totalExtras70 = valorHoraNormal * 1.7 * extrasNum;

  // Calcular o salário final somando as horas extras
  const salarioComExtras60 = salarioNum + totalExtras60;
  const salarioComExtras65 = salarioNum + totalExtras65;
  const salarioComExtras70 = salarioNum + totalExtras70;

  return (
    <div className="container">
      <h1 className="titulo">Calculadora de Horas Extras</h1>

      <div className="grupo-formulario">
        <label htmlFor="inputHoras">Horas trabalhadas no mês:</label>
        <input
          id="inputHoras"
          className="campo-input"
          type="number"
          min="1"
          step="0.1"
          value={horasNoMes}
          onChange={(e) => setHorasNoMes(e.target.value)}
          placeholder="Ex: 220"
        />
      </div>

      <div className="grupo-formulario">
        <label htmlFor="inputSalario">Salário mensal bruto (R$):</label>
        <input
          id="inputSalario"
          className="campo-input"
          type="number"
          min="0"
          step="0.01"
          value={salarioMensal}
          onChange={(e) => setSalarioMensal(e.target.value)}
          placeholder="Ex: 2500"
        />
      </div>

      <div className="grupo-formulario">
        <label htmlFor="inputExtras">Horas extras trabalhadas:</label>
        <input
          id="inputExtras"
          className="campo-input"
          type="number"
          min="0"
          step="0.1"
          value={horasExtras}
          onChange={(e) => setHorasExtras(e.target.value)}
          placeholder="Ex: 10"
        />
      </div>

      <h2 className="subtitulo">Resultados:</h2>
      <p>Valor da hora normal: R$ {valorHoraNormal.toFixed(2)}</p>
      <p>Valor das horas extras:</p>
      <ul>
        <li>Adicional 60%: R$ {totalExtras60.toFixed(2)}</li>
        <li>Adicional 65%: R$ {totalExtras65.toFixed(2)}</li>
        <li>Adicional 70%: R$ {totalExtras70.toFixed(2)}</li>
      </ul>
      <p>Salário sem horas extras: R$ {salarioNum.toFixed(2)}</p>
      <p>Salário com horas extras (60%): R$ {salarioComExtras60.toFixed(2)}</p>
      <p>Salário com horas extras (65%): R$ {salarioComExtras65.toFixed(2)}</p>
      <p>Salário com horas extras (70%): R$ {salarioComExtras70.toFixed(2)}</p>
    </div>
  );
}

export default App;
