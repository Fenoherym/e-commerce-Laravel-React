import { router } from "@inertiajs/react";
import { createContext, useEffect, useState } from "react";

export const SearchContext = createContext()

export default function SearchProvider(props) {

    let params = new URLSearchParams(window.location.search)
    const [searchValue, setSearchValue] = useState('')
    const [selectedSubCategories, setSelectedSubCategories] = useState([]);

    useEffect(() => {
        if(params.get('subCategories')) {            
            const subCategories =  params.get('subCategories').split(',').map(Number)               
            setSelectedSubCategories([...selectedSubCategories, ...subCategories])
        }        
    }, [])

    function onChangeSearchInput(e) {
        setSearchValue(e.target.value)
    }

    const handleSubCategoryChange = (subCategoryId) => {
        setSelectedSubCategories(prev => {
            if (prev.includes(subCategoryId)) {
                return prev.filter(id => id !== subCategoryId);
            } else {
                return [...prev, subCategoryId];
            }
        });
       
    };

    function search() {        
        let paramsQuery
        if(selectedSubCategories.length !== 0) {
            paramsQuery = {            
                query: searchValue,
                subCategories: selectedSubCategories.join(',')            
            }
        } else {            
            paramsQuery = {            
                query: searchValue,
            }           
        }
        console.log(paramsQuery)       
        router.get('/product', paramsQuery)
    }

    return (
        <SearchContext.Provider value={{onChangeSearchInput, search, handleSubCategoryChange, selectedSubCategories}}>
            {props.children}
        </SearchContext.Provider>
    )

}
