export default function RatingStars({ value=0, onChange }){
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map(star => (
        <button
          key={star}
          onClick={() => onChange && onChange(star)}
          aria-label={`Rate ${star} star`}
          className={"text-xl " + (star <= value ? "text-yellow-400" : "text-slate-500")}
        >★</button>
      ))}
    </div>
  );
}