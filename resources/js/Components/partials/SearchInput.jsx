import { useContext } from "react"
import { SearchContext } from "@/Context/SearchProvider"

export default function SearchInput() {    
    const {onChangeSearchInput, search} = useContext(SearchContext)

    return (
        <>
            <input
                type="text"
                className="flex-grow px-5 p-2 border-l text-gray-800 rounded-s-3xl"
                placeholder="Rechercher un produit"
                onChange={onChangeSearchInput}
            />
            <button className="p-2 bg-white rounded-e-3xl px-4" onClick={search}>
                <i className="fa-solid fa-magnifying-glass text-gray-900"></i>
            </button>

        </>
    )
}
