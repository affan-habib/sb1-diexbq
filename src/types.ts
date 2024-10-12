export type ElementType = 'text' | 'image';

export interface CanvasElement {
  id: number;
  type: ElementType;
  content: string;
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
  fontSize?: number;
  color?: string;
  scale?: number;
  originalSize?: {
    width: number;
    height: number;
  };
}