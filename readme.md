## Food API Utilization

#### Requirements
- npm/yarn

setup environment for development
- install required packages for [ionic cli development](https://ionicframework.com/docs/intro/cli)

### RUN
```bash
git clone <repo-link>
npm install
ionic resources
npm run build
npx cap add android
```

### Development
Running application 
- run `ionic capacitor run android` for running application on dev env
- run `ionic capacitor run android -l --external` for live reload development on dev env

### Build
 extract apk build with following [steps](https://www.joshmorony.com/deploying-capacitor-applications-to-android-development-distribution/), since command line build is not yet supported for capacitor 

- run `gulp dev-android`
- After gradle sync with andoird studio, go to `Build > Generate APK` 
- Select debug or release as per need 

- release apk at /android/app/release
- OR extract by run `gulp build-android` after updating gulpfile.js with (EDIT HERE :) for sdk path and build tool version
