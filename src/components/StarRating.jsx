export default function RatingBadge({ rating, size = 'md' }) {
  if (rating === null || rating === undefined) {
    return <span className={`rating-badge rating-na rating-${size}`}>N/A</span>
  }

  let colorClass = 'rating-low'
  if (rating >= 8) colorClass = 'rating-high'
  else if (rating >= 6) colorClass = 'rating-mid'
  else if (rating >= 4) colorClass = 'rating-ok'

  return (
    <div className={`rating-badge-wrapper rating-${size}`}>
      <span className={`rating-badge ${colorClass}`}>
        {rating % 1 === 0 ? rating : rating.toFixed(1)}
      </span>
      <span className="rating-out-of">/10</span>
    </div>
  )
}
