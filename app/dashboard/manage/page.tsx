"use client";

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faArrowLeft, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";

const SortableItem = dynamic(() => import('./SortableItem'), { ssr: false });

const initialItems = [
    {
        id: "1",
        image: "/icon/poopxd.png",
        title: "Notification 1",
        content: "This is the first notification",
        timeAgo: "now",
    },
    {
        id: "2",
        image: "/icon/poopxd.png",
        title: "Notification 2",
        content: "This is the second notification",
        timeAgo: "2m",
    },
];

export default function Manage() {
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [items, setItems] = useState(initialItems);
  const [isClient, setIsClient] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    setIsClient(true);
  }, []);

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

  const handleDeleteItem = (idToDelete: string) => {
    setItems((prevItems) => prevItems.filter(item => item.id !== idToDelete));
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[--usecase-card] flex flex-col">
      <header className="bg-[--first-slide-bg] py-4 px-[26rem]">
        <div className="flex justify-between items-center">
          <button className="bg-[var(--usecase-card)] text-[var(--button-text)] text-sm p-3 px-5 rounded-3xl font-bold hover:shadow-lg transition-transform duration-300 hover:bg-[#FFA629] flex items-center gap-2">
            <FontAwesomeIcon icon={faArrowLeft} className="text-[var(--button-text)]" />
            Back
          </button>

            <button className={`bg-[var(--button-bg)] text-[var(--button-text)] text-sm p-3 px-5 rounded-3xl font-bold hover:shadow-lg transition-transform duration-300 hover:bg-[#FFA629] flex items-center gap-2 ${isTestRunning ? 'animate-pulse' : ''}`} onClick={() => setIsTestRunning(!isTestRunning)}>
            <FontAwesomeIcon icon={isTestRunning ? faTimes : faPlay} className="text-[var(--button-text)]" />
            {isTestRunning ? 'Stop' : 'Test'}
            </button>
        </div>
      </header>
      
      <div className="flex row">
        <div className="flex-grow ml-[26rem] mr-8 mt-20 text-[var(--first-slide-text)] font-extrabold text-2xl">
          poopup.co
          <div className="flex-column mt-8">
            <p className="text-[var(--button-text)] font-medium text-sm font-semibold">Start PoopUp after (ms)</p>
            <input type="text" className="w-[24rem] mt-4 bg-[var(--first-slide-bg)] text-[var(--button-text)] font-semibold text-sm px-3 py-2 rounded-xl" />
            <p className="text-[var(--button-text)] font-medium text-xs mt-2 font-semibold">1. PoopUp loads (Could take a few seconds if slow network)</p>
            <p className="text-[var(--button-text)] font-medium text-xs font-semibold">2. The first message loads after 100ms</p>
            <p className="text-[var(--button-text)] font-medium text-sm mt-8 font-semibold">Send message every (ms)</p>
            <input type="text" className="w-[24rem] mt-4 bg-[var(--first-slide-bg)] text-[var(--button-text)] font-semibold text-sm px-3 py-2 rounded-xl" />
            <p className="text-[var(--button-text)] font-medium text-sm mt-8 font-semibold">Hide message after (ms)</p>
            <input type="text" className="w-[24rem] mt-4 bg-[var(--first-slide-bg)] text-[var(--button-text)] font-semibold text-sm px-3 py-2 rounded-xl" />
            <button className="w-[24rem] bg-[#bba88c] text-[var(--button-text)] text-base justify-center gap-2 mt-16 p-3 px-5 rounded-3xl font-bold hover:shadow-lg transition-transform duration-300 hover:bg-[#bba88c ]">
              Update
            </button>
          </div>
        </div>
        
        <div>
          <div className="flex-grow-0 w-[32rem] ml-6 mt-32 mr-[26rem] rounded-3xl shadow-sm p-4 min-w-[300px] border border-gray-300">
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
                        onDelete={handleDeleteItem}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </div>
            <button className="bg-[var(--button-text)] text-white text-xs p-2 px-12 rounded-3xl hover:shadow-lg transition-transform duration-300 hover:bg-[var(--first-slide-text)] flex items-center gap-2 m-4 mt-2 ml-auto"
              onClick={() => {
                const newItem = {
                  id: (items.length + 1).toString(),
                  image: null,
                  title: null,
                  content: null,
                  timeAgo: null,
                };
                  setItems([...items, newItem as any]);
              }}>
              <FontAwesomeIcon icon={faPlus} className="text-white" />
              Message
            </button>
          </div>
          <div className="ml-6 mt-6 mr-[26rem] flex justify-center">
            <p className="text-[var(--button-text)] font-bold text-xs">On mobile, only one message will be shown</p>
          </div>
          <button className="w-[32rem] bg-[#bba88c] text-[var(--button-text)] text-base justify-center gap-2 ml-6 mt-6 p-3 px-5 rounded-3xl font-bold hover:shadow-lg transition-transform duration-300 hover:bg-[#bba88c]">
            Update
          </button>
        </div>
      </div>
    </div>
  );
}