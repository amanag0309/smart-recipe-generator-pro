import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import recipes from '../data/recipes.json';
import RecipeCard from '../components/RecipeCard';

export default function Favorites(){
  const [favIds, setFavIds] = useState([]);

  useEffect(()=>{
    const f = JSON.parse(localStorage.getItem('favorites')||'[]');
    setFavIds(f);
  }, []);

  const favs = recipes.filter(r => favIds.includes(r.id));

  return (
    <div>
      <Navbar />
      <main className="container py-8">
        <h1 className="text-2xl font-bold">Your Favorites</h1>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favs.map(r => <RecipeCard key={r.id} recipe={r} />)}
          {!favs.length && <div className="text-slate-400">No favorites yet.</div>}
        </div>
      </main>
    </div>
  );
}