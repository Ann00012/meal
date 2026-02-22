declare module 'basiclightbox' {
  export interface BasicLightBoxInstance {
    show: (cb?: () => void) => void;
    close: (cb?: () => void) => void;
    visible: () => boolean;
    element: () => HTMLElement;
  }

  export interface Options {
    onShow?: (instance: BasicLightBoxInstance) => void;
    onClose?: (instance: BasicLightBoxInstance) => void;
    className?: string;
    closable?: boolean;
  }

  export function create(
    content: string | HTMLElement, 
    options?: Options
  ): BasicLightBoxInstance;
}