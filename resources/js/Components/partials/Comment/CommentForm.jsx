export default function CommentForm({handleSendComment, setCommentMsg,commentMsg, commentRating, ratingHover, setRatingHover, setCommentRating}) {
    return (
        <form onSubmit={handleSendComment}>
            <div className="mb-4">
                <input
                    onChange={(e) => setCommentMsg({ ...commentMsg, name: e.target.value })}
                    value={commentMsg.name}
                    type="text"
                    className="w-full rounded-md text-sm"
                    placeholder="VOTRE NOM"
                    required
                />
                {/* <span className="text-red-400 text-xs">Champ obligatoire</span> */} 
            </div>
            <div className="mb-4">
                <input
                    onChange={(e) => setCommentMsg({ ...commentMsg, email: e.target.value })}
                    type="email"
                    value={commentMsg.email}
                    className="w-full rounded-md text-sm"
                    placeholder="VOTRE PRENOM"
                    required
                />
            </div>
            <div className="mb-4">

                <textarea
                    onChange={(e) => setCommentMsg({ ...commentMsg, content: e.target.value })}
                    className="w-full rounded-md text-sm"
                    value={commentMsg.content}
                    placeholder="VOTRE MESSAGE"
                    required
                    ></textarea>
            </div>

            <div
                className="flex items-center font-bold gap-1 text-sm mb-5"
            >
                {[0, 1, 2, 3, 4].map((rating, index) => (
                    rating < commentRating ? (
                        <i
                            onClick={() => {
                                setCommentRating(rating + 1)
                                setCommentMsg({ ...commentMsg, note: rating + 1 })
                            }}
                            key={rating} className="                                      
                        fa-solid fa-star cursor-pointer text-red-500"
                        ></i>
                    ) : (
                        <i
                            onClick={() => {
                                setCommentRating(rating + 1)
                                setCommentMsg({ ...commentMsg, note: rating + 1 })
                            }}
                            onMouseEnter={() => setRatingHover(rating)}
                            onMouseLeave={() => setRatingHover(-1)}
                            key={rating}
                            className={`
                        fa-regular fa-star cursor-pointer
                        ${index <= ratingHover ? 'text-red-500' : 'text-gray-500'}
                    `}></i>
                    )
                ))}
            </div>

            <button
                className="p-3 rounded-md bg-red-500 text-lime-50 hover:bg-red-700 duration-500">
                Envoyer
            </button>
        </form>
    )
}
