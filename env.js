const envVars = {
    development:{
        googleApiKey: 'AIzaSyBD6bizZimqgDB_cBFEiErDzQBKiTC6THg',// 'AIzaSyBC2Fq1cwTezyMkwXhcoQRZwqkaeEPIU5A',
    },
    production:{
        //googleApiKey: 'AIzaSyBD6bizZimqgDB_cBFEiErDzQBKiTC6THg',// 'AIzaSyBC2Fq1cwTezyMkwXhcoQRZwqkaeEPIU5A',
    }
};

const getEnvVars = () =>{
    if(__DEV__){
        return envVars.development;
    }
    return envVars.production;
};

export default getEnvVars;