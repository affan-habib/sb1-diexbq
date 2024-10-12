import React from 'react';
import { CanvasElement } from '../types';

interface CanvasItemProps {
  element: CanvasElement;
  isSelected: boolean;
  onSelect: () => void;
  onDragStart: (e: React.DragEvent, id: number) => void;
  updateElement: (element: CanvasElement) => void;
}

const CanvasItem: React.FC<CanvasItemProps> = ({
  element,
  isSelected,
  onSelect,
  onDragStart,
  updateElement,
}) => {
  const handleResize = (e: React.MouseEvent, direction: string) => {
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = element.size.width;
    const startHeight = element.size.height;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;

      if (direction.includes('e')) newWidth = startWidth + deltaX;
      if (direction.includes('s')) newHeight = startHeight + deltaY;

      updateElement({
        ...element,
        size: { width: Math.max(20, newWidth), height: Math.max(20, newHeight) },
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: element.position.x,
        top: element.position.y,
        width: element.size.width,
        height: element.size.height,
      }}
      onClick={onSelect}
      onDragStart={e => onDragStart(e, element.id)}
      draggable
      className={`cursor-move ${isSelected ? 'border-2 border-blue-500' : ''}`}
    >
      {element.type === 'text' && (
        <p style={{ fontSize: `${element.fontSize}px`, color: element.color }}>{element.content}</p>
      )}
      {element.type === 'image' && (
        <img src={element.content} alt="User uploaded" className="w-full h-full object-cover" />
      )}
      {isSelected && (
        <>
          <div
            className="absolute right-0 bottom-0 w-4 h-4 bg-blue-500 cursor-se-resize"
            onMouseDown={e => handleResize(e, 'se')}
          />
          <div
            className="absolute right-0 top-1/2 w-4 h-4 bg-blue-500 cursor-e-resize"
            onMouseDown={e => handleResize(e, 'e')}
          />
          <div
            className="absolute bottom-0 left-1/2 w-4 h-4 bg-blue-500 cursor-s-resize"
            onMouseDown={e => handleResize(e, 's')}
          />
        </>
      )}
    </div>
  );
};

export default CanvasItem;