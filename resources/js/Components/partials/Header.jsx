import { Link } from "@inertiajs/react"
import NavBar from "./NavBar"
import SearchInput from "./SearchInput"

export default function Header({search, makeSearch , cartCount}) {
    return (
        <>
            <nav id="header" className="w-full z-30 top-0 bg-blue-gray-900 text-white">
                <div className="container sm:px-16 px-6 py-5">
                    {/* Barre supérieure */}
                    <div className="flex flex-wrap justify-between items-center text-sm mb-5">
                        <div className="flex items-center space-x-4">
                            <span>
                                <i className="fa fa-phone text-red-700" aria-hidden="true"></i> +021-95-51-84</span>
                            <span><i className="fa fa-envelope text-red-700" aria-hidden="true"></i> email@email.com</span>
                        
                        </div>
                        <div className="flex items-center space-x-4">                        
                            <span><i className="fa fa-user" aria-hidden="true"></i>
                            </span>
                        </div>
                    </div>
                    
                    {/* Barre principale */}
                    <div className="flex flex-wrap justify-between items-center">
                        <div className="text-2xl font-bold">
                            <Link href="/">Electro.</Link>
                        </div>
                        
                        <div className="flex mx-10 justify-center">
                            <div className="flex w-96">                            
                               <SearchInput />                  
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-6">
                            <div className="relative">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                <span className="absolute -top-2 -right-2 bg-red-600 text-xs rounded-full h-4 w-4 flex items-center justify-center">2</span>
                                <span className="text-sm">Favoris</span>
                            </div>
                            <div className="relative">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span className="absolute -top-2 -right-2 bg-red-600 text-xs rounded-full h-4 w-4 flex items-center justify-center">{cartCount}</span>
                                <span className="text-sm">Panier</span>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <NavBar />
        </>
    )
}
