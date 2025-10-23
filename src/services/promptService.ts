import { supabase } from '@/lib/supabase';
import { Prompt } from '@/types';

export class PromptService {
  // Buscar todos os prompts do usuário
  static async getUserPrompts(userId: string): Promise<Prompt[]> {
    try {
      const { data, error } = await supabase
        .from('prompt')
        .select('*')
        .eq('usuario_id', userId)
        .order('data_criacao', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Erro ao buscar prompts do usuário:', error);
      return [];
    }
  }

  // Buscar prompts públicos
  static async getPublicPrompts(): Promise<Prompt[]> {
    try {
      const { data, error } = await supabase
        .from('prompt')
        .select('*')
        .eq('publico', true)
        .order('data_criacao', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Erro ao buscar prompts públicos:', error);
      return [];
    }
  }

  // Buscar prompt por ID
  static async getPromptById(id: string): Promise<Prompt | null> {
    try {
      const { data, error } = await supabase
        .from('prompt')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro ao buscar prompt:', error);
      return null;
    }
  }

  // Criar novo prompt
  static async createPrompt(prompt: Omit<Prompt, 'id' | 'data_criacao' | 'data_atualizacao'>): Promise<Prompt | null> {
    try {
      const { data, error } = await supabase
        .from('prompt')
        .insert([prompt])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro ao criar prompt:', error);
      return null;
    }
  }

  // Atualizar prompt
  static async updatePrompt(id: string, updates: Partial<Omit<Prompt, 'id' | 'data_criacao' | 'usuario_id'>>): Promise<Prompt | null> {
    try {
      const { data, error } = await supabase
        .from('prompt')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro ao atualizar prompt:', error);
      return null;
    }
  }

  // Deletar prompt
  static async deletePrompt(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('prompt')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Erro ao deletar prompt:', error);
      return false;
    }
  }

  // Buscar prompts por categoria
  static async getPromptsByCategory(categoria: string, userId?: string): Promise<Prompt[]> {
    try {
      let query = supabase
        .from('prompt')
        .select('*')
        .eq('categoria', categoria);

      if (userId) {
        query = query.eq('usuario_id', userId);
      } else {
        query = query.eq('publico', true);
      }

      const { data, error } = await query.order('data_criacao', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Erro ao buscar prompts por categoria:', error);
      return [];
    }
  }

  // Buscar prompts por tags
  static async getPromptsByTags(tags: string[], userId?: string): Promise<Prompt[]> {
    try {
      let query = supabase
        .from('prompt')
        .select('*')
        .overlaps('tags', tags);

      if (userId) {
        query = query.eq('usuario_id', userId);
      } else {
        query = query.eq('publico', true);
      }

      const { data, error } = await query.order('data_criacao', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Erro ao buscar prompts por tags:', error);
      return [];
    }
  }

  // Buscar prompts (busca geral)
  static async searchPrompts(searchTerm: string, userId?: string): Promise<Prompt[]> {
    try {
      let query = supabase
        .from('prompt')
        .select('*')
        .or(`titulo.ilike.%${searchTerm}%,descricao.ilike.%${searchTerm}%,conteudo.ilike.%${searchTerm}%`);

      if (userId) {
        query = query.eq('usuario_id', userId);
      } else {
        query = query.eq('publico', true);
      }

      const { data, error } = await query.order('data_criacao', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Erro ao buscar prompts:', error);
      return [];
    }
  }
}
