import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Dimensions,
  Share,
} from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import Animated, {
  SlideInDown,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated'
import { Ionicons } from '@expo/vector-icons'
import listingsData from '@/assets/data/airbnb-listings.json'
import { ListingElem } from '@/types'

import defaultStyles from '@/constants/Styles'
import styles from './listing.style'

const { width } = Dimensions.get('window')
const IMG_HEIGHT = 300

const Page = () => {
  const navigation = useNavigation()
  const { id } = useLocalSearchParams<{ id: string }>()

  const item = (listingsData.features as ListingElem[]).find(
    (elem) => elem.properties.id === id
  )
  const { properties: prop } = item ?? {}

  const scrollRef = useAnimatedRef<Animated.ScrollView>()

  const scrollOffset = useScrollViewOffset(scrollRef)

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    }
  })

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1.5], [0, 1]),
    }
  }, [])

  const shareList = async () => {
    try {
      await Share.share({
        title: prop?.name,
        url: prop?.listing_url ?? '',
      })
    } catch (err) {
      console.log(err)
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerTransparent: true,

      headerBackground: () => (
        <Animated.View style={[headerAnimatedStyle, styles.header]} />
      ),
      headerRight: () => (
        <View style={styles.bar}>
          <Pressable style={styles.roundBtn} onPress={shareList}>
            <Ionicons name='share-outline' size={22} color={'#000'} />
          </Pressable>
          <Pressable style={styles.roundBtn}>
            <Ionicons name='heart-outline' size={22} color={'#000'} />
          </Pressable>
        </View>
      ),
      headerLeft: () => (
        <Pressable style={styles.roundBtn} onPress={() => navigation.goBack()}>
          <Ionicons name='chevron-back' size={24} color={'#000'} />
        </Pressable>
      ),
    })
  }, [])

  return (
    <View style={defaultStyles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        contentContainerStyle={{ paddingBottom: 100 }}
        scrollEventThrottle={16}
      >
        <Animated.Image
          source={{ uri: prop?.xl_picture_url }}
          style={[stylesImg.image, imageAnimatedStyle]}
        />

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{prop?.name}</Text>
          <Text style={styles.location}>
            {prop?.room_type} in {prop?.smart_location}
          </Text>
          <Text style={styles.rooms}>
            {prop?.guests_included} guests · {prop?.bedrooms} bedrooms ·{' '}
            {prop?.beds} bed · {prop?.bathrooms} bathrooms
          </Text>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            <Ionicons name='star' size={16} />
            <Text style={styles.ratings}>
              {prop?.review_scores_rating / 20} · {prop?.number_of_reviews}{' '}
              reviews
            </Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.hostView}>
            <Image
              source={{ uri: prop?.host_picture_url }}
              style={styles.host}
            />

            <View>
              <Text style={{ fontWeight: '500', fontSize: 16 }}>
                Hosted by {prop?.host_name}
              </Text>
              <Text>Host since {prop?.host_since}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.description}>{prop?.description}</Text>
        </View>
      </Animated.ScrollView>

      <Animated.View
        style={defaultStyles.footer}
        entering={SlideInDown.delay(200)}
      >
        <View style={styles.footerContainer}>
          <Pressable style={styles.footerText}>
            <Text style={styles.footerPrice}>€ {prop?.price}</Text>
            <Text>night</Text>
          </Pressable>

          <Pressable style={[defaultStyles.btn, styles.reserveBtn]}>
            <Text style={defaultStyles.btnText}>Reserve</Text>
          </Pressable>
        </View>
      </Animated.View>
    </View>
  )
}

const stylesImg = StyleSheet.create({
  image: {
    height: 300,
    width,
  },
})

export default Page
