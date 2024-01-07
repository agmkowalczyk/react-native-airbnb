import { Ionicons } from '@expo/vector-icons'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack, useRouter } from 'expo-router'
import { useEffect } from 'react'
import { Pressable } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import { ClerkProvider, useAuth } from '@clerk/clerk-expo'
import { Fonts } from '@/types'
import ModalHeaderText from '@/components/ModalHeaderText'

import defaultStyles from '@/constants/Styles'

const CLERK_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key)
    } catch (error) {
      return null
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (error) {
      return
    }
  },
}

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    [Fonts.mon]: require('../assets/fonts/Montserrat-Regular.ttf'),
    [Fonts.monSb]: require('../assets/fonts/Montserrat-SemiBold.ttf'),
    [Fonts.monB]: require('../assets/fonts/Montserrat-Bold.ttf'),
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <ClerkProvider publishableKey={CLERK_KEY!} tokenCache={tokenCache}>
      <RootLayoutNav />
    </ClerkProvider>
  )
}

function RootLayoutNav() {
  const router = useRouter()
  const { isLoaded, isSignedIn } = useAuth()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/(modals)/login')
    }
  }, [isLoaded, isSignedIn])

  return (
    <Stack>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      <Stack.Screen
        name='(modals)/login'
        options={{
          title: 'Log in or sign up',
          headerTitleStyle: {
            fontFamily: Fonts.monSb,
          },
          presentation: 'modal',
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <Ionicons name='close-outline' size={28} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name='listing/[id]'
        options={{
          headerTitle: '',
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name='(modals)/booking'
        options={{
          presentation: 'transparentModal',
          animation: 'fade',
          headerTransparent: true,
          headerTitle: () => <ModalHeaderText />,
          headerLeft: () => (
            <Pressable
              onPress={() => router.back()}
              style={defaultStyles.closeModalBtn}
            >
              <Ionicons name='close-outline' size={22} />
            </Pressable>
          ),
        }}
      />
    </Stack>
  )
}
