import recipes from '../../data/recipes.json';

export default function handler(req, res){
  if (req.method !== 'GET') return res.status(405).json({error:'Method not allowed'});
  const { q='', diet='', maxTime='', difficulty='' } = req.query;
  const query = q.toString().toLowerCase();
  let items = recipes;

  if (diet) items = items.filter(r => (r.diet||[]).includes(diet));
  if (maxTime) items = items.filter(r => (r.time||999) <= Number(maxTime));
  if (difficulty) items = items.filter(r => r.difficulty === difficulty);

  if (query){
    const parts = query.split(',').map(s=>s.trim());
    items = items.filter(r => {
      const pool = (r.ingredients||[]).join(' ').toLowerCase() + ' ' + (r.title||'').toLowerCase();
      return parts.every(p => pool.includes(p));
    });
  }

  res.status(200).json(items);
}