import { useRouter } from 'next/router';
import Link from 'next/link';
import recipes from '../../data/recipes.json';
import Navbar from '../../components/Navbar';
import RatingStars from '../../components/RatingStars';
import { useEffect, useMemo, useState } from 'react';
import { servingsAdjusted } from '../../utils/matchRecipes';


export default function RecipePage(){
  const router = useRouter();
  const { id } = router.query;
  const recipe = useMemo(()=> recipes.find(r => r.id === id), [id]);
  const [servings, setServings] = useState(recipe?.servings || 2);
  const [rating, setRating] = useState(0);

  useEffect(()=>{
    if (!recipe) return;
    setServings(recipe.servings);
    const r = JSON.parse(localStorage.getItem('ratings')||'{}');
    setRating(r[recipe.id]||0);
  }, [recipe]);

  const onRate = (v)=>{
    const r = JSON.parse(localStorage.getItem('ratings')||'{}');
    r[recipe.id] = v;
    localStorage.setItem('ratings', JSON.stringify(r));
    setRating(v);
  };

  if (!recipe) return <div className="p-6 text-slate-300">Loading…</div>;

  return (
    <div>
      <Navbar />
      <main className="container py-8">
        <Link href="/" className="text-slate-400 hover:text-white">← Back</Link>
        <h1 className="mt-3 text-3xl font-extrabold">{recipe.title}</h1>
        <div className="mt-2 flex flex-wrap gap-2">
          {recipe.diet?.map(d => <span key={d} className="badge">{d}</span>)}
          <span className="badge">⏱ {recipe.time} min</span>
          <span className="badge">⚙ {recipe.difficulty}</span>
        </div>

        <div className="mt-6 glass rounded-3xl p-6 grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold">Ingredients</h3>
            <div className="mt-2 flex items-center gap-3">
              <label className="text-sm text-slate-400">Servings</label>
              <input type="number" className="input w-28" value={servings} min={1} onChange={e=>setServings(Number(e.target.value)||recipe.servings)} />
            </div>
            <ul className="mt-3 list-disc pl-5 space-y-1">
              {servingsAdjusted(recipe, servings).map((line, i)=>(<li key={i} className="text-slate-300">{line}</li>))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Steps</h3>
            <ol className="mt-3 list-decimal pl-5 space-y-2 text-slate-300">
              {recipe.steps.map((s,i)=>(<li key={i}>{s}</li>))}
            </ol>
            <div className="mt-6">
              <h3 className="font-semibold">Nutrition (est.)</h3>
              <div className="text-slate-300 mt-1">
                {recipe.nutrition.calories} kcal · {recipe.nutrition.protein} g protein
              </div>
            </div>
            <div className="mt-6">
              <h3 className="font-semibold">Your rating</h3>
              <RatingStars value={rating} onChange={onRate} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}