import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

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
        <Card className="shadow-lg border border-blue-200">
          <CardContent className="space-y-4 pt-6">
            <h2 className="text-xl font-semibold text-blue-800">Cadastrar nova OS</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Input placeholder="Nome do cliente" value={form.cliente} onChange={(e) => setForm({ ...form, cliente: e.target.value })} />
              <Input placeholder="Equipamento (ex: Split 9000 BTUs)" value={form.equipamento} onChange={(e) => setForm({ ...form, equipamento: e.target.value })} />
              <Input placeholder="Tipo de serviço (ex: Preventiva)" value={form.tipoServico} onChange={(e) => setForm({ ...form, tipoServico: e.target.value })} />
              <Input type="date" value={form.data} onChange={(e) => setForm({ ...form, data: e.target.value })} />
            </div>
            <Textarea placeholder="Observações" value={form.observacoes} onChange={(e) => setForm({ ...form, observacoes: e.target.value })} />
            <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 text-white w-full md:w-auto">Salvar OS</Button>
          </CardContent>
        </Card>

        <div className="mt-10">
          <h3 className="text-2xl font-bold text-blue-900 mb-4">Histórico de OS</h3>
          <div className="space-y-4">
            {historico.map((os) => (
              <Card key={os.id} className="bg-white border-l-4 border-blue-600 shadow-md">
                <CardContent className="space-y-1 text-sm text-gray-800">
                  <p><strong>Cliente:</strong> {os.cliente}</p>
                  <p><strong>Equipamento:</strong> {os.equipamento}</p>
                  <p><strong>Serviço:</strong> {os.tipoServico}</p>
                  <p><strong>Data:</strong> {os.data}</p>
                  <p><strong>Observações:</strong> {os.observacoes}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
