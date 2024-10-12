import React from 'react';
import { CanvasElement } from '../types';
import CanvasItem from './CanvasItem';

interface CanvasProps {
  elements: CanvasElement[];
  selectedElement: CanvasElement | null;
  setSelectedElement: (element: CanvasElement | null) => void;
  updateElement: (element: CanvasElement) => void;
  showPreview: boolean;
  showSourceCode: boolean;
}

const Canvas: React.FC<CanvasProps> = ({
  elements,
  selectedElement,
  setSelectedElement,
  updateElement,
  showPreview,
  showSourceCode,
}) => {
  const handleDragStart = (e: React.DragEvent, id: number) => {
    e.dataTransfer.setData('text/plain', id.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const id = parseInt(e.dataTransfer.getData('text/plain'), 10);
    const element = elements.find(el => el.id === id);
    if (element) {
      const updatedElement = {
        ...element,
        position: {
          x: e.clientX - e.currentTarget.getBoundingClientRect().left,
          y: e.clientY - e.currentTarget.getBoundingClientRect().top,
        },
      };
      updateElement(updatedElement);
    }
  };

  const renderPreview = () => (
    <div className="bg-white p-4 rounded shadow">
      {elements.map(element => (
        <div
          key={element.id}
          style={{
            position: 'absolute',
            left: element.position.x,
            top: element.position.y,
            width: element.size.width,
            height: element.size.height,
          }}
        >
          {element.type === 'text' && <p>{element.content}</p>}
          {element.type === 'image' && <img src={element.content} alt="User uploaded" />}
        </div>
      ))}
    </div>
  );

  const renderSourceCode = () => (
    <pre className="bg-gray-100 p-4 rounded overflow-auto">
      <code>
        {`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Page</title>
</head>
<body>
${elements
  .map(
    element => `    <div style="position: absolute; left: ${element.position.x}px; top: ${
      element.position.y
    }px; width: ${element.size.width}px; height: ${element.size.height}px;">
        ${
          element.type === 'text'
            ? `<p>${element.content}</p>`
            : `<img src="${element.content}" alt="User uploaded" style="width: 100%; height: 100%; object-fit: cover;">`
        }
    </div>`
  )
  .join('\n')}
</body>
</html>`}
      </code>
    </pre>
  );

  return (
    <div className="flex-1 bg-gray-100 p-4 relative overflow-auto">
      {showPreview ? (
        renderPreview()
      ) : showSourceCode ? (
        renderSourceCode()
      ) : (
        <div
          className="w-[8.5in] h-[11in] bg-white shadow-lg mx-auto relative"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {elements.map(element => (
            <CanvasItem
              key={element.id}
              element={element}
              isSelected={selectedElement?.id === element.id}
              onSelect={() => setSelectedElement(element)}
              onDragStart={handleDragStart}
              updateElement={updateElement}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Canvas;