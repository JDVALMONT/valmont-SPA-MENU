# VALMONT SPA BOOST — GitHub Pages 업로드용

## 포함 파일
- index.html: 시작 페이지. 압축을 풀면 최상위에 있습니다.
- styles.css / app.js: 기존 디자인과 음악 재생 코드
- assets/: 기존 페이지 이미지 3장(WebP)
- audio/: 기존 음악 5곡(MP3, 각 약 15초)
- .nojekyll: 별도 빌드 없이 정적 파일을 게시하기 위한 파일

## 업로드 방법
1. ZIP을 먼저 압축 해제합니다. ZIP 자체를 올리는 방식은 아닙니다.
2. GitHub 저장소의 최상위에 index.html, styles.css, app.js, assets 폴더, audio 폴더와 .nojekyll을 업로드합니다.
   압축을 풀며 생긴 바깥 폴더 전체를 올려 index.html이 한 단계 안으로 들어가지 않도록 주의하세요.
3. 저장소 Settings → Pages → Build and deployment에서 Source를 Deploy from a branch로 선택합니다.
4. Branch에서 업로드한 브랜치(보통 main), 폴더는 /(root)를 선택한 다음 Save를 누릅니다.
5. 게시가 끝나면 Pages에 표시되는 주소로 접속합니다.

공식 설정 안내:
https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## 기능과 이전 범위
- 기존 HTML, CSS, JavaScript, 이미지 3장과 MP3 5곡을 변경 없이 포함했습니다.
- 모든 파일 참조는 상대경로이므로 GitHub Pages의 저장소 하위 주소에서도 사용할 수 있습니다.
- 음악 선택, 재생, 일시정지, 다른 곡 선택 시 이전 곡 정지, 재생 종료 시 표시 초기화 기능을 유지했습니다.
- 별도 서버, API, 데이터베이스, 외부 CDN, 외부 웹폰트는 사용하지 않습니다.
- 필요한 사이트 파일 중 누락된 파일은 없습니다.
- 음악은 현재 사이트에서 사용 중인 각 약 15초 파일입니다. 별도의 원곡 전체 길이 파일은 이 패키지에 없습니다.
- 현재 호스팅 서비스의 접근 권한 설정은 웹페이지 기능이 아니므로 이전되지 않습니다. 이 ZIP에는 로그인이나 방문자 제한 기능이 없습니다.
- 브라우저에서 음악은 버튼을 눌러 재생하는 기존 방식을 유지합니다.

## 확인 결과와 한계
- index.html의 CSS, JavaScript, 이미지, 음악 경로 10개가 모두 실제 파일과 연결되는지 확인했습니다.
- 이미지 3장의 파일 무결성과 MP3 5곡의 형식·길이를 확인했습니다.
- JavaScript 문법과 모의 환경에서 음악 전환·일시정지·종료 처리를 확인했습니다.
- 실제 브라우저의 화면·소리 재생과 GitHub Pages 게시 후 동작은 이 작업 환경에서 확인하지 못했습니다.
