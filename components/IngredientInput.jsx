import { useRef, useState } from 'react';

export default function IngredientInput({ onSubmit }){
  const [text, setText] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  const handleImage = async (file)=>{
    try{
      setUploading(true);
      const b64 = await toBase64(file);
      const res = await fetch('/api/recognize', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ imageBase64: b64 })
      });
      const data = await res.json();
      const names = data.labels || [];
      if (names.length){
        setText(prev => [...new Set((prev?prev.split(',').map(s=>s.trim()):[]).concat(names))].join(', '));
      } else {
        alert("Couldn't detect ingredients. Please type them.");
      }
    } catch(e){
      alert('Image analysis failed, please add ingredients manually.');
    } finally {
      setUploading(false);
    }
  };

  const toBase64 = (file)=> new Promise((resolve, reject)=>{
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  return (
    <div className="glass rounded-3xl p-4 md:p-6">
      <label className="text-sm text-slate-400">Ingredients (comma separated)</label>
      <textarea
        placeholder="e.g., tomato, onion, garlic, chicken"
        className="input min-h-[100px]"
        value={text}
        onChange={e=>setText(e.target.value)}
      />
      <div className="mt-3 flex flex-wrap gap-3">
        <button className="btn btn-primary" onClick={()=>onSubmit(text)}>
          {uploading ? 'Working…' : 'Find Recipes'}
        </button>
        <button className="btn bg-white/10 hover:bg-white/20" onClick={()=>fileRef.current?.click()}>
          {uploading ? 'Analyzing…' : 'Add from Photo'}
        </button>
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e)=>{
          const f = e.target.files?.[0];
          if (f) handleImage(f);
        }}/>
      </div>
    </div>
  );
}