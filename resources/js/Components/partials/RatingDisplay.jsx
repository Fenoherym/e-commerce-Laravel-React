export default function RatingDisplay() {
    return (
        <div className="flex gap-1 mb-4">
            {[0, 1, 2, 3, 4].map((rating) => (
                <i key={rating} className="fa-solid fa-star text-red-400"></i>
                // <StarIcon key={rating} className={`h-5 w-5 flex-shrink-0 ${rating < product.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
            ))}
        </div>
    )
}
