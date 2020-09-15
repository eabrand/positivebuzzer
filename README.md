# Domestic Violence Tracker

### Video

https://www.dropbox.com/s/f1uuf7jmdo3xjja/PositiveBuzzerAppDemo.mov?dl=0

### Build

To build & run locally with yarn for iOS:

```
create-react-native-app PositiveBuzzer
cd PositiveBuzzer/
yarn add @react-navigation/native
expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
npm install -g expo-cli
sudo npm install -g expo-cli
yarn add @react-navigation/stack
expo install expo-sms
cd ios/
pod install
cd ../
yarn ios 
```
