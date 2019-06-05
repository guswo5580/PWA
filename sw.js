//캐싱 스토리지에 저장될 파일 이름
const CACHE_NAME = 'pwa-v1';
//캐싱할 웹 자원 선정
const filesToCache = [
  '/', //index.html
  '/css/app.css'
];
//worker 는 window 접근 X , self로 접근
self.addEventListener('install', e => {
  //waitUntil 내부의 로직이 끝나기 전까지는 계속 실행
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => {
        //생성된 캐시 파일안데 캐시 정보 삽입
        return cache.addAll(filesToCache);
      })
      .catch(error => {
        return console.log(error);
      })
  );
});
