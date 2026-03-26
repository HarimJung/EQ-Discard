
import React, { useState, useEffect } from 'react';

interface TableauEmbedProps {
  sourceUrl?: string;
  targetWidth?: number;
  targetHeight?: number;
}

const TableauEmbed: React.FC<TableauEmbedProps> = ({
  sourceUrl = "https://public.tableau.com/app/profile/harim.jung/viz/DiscardAlertFinal/Member",
  targetWidth = 1600,
  targetHeight = 900
}) => {
  const [containerWidth, setContainerWidth] = useState<number>(targetWidth);
  const [containerHeight, setContainerHeight] = useState<number>(targetHeight);

  useEffect(() => {
    const handleResize = () => {
      // 대시보드 원본 너비 + 여백(40px) + 안전여백(48px)
      if (window.innerWidth < targetWidth + 88) {
        // padding 40px를 고려하여 containerWidth를 더 작게 설정
        setContainerWidth(window.innerWidth - 88); 
        // 비율 유지
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

  // 핵심: 제공된 링크를 인터랙티브 전용 엠베딩 URL로 변환합니다.
  // :embed=y 설정이 대시보드를 '그림'이 아닌 '살아있는 데이터'로 만듭니다.
  const baseUrl = sourceUrl;

  const params = new URLSearchParams({
    ":embed": "y",
    ":showVizHome": "n",
    ":tabs": "n",
    ":toolbar": "n",
    ":language": "en-US",
    "publish": "yes",
    ":display_count": "n",
    ":origin": "viz_share_link",
    ":size": `${targetWidth},${targetHeight}` // 동적 사이즈 요청
  }).toString();

  const finalUrl = `${baseUrl}?${params}`;

  // 화면 크기에 따른 동적 높이 설정
  const getIframeHeight = () => {
    return `${containerHeight + 20}px`; // iframe 내부 여진 조절
  };

  // 컨테이너 자체에 패딩을 주어 1600x900 대시보드가 넉넉하게 들어갈 수 있도록 함
  return (
    <div className="w-full flex justify-center bg-gray-50 py-8 overflow-hidden">
      <div
        className="shadow-md bg-white rounded-lg border border-gray-200 transition-all duration-300 overflow-hidden"
        style={{ 
          width: `${containerWidth + 40}px`, // 가로 패딩 20px씩 추가 (총 40px)
          padding: '20px' // 내부 여백 추가
        }}
      >
        <iframe
          src={finalUrl}
          width="100%"
          height={getIframeHeight()}
          style={{ border: 'none', display: 'block' }}
          title="Dashboard"
          allowFullScreen
          // 이 속성이 있어야 대시보드 내의 툴팁과 필터가 매끄럽게 작동합니다.
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default TableauEmbed;
