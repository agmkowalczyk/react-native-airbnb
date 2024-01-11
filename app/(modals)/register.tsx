import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native'
import React, { useState } from 'react'
import { useSignUp } from '@clerk/clerk-expo'
import { useLocalSearchParams, useRouter } from 'expo-router'

import Colors from '@/constants/Colors'
import defaultStyles from '@/constants/Styles'
import styles from './login.style'

const WithEmail = () => {
  const { signUp, setActive, isLoaded } = useSignUp()
  const router = useRouter()
  const { email: emailProp } = useLocalSearchParams<{ email: string }>()

  const [email, setEmail] = useState(emailProp || '')
  const [password, setPassword] = useState('')
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return
    }
    setIsLoading(true)

    try {
      // Create the user on Clerk
      await signUp.create({
        emailAddress: email,
        password,
      })

      // Send verification Email
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // change the UI to verify the email address
      setPendingVerification(true)
    } catch (err: any) {
      Alert.alert(err.errors[0].message)
    } finally {
      setIsLoading(false)
    }
  }

  const onPressVerify = async () => {
    if (!isLoaded) {
      return
    }
    setIsLoading(true)

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      })

      await setActive({ session: completeSignUp.createdSessionId })
      router.push('/(tabs)/profile')
    } catch (err: any) {
      Alert.alert(err.errors[0].message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View style={[styles.container, { gap: 30 }]}>
      {!pendingVerification && (
        <>
          <TextInput
            autoCapitalize='none'
            placeholder='Email'
            placeholderTextColor={Colors.grey}
            value={email}
            onChangeText={setEmail}
            style={defaultStyles.inputField}
          />
          <TextInput
            autoCapitalize='none'
            placeholder='Password'
            placeholderTextColor={Colors.grey}
            value={password}
            secureTextEntry
            onChangeText={setPassword}
            style={defaultStyles.inputField}
          />
          <Pressable
            style={[defaultStyles.btn, { flexDirection: 'row', gap: 10 }]}
            onPress={onSignUpPress}
            disabled={!email || !password}
          >
            {isLoading && <ActivityIndicator color='#fff' />}
            <Text style={defaultStyles.btnText}>Sign up</Text>
          </Pressable>
        </>
      )}

      {pendingVerification && (
        <View style={{ gap: 15 }}>
          <Text>Verify Email</Text>
          <TextInput
            value={code}
            placeholder='Code...'
            style={defaultStyles.inputField}
            onChangeText={setCode}
          />

          <Pressable style={defaultStyles.btn} onPress={onPressVerify}>
            <Text style={defaultStyles.btnText}>Verify Email</Text>
          </Pressable>
        </View>
      )}
    </View>
  )
}

export default WithEmail
