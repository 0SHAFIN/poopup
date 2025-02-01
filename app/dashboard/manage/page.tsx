"use client";

import { useState, useEffect } from 'react';
import { auth } from "../../../lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faArrowLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

const initialItems = [
    {
        id: "1",
        image: "/icon/poopxd.pn",
        title: "Notification 1",
        content: "This is the first notification",
        timeAgo: "5m",
    },
    {
        id: "2",
        image: "/icon/poopxd.png",
        title: "Notification 2",
        content: "This is the second notification",
        timeAgo: "10m",
    },
    {
        id: "3",
        image: "/icon/poopxd.png",
        title: "Notification 3",
        content: "This is the third notification",
        timeAgo: "15m",
    },
];

export default function Manage() {
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [items, setItems] = useState(initialItems);

  // Configure drag sensors (mouse/touch)
  const sensors = useSensors(useSensor(PointerSensor));
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Handle drag end
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((prev) => {
        const oldIndex = prev.findIndex((item) => item.id === active.id);
        const newIndex = prev.findIndex((item) => item.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="min-h-screen bg-[--usecase-card] flex flex-col">
      {/* Header with Increased Padding */}
      <header className="bg-[--first-slide-bg] py-4 px-[26rem]">
        <div className="flex justify-between items-center">

          <button className="bg-[var(--usecase-card)] text-[var(--button-text)] text-sm p-3 px-5 rounded-3xl font-bold hover:shadow-lg transition-transform duration-300 hover:bg-[#FFA629] flex items-center gap-2">
            <FontAwesomeIcon icon={faArrowLeft} className="text-[var(--button-text)]" />
            Back
          </button>

          <button
            className="bg-[var(--button-bg)] text-[var(--button-text)] text-sm p-3 px-5 rounded-3xl font-bold hover:shadow-lg transition-transform duration-300 hover:bg-[#FFA629] flex items-center gap-2"
            onClick={() => setIsTestRunning(!isTestRunning)}
          >
            <FontAwesomeIcon icon={isTestRunning ? faTimes : faPlay} className="text-[var(--button-text)]" />
            {isTestRunning ? 'Stop' : 'Test'}
          </button>
        </div>
      </header>
      <div className="flex row">
        <div className="flex-grow ml-[26rem] mr-8 mt-16 text-[var(--first-slide-text)] font-extrabold text-xl">
          poopup.co
          {/* PoopUps */}
            <div className="flex-grow">
            </div>
        </div>
        {/* Main Content */}
        <div className="flex-grow-0 w-[30rem] ml-6 mt-32 mr-[26rem] rounded-3xl shadow-sm p-4 min-w-[300px] border border-gray-300">
          <div className="space-y-6">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
                <div className="space-y-6 p-4">
                {items.map((item) => (
                    <SortableItem 
                        key={item.id} 
                        id={item.id} 
                        name={item.title} 
                        image={item.image}
                        content={item.content} 
                        timeAgo={item.timeAgo} 
                    />
                ))}
                </div>
            </SortableContext>
            </DndContext>
          </div>
        </div>
      </div>
    </div>
  );
}
