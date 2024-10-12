import React, { useState } from 'react';
import { Type, Image } from 'lucide-react';
import { ElementType, CanvasElement } from '../types';

interface SidebarProps {
  onAddElement: (type: ElementType) => void;
  selectedElement: CanvasElement | null;
  updateElement: (element: CanvasElement) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onAddElement, selectedElement, updateElement }) => {
  const [selectedType, setSelectedType] = useState<ElementType | null>(null);

  const handleElementClick = (type: ElementType) => {
    setSelectedType(type);
    onAddElement(type);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedElement && selectedElement.type === 'text') {
      updateElement({ ...selectedElement, content: e.target.value });
    }
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedElement && selectedElement.type === 'text') {
      updateElement({ ...selectedElement, fontSize: parseInt(e.target.value) });
    }
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedElement && selectedElement.type === 'text') {
      updateElement({ ...selectedElement, color: e.target.value });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedElement && selectedElement.type === 'image' && e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          updateElement({ ...selectedElement, content: event.target.result as string });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedElement && selectedElement.type === 'image') {
      const scale = parseFloat(e.target.value);
      updateElement({
        ...selectedElement,
        size: {
          width: selectedElement.originalSize.width * scale,
          height: selectedElement.originalSize.height * scale,
        },
        scale,
      });
    }
  };

  return (
    <div className="w-64 bg-gray-200 p-4 flex flex-col">
      <div className="flex mb-4">
        <button
          onClick={() => handleElementClick('text')}
          className="flex-1 mr-2 p-2 bg-white rounded shadow flex items-center justify-center"
        >
          <Type size={18} className="mr-2" />
          Text
        </button>
        <button
          onClick={() => handleElementClick('image')}
          className="flex-1 p-2 bg-white rounded shadow flex items-center justify-center"
        >
          <Image size={18} className="mr-2" />
          Image
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {selectedElement && selectedElement.type === 'text' && (
          <div className="text-sm">
            <h3 className="font-bold mb-2">Text Options</h3>
            <input
              type="text"
              value={selectedElement.content}
              onChange={handleTextChange}
              className="w-full mb-2 p-1 border rounded"
            />
            <label className="block mb-1">Font Size</label>
            <input
              type="range"
              min="8"
              max="72"
              value={selectedElement.fontSize}
              onChange={handleFontSizeChange}
              className="w-full mb-2"
            />
            <label className="block mb-1">Color</label>
            <input
              type="color"
              value={selectedElement.color}
              onChange={handleColorChange}
              className="w-full mb-2"
            />
          </div>
        )}
        {selectedElement && selectedElement.type === 'image' && (
          <div className="text-sm">
            <h3 className="font-bold mb-2">Image Options</h3>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full mb-2"
            />
            <label className="block mb-1">Scale</label>
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={selectedElement.scale}
              onChange={handleScaleChange}
              className="w-full mb-2"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;