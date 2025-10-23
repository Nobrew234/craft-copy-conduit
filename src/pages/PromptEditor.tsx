import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockPrompts, categories } from "@/data/mockData";
import { Prompt } from "@/types";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function PromptEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isNew = !id || id === "new";

  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    categoria: categories[0],
    tags: "",
    conteudo: "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (!isNew) {
      const prompt = mockPrompts.find((p) => p.id === id && p.usuario_id === user.id);
      if (prompt) {
        setFormData({
          titulo: prompt.titulo,
          descricao: prompt.descricao,
          categoria: prompt.categoria,
          tags: prompt.tags.join(", "),
          conteudo: prompt.conteudo,
        });
      } else {
        navigate("/dashboard");
      }
    }
  }, [id, user, navigate, isNew]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.titulo || !formData.conteudo) {
      toast.error("Preencha os campos obrigatórios");
      return;
    }

    const newPrompt: Prompt = {
      id: isNew ? String(Date.now()) : id!,
      usuario_id: user!.id,
      titulo: formData.titulo,
      descricao: formData.descricao,
      categoria: formData.categoria,
      tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
      conteudo: formData.conteudo,
      template: false,
      publico: false,
      data_criacao: isNew ? new Date().toISOString() : mockPrompts.find((p) => p.id === id)?.data_criacao || new Date().toISOString(),
      data_atualizacao: new Date().toISOString(),
    };

    if (isNew) {
      mockPrompts.push(newPrompt);
      toast.success("Prompt criado com sucesso!");
    } else {
      const index = mockPrompts.findIndex((p) => p.id === id);
      if (index !== -1) {
        mockPrompts[index] = newPrompt;
        toast.success("Prompt atualizado com sucesso!");
      }
    }

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-8">
        <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>{isNew ? "Criar Novo Prompt" : "Editar Prompt"}</CardTitle>
            <CardDescription>
              Preencha os campos abaixo para {isNew ? "criar" : "atualizar"} seu prompt
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="titulo">Título *</Label>
                <Input
                  id="titulo"
                  placeholder="Ex: Análise de Dados"
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Input
                  id="descricao"
                  placeholder="Breve descrição do prompt"
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="categoria">Categoria</Label>
                <Select value={formData.categoria} onValueChange={(value) => setFormData({ ...formData, categoria: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
                <Input
                  id="tags"
                  placeholder="Ex: dados, analytics, python"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="conteudo">Conteúdo do Prompt *</Label>
                <Textarea
                  id="conteudo"
                  placeholder="Digite o conteúdo do seu prompt aqui..."
                  className="min-h-[300px] font-mono"
                  value={formData.conteudo}
                  onChange={(e) => setFormData({ ...formData, conteudo: e.target.value })}
                  required
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="flex-1">
                  {isNew ? "Criar Prompt" : "Salvar Alterações"}
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate("/dashboard")}>
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
