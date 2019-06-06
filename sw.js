//캐싱 스토리지에 저장될 파일 이름
//const CACHE_NAME = 'pwa-v1';
//캐싱할 웹 자원 선정 (파일 단위로 끊어서 선정)
// const filesToCache = [
//   '/', //index.html
//   '/css/app.css'
// ];

//새로운 버전
const CACHE_NAME = 'pwa-v2';
const filesToCache = [
  '/',
  '/favicon.png',
  '/css/app.css',
  '/images/gauntlet.jpg',
  '/images/hammer.png',
  '/images/refresh.svg',
  '/images/shield.png'
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

//Fetch 이벤트 기능
self.addEventListener('fetch', e => {
  console.log('Service Worker fetch 확인');
  //fetch에 대한 response의 값을 저장
  e.respondWith(
    //fetch한 Data를 캐쉬에 있는지 확인
    caches
      .match(e.request)
      .then(response => {
        //Data가 있으면 그대로 return, 없으면 요청
        return response || fetch(e.request);
      })
      .catch(error => {
        return console.log(error);
      })
  );
});

//Activate 이벤트 기능, 새로운 SW 버전(캐쉬의 내용)을 적용하려고 할 때
self.addEventListener('activate', e => {
  //새로운 SW 버전 적용 , 내부 내용은 file까지 여러개가 들어갈 수 있음
  const newCacheLists = ['pwa-v2'];

  caches.waitUntil(
    caches
      .keys() //현재 캐쉬에 있는 목록을 반환
      .then(cacheLists => {
        return Promise.all(
          cacheLists.map(cacheList => {
            //새로운 캐시 리스트에 필요가 없는 것은 모두 삭제
            if (newCacheLists.indexOf(cacheList) === -1) {
              return caches.delete(cacheList);
            }
          })
        );
      })
      .catch(error => {
        return console.log(error);
      })
  );
});
