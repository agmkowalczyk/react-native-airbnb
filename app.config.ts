import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  android: {
    package: 'com.agmkowalczyk.reactnativeairbnb',
    versionCode: 1,
    config: {
      googleMaps: {
        apiKey: process.env.GOOGLEMAPS_APIKEY,
      },
    },
  },
  name: 'RN Airbnb',
  slug: 'react-native-airbnb',
})