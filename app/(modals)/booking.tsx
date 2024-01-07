import {
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  Image,
} from 'react-native'
import React, { useCallback, useState } from 'react'
import { BlurView } from 'expo-blur'
import Animated, { FadeIn, FadeOut, SlideInDown } from 'react-native-reanimated'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
// @ts-ignore
import DatePicker from 'react-native-modern-datepicker'

import places from '@/assets/places'
import guestsGroups from '@/constants/guestGroups'

import defaultStyles, { bookingStyles as styles } from '@/constants/Styles'
import Colors from '@/constants/Colors'
import { Fonts, GuestGroup } from '@/types'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const Card = ({
  openCard,
  setOpenCard,
  idx,
  textLeft,
  textRight,
  title,
  children,
}: {
  openCard: number
  setOpenCard: (arg0: number) => void
  idx: number
  textLeft: string
  textRight: string
  title: string
  children: React.ReactNode
}) => (
  <View style={styles.card}>
    {openCard !== idx ? (
      <AnimatedPressable
        onPress={() => setOpenCard(idx)}
        style={styles.cardPreview}
        entering={FadeIn.duration(200)}
        exiting={FadeOut.duration(200)}
      >
        <Text style={styles.previewText}>{textLeft}</Text>
        <Text style={styles.previewDate}>{textRight}</Text>
      </AnimatedPressable>
    ) : (
      <>
        <Animated.Text
          entering={FadeIn.duration(400)}
          style={styles.cardHeader}
        >
          {title}
        </Animated.Text>
        {children}
      </>
    )}
  </View>
)
const Page = () => {
  const router = useRouter()
  const today = new Date().toISOString().substring(0, 10)

  const [openCard, setOpenCard] = useState(0)
  const [selectedPlace, setSelectedPlace] = useState(0)

  const [groups, setGroups] = useState<GuestGroup[]>(
    JSON.parse(JSON.stringify(guestsGroups))
  )

  const onClearAll = useCallback(() => {
    setSelectedPlace(0)
    setOpenCard(0)
    setGroups(JSON.parse(JSON.stringify(guestsGroups)))
  }, [])

  return (
    <BlurView intensity={70} tint='light' style={styles.container}>
      <Card
        openCard={openCard}
        setOpenCard={setOpenCard}
        idx={0}
        textLeft='Where'
        textRight={"I'm flexible"}
        title='Where to?'
      >
        <>
          <Animated.View style={styles.cardBody}>
            <View style={styles.searchSection}>
              <Ionicons name='ios-search' size={20} style={styles.searchIcon} />
              <TextInput
                style={styles.inputField}
                placeholder='Search destination'
                placeholderTextColor={Colors.grey}
              />
            </View>
          </Animated.View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: 15,
              paddingLeft: 20,
              marginBottom: 30,
            }}
          >
            {places.map((item, idx) => (
              <Pressable
                key={`place-${idx}`}
                onPress={() => setSelectedPlace(idx)}
                style={({ pressed }) => pressed && defaultStyles.pressed}
              >
                <Image
                  source={item.img}
                  style={[
                    styles.place,
                    selectedPlace === idx && styles.selectedPlace,
                  ]}
                />
                <Text
                  style={[
                    styles.placeText,
                    selectedPlace === idx && styles.placeTextActive,
                  ]}
                >
                  {item.title}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </>
      </Card>
      <Card
        openCard={openCard}
        setOpenCard={setOpenCard}
        idx={1}
        textLeft='When'
        textRight={'Any week'}
        title={"When's your trip?"}
      >
        <Animated.View style={styles.cardBody}>
          <DatePicker
            options={{
              defaultFont: Fonts.mon,
              headerFont: Fonts.monSb,
              borderColor: 'transparent',
              mainColor: Colors.primary,
            }}
            current={today}
            selected={today}
            mode='calendar'
          />
        </Animated.View>
      </Card>
      <Card
        openCard={openCard}
        setOpenCard={setOpenCard}
        idx={2}
        textLeft='Who'
        textRight={'Add guest'}
        title={"Who's coming?"}
      >
        <Animated.View style={styles.cardBody}>
          {groups.map((item, idx) => (
            <View
              key={`group-${idx}`}
              style={[
                styles.guestItem,
                idx < groups.length - 1 && styles.itemBorder,
              ]}
            >
              <View>
                <Text style={styles.controlTitle}>{item.name}</Text>
                <Text style={styles.controlText}>{item.text}</Text>
              </View>
              <View style={styles.controlsContainer}>
                <Pressable
                  onPress={() =>
                    setGroups((state) => {
                      if (state[idx].count > 0) {
                        state[idx].count = state[idx].count - 1
                      }
                      return [...state]
                    })
                  }
                >
                  <Ionicons
                    name='remove-circle-outline'
                    size={26}
                    color={groups[idx].count > 0 ? Colors.grey : '#cdcdcd'}
                  ></Ionicons>
                </Pressable>
                <Text>{item.count}</Text>
                <Pressable
                  onPress={() =>
                    setGroups((state) => {
                      state[idx].count = state[idx].count + 1
                      return [...state]
                    })
                  }
                >
                  <Ionicons
                    name='add-circle-outline'
                    size={26}
                    color={Colors.grey}
                  ></Ionicons>
                </Pressable>
              </View>
            </View>
          ))}
        </Animated.View>
      </Card>

      <Animated.View
        style={defaultStyles.footer}
        entering={SlideInDown.delay(200)}
      >
        <View style={styles.footerContainer}>
          <Pressable
            onPress={onClearAll}
            style={({ pressed }) => [pressed && defaultStyles.pressed]}
          >
            <Text style={styles.footerText}>Clear all</Text>
          </Pressable>
          <Pressable
            onPress={() => router.back()}
            style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 50 }]}
          >
            <Ionicons
              name='search-outline'
              size={24}
              color='#fff'
              style={defaultStyles.btnIcon}
            />
            <Text style={defaultStyles.btnText}>Search</Text>
          </Pressable>
        </View>
      </Animated.View>
    </BlurView>
  )
}

export default Page
