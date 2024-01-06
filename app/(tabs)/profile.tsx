import {
  View,
  Text,
  Button,
  SafeAreaView,
  Pressable,
  Image,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

import defaultStyles, { profilestyles as styles } from '@/constants/Styles'
import Color from '@/constants/Colors'
import { Fonts } from '@/types'
import Colors from '@/constants/Colors'

const Page = () => {
  const { signOut, isSignedIn } = useAuth()
  const { user } = useUser()
  const [firstName, setFirstName] = useState(user?.firstName)
  const [lastName, setLastName] = useState(user?.lastName)
  const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress)
  const [edit, setEdit] = useState(false)

  useEffect(() => {
    if (!user) return

    setFirstName(user.firstName)
    setLastName(user.lastName)
    setEmail(user.emailAddresses[0].emailAddress)
  }, [user])

  const onSaveUser = async () => {
    // try {
    //   await user?.update({
    //     firstName: firstName!,
    //     lastName: lastName!,
    //   })
    // } catch (error) {
    //   console.log(error)
    // } finally {
    setEdit(false)
    // }
  }

  const onCaptureImage = async () => {}

  return (
    <SafeAreaView style={defaultStyles.container}>
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
      {isSignedIn && (
        <Button title='Log out' onPress={() => signOut()} color={Color.dark} />
      )}
      {!isSignedIn && (
        <Link href='/(modals)/login' asChild>
          <Button title='Log in' color={Color.dark} />
        </Link>
      )}
    </SafeAreaView>
  )
}

export default Page
