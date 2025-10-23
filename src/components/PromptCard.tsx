import { Prompt } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Edit, Eye, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface PromptCardProps {
  prompt: Prompt;
  onDelete?: (id: string) => void;
}

export function PromptCard({ prompt, onDelete }: PromptCardProps) {
  const navigate = useNavigate();

  const handleCopy = async () => {
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

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="line-clamp-1">{prompt.titulo}</CardTitle>
            <CardDescription className="line-clamp-2 mt-1">{prompt.descricao}</CardDescription>
          </div>
          <Badge variant="secondary" className="ml-2 shrink-0">
            {prompt.categoria}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex flex-wrap gap-1">
          {prompt.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">{prompt.conteudo}</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button size="sm" variant="default" className="flex-1" onClick={handleCopy}>
          <Copy className="mr-2 h-4 w-4" />
          Copiar
        </Button>
        <Button size="sm" variant="outline" onClick={() => navigate(`/prompt/${prompt.id}`)}>
          <Eye className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="outline" onClick={() => navigate(`/prompt/${prompt.id}/edit`)}>
          <Edit className="h-4 w-4" />
        </Button>
        {onDelete && (
          <Button size="sm" variant="outline" onClick={() => onDelete(prompt.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
