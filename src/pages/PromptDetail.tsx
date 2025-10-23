import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockPrompts } from "@/data/mockData";
import { Prompt } from "@/types";
import { ArrowLeft, Copy, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function PromptDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [prompt, setPrompt] = useState<Prompt | null>(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const found = mockPrompts.find((p) => p.id === id && p.usuario_id === user.id);
    if (found) {
      setPrompt(found);
    } else {
      navigate("/dashboard");
    }
  }, [id, user, navigate]);

  const handleCopy = async () => {
    if (!prompt) return;
    
    try {
      await navigator.clipboard.writeText(prompt.conteudo);
      toast.success("Prompt copiado!", {
        description: "O conteúdo foi copiado para sua área de transferência",
      });
    } catch (error) {
      toast.error("Erro ao copiar", {
        description: "Não foi possível copiar o prompt",
      });
    }
  };

  const handleDelete = () => {
    if (window.confirm("Tem certeza que deseja excluir este prompt?")) {
      toast.success("Prompt excluído!");
      navigate("/dashboard");
    }
  };

  if (!prompt) return null;

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
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-2xl">{prompt.titulo}</CardTitle>
                <CardDescription className="mt-2">{prompt.descricao}</CardDescription>
              </div>
              <Badge variant="secondary" className="ml-4">
                {prompt.categoria}
              </Badge>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {prompt.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div>
              <h3 className="mb-2 font-semibold">Conteúdo</h3>
              <div className="rounded-lg bg-muted p-4">
                <pre className="whitespace-pre-wrap font-mono text-sm">{prompt.conteudo}</pre>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleCopy} className="flex-1">
                <Copy className="mr-2 h-4 w-4" />
                Copiar Prompt
              </Button>
              <Button variant="outline" onClick={() => navigate(`/prompt/${prompt.id}/edit`)}>
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </Button>
              <Button variant="outline" onClick={handleDelete}>
                <Trash2 className="mr-2 h-4 w-4" />
                Excluir
              </Button>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>Criado em: {new Date(prompt.data_criacao).toLocaleDateString()}</p>
              <p>Atualizado em: {new Date(prompt.data_atualizacao).toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
