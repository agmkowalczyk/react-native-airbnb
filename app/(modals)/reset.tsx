import { View, Text, TextInput, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import { useSignIn } from '@clerk/clerk-expo'
import { useLocalSearchParams, useRouter } from 'expo-router'

import Colors from '@/constants/Colors'
import defaultStyles from '@/constants/Styles'
import styles from './login.style'

const Reset = () => {
  const { signIn, setActive } = useSignIn()
  const router = useRouter()
  const { email: emailProp } = useLocalSearchParams<{ email: string }>()

  const [email, setEmail] = useState(emailProp || '')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [successfulCreation, setSuccessfulCreation] = useState(false)

  const onRequestReset = async () => {
    try {
      await signIn!.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      })
      setSuccessfulCreation(true)
    } catch (err: any) {
      Alert.alert(err.errors[0].message)
    }
  }

  const onReset = async () => {
    try {
      const result = await signIn!.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      })

      // Set the user session active, which will log in the user automatically
      await setActive!({ session: result.createdSessionId })
      router.push('/(tabs)/profile')
    } catch (err: any) {
      Alert.alert(err.errors[0].message)
    }
  }

  return (
    <View style={[styles.container, { gap: 30 }]}>
      {successfulCreation ? (
        <>
          <TextInput
            value={code}
            placeholder='Code...'
            placeholderTextColor={Colors.grey}
            onChangeText={setCode}
            style={defaultStyles.inputField}
          />

          <TextInput
            autoCapitalize='none'
            placeholder='New Password'
            placeholderTextColor={Colors.grey}
            value={password}
            secureTextEntry
            onChangeText={setPassword}
            style={defaultStyles.inputField}
          />

          <Pressable style={defaultStyles.btn} onPress={onReset}>
            <Text style={defaultStyles.btnText}>Set new Password</Text>
          </Pressable>
        </>
      ) : (
        <>
          <TextInput
            autoCapitalize='none'
            placeholder='Email'
            placeholderTextColor={Colors.grey}
            value={email}
            onChangeText={setEmail}
            style={defaultStyles.inputField}
          />
          <Pressable
            style={defaultStyles.btn}
            onPress={onRequestReset}
            disabled={!email}
          >
            <Text style={defaultStyles.btnText}>Send Reset Email</Text>
          </Pressable>
        </>
      )}
    </View>
  )
}

export default Reset
