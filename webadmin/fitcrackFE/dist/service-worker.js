"use strict";var precacheConfig=[["index.html","772c0f7fe32f14b23e8bdcf1fc918c7f"],["service-worker.js","7185ea1a122f7cdb3d8b1c199de9a50a"],["static/configuration.js","9cec3b516ef4631f7d3af53e7bfb34fa"],["static/css/app.3c46327495e3577c7df4fc785acf9fc1.css","56ca3f19cc078916d5a08a71ccf37902"],["static/js/0.36aa52ca3fe3e0a80fd8.js","2e3192dd9a3cd1cbc9bb39833b61dbc1"],["static/js/1.aec522fec787a0e958db.js","7aecf706b5a30f6cbb366d78efd3835e"],["static/js/10.7523909804c4b7abea24.js","f344533605ff3894fffa0f4f2ec4e0e3"],["static/js/11.ce8b380df3bc4a9a5d1f.js","6d708dc32d70ca01276f39e51da5e80e"],["static/js/12.164c342a4802e58bc7d7.js","eb5265b789bfbb52f446fef705104566"],["static/js/13.29e73ea8399181410564.js","161191ef95499ca5b701d95b8133ee19"],["static/js/14.67f494f353738f704b69.js","bd1ec4c38c218c5db7302d7613eec9ab"],["static/js/15.4626cc82eef5d6daa85a.js","2587f42d0be26209026da26d780479e8"],["static/js/16.8c1603ee5c7d89817148.js","09c1530dc7b663750ae8b1b3e65ff47c"],["static/js/17.b2cf05de32362286dafb.js","915ce079b9f50284ee9d3d04faf9d188"],["static/js/18.be67ff977a74da04ea12.js","a4c2e3f64e83941f84d1622a61c08e3a"],["static/js/19.7a983a54231329c7ad45.js","915b4e5f7abc100f8bda9c10772268e3"],["static/js/2.4da36b3075efa7a59912.js","1d2a54d530cd1aebcf19f56c7f83d005"],["static/js/20.e903d914957b21a61768.js","0a62dfc9806b88e9e450376c621f2a8d"],["static/js/21.2bdbeb4bdb3434690707.js","9aa2e570bff224d28b70353301f4ea11"],["static/js/22.bcb3ec363e9e8723d14a.js","2767e3d805af47ef352fbdcf0cd281c6"],["static/js/23.f0e466edeaa6cf5b7d35.js","d28e41a9d6ef12532c17f002650f79a0"],["static/js/24.560939a7a220be89073f.js","3850c890c2acfe59c12dc2399a727b50"],["static/js/25.e59c928807e1468a402b.js","b9efb507a99072d7bde55fbe01a0f5e0"],["static/js/26.3a552945eb3edab1effb.js","043ddccb38717d1e61fce9b3c6f02853"],["static/js/3.d24608ccb2dd750fa63a.js","d9ed5f0d39c8fc8b007ef1b1078fdcbc"],["static/js/4.02b45ea3606737fbc339.js","1f1f9897bd15fd58a4ccd48e47b3f132"],["static/js/5.885eca6b977e8f82db0a.js","cc539fd80061f5d73825676ef37a287c"],["static/js/6.00f4218bcc99d346b9d8.js","8e99963b9b1300e0f63c73eeefebb881"],["static/js/7.9d8b85c85b12d72e32e3.js","c7e6601f7c764af50c20f3987774180b"],["static/js/8.b9fbb533c0b687130d38.js","eb399ec50aa715ec77676b438748512b"],["static/js/9.4339fa9076c99780002e.js","e7d63defbdc39e89b7112fb0a50f8f87"],["static/js/app.c9a04970993b3e299d8f.js","db43e6463dfa604da3b4a5fddcc71ee6"],["static/js/manifest.669cfb1fdac857a4f4fd.js","71c1daef7d31a4753b78ea1d39b01234"],["static/js/vendor.fa07485e7cb71d6297a5.js","d57ecea99e7094ed26f978e3a32e8ff4"]],cacheName="sw-precache-v3-Fitcrack-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var c=new URL(e);return"/"===c.pathname.slice(-1)&&(c.pathname+=a),c.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,a,c,t){var s=new URL(e);return t&&s.pathname.match(t)||(s.search+=(s.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(c)),s.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var c=new URL(a).pathname;return e.some(function(e){return c.match(e)})},stripIgnoredUrlParameters=function(e,a){var c=new URL(e);return c.hash="",c.search=c.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),c.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],c=e[1],t=new URL(a,self.location),s=createCacheKey(t,hashParamName,c,!1);return[t.toString(),s]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(c){if(!a.has(c)){var t=new Request(c,{credentials:"same-origin"});return fetch(t).then(function(a){if(!a.ok)throw new Error("Request for "+c+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(c,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(c){return Promise.all(c.map(function(c){if(!a.has(c.url))return e.delete(c)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,c=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(a=urlsToCacheKeys.has(c))||(c=addDirectoryIndex(c,"index.html"),a=urlsToCacheKeys.has(c));0,a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(c)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});