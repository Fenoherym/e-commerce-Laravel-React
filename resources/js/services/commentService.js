import axios from "axios";

/**
 * Fonction asynchrone pour envoyer un commentaire.
 * @param {Object} commentMsg - Les données du commentaire à envoyer.
 * @returns {Promise} - La promesse de la requête axios.
 */
export async function sendComment(commentMsg) {
    const { product_id, name, email, content, note } = commentMsg;

    try {
        const response = await axios.post('/comment', { product_id, name, email, content, note });
        return response;
    } catch (err) {
        throw err; // Propager l'erreur pour la gestion dans le composant
    }
} 

export async function getComment() {
    try {
        const response = await axios.get('/comment');          
        return response;

    } catch (err) {
        throw err;
    }
}