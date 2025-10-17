import Link from 'next/link';
import RatingStars from './RatingStars';
import { useEffect, useState } from 'react';

export default function RecipeCard({ recipe }){
  const [rating, setRating] = useState(0);
  const [fav, setFav] = useState(false);

  useEffect(()=>{
    const r = JSON.parse(localStorage.getItem('ratings')||'{}');
    setRating(r[recipe.id]||0);
    const f = JSON.parse(localStorage.getItem('favorites')||'[]');
    setFav(f.includes(recipe.id));
  }, [recipe.id]);

  const onRate = (v)=>{
    const r = JSON.parse(localStorage.getItem('ratings')||'{}');
    r[recipe.id] = v;
    localStorage.setItem('ratings', JSON.stringify(r));
    setRating(v);
  };

  const toggleFav = ()=>{
    const f = JSON.parse(localStorage.getItem('favorites')||'[]');
    const idx = f.indexOf(recipe.id);
    if (idx>=0) f.splice(idx,1); else f.push(recipe.id);
    localStorage.setItem('favorites', JSON.stringify(f));
    setFav(!fav);
  };

  return (
    <div className="glass rounded-3xl p-5 hover:translate-y-[-2px] transition">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg md:text-xl font-semibold">{recipe.title}</h3>
          <p className="text-slate-400 text-sm mt-1 line-clamp-2">{recipe.description}</p>
        </div>
        <div className="text-right">
          <span className="badge">⏱ {recipe.time} min</span>
          <div className="mt-2"><RatingStars value={rating} onChange={onRate}/></div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {recipe.diet?.map(d => <span key={d} className="badge">{d}</span>)}
        <span className="badge">⚙ {recipe.difficulty}</span>
        <span className="badge">🍽 Serves {recipe.servings}</span>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-slate-400">
          {recipe.nutrition?.calories} kcal · {recipe.nutrition?.protein}g protein
        </div>
        <div className="flex items-center gap-2">
          <button onClick={toggleFav} className="btn bg-white/10 hover:bg-white/20">{fav ? '★ Saved' : '☆ Save'}</button>
          <Link href={`/recipe/${recipe.id}`} className="btn btn-primary">View</Link>
        </div>
      </div>
    </div>
  );
}