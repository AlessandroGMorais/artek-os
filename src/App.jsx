
import { useState } from 'react';

export default function OrdemDeServico() {
  const [form, setForm] = useState({
    cliente: '',
    equipamento: '',
    tipoServico: '',
    data: '',
    observacoes: '',
  });
  const [historico, setHistorico] = useState([]);

  const handleSubmit = () => {
    if (!form.cliente || !form.data) return alert('Preencha os campos obrigatórios');
    const novaOS = { ...form, id: Date.now() };
    setHistorico([novaOS, ...historico]);
    setForm({ cliente: '', equipamento: '', tipoServico: '', data: '', observacoes: '' });
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h2>Nova Ordem de Serviço</h2>
      <input placeholder="Nome do cliente" value={form.cliente} onChange={(e) => setForm({ ...form, cliente: e.target.value })} />
      <input placeholder="Equipamento" value={form.equipamento} onChange={(e) => setForm({ ...form, equipamento: e.target.value })} />
      <input placeholder="Tipo de serviço" value={form.tipoServico} onChange={(e) => setForm({ ...form, tipoServico: e.target.value })} />
      <input type="date" value={form.data} onChange={(e) => setForm({ ...form, data: e.target.value })} />
      <textarea placeholder="Observações" value={form.observacoes} onChange={(e) => setForm({ ...form, observacoes: e.target.value })} />
      <button onClick={handleSubmit}>Salvar OS</button>

      <h3>Histórico</h3>
      {historico.map((os) => (
        <div key={os.id} style={{ border: '1px solid #ccc', margin: '10px 0', padding: 10 }}>
          <p><strong>Cliente:</strong> {os.cliente}</p>
          <p><strong>Equipamento:</strong> {os.equipamento}</p>
          <p><strong>Serviço:</strong> {os.tipoServico}</p>
          <p><strong>Data:</strong> {os.data}</p>
          <p><strong>Observações:</strong> {os.observacoes}</p>
        </div>
      ))}
    </div>
  );
}
