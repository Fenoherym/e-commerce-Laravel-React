import React, { useState, useEffect, useContext } from 'react';
import ProductCard from "@/Components/partials/ProductCard";
import { Link, router } from "@inertiajs/react";
import Master from '@/Layouts/Master';
import { SearchContext } from '@/Context/SearchProvider';
import Pagination from '@/Components/partials/Pagination';


/**
 * Composant Shop
 * Affiche une liste de produits avec fonctionnalité de recherche et pagination
 * @param {Object} initialProducts - Les produits initiaux à afficher
 * @param {Object} categories - Les catégories à afficher
 */
export default function Shop({ initialProducts, categories }) {    
       

    const {handleSubCategoryChange, selectedSubCategories} = useContext(SearchContext)

    /**
     * Rendu du contenu principal (produits ou message si aucun produit)
     */
    const renderContent = () => (
        initialProducts.data.length === 0 ? (
            <p>Aucun produit trouvé</p>
        ) : (
            <div className="flex flex-wrap -mx-4">
                {initialProducts.data.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        )
    );

    return (
        <Master title="Shop">           
            <section className=" px-16 flex flex-wrap">
                <div className="w-full md:w-1/4 mt-5">
                    <h1>CATEGORIES</h1>
                    <ul>
                        {categories.map((category) => (
                            <div className="mt-3" key={category.id}>
                                <li className="text-gray-600 text-sm font-bold">{category.name}</li>
                                <ul>
                                    {category.sub_categories.map((subCategory) => (
                                        <div className="flex items-center gap-3 mb-2 pl-4 mt-3" key={subCategory.id}>
                                            <input
                                                type="checkbox"
                                                id={`subCategory-${subCategory.id}`}
                                                name={subCategory.name}
                                                checked={selectedSubCategories.includes(subCategory.id)}
                                                onChange={() => handleSubCategoryChange(subCategory.id)}
                                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                            <label htmlFor={`subCategory-${subCategory.id}`} className="text-gray-600 text-sm">
                                                {subCategory.name}
                                            </label>
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </ul>
                </div>
                <div className="w-full md:w-3/4">
                    {renderContent()}
                    {
                        initialProducts.data && initialProducts.data.length > 0 && 
                        <Pagination data={initialProducts} />
                    }
                </div>
            </section>
        </ Master>
    );
}

