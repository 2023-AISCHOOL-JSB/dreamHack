/* 
Initialize toolbar
 */

// 익명 함수
(function () {
  // JS의 엄격모드 활성화 
  'use strict';

  // `defaultButtons`라는 변수 선언하고 초기화, 배열로 구성
  var defaultButtons = [{
    // `name` : 도구의 이름 식별하는 문자열
    name: 'clear',
    // `title` : 도구의 제목 나타내는 문자열
    title: '새 캔버스',
    // `icon` : 도구의 아이콘 나타내는 SVG 코드 문자열
    //          SVG 형식의 아이콘은 확대/축소 가능한 벡터그래픽으로 임의의 크기에서도 깔끔하게 표시가능
    icon: `<svg width="1421" height="1422" viewBox="0 0 1421 1422" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1008.67 0H412.992C154.25 0 0 154.25 0 412.992V1007.96C0 1267.41 154.25 1421.66 412.992 1421.66H1007.96C1266.7 1421.66 1420.95 1267.41 1420.95 1008.67V412.992C1421.66 154.25 1267.41 0 1008.67 0ZM995.161 764.141H764.141V995.161C764.141 1024.3 739.973 1048.47 710.829 1048.47C681.685 1048.47 657.517 1024.3 657.517 995.161V764.141H426.497C397.353 764.141 373.185 739.973 373.185 710.829C373.185 681.685 397.353 657.517 426.497 657.517H657.517V426.497C657.517 397.353 681.685 373.185 710.829 373.185C739.973 373.185 764.141 397.353 764.141 426.497V657.517H995.161C1024.3 657.517 1048.47 681.685 1048.47 710.829C1048.47 739.973 1024.3 764.141 995.161 764.141Z" fill="#292D32"/>
    </svg>
    `

  }, {
    name: 'background',
    title: '배경옵션',
    icon: `<svg width="1421" height="1354" viewBox="0 0 1421 1354" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1225.59 370.32L987.352 132.079C773.476 -81.1204 661.123 -2.6091 525.762 132.079L142.681 515.16C64.846 592.998 22.2062 643.083 6.63932 698.582C6.63932 699.259 5.9625 699.259 5.9625 699.259V699.936V700.613V702.643C-21.7874 801.459 51.3096 885.385 142.681 976.756L381.599 1214.32C466.879 1300.28 535.914 1353.75 612.392 1353.75C688.873 1353.75 754.525 1302.31 842.512 1214.32L1225.59 831.916C1258.76 798.075 1283.12 770.325 1302.07 743.929C1302.07 743.253 1302.07 743.253 1302.07 743.253H1302.75C1389.38 622.101 1366.37 510.422 1225.59 370.32ZM1155.88 634.284H1155.2C1134.9 629.546 1113.92 625.485 1092.94 621.425C1091.58 621.425 1090.23 620.748 1088.2 620.748C1040.82 611.949 992.766 604.504 944.035 598.413H941.328C892.596 592.321 843.188 587.583 793.78 584.876H788.366C745.049 582.169 701.056 580.815 657.739 580.815C604.95 580.815 552.158 583.522 500.043 586.907C491.244 587.583 483.122 588.26 475 588.937C435.745 591.644 396.489 595.705 357.91 600.443C347.081 601.797 336.929 603.15 326.776 604.504C287.521 610.595 248.942 616.687 210.363 624.132C201.564 626.162 193.442 627.516 184.644 628.87C181.26 629.546 177.199 630.223 173.814 630.9C185.997 617.364 200.211 603.15 215.777 587.583L598.182 205.175C721.36 83.3473 763.323 54.2439 914.932 205.175L1152.5 443.417C1189.04 479.288 1213.41 509.745 1228.3 536.141C1228.3 536.141 1228.3 536.818 1228.98 536.818C1257.4 586.23 1211.38 645.113 1155.88 634.284Z" fill="#292D32"/>
    <path d="M1350.12 1006.44C1324.4 974.625 1302.07 947.552 1251.98 947.552C1201.9 947.552 1179.56 974.625 1154.52 1006.44C1100.37 1073.44 1076.01 1146.54 1084.81 1216.93C1094.96 1297.47 1163.99 1353.65 1251.98 1353.65C1339.97 1353.65 1409 1297.47 1419.16 1216.25C1427.96 1145.86 1404.27 1073.44 1350.12 1006.44Z" fill="#292D32"/>
    </svg>
    `
  }, {
    name: 'select',
    title: '선택/이동',
    icon: `<svg width="73" height="73" viewBox="0 0 73 73" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M66.7053 56.2229L61.2284 58.0709C59.7164 58.5749 58.5068 59.751 58.0028 61.2966L56.1548 66.7734C54.5756 71.5111 47.9227 71.4103 46.4443 66.6726L40.2282 46.6804C39.0186 42.7156 42.681 39.0196 46.6123 40.2628L66.6381 46.4788C71.3421 47.9572 71.4093 54.6437 66.7053 56.2229Z" stroke="#292D32" stroke-width="5.04005" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9.65287 16.541C5.48643 22.1523 3 29.0739 3 36.6003C3 55.1477 18.053 70.2007 36.6003 70.2007" stroke="#292D32" stroke-width="5.04005" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M70.2 36.6003C70.2 18.053 55.147 3 36.5996 3C31.4924 3 26.6874 4.14241 22.353 6.15843" stroke="#292D32" stroke-width="5.04005" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `
  }, {
    name: 'upload',
    title: '이미지',
    icon: `<svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M60.704 0.5H51.296C48.512 0.5 46.464 1.652 45.536 3.7C45.024 4.628 44.8 5.716 44.8 6.996V16.404C44.8 20.468 47.232 22.9 51.296 22.9H60.704C61.984 22.9 63.072 22.676 64 22.164C66.048 21.236 67.2 19.188 67.2 16.404V6.996C67.2 2.932 64.768 0.5 60.704 0.5ZM63.712 13.076C63.392 13.396 62.912 13.62 62.4 13.652H57.888V15.284L57.92 18.1C57.888 18.644 57.696 19.092 57.312 19.476C56.992 19.796 56.512 20.02 56 20.02C54.944 20.02 54.08 19.156 54.08 18.1V13.62L49.6 13.652C48.544 13.652 47.68 12.756 47.68 11.7C47.68 10.644 48.544 9.78 49.6 9.78L52.416 9.812H54.08V5.332C54.08 4.276 54.944 3.38 56 3.38C57.056 3.38 57.92 4.276 57.92 5.332L57.888 7.604V9.78H62.4C63.456 9.78 64.32 10.644 64.32 11.7C64.288 12.244 64.064 12.692 63.712 13.076Z" fill="#292D32"/>
    <path d="M22.4035 30.5195C26.6096 30.5195 30.0195 27.1097 30.0195 22.9035C30.0195 18.6973 26.6096 15.2875 22.4035 15.2875C18.1973 15.2875 14.7875 18.6973 14.7875 22.9035C14.7875 27.1097 18.1973 30.5195 22.4035 30.5195Z" fill="#292D32"/>
    <path d="M60.704 22.9H59.2V37.652L58.784 37.3C56.288 35.156 52.256 35.156 49.76 37.3L36.448 48.724C33.952 50.868 29.92 50.868 27.424 48.724L26.336 47.828C24.064 45.844 20.448 45.652 17.888 47.38L5.92 55.412C5.216 53.62 4.8 51.54 4.8 49.108V22.292C4.8 13.268 9.568 8.49995 18.592 8.49995H44.8V6.99595C44.8 5.71595 45.024 4.62795 45.536 3.69995H18.592C6.944 3.69995 0 10.644 0 22.292V49.108C0 52.596 0.608 55.636 1.792 58.196C4.544 64.276 10.432 67.7 18.592 67.7H45.408C57.056 67.7 64 60.756 64 49.108V22.164C63.072 22.676 61.984 22.9 60.704 22.9Z" fill="#292D32"/>
    </svg>
    `
  }, {
    name: 'textbox',
    title: '텍스트',
    icon: `<svg width="1421" height="1422" viewBox="0 0 1421 1422" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1008.67 0H412.992C154.25 0 0 154.25 0 412.992V1007.96C0 1267.41 154.25 1421.66 412.992 1421.66H1007.96C1266.7 1421.66 1420.95 1267.41 1420.95 1008.67V412.992C1421.66 154.25 1267.41 0 1008.67 0ZM1113.87 513.219C1100.36 539.519 1069.09 550.182 1042.08 537.387C954.643 493.315 860.103 469.147 764.141 462.039V1015.77C764.141 1044.92 739.973 1069.09 710.829 1069.09C681.685 1069.09 657.517 1044.92 657.517 1015.77V462.039C561.555 469.147 467.015 493.315 379.583 537.387C371.764 540.941 363.234 542.363 355.415 542.363C336.222 542.363 317.03 531.7 307.789 513.219C294.283 486.918 304.946 454.931 331.246 441.425C568.663 322.716 852.284 322.716 1089.7 441.425C1116.71 454.931 1127.37 486.918 1113.87 513.219Z" fill="#292D32"/>
    </svg>
    
    `
  }, {
    name: 'shapes',
    title: '도형요소',
    icon: `<svg id="Capa_1" x="0px" y="0px" viewBox="0 0 490.927 490.927" xml:space="preserve"><path d="M336.738,178.502c-12.645,0-24.852,1.693-36.627,4.582L202.57,11.786c-5.869-10.321-22.84-10.321-28.709,0L2.163,313.311 c-2.906,5.105-2.889,11.385,0.078,16.466c2.953,5.088,8.389,8.216,14.275,8.216l166.314,0.009 c2.818,82.551,70.688,148.88,153.906,148.88c85.012,0,154.19-69.167,154.19-154.186S421.749,178.502,336.738,178.502z  M44.917,304.964l143.299-251.63L331.515,304.97L44.917,304.964z"></path></svg>`
  },
  {
    name: 'line',
    title: '선그리기',
    icon: `<svg width="68" height="69" viewBox="0 0 68 69" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M64.6154 68.8962H2.58462C1.17169 68.8962 0 67.7245 0 66.3115C0 64.8986 1.17169 63.7269 2.58462 63.7269H64.6154C66.0283 63.7269 67.2 64.8986 67.2 66.3115C67.2 67.7245 66.0283 68.8962 64.6154 68.8962Z" fill="#292D32"/>
    <path d="M57.794 5.07897C51.1085 -1.60656 44.5608 -1.77887 37.703 5.07897L33.5331 9.24882C33.1885 9.59344 33.0507 10.1448 33.1885 10.6273C35.8076 19.7596 43.1134 27.0654 52.2457 29.6844C52.3836 29.7189 52.5214 29.7534 52.6593 29.7534C53.0383 29.7534 53.383 29.6155 53.6587 29.3398L57.794 25.17C61.2057 21.7928 62.8599 18.519 62.8599 15.2107C62.8944 11.799 61.2402 8.49067 57.794 5.07897Z" fill="#292D32"/>
    <path d="M46.0417 32.8176C45.0423 32.3351 44.0773 31.8527 43.1469 31.3013C42.3887 30.8533 41.665 30.3708 40.9413 29.8539C40.3555 29.4748 39.6663 28.9234 39.0115 28.3721C38.9426 28.3376 38.7013 28.1308 38.4257 27.8551C37.2884 26.8901 36.0133 25.6495 34.8761 24.2711C34.7727 24.2021 34.6004 23.9609 34.3592 23.6508C34.0146 23.2372 33.4287 22.548 32.9118 21.7554C32.4983 21.2384 32.0158 20.4803 31.5678 19.7221C31.0164 18.7917 30.534 17.8612 30.0515 16.8963C29.9784 16.7399 29.9078 16.5842 29.8396 16.4295C29.3309 15.2808 27.8329 14.945 26.9448 15.8333L7.20357 35.5745C6.75557 36.0225 6.34203 36.8841 6.23864 37.4699L4.37772 50.6687C4.0331 53.0121 4.68787 55.2176 6.13526 56.6994C7.37587 57.9056 9.09895 58.5604 10.9599 58.5604C11.3734 58.5604 11.787 58.5259 12.2005 58.457L25.4337 56.5961C26.054 56.4927 26.9155 56.0791 27.329 55.6311L47.0455 35.9147C47.9401 35.02 47.6028 33.4851 46.4393 32.9885C46.3084 32.9327 46.1757 32.8755 46.0417 32.8176Z" fill="#292D32"/>
    </svg>
    `
  }, {
    name: 'path',
    title: '연결곡선',
    icon: `<svg width="73" height="77" viewBox="0 0 73 77" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32.2835 73.7917H40.9856C44.3007 73.7917 46.4417 71.4435 45.8202 68.5773L44.4043 62.3273H28.8647L27.4489 68.5773C26.8273 71.2708 29.1755 73.7917 32.2835 73.7917Z" stroke="#292D32" stroke-width="5.17986" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M44.4044 62.2927L50.3785 56.9744C53.7281 54.0046 53.8662 51.9326 51.2072 48.583L40.6749 35.2193C38.4648 32.4222 34.8389 32.4222 32.6288 35.2193L22.0964 48.583C19.4374 51.9326 19.4374 54.1082 22.9252 56.9744L28.8993 62.2927" stroke="#292D32" stroke-width="5.17986" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M36.6345 34.4939V43.2306" stroke="#292D32" stroke-width="5.17986" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M38.3957 13.3597H34.9424C33.0432 13.3597 31.4892 11.8058 31.4892 9.90648V6.45324C31.4892 4.55396 33.0432 3 34.9424 3H38.3957C40.295 3 41.8489 4.55396 41.8489 6.45324V9.90648C41.8489 11.8058 40.295 13.3597 38.3957 13.3597Z" stroke="#292D32" stroke-width="5.17986" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M6.45324 45.026H9.90648C11.8058 45.026 13.3597 43.472 13.3597 41.5727V38.1195C13.3597 36.2202 11.8058 34.6659 9.90648 34.6659H6.45324C4.55396 34.6659 3 36.2202 3 38.1195V41.5727C3 43.472 4.55396 45.026 6.45324 45.026Z" stroke="#292D32" stroke-width="5.17986" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M66.7467 45.026H63.2935C61.3942 45.026 59.8403 43.472 59.8403 41.5727V38.1195C59.8403 36.2202 61.3942 34.6659 63.2935 34.6659H66.7467C68.646 34.6659 70.2 36.2202 70.2 38.1195V41.5727C70.2 43.472 68.646 45.026 66.7467 45.026Z" stroke="#292D32" stroke-width="5.17986" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M31.4893 8.38721C18.3324 9.94116 8.11083 21.0951 8.11083 34.6661" stroke="#292D32" stroke-width="5.17986" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M65.0892 34.6661C65.0892 21.1296 54.9367 10.0102 41.8489 8.38721" stroke="#292D32" stroke-width="5.17986" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  }, {
    name: 'draw',
    title: '자유그리기',
    icon: `<svg width="68" height="72" viewBox="0 0 68 72" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M31.2422 38.468C20.6384 38.468 12.0082 29.8378 12.0082 19.234C12.0082 8.63021 20.6384 0 31.2422 0C41.8459 0 50.4762 8.63021 50.4762 19.234C50.4762 29.8378 41.8459 38.468 31.2422 38.468ZM31.2422 5.01756C23.4148 5.01756 17.0257 11.4066 17.0257 19.234C17.0257 27.0614 23.4148 33.4504 31.2422 33.4504C39.0696 33.4504 45.4586 27.0614 45.4586 19.234C45.4586 11.4066 39.0696 5.01756 31.2422 5.01756Z" fill="#292D32"/>
    <path d="M44.0188 71.918C42.7477 71.918 41.5435 71.4497 40.6738 70.58C39.6368 69.543 39.1685 68.0378 39.4027 66.4656L40.0382 61.9498C40.2055 60.779 40.9079 59.4076 41.7442 58.5379L53.5857 46.6964C58.3356 41.9465 62.5169 44.6559 64.5574 46.6964C66.2968 48.4358 67.2 50.3091 67.2 52.1823C67.2 54.089 66.3303 55.8618 64.5574 57.6347L52.7156 69.4761C51.8793 70.3124 50.4748 71.0149 49.304 71.1821L44.7879 71.8173C44.5203 71.8842 44.2864 71.918 44.0188 71.918ZM59.0381 49.0714C58.436 49.0714 57.9008 49.4728 57.1314 50.2422L45.29 62.0836C45.1896 62.184 45.0223 62.5185 45.0223 62.6523L44.4202 66.8336L48.6015 66.2315C48.7353 66.198 49.0695 66.0308 49.1699 65.9304L61.0116 54.089C61.5468 53.5538 62.1824 52.7844 62.1824 52.1823C62.1824 51.6805 61.781 50.9781 61.0116 50.2422C60.2088 49.4393 59.6067 49.0714 59.0381 49.0714Z" fill="#292D32"/>
    <path d="M61.0819 60.1097C60.8478 60.1097 60.6136 60.0766 60.4129 60.0097C55.9974 58.772 52.4852 55.2597 51.2475 50.8443C50.8795 49.5063 51.6489 48.1348 52.9869 47.7668C54.3249 47.3989 55.6964 48.1682 56.0643 49.5063C56.8337 52.2492 59.008 54.4235 61.7509 55.1928C63.0889 55.5608 63.8583 56.9657 63.4903 58.2703C63.1893 59.3741 62.1858 60.1097 61.0819 60.1097Z" fill="#292D32"/>
    <path d="M2.50878 71.9184C1.13731 71.9184 0 70.7811 0 69.4096C0 55.1263 14.0158 43.4855 31.2428 43.4855C34.8889 43.4855 38.5016 44.0207 41.88 45.0243C43.2181 45.4257 43.954 46.8306 43.5526 48.1351C43.1512 49.4732 41.7462 50.2091 40.4417 49.8077C37.498 48.9379 34.4206 48.4696 31.2428 48.4696C16.7922 48.4696 5.01756 57.8358 5.01756 69.3762C5.01756 70.7811 3.88025 71.9184 2.50878 71.9184Z" fill="#292D32"/>
    </svg>
    `
  },]

  // `newButton`이라는 변수에 새로운 객체 추가
  var newButton = {
    name: 'home',
    title: '홈 이동',
    icon: `<svg width="1529" height="1491" viewBox="0 0 1529 1491" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M54 1437.31H1474.95" stroke="#292D32" stroke-width="106.571" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M125.048 582.59C125.048 539.252 145.652 498.048 179.754 471.049L677.087 83.8399C728.241 44.0534 799.999 44.0534 851.864 83.8399L1349.2 470.338C1384.01 497.336 1403.9 538.541 1403.9 582.59V1437.29" stroke="#292D32" stroke-width="106.571" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M121.439 1437.29L123.571 871.046" stroke="#292D32" stroke-width="106.571" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M835.523 1082.04H693.428C634.458 1082.04 586.856 1129.64 586.856 1188.61V1437.28H942.094V1188.61C942.094 1129.64 894.492 1082.04 835.523 1082.04Z" stroke="#292D32" stroke-width="106.571" stroke-miterlimit="10" stroke-linejoin="round"/>
    <path d="M586.856 851.133H444.761C405.685 851.133 373.714 819.162 373.714 780.086V673.514C373.714 634.438 405.685 602.467 444.761 602.467H586.856C625.932 602.467 657.904 634.438 657.904 673.514V780.086C657.904 819.162 625.932 851.133 586.856 851.133Z" stroke="#292D32" stroke-width="106.571" stroke-miterlimit="10" stroke-linejoin="round"/>
    <path d="M1084.19 851.133H942.093C903.017 851.133 871.046 819.162 871.046 780.086V673.514C871.046 634.438 903.017 602.467 942.093 602.467H1084.19C1123.26 602.467 1155.24 634.438 1155.24 673.514V780.086C1155.24 819.162 1123.26 851.133 1084.19 851.133Z" stroke="#292D32" stroke-width="106.571" stroke-miterlimit="10" stroke-linejoin="round"/>
    <path d="M1261.83 371.562L1259.7 158.42H947.089" stroke="#292D32" stroke-width="106.571" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  };

  // push()매서드 사용하여 새로운 객체를 기존 defaultButtons 배열에 추가
  defaultButtons.push(newButton);

  // `defaultExtendedButtons`라는 변수 선언하고 초기화, 배열로 구성
  const defaultExtendedButtons = [{
    name: 'undo',
    title: '실행취소',
    icon: `<svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M41.5702 66.1686C40.5388 66.1686 39.5699 65.4809 39.2886 64.4182C38.9447 63.168 39.6949 61.8865 40.9764 61.5427C53.6662 58.1983 62.5116 46.6962 62.5116 33.5687C62.5116 17.6283 49.5405 4.65712 33.6 4.65712C20.0662 4.65712 11.1896 12.5648 7.03256 17.347H16.2218C17.5033 17.347 18.566 18.4097 18.566 19.6912C18.566 20.9727 17.5345 22.0666 16.2218 22.0666H2.37544C2.21916 22.0666 1.93786 22.0353 1.71907 21.9728C1.43777 21.8791 1.18772 21.754 0.96893 21.5978C0.687628 21.4102 0.468837 21.1602 0.312558 20.8789C0.156279 20.5976 0.0312558 20.2538 0 19.91C0 19.8162 0 19.7537 0 19.6599V5.46977C0 4.18828 1.0627 3.12558 2.34419 3.12558C3.62567 3.12558 4.68837 4.18828 4.68837 5.46977V12.9399C9.78307 7.47014 19.3786 0 33.6 0C52.1347 0 67.2 15.0653 67.2 33.6C67.2 48.8528 56.9168 62.2303 42.1641 66.106C41.9766 66.1373 41.7578 66.1686 41.5702 66.1686Z" fill="#292D32"/>
    <path d="M31.3808 67.1375C31.3183 67.1375 31.2558 67.1063 31.2246 67.1063C27.8489 66.8875 24.5358 66.1373 21.4102 64.9184C20.5038 64.5746 19.8787 63.6681 19.91 62.6992C19.91 62.4179 19.9725 62.1366 20.0662 61.8866C20.5351 60.6988 21.9416 60.105 23.098 60.5426C25.8173 61.6053 28.6616 62.2304 31.5371 62.4492C32.7561 62.5117 33.725 63.5744 33.725 64.8246L33.6938 64.9496C33.6313 66.1686 32.5998 67.1375 31.3808 67.1375ZM14.1589 60.4175C13.6275 60.4175 13.1274 60.23 12.6899 59.9174C10.0644 57.792 7.75144 55.3228 5.87609 52.5723C5.59479 52.166 5.43851 51.7284 5.43851 51.2596C5.43851 50.4782 5.81358 49.7593 6.46995 49.3217C7.50139 48.6028 9.00167 48.8841 9.72056 49.8843V49.9156C9.75181 49.9468 9.78307 50.0093 9.81432 50.0406C11.4396 52.3848 13.4087 54.4789 15.6279 56.2293C16.1593 56.6668 16.5031 57.3232 16.5031 58.0421C16.5031 58.5734 16.3468 59.1048 16.003 59.5424C15.5341 60.105 14.8778 60.4175 14.1589 60.4175ZM3.71944 45.1647C2.688 45.1647 1.78158 44.5083 1.50028 43.5394C0.500093 40.32 0 36.9757 0 33.6V33.5688C0.0312558 32.2873 1.0627 31.2559 2.34419 31.2559C3.62567 31.2559 4.68837 32.3186 4.68837 33.6C4.68837 36.5381 5.12595 39.4136 5.96986 42.1329C6.03237 42.3829 6.06363 42.6017 6.06363 42.8518C6.06363 43.852 5.40726 44.7584 4.40707 45.0709C4.18828 45.1334 3.96949 45.1647 3.71944 45.1647Z" fill="#292D32"/>
    </svg>`
  }, {
    name: 'redo',
    title: '다시실행',
    icon: `<svg width="73" height="73" viewBox="0 0 73 73" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M70.2 36.6C70.2 55.1472 55.1472 70.2 36.6 70.2C18.0528 70.2 6.7296 51.5184 6.7296 51.5184M6.7296 51.5184H21.9168M6.7296 51.5184V68.3184M3 36.6C3 18.0528 17.9184 3 36.6 3C59.0112 3 70.2 21.6816 70.2 21.6816M70.2 21.6816V4.8816M70.2 21.6816H55.2816" stroke="#292D32" stroke-width="5.04" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  }, {
    name: 'save',
    title: '임시저장',
    icon: `<svg width="1529" height="1529" viewBox="0 0 1529 1529" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M551.332 1474.95H977.617C1332.85 1474.95 1474.95 1332.85 1474.95 977.617V551.332C1474.95 196.095 1332.85 54 977.617 54H551.332C196.095 54 54 196.095 54 551.332V977.617C54 1332.85 196.095 1474.95 551.332 1474.95Z" stroke="#292D32" stroke-width="106.571" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M1119.71 85.2568V794.308C1119.71 934.272 1019.54 988.978 896.623 915.089L802.84 858.961C781.526 846.173 747.423 846.173 726.109 858.961L632.326 915.089C509.414 988.268 409.237 934.272 409.237 794.308V85.2568" stroke="#292D32" stroke-width="106.571" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M551.332 1474.95H977.617C1332.85 1474.95 1474.95 1332.85 1474.95 977.617V551.332C1474.95 196.095 1332.85 54 977.617 54H551.332C196.095 54 54 196.095 54 551.332V977.617C54 1332.85 196.095 1474.95 551.332 1474.95Z" stroke="#292D32" stroke-width="106.571" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M1119.71 85.2568V794.308C1119.71 934.272 1019.54 988.978 896.623 915.089L802.84 858.961C781.526 846.173 747.423 846.173 726.109 858.961L632.326 915.089C509.414 988.268 409.237 934.272 409.237 794.308V85.2568" stroke="#292D32" stroke-width="106.571" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  }, {
    name: 'download',
    title: '다운로드',
    icon: `<svg width="1421" height="1928" viewBox="0 0 1421 1928" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M710.473 1927.97C690.672 1927.97 670.872 1920.67 655.24 1905.04L22.6665 1272.46C-7.55549 1242.24 -7.55549 1192.22 22.6665 1161.99C52.8885 1131.77 102.911 1131.77 133.133 1161.99L710.473 1739.34L1287.82 1161.99C1318.04 1131.77 1368.06 1131.77 1398.28 1161.99C1428.51 1192.22 1428.51 1242.24 1398.28 1272.46L765.706 1905.04C750.074 1920.67 730.273 1927.97 710.473 1927.97Z" fill="#292D32"/>
    <path d="M710.567 1910.24C667.839 1910.24 632.406 1874.8 632.406 1832.08V78.1603C632.406 35.4327 667.839 0 710.567 0C753.294 0 788.727 35.4327 788.727 78.1603V1832.08C788.727 1874.8 753.294 1910.24 710.567 1910.24Z" fill="#292D32"/>
    </svg>`
  }]



  // `toolbar`라는 이름의 함수 선언
  var toolbar = function () {
    // `_self`라는 이름의 변수 선언하고 현재 함수 내에서 `this`를 `_self`에 할당 
    // -> 함수 내에서 `this`를 `_self`로 참조 가능해짐
    const _self = this;
    // `buttons`라는 이름의 빈 배열 선언, 메인 버튼들을 저장할 용도
    let buttons = [];
    // `extendedButtons`라는 이름의 빈 배열 선언, 확장 버튼들을 저장할 용도
    let extendedButtons = [];

    // `this.buttons`가 배열이고 비어있지 않을 경우에 해당하는 조건문
    // `this.buttons`가 배열인지 확인, 배열의 길이가 0보다 큰지 확인
    if (Array.isArray(this.buttons) && this.buttons.length) {
      // 'home' 버튼이 `this.buttons`에 포함되어 있지 않다면, 
      if (!this.buttons.includes('home')) {
        // `home`버튼을  `buttons` 배열의 맨 앞에 추가함
        buttons.push(newButton);
      }

      // 툴바의 기본 도구 버튼 설정 : `defaultButtons` 배열의 각 항목에 대해 반복
      // `this.buttons` 배열에 해당 항목의 이름이 포함되어 있다면 해당 버튼을 `buttons` 배열에 추가함
      defaultButtons.forEach(item => {
        if (this.buttons.includes(item.name)) buttons.push(item);
      });
      // 툴바의 확장 도구 버튼 설정 : `defaultExtendedButtons` 배열의 각 항목에 대해 반복
      // `this.buttons` 배열에 해당 항목의 이름이 포함되어 있다면 해당 버튼을 `extendButtons` 배열에 추가함
      defaultExtendedButtons.forEach(item => {
        if (this.buttons.includes(item.name)) extendedButtons.push(item);
      })

      extendedButtons.splice(3, 0, {
        name: 'send',
        title: '등록하기',
        icon: `<svg width="5522" height="4832" viewBox="0 0 5522 4832" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M517.68 0C234.682 0 0 234.682 0 517.68V4314C0 4597 234.682 4831.68 517.68 4831.68H3623.76C3906.76 4831.68 4141.44 4597 4141.44 4314V3451.2H3451.2V4141.44H690.24V690.24H2070.72V0H517.68ZM4141.44 0V690.24C2726.45 690.24 1587.55 1753.21 1421.89 3126.79C1566.84 2519.38 2105.23 2070.72 2760.96 2070.72H4141.44V2760.96L5521.92 1380.48L4141.44 0Z" fill="black"/>
        </svg>
        
        `
      });

      extendedButtons.splice(5, 0, {
        name: 'mypage',
        title: '내계정',
        icon: `<svg width="5522" height="5522" viewBox="0 0 5522 5522" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5521.92 2760.96C5521.92 1239.67 4282.25 0 2760.96 0C1239.67 0 0 1239.67 0 2760.96C0 3561.64 345.12 4282.25 891.79 4787.5C891.79 4790.27 891.79 4790.27 889.029 4793.03C916.639 4820.64 949.77 4842.72 977.38 4867.57C993.946 4881.38 1007.75 4895.18 1024.32 4906.23C1074.01 4947.64 1129.23 4986.29 1181.69 5024.95C1201.02 5038.75 1217.58 5049.8 1236.91 5063.6C1289.37 5099.49 1344.59 5132.62 1402.57 5163C1421.89 5174.04 1443.98 5187.84 1463.31 5198.89C1518.53 5229.26 1576.51 5256.87 1637.25 5281.72C1659.34 5292.76 1681.42 5303.8 1703.51 5312.09C1764.25 5336.94 1824.99 5359.02 1885.74 5378.35C1907.82 5386.63 1929.91 5394.92 1952 5400.44C2018.26 5419.76 2084.52 5436.33 2150.79 5452.9C2170.11 5458.42 2189.44 5463.94 2211.53 5466.7C2288.84 5483.27 2366.14 5494.31 2446.21 5502.59C2457.25 5502.59 2468.3 5505.35 2479.34 5508.12C2573.21 5516.4 2667.09 5521.92 2760.96 5521.92C2854.83 5521.92 2948.71 5516.4 3039.82 5508.12C3050.86 5508.12 3061.9 5505.35 3072.95 5502.59C3153.02 5494.31 3230.32 5483.27 3307.63 5466.7C3326.96 5463.94 3346.28 5455.66 3368.37 5452.9C3434.63 5436.33 3503.66 5422.53 3567.16 5400.44C3589.25 5392.15 3611.34 5383.87 3633.42 5378.35C3694.16 5356.26 3757.67 5336.94 3815.65 5312.09C3837.73 5303.8 3859.82 5292.76 3881.91 5281.72C3939.89 5256.87 3997.87 5229.26 4055.85 5198.89C4077.94 5187.84 4097.26 5174.04 4116.59 5163C4171.81 5129.86 4227.03 5099.49 4282.25 5063.6C4301.58 5052.56 4318.14 5038.75 4337.47 5024.95C4392.69 4986.29 4445.15 4947.64 4494.84 4906.23C4511.41 4892.42 4525.21 4878.62 4541.78 4867.57C4572.15 4842.72 4602.52 4817.88 4630.13 4793.03C4630.13 4790.27 4630.13 4790.27 4627.37 4787.5C5176.8 4282.25 5521.92 3561.64 5521.92 2760.96ZM4124.87 4133.16C3376.65 3630.66 2150.79 3630.66 1397.05 4133.16C1275.56 4213.23 1176.17 4307.1 1093.34 4409.25C673.674 3984.07 414.144 3401.5 414.144 2760.96C414.144 1466.07 1466.07 414.144 2760.96 414.144C4055.85 414.144 5107.78 1466.07 5107.78 2760.96C5107.78 3401.5 4848.25 3984.07 4428.58 4409.25C4348.51 4307.1 4246.36 4213.23 4124.87 4133.16Z" fill="#292D32"/>
        <path d="M2760.96 1361.07C2189.44 1361.07 1725.6 1824.91 1725.6 2396.43C1725.6 2956.9 2164.59 3412.46 2747.16 3429.03H2772.01H2791.33H2796.85C3354.57 3409.7 3793.56 2956.9 3796.32 2396.43C3796.32 1824.91 3332.48 1361.07 2760.96 1361.07Z" fill="#292D32"/>
        </svg>`
      });

      // 앞의 조건문이 거짓인 경우, 즉 `this.buttons`가 배열이 아니거나 비어있는 경우 실행
    } else {
      buttons = defaultButtons;
      extendedButtons = defaultExtendedButtons;
    }


    // 특정 컨테이너(containerEl)에 도구들을 포함한 툴바를 추가 (JS와 jQuery를 사용하여 동작)

    try {
      // this.containerEl.append(...) : containerEl 요소(컨테이너)의 끝에 새로운 div 요소(툴바 전체 영역 나타냄)를 추가. 
      // 이 div 요소는 "toolbar" 라는 class, id 속성 가짐.
      this.containerEl.append(`<div class="toolbar" id="toolbar"><div class="main-buttons"></div><div class="extended-buttons"></div></div>`);

      // main buttons

      (() => {
        // 버튼 배열(buttons)의 각 항목에 대해
        buttons.forEach(item => {
          // 버튼 엘리먼트 생성
          const button = $(`<button id="${item.name}" aria-label="${item.title}">${item.icon}</button>`);
          // 툴팁 엘리먼트 생성
          const tooltip = $(`<div class="button-tooltip">${item.title}</div>`);
          // 버튼에 툴팁 추가
          button.append(tooltip);
          // 툴바 내의 .main-buttons 요소에 버튼을 추가
          $(`${this.containerSelector} #toolbar .main-buttons`).append(button);


          // 툴팁을 기본적으로 숨기도록 CSS 설정
          tooltip.css('display', 'none');

          // 버튼에 마우스 호버 효과 추가
          button.hover(
            function () {
              // 마우스가 버튼 위에 올라갔을 때 툴팁 보이도록 설정
              tooltip.css('display', 'block');
            },
            // 마우스가 버튼에서 벗어났을 때 툴팁을 숨기도록 설정
            function () {
              tooltip.css('display', 'none');
            }
          );

          // 각 버튼의 클릭 이벤트 핸들러
          button.click(function () {
            // 클릭한 버튼의 `id`를 가져와 변수 `id`에 저장
            let id = $(this).attr('id');
            // 만약 클릭한 버튼의 `id`가 `clear`인 경우
            if (id === 'clear') {
              // 사용자에게 확인 메시지 표시
              if (window.confirm('캔버스 내용이 모두 지워집니다! 새로 만드시겠습니까?')) {
                // 확인한 경우 캔버스 내용 지우고 브라우저 저장에서 'canvasEditor' 삭제
                _self.canvas.clear(), saveInBrowser.remove('canvasEditor');
              }
            }
            // 그렇지 않은 경우, 툴바 내의 모든 버튼에서 `active` 클래스 제거
            $(`${_self.containerSelector} #toolbar button`).removeClass('active');
            // 클릭한 버튼에 `active` 클래스 추가
            $(`${_self.containerSelector} #toolbar button#${id}`).addClass('active');
            // `_self.setActiveTood(id)`를 호출하여 선택한 도구를 활성화 상태로 설정
            _self.setActiveTool(id);
          });
        });
      })();


      // 툴바의 home 버튼을 클릭할 때 설정한 홈페이지 URL로 이동
      $(`${_self.containerSelector} #toolbar button#home`).click(function () {
        window.location.href = "http://localhost:3333"; // 여기에 원하는 홈페이지 URL을 입력하세요. http://localhost:3333/
      });

     // 이벤트 리스너 등록
document.addEventListener("DOMContentLoaded", function () {
  const toolbar = document.querySelector(".toolbar");
  const mainButtons = document.querySelector(".main-buttons");
  const expandButtons = document.querySelector(".expand-buttons");

  // "Dream Board" 글자를 생성하여 추가
  const dreamBoardText = document.createElement("div");
  dreamBoardText.textContent = " Make your 드림보드";
  dreamBoardText.classList.add("toolbar-title"); // 적절한 클래스 추가

   // 아이콘을 생성하여 "Dream Board" 텍스트 앞에 추가
   const iconElement = document.createElement("img");
   iconElement.src = "./images/hippo.ico";
   iconElement.alt = "아이콘";
   iconElement.style.width = "25px"; // 아이콘의 너비 조정
   iconElement.style.height = "25px"; // 아이콘의 높이 조정
   iconElement.style.border = "0.1px  #ccc" ;
   iconElement.style.borderRadius = "10px";
   dreamBoardText.insertBefore(iconElement, dreamBoardText.lastChild);

  // 글자 스타일 설정
  dreamBoardText.style.fontSize = "28px";
  dreamBoardText.style.color = "#ffffff";
  dreamBoardText.style.padding = "10px"; // 글자 주변에 여백 추가

// 폰트 미리 로드
const preconnectLink1 = document.createElement("link");
preconnectLink1.rel = "preconnect";
preconnectLink1.href = "https://fonts.googleapis.com";
document.head.appendChild(preconnectLink1);

const preconnectLink2 = document.createElement("link");
preconnectLink2.rel = "preconnect";
preconnectLink2.href = "https://fonts.gstatic.com";
preconnectLink2.setAttribute("crossorigin", "");
document.head.appendChild(preconnectLink2);

const fontLink = document.createElement("link");
fontLink.href = "https://fonts.googleapis.com/css2?family=Moirai+One&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

// 폰트 적용
dreamBoardText.style.fontFamily = "'Moirai One', cursive";

  // mainButtons와 expandButtons 사이에 "Dream Board" 글자 삽입
  toolbar.insertBefore(dreamBoardText, expandButtons);

  // Wrap every letter in a span


  anime.timeline({loop: true})
    .add({
      targets: '.toolbar-title',
      translateY: ["1.1em", 0],
      translateZ: 0,
      duration: 750,
      delay: (el, i) => 50 * i
    }).add({
      targets: '.toolbar-title',
      opacity: 0,
      duration: 1000,
      easing: "easeOutExpo",
      delay: 1000
    });

  // text-wrapper 애니메이션 적용
  const textWrapperAnimation = document.querySelector(".text-wrapper");
  textWrapperAnimation.style.opacity = 0;

  anime({
    targets: textWrapperAnimation,
    opacity: 1,
    duration: 1500,
    easing: 'easeInOutQuad'
  });
});

// zoom
      (() => {
        let currentZoomLevel = 1;
        $(`${this.containerSelector}`).append(
          `<div class="floating-zoom-level-container"></div>`
        )
        $(`${this.containerSelector} .floating-zoom-level-container`).append(`
          <label>Zoom</label>
          <select id="input-zoom-level">
            ${[0.05, 0.1, 0.25, 0.5, 0.75, 1, 1.5, 2, 2.5, 3].map((item => 
              `<option value="${item}" ${item === currentZoomLevel ? 'selected':''}>${item*100}%</option>`
              ))}
          </select>
        `);
        $(`${this.containerSelector} .floating-zoom-level-container #input-zoom-level`).change(function () {
          let zoom = parseFloat($(this).val());
          typeof _self.applyZoom === 'function' && _self.applyZoom(zoom)
        })
      })();


      // extended buttons

      (() => {
        extendedButtons.forEach(item => {
          const button = $(`<button id="${item.name}" aria-label="${item.title}">${item.icon}</button>`);
          const tooltip = $(`<div class="button-tooltip">${item.title}</div>`);
          button.append(tooltip);
          $(`${this.containerSelector} #toolbar .extended-buttons`).append(button);

          // 툴팁을 기본적으로 숨기도록 CSS 설정
          tooltip.css('display', 'none');

          // 버튼에 마우스 호버 효과 추가
          button.hover(
            function () {
              // 마우스가 버튼 위에 올라갔을 때 툴팁 보이도록 설정
              tooltip.css('display', 'block');
            },
            function () {
              // 마우스가 버튼에서 벗어났을 때 툴팁을 숨기도록 설정
              tooltip.css('display', 'none');
            }
          );

          // 확장 버튼의 클릭 이벤트 핸들러 추가
          button.click(function () {
            let id = $(this).attr('id');
            if (id === 'save') {
              if (window.confirm('현재 캔버스를 임시 저장하시겠습니까?')) {
                saveInBrowser.save('canvasEditor', _self.canvas.toJSON());
              }
            } else if (id === 'send') {
              // send 버튼 클릭 시 수행할 동작 추가
              // 예: 메시지 보내기 등
              if (window.confirm('마이드림보드에 등록하시겠습니까?')) {
                _self.canvas.clear(), saveInBrowser.remove('canvasEditor');
              }
            }

            else if (id === 'download') {
              $('body').append(`<div class="custom-modal-container">
                <div class="custom-modal-content">
                  <div class="button-download" id="jpg">Download as JPG</div>
                  <div class="button-download" id="svg">Download as SVG</div>
                  <div class="button-download" id="png">Download as PNG</div>
                  </div>
              </div>`);

              $(".custom-modal-container").click(function () {
                $(this).remove();
              });

              $(".custom-modal-container .button-download").click(function (e) {
                let type = $(this).attr('id');
                if (type === 'svg') downloadSVG(_self.canvas.toSVG());
                else if (type === 'png') downloadImage(_self.canvas.toDataURL());
                else if (type === 'jpg') downloadImage(_self.canvas.toDataURL({ format: 'jpeg' }), 'jpg', 'image/jpeg');
              });

            } else if (id === 'undo') _self.undo();
            else if (id === 'redo') _self.redo();
            else if (id === 'mypage') {
              window.location.href = "http://localhost:3333/dreamboard_list"; // 여기에 원하는 홈페이지 URL을 입력하세요. http://localhost:3333/
            }
          });
        });
      })();



    } catch (_) {
      console.error("can't create toolbar");
    }
  }

  window.ImageEditor.prototype.initializeToolbar = toolbar;
})();