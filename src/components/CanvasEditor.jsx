import React, { useState } from 'react';
import Canvas from './CanvasComponent';
import CanvasComponent from './CanvasComponent';

const CanvasEditor = () => {
  return (
    <div className="canvas-editor flex items-center justify-center">
      <CanvasComponent />
      {/* Add other components like text input, color picker, etc. */}
    </div>
  );
};

export default CanvasEditor;