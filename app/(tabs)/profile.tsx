import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  Image,
  StatusBar,
  TextInput,
  Alert,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { Fonts } from '@/types'

import defaultStyles, { profileStyles as styles } from '@/constants/Styles'
import Colors from '@/constants/Colors'

const Button = ({ title, onPress }: { title: string; onPress: () => void }) => (
  <Pressable
    onPress={onPress}
    style={{ backgroundColor: '#fff', alignItems: 'center' }}
  >
    <Text style={{ fontSize: 16 }}>{title}</Text>
  </Pressable>
)

const Page = () => {
  const { signOut, isSignedIn } = useAuth()
  const { user } = useUser()
  const [firstName, setFirstName] = useState(user?.firstName)
  const [lastName, setLastName] = useState(user?.lastName)
  const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress)
  const [edit, setEdit] = useState(false)

  const router = useRouter()

  useEffect(() => {
    if (!user) return

    setFirstName(user.firstName)
    setLastName(user.lastName)
    setEmail(user.emailAddresses[0].emailAddress)
  }, [user])

  const onSaveUser = async () => {
    try {
      if (!firstName || !lastName) return

      await user?.update({
        firstName,
        lastName,
      })
    } catch (err: any) {
      Alert.alert(err.errors[0].message)
    } finally {
      setEdit(false)
    }
  }

  const onCaptureImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.75,
      base64: true,
    })

    if (!result.canceled) {
      const base64 = `data:image/png;base64,${result.assets[0].base64}`
      user?.setProfileImage({
        file: base64,
      })
    }
  }

  return (
    <SafeAreaView
      style={[
        defaultStyles.container,
        { paddingTop: (StatusBar.currentHeight || 0) + 10 },
      ]}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Profile</Text>
        <Ionicons name='notifications-outline' size={26} />
      </View>

      {user && (
        <View style={styles.card}>
          <Pressable onPress={onCaptureImage}>
            <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
          </Pressable>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            {edit ? (
              <View style={styles.editRow}>
                <TextInput
                  placeholder='First name'
                  value={firstName || ''}
                  onChangeText={setFirstName}
                  style={[defaultStyles.inputField, { width: 100 }]}
                />
                <TextInput
                  placeholder='Lastname'
                  value={lastName || ''}
                  onChangeText={setLastName}
                  style={[defaultStyles.inputField, { width: 100 }]}
                />
                <Pressable onPress={onSaveUser}>
                  <Ionicons
                    name='checkmark-outline'
                    size={24}
                    color={Colors.dark}
                  />
                </Pressable>
              </View>
            ) : (
              <View style={styles.editRow}>
                <Text style={{ fontFamily: Fonts.monB, fontSize: 22 }}>
                  {firstName} {lastName}
                </Text>
                <Pressable onPress={() => setEdit(true)}>
                  <Ionicons
                    name='create-outline'
                    size={24}
                    color={Colors.dark}
                  />
                </Pressable>
              </View>
            )}
          </View>
          <Text>{email}</Text>
          <Text>Since {user?.createdAt?.toLocaleDateString()}</Text>
        </View>
      )}
      {isSignedIn && <Button title='Log out' onPress={signOut} />}
      {!isSignedIn && (
        <Button title='Log in' onPress={() => router.push('/(modals)/login')} />
      )}
    </SafeAreaView>
  )
}

export default Page
