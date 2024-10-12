import React from 'react';
import { Eye, Code } from 'lucide-react';

interface TopBarProps {
  onPreview: () => void;
  onSourceCode: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onPreview, onSourceCode }) => {
  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">No-Code Builder</h1>
      <div className="space-x-4">
        <button
          onClick={onPreview}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded flex items-center"
        >
          <Eye className="mr-2" size={18} />
          Preview
        </button>
        <button
          onClick={onSourceCode}
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded flex items-center"
        >
          <Code className="mr-2" size={18} />
          See Source Code
        </button>
      </div>
    </div>
  );
};

export default TopBar;