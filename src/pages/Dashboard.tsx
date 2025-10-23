import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { PromptCard } from "@/components/PromptCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockPrompts } from "@/data/mockData";
import { Prompt } from "@/types";
import { Plus, Search } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    
    const userPrompts = mockPrompts.filter((p) => p.usuario_id === user.id);
    setPrompts(userPrompts);
  }, [user, navigate]);

  const filteredPrompts = prompts.filter(
    (prompt) =>
      prompt.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prompt.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prompt.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDelete = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este prompt?")) {
      setPrompts(prompts.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Meus Prompts</h1>
            <p className="text-muted-foreground">Gerencie e organize seus prompts</p>
          </div>
          <Button onClick={() => navigate("/prompt/new")}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Prompt
          </Button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar prompts por título, descrição ou tags..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {filteredPrompts.length === 0 ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
            <p className="mb-4 text-lg text-muted-foreground">
              {searchTerm ? "Nenhum prompt encontrado" : "Você ainda não tem prompts"}
            </p>
            {!searchTerm && (
              <Button onClick={() => navigate("/prompt/new")}>
                <Plus className="mr-2 h-4 w-4" />
                Criar Primeiro Prompt
              </Button>
            )}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPrompts.map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
