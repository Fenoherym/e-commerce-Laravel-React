import React from 'react'
import RatingDisplay from '../RatingDisplay'
import { formatDateRelative } from '@/utils'

export default function Comment({ comment }) {
    return (
        <div className="flex items-center">
            <div className="w-1/3">
                <h2 className='font-bold'>{comment.name}</h2>
                <span className='text-xs text-gray-500 my-2 mb-2'>{formatDateRelative(comment.created_at)}</span>
                <div className='text-xs'>
                    <RatingDisplay />
                </div>
            </div>
            <div className="w-2/3">
                <p className='text-sm'>{comment.content}</p>
            </div>
        </div>
    )
}
