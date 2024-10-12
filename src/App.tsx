import React, { useState } from 'react';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import { ElementType, CanvasElement } from './types';

function App() {
  const [elements, setElements] = useState<CanvasElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<CanvasElement | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showSourceCode, setShowSourceCode] = useState(false);

  const addElement = (type: ElementType) => {
    const newElement: CanvasElement = {
      id: Date.now(),
      type,
      content: type === 'text' ? 'New Text' : `https://picsum.photos/200/300?random=${Date.now()}`,
      position: { x: 0, y: 0 },
      size: { width: 200, height: type === 'text' ? 50 : 200 },
      fontSize: 16,
      color: '#000000',
      scale: 1,
      originalSize: { width: 200, height: 200 },
    };
    setElements([...elements, newElement]);
    setSelectedElement(newElement);
  };

  const updateElement = (updatedElement: CanvasElement) => {
    setElements(elements.map(el => el.id === updatedElement.id ? updatedElement : el));
    setSelectedElement(updatedElement);
  };

  return (
    <div className="flex flex-col h-screen">
      <TopBar
        onPreview={() => setShowPreview(!showPreview)}
        onSourceCode={() => setShowSourceCode(!showSourceCode)}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          onAddElement={addElement}
          selectedElement={selectedElement}
          updateElement={updateElement}
        />
        <Canvas
          elements={elements}
          selectedElement={selectedElement}
          setSelectedElement={setSelectedElement}
          updateElement={updateElement}
          showPreview={showPreview}
          showSourceCode={showSourceCode}
        />
      </div>
    </div>
  );
}

export default App;