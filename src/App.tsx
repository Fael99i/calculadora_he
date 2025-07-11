import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [horasNoMes, setHorasNoMes] = useState<string>('');
  const [salarioMensal, setSalarioMensal] = useState<string>('');
  const [horasExtras, setHorasExtras] = useState<string>('');

  const [cotacaoUSD, setCotacaoUSD] = useState<number | null>(null);
  const [carregandoCotacao, setCarregandoCotacao] = useState<boolean>(true);

  useEffect(() => {
    setCarregandoCotacao(true);
    fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL')
      .then((res) => res.json())
      .then((data) => {
        if (data?.USDBRL?.bid) {
          const usdBrl = parseFloat(data.USDBRL.bid);
          if (!isNaN(usdBrl) && usdBrl > 0) {
            setCotacaoUSD(1 / usdBrl);
          } else {
            setCotacaoUSD(null);
          }
        } else {
          setCotacaoUSD(null);
        }
      })
      .catch((err) => {
        console.error('Erro ao buscar cotação do dólar:', err);
        setCotacaoUSD(null);
      })
      .finally(() => setCarregandoCotacao(false));
  }, []);

  const emDolar = (valor: number): string => {
    if (!cotacaoUSD) return '-';
    return `US$ ${ (valor * cotacaoUSD).toFixed(2) }`;
  };

  const horasNum = parseFloat(horasNoMes) || 0;
  const salarioNum = parseFloat(salarioMensal) || 0;
  const extrasNum = parseFloat(horasExtras) || 0;

  const valorHoraNormal = horasNum > 0 ? salarioNum / horasNum : 0;
  const totalExtras60 = valorHoraNormal * 1.6 * extrasNum;
  const totalExtras65 = valorHoraNormal * 1.65 * extrasNum;
  const totalExtras70 = valorHoraNormal * 1.7 * extrasNum;

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

      {carregandoCotacao ? (
        <p>Carregando cotação do dólar...</p>
      ) : !cotacaoUSD ? (
        <p style={{ color: 'red' }}>Cotação do dólar indisponível no momento.</p>
      ) : (
        <p style={{ opacity: 0.85 }}>
          Cotação BRL → USD: 1 BRL = {`US$ ${cotacaoUSD.toFixed(4)}`}
        </p>
      )}

      <table style={{
        width: '100%',
        marginTop: '20px',
        borderCollapse: 'collapse',
        color: '#ddd',
        fontSize: '0.95rem'
      }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #555' }}>
            <th style={{ textAlign: 'left', padding: '8px' }}>Descrição</th>
            <th style={{ textAlign: 'right', padding: '8px' }}>R$</th>
            <th style={{ textAlign: 'right', padding: '8px' }}>US$</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '8px' }}>Valor da hora normal</td>
            <td style={{ textAlign: 'right', padding: '8px' }}>R$ {valorHoraNormal.toFixed(2)}</td>
            <td style={{ textAlign: 'right', padding: '8px' }}>{emDolar(valorHoraNormal)}</td>
          </tr>
          <tr>
            <td style={{ padding: '8px' }}>Adicional 60%</td>
            <td style={{ textAlign: 'right', padding: '8px' }}>R$ {totalExtras60.toFixed(2)}</td>
            <td style={{ textAlign: 'right', padding: '8px' }}>{emDolar(totalExtras60)}</td>
          </tr>
          <tr>
            <td style={{ padding: '8px' }}>Adicional 65%</td>
            <td style={{ textAlign: 'right', padding: '8px' }}>R$ {totalExtras65.toFixed(2)}</td>
            <td style={{ textAlign: 'right', padding: '8px' }}>{emDolar(totalExtras65)}</td>
          </tr>
          <tr>
            <td style={{ padding: '8px' }}>Adicional 70%</td>
            <td style={{ textAlign: 'right', padding: '8px' }}>R$ {totalExtras70.toFixed(2)}</td>
            <td style={{ textAlign: 'right', padding: '8px' }}>{emDolar(totalExtras70)}</td>
          </tr>
          <tr>
            <td style={{ padding: '8px' }}>Salário sem horas extras</td>
            <td style={{ textAlign: 'right', padding: '8px' }}>R$ {salarioNum.toFixed(2)}</td>
            <td style={{ textAlign: 'right', padding: '8px' }}>{emDolar(salarioNum)}</td>
          </tr>
          <tr>
            <td style={{ padding: '8px' }}>Salário com extras (60%)</td>
            <td style={{ textAlign: 'right', padding: '8px' }}>R$ {salarioComExtras60.toFixed(2)}</td>
            <td style={{ textAlign: 'right', padding: '8px' }}>{emDolar(salarioComExtras60)}</td>
          </tr>
          <tr>
            <td style={{ padding: '8px' }}>Salário com extras (65%)</td>
            <td style={{ textAlign: 'right', padding: '8px' }}>R$ {salarioComExtras65.toFixed(2)}</td>
            <td style={{ textAlign: 'right', padding: '8px' }}>{emDolar(salarioComExtras65)}</td>
          </tr>
          <tr>
            <td style={{ padding: '8px' }}>Salário com extras (70%)</td>
            <td style={{ textAlign: 'right', padding: '8px' }}>R$ {salarioComExtras70.toFixed(2)}</td>
            <td style={{ textAlign: 'right', padding: '8px' }}>{emDolar(salarioComExtras70)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
