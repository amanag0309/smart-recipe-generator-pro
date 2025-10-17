export default async function handler(req, res){
  if (req.method !== 'POST') return res.status(405).json({error:'Method not allowed'});
  const { imageBase64 } = req.body || {};
  if (!imageBase64) return res.status(400).json({error:'imageBase64 required'});

  const token = process.env.HUGGINGFACE_TOKEN;
  try{
    if (token){
      const model = "nateraw/food";
      const resp = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: Buffer.from(imageBase64.split(',')[1] || '', 'base64')
      });
      if (!resp.ok) throw new Error('HF request failed');
      const out = await resp.json();
      const arr = Array.isArray(out) ? out : (out?.[0] || []);
      const labels = Array.from(new Set(
        arr.slice(0,5).map(x => (x.label || '').toLowerCase()).flatMap(lbl => {
          if (lbl.includes('pizza')) return ['tomato','cheese','flour'];
          if (lbl.includes('salad')) return ['lettuce','tomato','cucumber'];
          if (lbl.includes('burger')) return ['bread','lettuce','onion','tomato'];
          return [lbl];
        })
      ));
      return res.status(200).json({ labels });
    }
  } catch(e){ /* fall through */ }
  // Fallback: ask user to type manually on the client
  return res.status(200).json({ labels: [] });
}