import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { name, jd, nathan } = req.body;

  if (!name || jd === undefined || nathan === undefined) {
    return res.status(400).json({ message: 'Missing name or scores' });
  }

  const { data, error } = await supabase
    .from('scores')
    .insert([{ name, jd, nathan }]);

  if (error) {
    return res.status(500).json({ message: 'Failed to save score', error });
  }

  res.status(200).json({ message: 'Score saved successfully', data });
}
