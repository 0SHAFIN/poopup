"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableItemProps {
    id: string;
    name: string;
    image: string;
    content: string;
    timeAgo: string;
    onDelete: (id: string) => void;
}

export default function SortableItem({ 
    id, 
    name, 
    image, 
    content, 
    timeAgo, 
    onDelete 
}: SortableItemProps) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    return (
        <div 
            ref={setNodeRef} 
            {...attributes} 
            className="p-4 bg-[--first-slide-bg] rounded-xl flex items-center relative" 
            style={{ 
                transform: CSS.Transform.toString(transform), 
                transition 
            }}
        >
            <div 
                {...listeners} 
                className="ml-2 mr-6 grid grid-cols-2 gap-x-2 gap-y-1 cursor-grab active:cursor-grabbing"
            >
                <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
            </div>
            <div className="flex-shrink-0 mr-4">
                <input type="file" className="hidden" id={`upload-${id}`}/>
                <label htmlFor={`upload-${id}`} className="relative">
                    <img src={image} className="w-12 h-12 text-[var(--first-slide-text)] object-cover rounded-lg cursor-pointer text-sm" />
                    {!image && (<i className="fas fa-camera absolute inset-0 flex items-center justify-center text-[var(--first-slide-text)] text-xl"></i>)}
                </label>
            </div>
            <div className="flex-grow">
                <input 
                    type="text" 
                    defaultValue={name} 
                    className={`w-full bg-[--first-slide-bg] text-[var(--first-slide-text)] p-1 rounded-lg mb-1 text-sm font-bold focus:outline-none border ${!name ? 'border-gray-300' : 'border-transparent'} focus:border-gray-300`}
                />
                <input 
                    type="text" 
                    defaultValue={content} 
                    className={`w-full bg-[--first-slide-bg] text-[var(--first-slide-text)] p-1 rounded-lg text-sm focus:outline-none border ${!content ? 'border-gray-300' : 'border-transparent'} focus:border-gray-300`}
                />
            </div>
            <div className="ml-2 mb-auto flex items-center">
                <input 
                    type="text" 
                    defaultValue={timeAgo} 
                    className={`w-10 bg-[--first-slide-bg] text-[var(--first-slide-text)] text-right p-1 rounded-lg text-xs focus:outline-none border ${!timeAgo ? 'border-gray-300' : 'border-transparent'} focus:border-gray-300`}
                />
                <button 
                    onClick={() => onDelete(id)}
                    className="absolute bottom-6 right-4 text-red-400 text-xs hover:text-red-600 transition-colors duration-200"
                    aria-label="Delete notification"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}