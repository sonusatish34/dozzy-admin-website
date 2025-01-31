

export function GetUrl() {
    //give ENVIRONMENT as  app for prod
    //give empty for staging
    var ENVIRONMENT = '';
    var APP_URL = '';
    var USER_PHONE_NUMBER = '';

    if (ENVIRONMENT == 'app') {
        APP_URL = 'https://api.dozzy.com';
    } else {
        APP_URL = 'https://staging.dozzy.com';
    }
    return APP_URL;
}