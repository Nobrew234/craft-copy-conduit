import { createClient } from '@supabase/supabase-js';
import { mockUsers, mockPrompts } from '../data/mockData';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL and Key must be provided in environment variables.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrate() {
  console.log("Starting migration...");

  // Migrate users
  console.log("Migrating users...");
  for (const user of mockUsers) {
    const { data, error } = await supabase.from('usuario').insert([user]);
    if (error) {
      console.error('Error inserting user:', error);
    } else {
      console.log('Inserted user:', data);
    }
  }

  // Migrate prompts
  console.log("Migrating prompts...");
  for (const prompt of mockPrompts) {
    const { data, error } = await supabase.from('prompt').insert([prompt]);
    if (error) {
      console.error('Error inserting prompt:', error);
    } else {
      console.log('Inserted prompt:', data);
    }
  }

  console.log("Migration finished.");
}

migrate();
