import { SUBS } from './substitutions';

const normalize = (s)=> s.toLowerCase().replace(/[^a-z0-9\s]/g,'').trim();

export function parseInput(input){
  return Array.from(new Set(
    (input||'')
      .split(',')
      .map(s=>normalize(s))
      .filter(Boolean)
  ));
}

// match score: direct hits + partials + substitution hits
export function scoreRecipe(recipe, pantry){
  const ing = recipe.ingredients.map(normalize);
  let score = 0;
  let missing = [];
  for (const item of ing){
    const hit = pantry.some(p => item.includes(p) || p.includes(item));
    if (hit) { score += 2; continue; }
    // substitution
    let subHit = false;
    for (const key in SUBS){
      if (item.includes(key)){
        const alts = SUBS[key];
        if (alts.some(a => pantry.includes(normalize(a)))){
          subHit = true;
        }
      }
    }
    if (subHit){ score += 1; } else { missing.push(item); }
  }
  // prefer fewer ingredients & shorter time
  score += Math.max(0, 8 - ing.length) * 0.1;
  score += Math.max(0, 60 - (recipe.time||30)) * 0.01;
  return { score, missing };
}

export function filterRecipes(recipes, filters){
  return recipes.filter(r => {
    if (filters.diet && !(r.diet||[]).includes(filters.diet)) return false;
    if (filters.maxTime && (r.time||999) > filters.maxTime) return false;
    if (filters.difficulty && r.difficulty !== filters.difficulty) return false;
    return true;
  });
}

export function servingsAdjusted(recipe, servings){
  if (!servings || servings === recipe.servings) return recipe.ingredients;
  const ratio = servings / recipe.servings;
  return recipe.ingredients.map(line => line.replace(/(\d+\.?\d*)/g, (x)=> (Math.round(parseFloat(x)*ratio*10)/10).toString()));
}