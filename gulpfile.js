const fs = require('fs');
const gulp = require('gulp');
const path = require('path');
const {
  execSync
} = require('child_process');

// prepare for dev development of android
gulp.task('dev-android', async function () {
  console.log('Started dev build....');

  await addRemovePlatform('android');
  return setTimeout(async function () {
    try {
      await build('android', 'dev', true);
      return;
    } catch (e) {
      console.log('Error: ', e);
    }
  }, 5000);
});

gulp.task('build-android', async function () {
  console.log('Started dev build....');

  return setTimeout(async function () {
    try {
      await align('dev');
      return;
    } catch (e) {
      console.log('Error: ', e);
    }
  }, 5000);
});


// If platform exists first removes it and adds it again with the respective config file
async function addRemovePlatform(platform) {
  console.log(`Check if ${platform} platform already exists.....`);
  const platformPath = path.join(__dirname, platform);
  const exists = fs.existsSync(platformPath);
  if (exists) {
    console.log(
      `${platform} platform already exists, remove ${platform} platfrom....`
    );
    execSync('rmdir /s /q android');
    console.log(`${platform} platform successfully removed....`);
  }

  console.log(`Add ${platform} platform with the new config.xml...`);
  execSync('npm run build');
  execSync('npx cap add android');
  console.log(
    `Add ${platform} platform with the new config.xml successfully added....`
  );
}

// Builds
async function build(platform) {
  console.log(`Start build for ${platform}...... exit after closing android studio `);
  execSync('npx cap copy');
  execSync('npx cap update');
  execSync('npx cap sync');
  execSync(`npx cap open ${platform}`);

}

// zip-align for android
async function align(env) {
 
  //EDIT HERE : SDK PATH
  let $ANDROID_HOME = 'C:/Users/Public/Android';
 
  console.log('Finding build-tool version...');
  const buildToolVersionString = execSync('ls ' + $ANDROID_HOME + '/build-tools/', {
    encoding: 'utf8',
    maxBuffer: 50 * 1024 * 1024,
  }).toString();

  if (!buildToolVersionString) {
    console.error("Could not find android sdk :'(");
  }
 
  // EDIT HERE : buildToolVersion
  const buildToolVersionToUse = '30.0.2';

  console.log(`Using android sdk version ${buildToolVersionToUse}...`);
  const androidHomePath = execSync('echo ' + $ANDROID_HOME, {
      encoding: 'utf8',
      maxBuffer: 50 * 1024 * 1024,
    })
    .toString()
    .split('\n')[0];
  console.log(`Check if gogfood-${env}.apk already exists...`);

  const exists = fs.existsSync(`./gogfood-${env}.apk`);

  if (exists) {
    console.log(`gogfood-${env}.apk already exists, delete it`);
    await fs.unlinkSync(`gogfood-${env}.apk`);
    console.log(`Finished deleting gogfood-${env}.apk`);
  }
  console.log('Start zip align...');
  execSync(
    `${androidHomePath}/build-tools/${buildToolVersionToUse}/zipalign -v 4 android/app/release/app-release.apk gogfood-${env}.apk`, {
      stdio: 'inherit'
    }
  );

  console.log('Finished zipalign...');
}