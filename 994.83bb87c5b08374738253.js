(self.webpackChunkmdm_web=self.webpackChunkmdm_web||[]).push([[994],{994:(e,n,t)=>{"use strict";t.r(n);var i=t(6304),o=t(6986),r=t(1947),s=t(7770),a=t(5725),c=(t(8231),t(4890)),u=t(7964);const l="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4";var p=function(e){return e[e.DATA_MESSAGE=1]="DATA_MESSAGE",e[e.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION",e}({}),d=function(e){return e.PUSH_RECEIVED="push-received",e.NOTIFICATION_CLICKED="notification-clicked",e}({});function f(e){const n=new Uint8Array(e);return btoa(String.fromCharCode(...n)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function g(e){const n=(e+"=".repeat((4-e.length%4)%4)).replace(/\-/g,"+").replace(/_/g,"/"),t=atob(n),i=new Uint8Array(t.length);for(let o=0;o<t.length;++o)i[o]=t.charCodeAt(o);return i}const h="fcm_token_details_db",y="fcm_token_object_Store";function b(e){return m.apply(this,arguments)}function m(){return(m=(0,i.Z)(function*(e){if("databases"in indexedDB&&!(yield indexedDB.databases()).map(e=>e.name).includes(h))return null;let n=null;var t;return(yield(0,c.X3)(h,5,{upgrade:(t=(0,i.Z)(function*(t,i,o,r){var s;if(i<2)return;if(!t.objectStoreNames.contains(y))return;const a=r.objectStore(y),c=yield a.index("fcmSenderId").get(e);if(yield a.clear(),c)if(2===i){const e=c;if(!e.auth||!e.p256dh||!e.endpoint)return;n={token:e.fcmToken,createTime:null!==(s=e.createTime)&&void 0!==s?s:Date.now(),subscriptionOptions:{auth:e.auth,p256dh:e.p256dh,endpoint:e.endpoint,swScope:e.swScope,vapidKey:"string"==typeof e.vapidKey?e.vapidKey:f(e.vapidKey)}}}else if(3===i){const e=c;n={token:e.fcmToken,createTime:e.createTime,subscriptionOptions:{auth:f(e.auth),p256dh:f(e.p256dh),endpoint:e.endpoint,swScope:e.swScope,vapidKey:f(e.vapidKey)}}}else if(4===i){const e=c;n={token:e.fcmToken,createTime:e.createTime,subscriptionOptions:{auth:f(e.auth),p256dh:f(e.p256dh),endpoint:e.endpoint,swScope:e.swScope,vapidKey:f(e.vapidKey)}}}}),function(e,n,i,o){return t.apply(this,arguments)})})).close(),yield(0,c.Lj)(h),yield(0,c.Lj)("fcm_vapid_details_db"),yield(0,c.Lj)("undefined"),w(n)?n:null})).apply(this,arguments)}function w(e){if(!e||!e.subscriptionOptions)return!1;const{subscriptionOptions:n}=e;return"number"==typeof e.createTime&&e.createTime>0&&"string"==typeof e.token&&e.token.length>0&&"string"==typeof n.auth&&n.auth.length>0&&"string"==typeof n.p256dh&&n.p256dh.length>0&&"string"==typeof n.endpoint&&n.endpoint.length>0&&"string"==typeof n.swScope&&n.swScope.length>0&&"string"==typeof n.vapidKey&&n.vapidKey.length>0}const v="firebase-messaging-store";let k=null;function I(){return k||(k=(0,c.X3)("firebase-messaging-database",1,{upgrade:(e,n)=>{switch(n){case 0:e.createObjectStore(v)}}})),k}function S(e){return T.apply(this,arguments)}function T(){return(T=(0,i.Z)(function*(e){const n=C(e),t=yield I(),i=yield t.transaction(v).objectStore(v).get(n);if(i)return i;{const n=yield b(e.appConfig.senderId);if(n)return yield _(e,n),n}})).apply(this,arguments)}function _(e,n){return M.apply(this,arguments)}function M(){return(M=(0,i.Z)(function*(e,n){const t=C(e),i=(yield I()).transaction(v,"readwrite");return yield i.objectStore(v).put(n,t),yield i.done,n})).apply(this,arguments)}function O(e){return A.apply(this,arguments)}function A(){return(A=(0,i.Z)(function*(e){const n=C(e),t=(yield I()).transaction(v,"readwrite");yield t.objectStore(v).delete(n),yield t.done})).apply(this,arguments)}function C({appConfig:e}){return e.appId}const P=new a.LL("messaging","Messaging",{"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."});function D(e,n){return K.apply(this,arguments)}function K(){return(K=(0,i.Z)(function*(e,n){const t=yield F(e),i=B(n),o={method:"POST",headers:t,body:JSON.stringify(i)};let r;try{const n=yield fetch(Z(e.appConfig),o);r=yield n.json()}catch(s){throw P.create("token-subscribe-failed",{errorInfo:s})}if(r.error)throw P.create("token-subscribe-failed",{errorInfo:r.error.message});if(!r.token)throw P.create("token-subscribe-no-token");return r.token})).apply(this,arguments)}function j(e,n){return N.apply(this,arguments)}function N(){return(N=(0,i.Z)(function*(e,n){const t=yield F(e),i=B(n.subscriptionOptions),o={method:"PATCH",headers:t,body:JSON.stringify(i)};let r;try{const t=yield fetch(`${Z(e.appConfig)}/${n.token}`,o);r=yield t.json()}catch(s){throw P.create("token-update-failed",{errorInfo:s})}if(r.error)throw P.create("token-update-failed",{errorInfo:r.error.message});if(!r.token)throw P.create("token-update-no-token");return r.token})).apply(this,arguments)}function E(e,n){return L.apply(this,arguments)}function L(){return(L=(0,i.Z)(function*(e,n){const t={method:"DELETE",headers:yield F(e)};try{const i=yield fetch(`${Z(e.appConfig)}/${n}`,t),o=yield i.json();if(o.error)throw P.create("token-unsubscribe-failed",{errorInfo:o.error.message})}catch(i){throw P.create("token-unsubscribe-failed",{errorInfo:i})}})).apply(this,arguments)}function Z({projectId:e}){return`https://fcmregistrations.googleapis.com/v1/projects/${e}/registrations`}function F(e){return x.apply(this,arguments)}function x(){return(x=(0,i.Z)(function*({appConfig:e,installations:n}){const t=yield n.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e.apiKey,"x-goog-firebase-installations-auth":`FIS ${t}`})})).apply(this,arguments)}function B({p256dh:e,auth:n,endpoint:t,vapidKey:i}){const o={web:{endpoint:t,auth:n,p256dh:e}};return i!==l&&(o.web.applicationPubKey=i),o}const H=6048e5;function R(e){return U.apply(this,arguments)}function U(){return(U=(0,i.Z)(function*(e){const n=yield J(e.swRegistration,e.vapidKey),t={vapidKey:e.vapidKey,swScope:e.swRegistration.scope,endpoint:n.endpoint,auth:f(n.getKey("auth")),p256dh:f(n.getKey("p256dh"))},i=yield S(e.firebaseDependencies);if(i){if(Y(i.subscriptionOptions,t))return Date.now()>=i.createTime+H?G(e,{token:i.token,createTime:Date.now(),subscriptionOptions:t}):i.token;try{yield E(e.firebaseDependencies,i.token)}catch(o){console.warn(o)}return q(e.firebaseDependencies,t)}return q(e.firebaseDependencies,t)})).apply(this,arguments)}function W(e){return $.apply(this,arguments)}function $(){return($=(0,i.Z)(function*(e){const n=yield S(e.firebaseDependencies);n&&(yield E(e.firebaseDependencies,n.token),yield O(e.firebaseDependencies));const t=yield e.swRegistration.pushManager.getSubscription();return!t||t.unsubscribe()})).apply(this,arguments)}function G(e,n){return V.apply(this,arguments)}function V(){return(V=(0,i.Z)(function*(e,n){try{const t=yield j(e.firebaseDependencies,n),i=Object.assign(Object.assign({},n),{token:t,createTime:Date.now()});return yield _(e.firebaseDependencies,i),t}catch(t){throw yield W(e),t}})).apply(this,arguments)}function q(e,n){return z.apply(this,arguments)}function z(){return(z=(0,i.Z)(function*(e,n){const t={token:yield D(e,n),createTime:Date.now(),subscriptionOptions:n};return yield _(e,t),t.token})).apply(this,arguments)}function J(e,n){return Q.apply(this,arguments)}function Q(){return(Q=(0,i.Z)(function*(e,n){return(yield e.pushManager.getSubscription())||e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:g(n)})})).apply(this,arguments)}function Y(e,n){return n.vapidKey===e.vapidKey&&n.endpoint===e.endpoint&&n.auth===e.auth&&n.p256dh===e.p256dh}function X(e){const n={from:e.from,collapseKey:e.collapse_key,messageId:e.fcmMessageId};return function(e,n){if(!n.notification)return;e.notification={};const t=n.notification.title;t&&(e.notification.title=t);const i=n.notification.body;i&&(e.notification.body=i);const o=n.notification.image;o&&(e.notification.image=o)}(n,e),function(e,n){n.data&&(e.data=n.data)}(n,e),function(e,n){if(!n.fcmOptions)return;e.fcmOptions={};const t=n.fcmOptions.link;t&&(e.fcmOptions.link=t);const i=n.fcmOptions.analytics_label;i&&(e.fcmOptions.analyticsLabel=i)}(n,e),n}function ee(e){return new Promise(n=>{setTimeout(n,e)})}function ne(e,n){return te.apply(this,arguments)}function te(){return(te=(0,i.Z)(function*(e,n){const t=ie(n,yield e.firebaseDependencies.installations.getId());oe(e,t)})).apply(this,arguments)}function ie(e,n){var t,i;const o={};return e.from&&(o.project_number=e.from),e.fcmMessageId&&(o.message_id=e.fcmMessageId),o.instance_id=n,o.message_type=e.notification?p.DISPLAY_NOTIFICATION.toString():p.DATA_MESSAGE.toString(),o.sdk_platform=3..toString(),o.package_name=self.origin.replace(/(^\w+:|^)\/\//,""),e.collapse_key&&(o.collapse_key=e.collapse_key),o.event=1..toString(),(null===(t=e.fcmOptions)||void 0===t?void 0:t.analytics_label)&&(o.analytics_label=null===(i=e.fcmOptions)||void 0===i?void 0:i.analytics_label),o}function oe(e,n){const t={};t.event_time_ms=Math.floor(Date.now()).toString(),t.source_extension_json_proto3=JSON.stringify(n),e.logEvents.push(t)}function re(e,n){const t=[];for(let i=0;i<e.length;i++)t.push(e.charAt(i)),i<n.length&&t.push(n.charAt(i));return t.join("")}function se(){return(se=(0,i.Z)(function*(e,n){var t,i;const{newSubscription:o}=e;if(!o)return void(yield W(n));const r=yield S(n.firebaseDependencies);yield W(n),n.vapidKey=null!==(i=null===(t=null==r?void 0:r.subscriptionOptions)||void 0===t?void 0:t.vapidKey)&&void 0!==i?i:l,yield R(n)})).apply(this,arguments)}function ae(){return(ae=(0,i.Z)(function*(e,n){const t=le(e);if(!t)return;n.deliveryMetricsExportedToBigQueryEnabled&&(yield ne(n,t));const i=yield he();if(fe(i))return ge(i,t);if(t.notification&&(yield ye(ue(t))),n&&n.onBackgroundMessageHandler){const e=X(t);"function"==typeof n.onBackgroundMessageHandler?yield n.onBackgroundMessageHandler(e):n.onBackgroundMessageHandler.next(e)}})).apply(this,arguments)}function ce(){return(ce=(0,i.Z)(function*(e){var n,t;const i=null===(t=null===(n=e.notification)||void 0===n?void 0:n.data)||void 0===t?void 0:t.FCM_MSG;if(!i)return;if(e.action)return;e.stopImmediatePropagation(),e.notification.close();const o=be(i);if(!o)return;const r=new URL(o,self.location.href),s=new URL(self.location.origin);if(r.host!==s.host)return;let a=yield pe(r);return a?a=yield a.focus():(a=yield self.clients.openWindow(o),yield ee(3e3)),a?(i.messageType=d.NOTIFICATION_CLICKED,i.isFirebaseMessaging=!0,a.postMessage(i)):void 0})).apply(this,arguments)}function ue(e){const n=Object.assign({},e.notification);return n.data={FCM_MSG:e},n}function le({data:e}){if(!e)return null;try{return e.json()}catch(n){return null}}function pe(e){return de.apply(this,arguments)}function de(){return(de=(0,i.Z)(function*(e){const n=yield he();for(const t of n){const n=new URL(t.url,self.location.href);if(e.host===n.host)return t}return null})).apply(this,arguments)}function fe(e){return e.some(e=>"visible"===e.visibilityState&&!e.url.startsWith("chrome-extension://"))}function ge(e,n){n.isFirebaseMessaging=!0,n.messageType=d.PUSH_RECEIVED;for(const t of e)t.postMessage(n)}function he(){return self.clients.matchAll({type:"window",includeUncontrolled:!0})}function ye(e){var n;const{actions:t}=e,{maxActions:i}=Notification;return t&&i&&t.length>i&&console.warn(`This browser only supports ${i} actions. The remaining actions will not be displayed.`),self.registration.showNotification(null!==(n=e.title)&&void 0!==n?n:"",e)}function be(e){var n,t,i,o;return(null!==(t=null===(n=e.fcmOptions)||void 0===n?void 0:n.link)&&void 0!==t?t:null===(i=e.notification)||void 0===i?void 0:i.click_action)||("object"==typeof(o=e.data)&&o&&"google.c.a.c_id"in o?self.location.origin:null)}function me(e){return P.create("missing-app-config-values",{valueName:e})}re("hts/frbslgigp.ogepscmv/ieo/eaylg","tp:/ieaeogn-agolai.o/1frlglgc/o"),re("AzSCbw63g1R0nCw85jG8","Iaya3yLKwmgvh7cF0q4");class we{constructor(e,n,t){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const i=function(e){if(!e||!e.options)throw me("App Configuration Object");if(!e.name)throw me("App Name");const n=["projectId","apiKey","appId","messagingSenderId"],{options:t}=e;for(const i of n)if(!t[i])throw me(i);return{appName:e.name,projectId:t.projectId,apiKey:t.apiKey,appId:t.appId,senderId:t.messagingSenderId}}(e);this.firebaseDependencies={app:e,appConfig:i,installations:n,analyticsProvider:t}}_delete(){return Promise.resolve()}}(0,u._registerComponent)(new r.wA("messaging-sw",e=>{const n=new we(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),e.getProvider("analytics-internal"));return self.addEventListener("push",e=>{e.waitUntil(function(e,n){return ae.apply(this,arguments)}(e,n))}),self.addEventListener("pushsubscriptionchange",e=>{e.waitUntil(function(e,n){return se.apply(this,arguments)}(e,n))}),self.addEventListener("notificationclick",e=>{e.waitUntil(function(e){return ce.apply(this,arguments)}(e))}),n},"PUBLIC"));class ve{constructor(e,n){this.app=e,this._delegate=n,this.app=e,this._delegate=n}getToken(e){var n=this;return(0,i.Z)(function*(){return(0,s.LP)(n._delegate,e)})()}deleteToken(){var e=this;return(0,i.Z)(function*(){return(0,s.pQ)(e._delegate)})()}onMessage(e){return(0,s.ps)(this._delegate,e)}onBackgroundMessage(e){return function(e,n){return function(e,n){if(void 0!==self.document)throw P.create("only-available-in-sw");return e.onBackgroundMessageHandler=n,()=>{e.onBackgroundMessageHandler=null}}(e=(0,a.m9)(e),n)}(this._delegate,e)}}const ke={isSupported:function(){return self&&"ServiceWorkerGlobalScope"in self?(0,a.hl)()&&"PushManager"in self&&"Notification"in self&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey"):"undefined"!=typeof window&&(0,a.hl)()&&(0,a.zI)()&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}};o.Z.INTERNAL.registerComponent(new r.wA("messaging-compat",e=>self&&"ServiceWorkerGlobalScope"in self?new ve(e.getProvider("app-compat").getImmediate(),e.getProvider("messaging-sw").getImmediate()):new ve(e.getProvider("app-compat").getImmediate(),e.getProvider("messaging").getImmediate()),"PUBLIC").setServiceProps(ke)),o.Z.registerVersion("@firebase/messaging-compat","0.1.13")}}]);