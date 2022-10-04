# Tchek SSO/WEB_SDK
Hi! Welcome to Tchek Documentation

The **Tchek WEB SDK** is a web alternative to the native mobile application (iOS/Android).

*_Supported languages: `FR`|`EN`|`DE`_

## How It's work ?
There two ways to access to the app :
- by `/auth/login` global route
- by `/sso/intro-shoot-inspect?token=<TXXXXXX>` with your unique temporary access token

With the temporary access token, you will be automatically redirected to the first page you access with it.
Access to features are customizable per token :

|FEAT				|LOGIN							|SSO							|
|-------------------|-------------------------------|------------------------------|
|Shoot-Inspect   	|Always							|only if enabled on token		|
|Fast-Track      	|Always							|only if enabled on token		|
|Report          	|Always							|only if enabled on token 		|

<img src="https://github.githubassets.com/images/icons/emoji/unicode/2139.png" alt="drawing" width="15"/> It's recommended to use the SDK in an iframe

## Generate SSO

Get your unique temporary token by using the following request
````
curl --location --request POST 'https://alto.tchek.fr/apiV1/tokenmanager/token' \
--header 'X-API-Key: <PERSONAL_API_TOKEN>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "deviceId" : <uuid()>, // optional: unique id from uuid() library or from mobile device id (IDFA for iOS or AAID for Android)
    "validity" : ∞, // in days
    "tchekId" : "xXxXXxXXxx", // empty if new trade in
    "options" : {
        "shootInspect" : true,
        "fastTrack" : true,
        "report" : true,
	"cost" : false,
        "downloadRoi" : false
    },
    "tradeIn" : {
        "tradeinVehicle" : true, // optional if not using dashboard
        "immat" : "DJ624RS", // optional if not using dashboard
        "sendingType" : 0 // optional if not using dashboard (0: Email | 1: SMS)
    },
    "customer" : {
	"clientType": "customer",
	"email": "john.doe@company.io",
	"firstname": "john",
	"gender":  "male",
	"lastname":  "doe",
	"phone":  "0601020304"
    }
}'
````
````
/* curl response example */
{
  "uid": "T000042",
  "expired": false,
  "expiresIn": "01 Jan 2100 at 10:10:10 UTC",
  "options": "{"shootInspect": true, "fastTrack": true, "report": true, "cost": false, "downloadRoi": false}"
}
````

## Generate Report Url
For access to a specific web report, set the tchekId in request and use the `uid` object from response for build url
````
https://webapp.tchek.ai/<lang>/report?token=T010203
````

## Usage WEB SDK

Install modules
````
npm install
````

Run demo after replaced `<TXXXXXX>` with your personal sso token in `/index.html`
````
npm run start
````

### Events
At the end of any step, you'll receive an **event message** from the application.
In Vanilla Javascript, you can use the native **event listener** for catching every event returned by the iframe :
````
document.addEventListener("DOMContentLoaded", function () {
     window.addEventListener("message", function (e) {
         console.log(JSON.parse(e.data));
     });
 });
````
````
/* console.log(data) */
{
    "status": 200,
    "message": "Tchek successfully created !",
    "date": 1652050366222,
    "tchek": {
        "tchek": {...},
        "damages": [...],
        "images": [...],
        "thirdPartyReport": {...}
    }
}
````

### Diagram

```mermaid
sequenceDiagram
WEBSITE -->> WEBSITE : loadIframe()
activate  WEBSITE
WEBSITE --> WEBSITE: addEventListener(...);
WEBSITE --> IFRAME: <interact with the iframe>
IFRAME --> IFRAME: ::internalProcess()
IFRAME -->> WEBSITE: ::postMessage(...);
WEBSITE --> WEBSITE: catchEventListener(...);
deactivate  WEBSITE 
```

### Links
[WEB SDK website](https://webapp.tchek.fr/en/pwa/home)

[API Documentation](https://alto.tchek.fr/api-docs)
