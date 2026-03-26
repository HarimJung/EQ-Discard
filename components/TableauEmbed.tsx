
import React, { useEffect, useRef, useState } from 'react';

interface TableauEmbedProps {
  sourceUrl?: string;
  targetWidth?: number;
  targetHeight?: number;
}

// Extract viz name from a Tableau Public URL (e.g. "https://public.tableau.com/views/Foo/Bar" -> "Foo/Bar")
function extractVizName(url: string): string {
  const match = url.match(/\/views\/(.+?)(?:\?|$)/);
  return match ? match[1] : url;
}

const TableauEmbed: React.FC<TableauEmbedProps> = ({
  sourceUrl = "https://public.tableau.com/views/DiscardAlert/Member",
  targetWidth = 1600,
  targetHeight = 1127
}) => {
  const vizName = extractVizName(sourceUrl);
  const containerRef = useRef<HTMLDivElement>(null);
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
    const divElement = containerRef.current;
    if (!divElement) return;

    // Clear previous content
    divElement.innerHTML = '';

    // Create the Tableau placeholder structure
    const objectEl = document.createElement('object');
    objectEl.className = 'tableauViz';
    objectEl.style.width = `${containerWidth}px`;
    objectEl.style.height = `${containerHeight}px`;

    const params: Record<string, string> = {
      host_url: 'https://public.tableau.com/',
      embed_code_version: '3',
      site_root: '',
      name: vizName,
      tabs: 'no',
      toolbar: 'yes',
      animate_transition: 'yes',
      display_static_image: 'yes',
      display_spinner: 'yes',
      display_overlay: 'yes',
      display_count: 'yes',
      language: 'en-US',
    };

    Object.entries(params).forEach(([key, value]) => {
      const param = document.createElement('param');
      param.name = key;
      param.value = value;
      objectEl.appendChild(param);
    });

    divElement.appendChild(objectEl);

    // Load Tableau JS API
    const script = document.createElement('script');
    script.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
    objectEl.parentNode!.insertBefore(script, objectEl);

    return () => {
      divElement.innerHTML = '';
    };
  }, [vizName, containerWidth, containerHeight]);

  return (
    <div className="w-full flex justify-center bg-gray-50 py-8 overflow-hidden">
      <div
        className="shadow-md bg-white rounded-lg border border-gray-200 transition-all duration-300 overflow-hidden"
        style={{
          width: `${containerWidth + 40}px`,
          padding: '20px'
        }}
      >
        <div ref={containerRef} />
      </div>
    </div>
  );
};

export default TableauEmbed;
