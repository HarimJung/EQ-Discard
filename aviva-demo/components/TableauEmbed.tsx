
import React, { useState, useEffect } from 'react';

interface TableauEmbedProps {
  sourceUrl?: string;
}

const TableauEmbed: React.FC<TableauEmbedProps> = ({
  sourceUrl = "https://public.tableau.com/views/EQFSRA/Exec"
}) => {
  const [containerWidth, setContainerWidth] = useState<number>(1366);

  useEffect(() => {
    const handleResize = () => {
      // 대시보드 원본 너비 1366px에 맞춰 여유 공간 확보
      const targetWidth = 1366;
      if (window.innerWidth < targetWidth + 48) {
        setContainerWidth(window.innerWidth - 48); // 여백 제외
      } else {
        setContainerWidth(targetWidth);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 핵심: 제공된 링크를 인터랙티브 전용 엠베딩 URL로 변환합니다.
  // :embed=y 설정이 대시보드를 '그림'이 아닌 '살아있는 데이터'로 만듭니다.
  // URL에서 쿼리 파라미터가 이미 있을 수 있으므로 처리 필요할 수 있으나, 
  // 여기서는 base URL만 교체하는 것으로 가정합니다.
  const baseUrl = sourceUrl;

  const params = new URLSearchParams({
    ":embed": "y",
    ":showVizHome": "n",
    ":tabs": "n",
    ":toolbar": "n", // 툴바도 숨겨서 깔끔하게 (요청사항 반영)
    ":language": "en-US",
    "publish": "yes",
    ":display_count": "n",
    ":origin": "viz_share_link",
    ":size": "1366,968" // 명시적 사이즈 요청
  }).toString();

  const finalUrl = `${baseUrl}?${params}`;

  // 화면 크기에 따른 동적 높이 설정 (대시보드 높이 968px + 여유분)
  const getIframeHeight = () => {
    return '1050px'; // 968px보다 약간 크게 설정하여 내부 스크롤 방지
  };

  return (
    <div className="w-full flex justify-center bg-gray-50 py-4 overflow-hidden">
      <div
        className="shadow-inner bg-white rounded-md border border-gray-200 transition-all duration-300 overflow-hidden"
        style={{ width: `${containerWidth}px` }}
      >
        <iframe
          src={finalUrl}
          width="100%"
          height={getIframeHeight()}
          style={{ border: 'none' }}
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
