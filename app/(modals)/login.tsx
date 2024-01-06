import { View, Text, TextInput, Pressable } from 'react-native'
import React from 'react'
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser'

import styles from './login.style'
import defaultStyles from '@/constants/Styles'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { useOAuth } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'

enum Strategy {
  Google = 'oauth_google',
  Apple = 'oauth_apple',
  Facebook = 'oauth_facebook',
}

const Page = () => {
  useWarmUpBrowser()
  const router = useRouter()
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: Strategy.Google })
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: Strategy.Apple })
  const { startOAuthFlow: facebookAuth } = useOAuth({ strategy: Strategy.Facebook })

  const onSelectAuth = async (strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.Google]: googleAuth,
      [Strategy.Apple]: appleAuth,
      [Strategy.Facebook]: facebookAuth,
    }[strategy]

    try {
      const { createdSessionId, setActive } = await selectedAuth()

      if (createdSessionId) {
        setActive!({ session: createdSessionId })
        router.back()
      }
    } catch (error) {
      console.error('OAuth error: ', error)
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize='none'
        placeholder='Email'
        placeholderTextColor={Colors.grey}
        style={[defaultStyles.inputField, { marginBottom: 30 }]}
      />
      <Pressable style={defaultStyles.btn}>
        <Text style={defaultStyles.btnText}>Continue</Text>
      </Pressable>

      <View style={styles.separatorView}>
        <View style={[{ flex: 1 }, defaultStyles.hairline]} />
        <Text style={styles.separator}>or</Text>
        <View style={[{ flex: 1 }, defaultStyles.hairline]} />
      </View>

      <View style={{ gap: 20 }}>
        <Pressable style={styles.btnOutline}>
          <Ionicons
            name='call-outline'
            size={24}
            style={defaultStyles.btnIcon}
          />
          <Text style={styles.btnOutlineText}>Continue with Phone</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.btnOutline,
            pressed && styles.btnOutlinePressed,
          ]}
          onPress={() => onSelectAuth(Strategy.Google)}
        >
          <Ionicons
            name='md-logo-google'
            size={24}
            style={defaultStyles.btnIcon}
          />
          <Text style={styles.btnOutlineText}>Continue with Google</Text>
        </Pressable>
        <Pressable
          style={[styles.btnOutline, styles.btnOutlineDisabled]}
          onPress={() => onSelectAuth(Strategy.Apple)}
          disabled
        >
          <Ionicons
            name='md-logo-apple'
            size={24}
            style={defaultStyles.btnIcon}
          />
          <Text style={styles.btnOutlineText}>Continue with Apple</Text>
        </Pressable>
        <Pressable
          style={[styles.btnOutline, styles.btnOutlineDisabled]}
          onPress={() => onSelectAuth(Strategy.Facebook)}
          disabled
        >
          <Ionicons
            name='md-logo-facebook'
            size={24}
            style={defaultStyles.btnIcon}
          />
          <Text style={styles.btnOutlineText}>Continue with Facebook</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default Page
