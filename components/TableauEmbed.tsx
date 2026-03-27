
import React, { useEffect, useRef, useState } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'tableau-viz': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        src?: string;
        width?: string | number;
        height?: string | number;
        toolbar?: string;
        'hide-tabs'?: boolean;
      }, HTMLElement>;
    }
  }
}

interface TableauEmbedProps {
  sourceUrl?: string;
  targetWidth?: number;
  targetHeight?: number;
}

const TableauEmbed: React.FC<TableauEmbedProps> = ({
  sourceUrl = "https://public.tableau.com/views/DiscardAlertFinal/Member",
  targetWidth = 1600,
  targetHeight = 1127
}) => {
  const vizRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(targetWidth);
  const [containerHeight, setContainerHeight] = useState<number>(targetHeight);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < targetWidth + 88) {
        setContainerWidth(window.innerWidth - 88);
        const newHeight = (window.innerWidth - 88) * (targetHeight / targetWidth);
        setContainerHeight(newHeight);
      } else {
        setContainerWidth(targetWidth);
        setContainerHeight(targetHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [targetWidth, targetHeight]);

  useEffect(() => {
    const container = vizRef.current;
    if (!container) return;

    container.innerHTML = '';

    const vizElement = document.createElement('tableau-viz');
    vizElement.setAttribute('src', sourceUrl);
    vizElement.setAttribute('width', String(containerWidth));
    vizElement.setAttribute('height', String(containerHeight));
    vizElement.setAttribute('toolbar', 'bottom');
    vizElement.setAttribute('hide-tabs', 'true');

    container.appendChild(vizElement);

    return () => {
      container.innerHTML = '';
    };
  }, [sourceUrl, containerWidth, containerHeight]);

  return (
    <div className="w-full flex justify-center bg-gray-50 py-8 overflow-hidden">
      <div
        className="shadow-md bg-white rounded-lg border border-gray-200 transition-all duration-300 overflow-hidden"
        style={{
          width: `${containerWidth + 40}px`,
          padding: '20px'
        }}
      >
        <div ref={vizRef} />
      </div>
    </div>
  );
};

export default TableauEmbed;
