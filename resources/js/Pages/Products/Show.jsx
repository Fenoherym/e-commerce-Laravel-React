import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Master from "@/Layouts/Master";
import { changeCountValue } from "@/features/counter";
import ImageGallery from "@/Components/partials/ImageGallery";
import ProductInfo from "@/Components/partials/ProductInfo";
import { sendComment, getComment } from "@/services/commentService";
import { addToCart } from "@/services/cartService";
import CommentForm from "@/Components/partials/Comment/CommentForm";
import Comment from "@/Components/partials/Comment/Comment";
import RatingDisplay from "@/Components/partials/RatingDisplay";
import Pagination from "@/Components/partials/Pagination";


/**
 * Composant Show qui affiche les détails d'un produit.
 * @param {Object} product - L'objet produit à afficher.
 */
export default function Show({ product, auth }) {

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [showTotalPrice, setShowTotalPrice] = useState(false);
    const [commentRating, setCommentRating] = useState(0)
    const [ratingHover, setRatingHover] = useState(-1)
    const [comments, setComments] = useState({})


    const [commentMsg, setCommentMsg] = useState({
        product_id: product.id,
        name: "",
        email: "",
        content: "",
        note: null

    })

    const dispatch = useDispatch()

    


    async function fetchComment(product_id, url=null) {
        console.log(url)
        try {
            const response = await getComment(product_id, url);
            console.log(response)
            setComments(response.data.comments);
        } catch (error) {
            console.error('Erreur lors du chargement des commentaires:', error);
        }
    }

    const handlePageChange = (url) => {
        fetchComment(product.id, url);
    };

    useEffect(() => {
        fetchComment(product.id);
        if(auth.user) {
            setCommentMsg({...commentMsg, name: auth.user.name, email: auth.user.email});
        }
    }, []);



    /**
     * Fonction pour incrémenter la quantité du produit.
     */
    function incrementQuantity() {
        if (quantity < product.quantity) {
            setQuantity(prev => Math.max(1, prev + 1));
            setShowTotalPrice(true);
        }
    }

    /**
     * Fonction asynchrone pour ajouter le produit au panier.
     */
    async function handleAddToCart() {
        try {
            const response = await addToCart(product, quantity);
            dispatch(changeCountValue(response.data.cart_count));
        } catch (err) {
            console.log(err);
        }
    }

    async function handleSendComment(e) {
        e.preventDefault();
        try {                      
            await sendComment(commentMsg);
            setCommentMsg({...commentMsg, name: "", email: "", content:"", note:null});           
            fetchComment()
        } catch (err) {
            console.error("Erreur lors de l'envoi du commentaire :", err);
        }
    }





    return (
        <Master title="Shop" search={(e) => setSearch(e.target.value)}>
            <div className="bg-white min-h-screen">

                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="lg:flex lg:space-x-8">
                        {/* Galerie d'images */}
                        <ImageGallery
                            images={product.images}
                            currentImageIndex={currentImageIndex}
                            setCurrentImageIndex={setCurrentImageIndex}
                        />

                        {/* Informations du produit */}
                        <ProductInfo
                            product={product}
                            quantity={quantity}
                            setQuantity={setQuantity}
                            incrementQuantity={incrementQuantity}
                            showTotalPrice={showTotalPrice}
                            addToCart={handleAddToCart}
                        />
                    </div>
                </div>
            </div>
            <div className="px-10">
                <div className="flex items-center font-bold text-gray-500">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4">Commentaires ({comments?.total || 0})</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <div className="flex justify-between">
                    <div className="flex-[1] p-4">
                        <div className="flex items-center font-bold gap-2 text-xl mb-5">
                            <span className="text-2xl">4.5</span>
                            <RatingDisplay />
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div className="bg-red-600 h-3 rounded-full w-[80%]"></div>
                        </div>
                    </div>
                    <div className="flex-[2] p-4">
                        {comments?.total !== 0 ? comments?.data?.map((comment) => (
                            <Comment key={comment.id} comment={comment} />
                        )) : (
                            <div className="flex justify-center text-gray-600 text-sm">
                                Aucun commentaire sur ce produit
                            </div>
                        )}
                        {comments?.data?.length > 0 && 
                        <Pagination 
                            isAjax={true}
                            data={comments} 
                            onPageChange={handlePageChange}
                        />}
                    </div>
                    <div className="flex-[1] p-4">
                        <CommentForm 
                            commentMsg={commentMsg} 
                            setCommentMsg={setCommentMsg} 
                            ratingHover={ratingHover}
                            commentRating={commentRating} 
                            handleSendComment={handleSendComment} 
                            setRatingHover={setRatingHover}
                            setCommentRating={setCommentRating}
                        />
                    </div>
                </div>
            </div>

        </ Master>
    );
}
