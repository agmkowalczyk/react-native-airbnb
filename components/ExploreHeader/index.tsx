import {
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { Link } from 'expo-router'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { ScrollView } from 'react-native-gesture-handler'
import * as Haptics from 'expo-haptics'

import styles from './exploreheader.style'
import categories from '@/constants/categories'

interface Props {
  onCategoryChanged: (category: string) => void
}

const ExploreHeader = ({ onCategoryChanged }: Props) => {
  const itemsRef = useRef<Array<TouchableOpacity>>([])
  const scrollRef = useRef<ScrollView>(null)
  const [activeIdx, setActiveIdx] = useState(0)

  const selectCategory = useCallback((idx: number) => {
    const selected = itemsRef.current[idx]
    setActiveIdx(idx)

    selected?.measure((x: number) => {
      scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true })
    })
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    onCategoryChanged(categories[idx].name)
  }, [])

  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        <View style={styles.actionRow}>
          <Link href='/(modals)/booking' asChild>
            <Pressable style={styles.searchBtn}>
              <Ionicons name='search' size={24} />
              <View>
                <Text style={styles.searchBtnTextBold}>Where to?</Text>
                <Text style={styles.searchBtnText}>Anywhere • Any week</Text>
              </View>
            </Pressable>
          </Link>
          <Pressable style={styles.filterBtn}>
            <Ionicons name='options-outline' size={24} />
          </Pressable>
        </View>

        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignContent: 'center',
            gap: 30,
            paddingHorizontal: 16,
          }}
        >
          {categories.map((item, idx) => (
            <TouchableOpacity
              key={item.name + idx}
              ref={(el: any) => (itemsRef.current[idx] = el)}
              style={[
                styles.categoryBtn,
                activeIdx === idx && styles.categoryBtnActive,
              ]}
              onPress={() => selectCategory(idx)}
            >
              <MaterialIcons
                name={item.icon as any}
                size={24}
                style={[
                  styles.categoryIcon,
                  activeIdx === idx && styles.categoryIconActive,
                ]}
              />
              <Text
                style={[
                  styles.categoryText,
                  activeIdx === idx && styles.categoryTextActive,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default ExploreHeader
