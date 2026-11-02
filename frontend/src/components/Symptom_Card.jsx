const getDefaultIcon = (color) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
    <path d="M16.1042 13.4583L14.4375 11.7917V11.1667L15.375 10.7083C15.5972 10.5972 15.7743 10.4444 15.9062 10.25C16.0382 10.0556 16.1042 9.83333 16.1042 9.58333C16.1042 9.34722 16.0382 9.12847 15.9062 8.92708C15.7743 8.72569 15.5972 8.56944 15.375 8.45833L14.4375 8.02083V4.16667H10.4375L10.2292 2.75C10.1875 2.44444 10.0521 2.1875 9.82292 1.97917C9.59375 1.77083 9.32639 1.66667 9.02083 1.66667C8.70139 1.66667 8.42708 1.77083 8.19792 1.97917C7.96875 2.1875 7.83333 2.44444 7.79167 2.75L7.58333 4.16667H6.8125L5.14583 2.5H6.14583C6.24306 1.79167 6.5625 1.19792 7.10417 0.71875C7.64583 0.239583 8.28472 0 9.02083 0C9.74306 0 10.375 0.239583 10.9167 0.71875C11.4583 1.19792 11.7847 1.79167 11.8958 2.5H14.4375C14.8958 2.5 15.2882 2.66319 15.6146 2.98958C15.941 3.31597 16.1042 3.70833 16.1042 4.16667V6.95833C16.6042 7.20833 17.0069 7.56944 17.3125 8.04167C17.6181 8.51389 17.7708 9.02778 17.7708 9.58333C17.7708 10.1528 17.6181 10.6736 17.3125 11.1458C17.0069 11.6181 16.6042 11.9722 16.1042 12.2083V13.4583ZM16.5 18.6042L0 2.10417L1.1875 0.916667L17.6875 17.4167L16.5 18.6042ZM14.4375 15L16.1042 16.6667H3.60417C3.13194 16.6667 2.73611 16.5069 2.41667 16.1875C2.09722 15.8681 1.9375 15.4722 1.9375 15V11.8333C2.60417 11.8333 3.1875 11.6215 3.6875 11.1979C4.1875 10.7743 4.4375 10.2361 4.4375 9.58333C4.4375 8.94444 4.1875 8.41667 3.6875 8C3.1875 7.58333 2.60417 7.36111 1.9375 7.33333V2.5L3.60417 4.16667V5.95833C4.38194 6.25 4.99306 6.72222 5.4375 7.375C5.88194 8.02778 6.10417 8.76389 6.10417 9.58333C6.10417 10.4167 5.88194 11.1597 5.4375 11.8125C4.99306 12.4653 4.38194 12.9375 3.60417 13.2292V15H14.4375Z" fill={color}/>
  </svg>
);

function Symptom_Card({
  icon = null,
  title = "응용·킬러 문항에서 막혀요",
  description = "서술 텍스트가 들어갑니다",
  selected = false,
  onClick,
}) {
  const resolvedIcon = icon ?? getDefaultIcon(selected ? "#FFC174" : "#D8C3AD");
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        width: "418px",
        height: "70px",
        padding: "16px",
        alignItems: "flex-start",
        gap: "8px",
        borderRadius: "8px",
        background: selected ? "rgba(47, 58, 163, 0.70)" : "#1C1831",
        cursor: "pointer",
      }}
    >
      {/* 아이콘 마진 */}
      <div
        style={{
          display: "flex",
          paddingTop: "2px",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <div style={{ width: "17.771px", height: "18.604px" }}>
          {resolvedIcon}
        </div>
      </div>

      {/* 텍스트 컨테이너 */}
      <div
        style={{
          display: "flex",
          width: "189px",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {/* 제목 컨테이너 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            alignSelf: "stretch",
          }}
        >
          <span
            style={{
              color: selected ? "#FFC174" : "#D8C3AD",
              fontFamily: '"Liberation Serif"',
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "20px",
            }}
          >
            {title}
          </span>
        </div>

        {/* 설명 마진 */}
        <div
          style={{
            display: "flex",
            paddingTop: "2px",
            flexDirection: "column",
            alignItems: "flex-start",
            alignSelf: "stretch",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              alignSelf: "stretch",
            }}
          >
            <span
              style={{
                alignSelf: "stretch",
                color: "#D8C3AD",
                fontFamily: '"Liberation Serif"',
                fontSize: "12px",
                fontWeight: 400,
                lineHeight: "16px",
              }}
            >
              {description}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Symptom_Card;
