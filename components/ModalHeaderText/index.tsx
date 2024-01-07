import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'

import styles from './modalheadertext.style'
import defaultStyles from '@/constants/Styles'

const ModalHeaderText = () => {
  const [active, setActive] = useState(0)
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => setActive(0)}
        style={({ pressed }) => pressed && defaultStyles.pressed}
      >
        <Text style={[styles.text, active === 0 && styles.textActive]}>
          Stays
        </Text>
      </Pressable>
      <Pressable
        onPress={() => setActive(1)}
        style={({ pressed }) => pressed && defaultStyles.pressed}
      >
        <Text style={[styles.text, active === 1 && styles.textActive]}>
          Experiences
        </Text>
      </Pressable>
    </View>
  )
}

export default ModalHeaderText
