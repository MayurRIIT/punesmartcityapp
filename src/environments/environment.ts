// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
  
//let ApiBaseUrl = `https://content.edulight.in/supermind/`;

let ApiBaseUrl = `https://api.marathidigimadhyam.com`;

export const environment = {
  production: false,
  api: `${ApiBaseUrl}/user`,
  //api: `${ApiBaseUrl}`,
  firebaseConfig : {
    apiKey: "AIzaSyCv3ucyGRykt2odqgWD9Y1krcjp8s_4ZA0",
    authDomain: "sakal-312705.firebaseapp.com",
    projectId: "sakal-312705",
    storageBucket: "sakal-312705.appspot.com",
    messagingSenderId: "822695474270",
    appId: "1:822695474270:web:7becbee162a58789cfb0cf",
    measurementId: "G-D04WYZRVYY"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
