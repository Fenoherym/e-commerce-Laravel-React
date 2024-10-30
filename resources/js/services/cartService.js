import axios from "axios";

/**
 * Fonction asynchrone pour ajouter un produit au panier.
 * @param {Object} product - Le produit à ajouter.
 * @param {number} quantity - La quantité à ajouter.
 * @returns {Promise} - La promesse de la requête axios.
 */
export async function addToCart(product, quantity) {
    let formData = new FormData();
    formData.append('product_id', product.id);
    formData.append('quantity', quantity);
    return await axios.post('/api/cart/add', formData);
} 