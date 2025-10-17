import { useEffect, useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import IngredientInput from '../components/IngredientInput';
import Filters from '../components/Filters';
import RecipeCard from '../components/RecipeCard';
import recipes from '../data/recipes.json';
import { parseInput, scoreRecipe, filterRecipes } from '../utils/matchRecipes';

export default function Home() {
  const [filters, setFilters] = useState({ diet: '', maxTime: null, difficulty: '' });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(recipes);

  useEffect(() => {
    setResults(recipes);
  }, []);

  const onSearch = async (text) => {
    setInput(text);
    setLoading(true);
    try {
      const pantry = parseInput(text);
      let list = filterRecipes(recipes, filters);
      if (pantry.length) {
        list = list
          .map((r) => ({ r, ...scoreRecipe(r, pantry) }))
          .sort((a, b) => b.score - a.score)
          .map((x) => x.r);
      } else {
        list = filterRecipes(recipes, filters);
      }
      setResults(list);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    onSearch(input);
  }, [filters]);

  const topPick = useMemo(() => results[0], [results]);

  return (
    <div>
      <Navbar />
      <main className="container py-10">
        <section className="text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Cook smarter with your <span className="text-brand">pantry</span>
          </h1>
          <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
            Paste ingredients or snap a photo. Get personalized recipes, nutrition, and substitutions.
          </p>
        </section>

        <div className="mt-8 grid gap-6">
          <IngredientInput onSubmit={onSearch} />
          <Filters filters={filters} setFilters={setFilters} />
        </div>

        <section className="mt-8">
          <div className="flex items-end justify-between">
            <h2 className="text-xl font-semibold">Suggestions</h2>
            {loading && <span className="text-sm text-slate-400">Finding the best matches…</span>}
          </div>

          {topPick && input && (
            <div className="mt-4 p-4 md:p-6 rounded-3xl bg-gradient-to-r from-brand/20 to-emerald-500/10 border border-white/10">
              <div className="text-sm text-slate-300">Top pick based on your pantry:</div>
              <div className="text-2xl font-bold mt-1">{topPick.title}</div>
            </div>
          )}

          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((r) => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
