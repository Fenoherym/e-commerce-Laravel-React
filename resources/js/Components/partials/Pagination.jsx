import { Link } from "@inertiajs/react"

export default function Pagination({data, isAjax, onPageChange}) {
  if (isAjax) {
    return (
      <div className="mt-8 flex justify-center">
          {data.links.map((link, index) => (
              <button
                  key={index}
                  onClick={() => onPageChange(link.url)}
                  className={`px-4 py-2 mx-1 rounded ${link.active ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                  dangerouslySetInnerHTML={{ __html: link.label }}
              />
          ))}
      </div>
    )
  }

  return (
    <div className="mt-8 flex justify-center">
        {data.links.map((link, index) => (
            <Link
                key={index}
                href={link.url}
                className={`px-4 py-2 mx-1 rounded ${link.active ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                dangerouslySetInnerHTML={{ __html: link.label }}
            />
        ))}
    </div>
  )
}
