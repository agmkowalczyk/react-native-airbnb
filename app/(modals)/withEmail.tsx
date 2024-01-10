import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native'
import React, { useState } from 'react'
import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'

import Colors from '@/constants/Colors'
import defaultStyles from '@/constants/Styles'
import styles from './login.style'

const WithEmail = () => {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onSignInPress = async () => {
    if (!isLoaded) {
      return
    }
    setIsLoading(true)
    try {
      const completeSignIn = await signIn.create({
        identifier: email,
        password,
      })

      await setActive({ session: completeSignIn.createdSessionId })
      router.replace('/(tabs)/profile')
    } catch (err: any) {
      Alert.alert(err.errors[0].message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize='none'
        placeholder='Email'
        placeholderTextColor={Colors.grey}
        value={email}
        onChangeText={setEmail}
        style={[defaultStyles.inputField, { marginBottom: 30 }]}
      />

      <TextInput
        autoCapitalize='none'
        placeholder='Password'
        placeholderTextColor={Colors.grey}
        value={password}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        style={[defaultStyles.inputField, { marginBottom: 30 }]}
      />

      <Pressable
        style={[defaultStyles.btn, { flexDirection: 'row', gap: 10 }]}
        onPress={() => onSignInPress()}
        disabled={!email || !password}
      >
        {isLoading && <ActivityIndicator color='#fff' />}
        <Text style={defaultStyles.btnText}>Log In</Text>
      </Pressable>

      <View style={styles.linkContainer}>
        <Link href={'/(modals)/reset'} style={styles.link}>
          Forgot password?
        </Link>
        <Link href={'/(modals)/register'} style={styles.link}>
          Create Account
        </Link>
      </View>
    </View>
  )
}

export default WithEmail
