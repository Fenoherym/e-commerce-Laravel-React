import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import Master from "@/Layouts/Master";
import { changeCountValue } from "@/features/counter";

/**
 * Composant Show qui affiche les détails d'un produit.
 * @param {Object} product - L'objet produit à afficher.
 */
export default function Show({ product }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [showTotalPrice, setShowTotalPrice] = useState(false);
   

    const dispatch= useDispatch()    /**
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
    async function addToCart() {
        let formData = new FormData()
        formData.append('product_id', product.id)
        formData.append('quantity', quantity)
        await axios.post('/api/cart/add', formData)
        .then(r => {
            dispatch(changeCountValue(r.data.cart_count))           
        })
        .catch(err => console.log(err))
       
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
                            addToCart={addToCart}
                        />
                    </div>
                </div>
            </div>
        </ Master>
    );
}

// ... Nouveau composant ImageGallery

/**
 * Composant ImageGallery qui affiche une galerie d'images pour le produit.
 * @param {Array} images - Les images du produit.
 * @param {number} currentImageIndex - L'index de l'image actuellement affichée.
 * @param {Function} setCurrentImageIndex - Fonction pour mettre à jour l'index de l'image.
 */
function ImageGallery({ images, currentImageIndex, setCurrentImageIndex }) {
    return (
        <div className="lg:w-1/2">
            <div className="relative aspect-w-1 aspect-h-1 mb-4 transition-transform duration-300 ease-in-out transform hover:scale-105">
                <img
                    src={images[currentImageIndex].url}
                    alt={`Image principale`}
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                />
            </div>
            <div className="grid grid-cols-4 gap-2">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`border-2 rounded-md overflow-hidden transition-transform duration-300 ease-in-out transform ${currentImageIndex === index ? 'border-red-500 scale-110' : 'border-gray-200 hover:scale-105'}`}
                    >
                        <img src={image.url} alt={`Miniature ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>
        </div>
        
    );
}

// ... Nouveau composant ProductInfo

/**
 * Composant ProductInfo qui affiche les informations détaillées du produit.
 * @param {Object} product - L'objet produit à afficher.
 * @param {number} quantity - La quantité sélectionnée du produit.
 * @param {Function} setQuantity - Fonction pour mettre à jour la quantité.
 * @param {Function} incrementQuantity - Fonction pour incrémenter la quantité.
 * @param {boolean} showTotalPrice - Indique si le prix total doit être affiché.
 * @param {Function} addToCart - Fonction pour ajouter le produit au panier.
 */
function ProductInfo({ product, quantity, setQuantity, incrementQuantity, showTotalPrice, addToCart }) {


    return (
        <div className="lg:w-1/2 mt-8 lg:mt-0">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                    {[0, 1, 2, 3, 4].map((rating) => (
                        <i key={rating} className="fa-solid fa-star text-yellow-900 text-xs"></i>
                        // <StarIcon key={rating} className={`h-5 w-5 flex-shrink-0 ${rating < product.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                </div>
                {/* <p className="ml-2 text-sm text-gray-600">{product.reviewCount} Review(s) | <a href="#" className="text-red-500">Add your review</a></p> */}
            </div>
            <div className="mb-4">
                <span className="text-3xl font-bold text-red-600">${product.price}</span>100 $
                {/* {product.originalPrice && (
                                <span className="ml-2 text-lg text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                            )} */}
                <span className="ml-2 text-green-600 font-semibold">IN STOCK</span>
            </div>
            <p className="text-gray-600 mb-6">{product.description}</p>
            <div className="flex items-center space-x-4 mb-6">
                <div>
                    <label htmlFor="size" className="block text-sm font-medium text-gray-700">Size</label>
                    <select id="size" name="size" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md">
                        <option>X</option>
                        {/* Ajoutez d'autres options ici */}
                    </select>
                </div>
                <div>
                    <label htmlFor="color" className="block text-sm font-medium text-gray-700">Color</label>
                    <select id="color" name="color" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md">
                        <option>Red</option>
                        {/* Ajoutez d'autres options ici */}
                    </select>
                </div>
            </div>
            <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center border border-gray-300 rounded-md">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 text-gray-600 hover:bg-gray-100">-</button>
                    <input type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="w-14 text-center border-none focus:ring-0" />
                    <button onClick={incrementQuantity} className="px-3 py-2 text-gray-600 hover:bg-gray-100">+</button>
                </div>
                <button 
                    className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition duration-300"
                    onClick={addToCart}
                
                >
                    ADD TO CART
                </button>
                {showTotalPrice && <span className="text-sm text-gray-600">Total: {product.price * quantity} $</span>}
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
                <button className="flex items-center"><i className="fa-solid fa-star text-yellow-900 text-xs"></i> ADD TO WISHLIST</button>
                <button className="flex items-center"><i className="fa-solid fa-star text-yellow-900 text-xs"></i> ADD TO COMPARE</button>
            </div>
            <div className="mt-6">
                <p className="text-sm text-gray-600">CATEGORY: <span className="font-semibold">HEADPHONES ACCESSORIES</span></p>
                <div className="mt-2 flex space-x-2">
                    <p className="text-sm text-gray-600">SHARE:</p>
                    {/* Ajoutez ici les icônes de partage social */}
                </div>
            </div>
        </div>
    );
}
