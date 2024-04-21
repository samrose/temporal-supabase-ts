import { createClient } from '@supabase/supabase-js'


export async function countries(name: string): Promise<string> {
  // Create a single supabase client for interacting with your database
  const token = process.env.SUPABASE_PUB_ANON_KEY || '';
  const supabase = createClient('http://localhost:54321', token)

  const { data, error } = await supabase
  .from('countries')
  .select('continent, name')
  if (error) {
    throw new Error(error.message);
  }

  let result = '';
  if (data) {
    for (const row of data) {
      result += `${row.name} is located in ${row.continent}, `;
    }
  }

  return `Countries: ${result}`;
}
