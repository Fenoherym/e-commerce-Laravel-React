import Header from "@/Components/partials/Header"
import { Link } from "@inertiajs/react"
import { useState } from "react"

export default function CartPanel({ cart_content }) {
    return (
        <>
            <Header />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-center mb-6">Votre Panier</h1>
                <div className="bg-white shadow-md rounded-lg p-6">
                    {cart_content.length === 0 ? (
                        <p className="text-center text-gray-500">Votre panier est vide.</p>
                    ) : (
                        <div>
                            {Object.values(cart_content).map((item) => (
                                <div key={item.id} className="flex items-center justify-between border-b py-4">
                                    <div className="flex items-center">
                                        <img src={item.options.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                                        <div className="ml-4">
                                            <h2 className="text-lg font-semibold">{item.name}</h2>
                                            <p className="text-gray-600">Prix: {item.price} $ * {item.qty}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <Link 
                                            className="bg-red-500 text-white px-2 py-1 rounded"
                                            href={`/panel/delete/${item.rowId}`}
                                        >
                                            Supprimer
                                        </Link>                                      
                                    </div>
                                </div>
                            ))}
                            <div className="flex justify-between mt-4">
                                <h2 className="text-xl font-bold">Total: {Object.values(cart_content).reduce((total, item) => total + item.price * item.qty, 0)} $</h2>
                                <Link href="/checkout"  className="bg-blue-500 text-white px-4 py-2 rounded">Passer à la caisse</Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
