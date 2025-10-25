
import { useState } from 'react';
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { GripVertical, Eye, EyeOff } from "lucide-react";

interface Section {
  id: string;
  name: string;
  enabled: boolean;
}

interface SectionReorderProps {
  sections: Section[];
  onReorder: (sections: Section[]) => void;
  onToggle: (sectionId: string) => void;
}

const SectionReorder = ({ sections, onReorder, onToggle }: SectionReorderProps) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      return;
    }

    const newSections = [...sections];
    const draggedSection = newSections[draggedIndex];
    
    // Remove the dragged section
    newSections.splice(draggedIndex, 1);
    
    // Insert at the new position
    newSections.splice(dropIndex, 0, draggedSection);
    
    // Trigger immediate update
    requestAnimationFrame(() => {
      onReorder(newSections);
    });
    
    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const moveSection = (fromIndex: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && fromIndex === 0) ||
      (direction === 'down' && fromIndex === sections.length - 1)
    ) {
      return;
    }

    const newSections = [...sections];
    const toIndex = direction === 'up' ? fromIndex - 1 : fromIndex + 1;
    
    [newSections[fromIndex], newSections[toIndex]] = [newSections[toIndex], newSections[fromIndex]];
    
    onReorder(newSections);
  };

  return (
    <div className="space-y-2">
      {sections.map((section, index) => (
        <Card
          key={section.id}
          className={`p-3 cursor-move transition-all ${
            draggedIndex === index ? 'opacity-50 scale-105' : ''
          } ${section.enabled ? 'bg-white' : 'bg-gray-50'}`}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}
          onDragEnd={handleDragEnd}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <GripVertical className="w-4 h-4 text-gray-400" />
              <div className="flex items-center space-x-2">
                {section.enabled ? (
                  <Eye className="w-4 h-4 text-green-600" />
                ) : (
                  <EyeOff className="w-4 h-4 text-gray-400" />
                )}
                <span className={`font-medium ${section.enabled ? 'text-gray-900' : 'text-gray-500'}`}>
                  {section.name}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                checked={section.enabled}
                onCheckedChange={() => onToggle(section.id)}
                className="scale-75"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-500">Position {index + 1}</span>
            <div className="flex space-x-1">
              <button
                onClick={() => moveSection(index, 'up')}
                disabled={index === 0}
                className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Move up"
              >
                ↑
              </button>
              <button
                onClick={() => moveSection(index, 'down')}
                disabled={index === sections.length - 1}
                className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Move down"
              >
                ↓
              </button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default SectionReorder;
