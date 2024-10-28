import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@inertiajs/react";

export default function ProductCard({product}) {
    
    const {name, price, description, images, tags, brand, slug} = product;
  return (
    <div className="w-full md:w-1/3 xl:w-1/3 p-6 flex flex-col">
    <Link href={`/product/${slug}`}>
        <img className="hover:grow hover:shadow-lg" src={images[0].url} />
        <div className="pt-3">
            <p className="text-justify">{name.substring(0, 50)}...</p>         
        </div>
        <div className="flex justify-between items-center">
            <span>                
                <i className="fa-solid fa-star text-yellow-900 text-xs"></i>
                <i className="fa-solid fa-star text-yellow-900 text-xs"></i>
                <i className="fa-solid fa-star text-yellow-900 text-xs"></i>
                <i className="fa-solid fa-star text-yellow-900 text-xs"></i>
                <i className="fa-solid fa-star text-yellow-900 text-xs"></i>
            </span>
            <span className="text-gray-500 text-xs">{brand.name}</span>
        </div>
        <div className="flex flex-wrap py-3">
            {tags.map((tag) => (
                <span className="text-xs text-gray-500 me-2" key={tag.id}>{tag.name}</span>
            ))}           
           
        </div>     
        <p className="pt-1 text-gray-900">
            {price} $ 
            <span className="text-gray-500 line-through">100 $</span>
        </p>
        
    </Link>
</div>
  )
}
