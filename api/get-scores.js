import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  const { data, error } = await supabase
    .from('scores')
    .select('*')
    .order('jd', { ascending: false });

  if (error) {
    return res.status(500).json({ message: 'Error fetching scores', error });
  }

  res.status(200).json(data);
}
