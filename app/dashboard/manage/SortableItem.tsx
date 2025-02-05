"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { faFloppyDisk, faLink, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from 'react';

interface SortableItemProps {
    id: string;
    name: string;
    image: string;
    content: string;
    timeAgo: string;
    url: string;
    onDelete: (id: string) => void;
}

export default function SortableItem({ 
    id, 
    name, 
    image, 
    content, 
    timeAgo,
    url,
    onDelete 
}: SortableItemProps) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const [isUrlInputVisible, setIsUrlInputVisible] = useState(false);

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
                className="ml-2 mr-6 grid grid-cols-2 gap-x-1 gap-y-1 cursor-grab active:cursor-grabbing"
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
                <label htmlFor={`upload-${id}`}>
                    <img src={image} className="w-12 h-12 rounded-lg cursor-pointer" />
                </label>
            </div>
            <div className="flex-grow">
                {isUrlInputVisible && (
                    <div className="mb-2 mr-6">
                        <input 
                            type="text" 
                            defaultValue={url}
                            placeholder="poopup.co"
                            className="w-full bg-[--first-slide-bg] text-gray-800 px-2 py-1 rounded-lg text-sm"
                        />
                    </div>
                )}
                <div className="flex items-center gap-2">
                    <input 
                        type="text"
                        defaultValue={name}
                        placeholder="Angry Customer #32" 
                        className={`w-full bg-[--first-slide-bg] text-gray-800 px-2 py-1 rounded-lg mb-1 mr-6 text-sm font-bold`}
                    />
                    <a 
                        onClick={(e) => {
                            e.preventDefault();
                            setIsUrlInputVisible(!isUrlInputVisible);
                        }}
                        className="absolute top-5 right-16 text-xs"
                    >
                    <FontAwesomeIcon icon={isUrlInputVisible ? faFloppyDisk : faLink} className="text-[var(--button-text)]"/>
                    </a>
                </div>
                <input 
                    type="text" 
                    defaultValue={content}
                    placeholder="WHERE IS MY REFUND?!" 
                    className={`w-full bg-[--first-slide-bg] text-gray-800 px-2 py-1 rounded-lg text-sm`}
                />
            </div>
            <div className="ml-2 mb-auto flex items-center">
                <input 
                    type="text" 
                    defaultValue={timeAgo} 
                    placeholder="now" 
                    className={`w-10 bg-[--first-slide-bg] text-gray-600 text-right px-2 py-1 rounded-lg text-xs`}
                />
                <button 
                    onClick={() => onDelete(id)}
                    className="absolute bottom-5 right-6 text-xs"
                    aria-label="Delete notification"
                >
                <FontAwesomeIcon icon={faTrashCan} className="text-[var(--button-text)]" />
                </button>
            </div>
        </div>
    );
}