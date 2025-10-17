export default function Filters({ filters, setFilters }){
  return (
    <div className="glass rounded-3xl p-4 md:p-6">
      <div className="grid md:grid-cols-4 gap-4">
        <div>
          <label className="text-sm text-slate-400">Diet</label>
          <select value={filters.diet} onChange={e=>setFilters(f=>({...f, diet:e.target.value}))} className="input">
            <option value="">Any</option>
            <option>vegetarian</option>
            <option>vegan</option>
            <option>gluten-free</option>
            <option>keto</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-slate-400">Max Time (min)</label>
          <input type="number" className="input" value={filters.maxTime||""} placeholder="e.g., 30"
            onChange={e=>setFilters(f=>({...f, maxTime: Number(e.target.value)||null}))}/>
        </div>
        <div>
          <label className="text-sm text-slate-400">Difficulty</label>
          <select value={filters.difficulty} onChange={e=>setFilters(f=>({...f, difficulty:e.target.value}))} className="input">
            <option value="">Any</option>
            <option>easy</option>
            <option>medium</option>
            <option>hard</option>
          </select>
        </div>
        <div className="flex items-end">
          <button onClick={()=>setFilters({diet:"", maxTime:null, difficulty:""})} className="btn bg-white/10 hover:bg-white/20">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}