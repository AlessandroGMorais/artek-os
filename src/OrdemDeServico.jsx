import { useEffect, useState } from 'react';

export default function OrdemDeServico() {
  const [form, setForm] = useState({
    cliente: '',
    equipamento: '',
    tipoServico: '',
    data: '',
    observacoes: '',
  });
  const [historico, setHistorico] = useState(() => {
    const saved = localStorage.getItem('os-historico');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('os-historico', JSON.stringify(historico));
  }, [historico]);

  const handleSubmit = () => {
    if (!form.cliente || !form.data) return alert('Preencha os campos obrigatórios');
    const novaOS = { ...form, id: Date.now() };
    setHistorico([novaOS, ...historico]);
    setForm({ cliente: '', equipamento: '', tipoServico: '', data: '', observacoes: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white pt-32 px-4 md:px-12">
      <div className="fixed top-0 left-0 w-full bg-white border-b border-blue-200 shadow z-50 py-4 px-4 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src="/artek_logo_transparent.png" alt="ARTEK+" className="h-10" />
          <h1 className="text-2xl font-bold text-blue-900">ARTEK+ - Ordem de Serviço</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white border border-blue-200 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">Cadastrar nova OS</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <input className="border rounded p-2 w-full" placeholder="Nome do cliente" value={form.cliente} onChange={(e) => setForm({ ...form, cliente: e.target.value })} />
            <input className="border rounded p-2 w-full" placeholder="Equipamento (ex: Split 9000 BTUs)" value={form.equipamento} onChange={(e) => setForm({ ...form, equipamento: e.target.value })} />
            <input className="border rounded p-2 w-full" placeholder="Tipo de serviço (ex: Preventiva)" value={form.tipoServico} onChange={(e) => setForm({ ...form, tipoServico: e.target.value })} />
            <input className="border rounded p-2 w-full" type="date" value={form.data} onChange={(e) => setForm({ ...form, data: e.target.value })} />
          </div>
          <textarea className="border rounded p-2 w-full mt-4" placeholder="Observações" value={form.observacoes} onChange={(e) => setForm({ ...form, observacoes: e.target.value })} />
          <button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 mt-4 rounded">Salvar OS</button>
        </div>

        <div className="mt-10">
          <h3 className="text-2xl font-bold text-blue-900 mb-4">Histórico de OS</h3>
          <div className="space-y-4">
            {historico.map((os) => (
              <div key={os.id} className="bg-white border-l-4 border-blue-600 shadow-md p-4 rounded">
                <p className="text-sm text-gray-800"><strong>Cliente:</strong> {os.cliente}</p>
                <p className="text-sm text-gray-800"><strong>Equipamento:</strong> {os.equipamento}</p>
                <p className="text-sm text-gray-800"><strong>Serviço:</strong> {os.tipoServico}</p>
                <p className="text-sm text-gray-800"><strong>Data:</strong> {os.data}</p>
                <p className="text-sm text-gray-800"><strong>Observações:</strong> {os.observacoes}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}