//export const SERVER_API_URL = 'http://52.66.239.120:3001/'; // Dev Env
  export const SERVER_API_URL = "http://3.108.74.63:3002"; // Dev Env
//export const SERVER_API_URL = 'http://3.108.74.63:4001/'; // Demo Env
//export const SERVER_API_URL = 'https://api.marathidigimadhyam.com/'; // Prod Env
//export const SERVER_API_URL = 'http://localhost:7001/';
export function getBoolean(value : any){
    switch(value){
         case true:
         case "true":
         case 1:
         case "1":
         case "on":
         case "yes":
             return true;
         default: 
             return false;
     }
 } 

export function ordinal_suffix_of_eng(i : any) {
    let j = i % 10,
        k = i % 100;

    if (j == 1 && k != 11) {
        return i + " st";
    }
    if (j == 2 && k != 12) {
        return i + " nd";
    }
    if (j == 3 && k != 13) {
        return i + " rd";
    }
    return i + " th";
}

export function ordinal_suffix_of_mar(i : any) {
    let j = i % 10,
        k = i % 100;

    if (j == 1 && k != 11) {
        return i + " ली";
    }
    if (j == 2 && k != 12) {
        return i + " री";
    }
    if (j == 3 && k != 13) {
        return i + " री";
    }                                                                                                               
    if (j == 4 && k != 14) {
        return i + " थी";
    }
    return i + " वी";
}
