import { View, Text, TextInput, Pressable } from 'react-native'
import React from 'react'
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser'

import styles from './login.style'
import defaultStyles from '@/constants/Styles'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'

const Page = () => {
  useWarmUpBrowser()

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
        <Pressable style={styles.btnOutline}>
          <Ionicons
            name='md-logo-apple'
            size={24}
            style={defaultStyles.btnIcon}
          />
          <Text style={styles.btnOutlineText}>Continue with Apple</Text>
        </Pressable>
        <Pressable style={styles.btnOutline}>
          <Ionicons
            name='md-logo-google'
            size={24}
            style={defaultStyles.btnIcon}
          />
          <Text style={styles.btnOutlineText}>Continue with Google</Text>
        </Pressable>
        <Pressable style={styles.btnOutline}>
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
