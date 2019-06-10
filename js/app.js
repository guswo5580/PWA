//브라우저 지원 검사
if ('serviceWorker' in navigator) {
  //서비스 워커 파일 등록
  navigator.serviceWorker
    .register('/service-worker.js')
    .then(success => {
      console.log('Service Worker 등록', success);
    })
    .catch(error => {
      console.log('Service Worker 등록 실패', error);
    });
}
