import {
  FlatList,
  Image,
  Pressable,
  View,
  ListRenderItem,
  Text,
} from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ListingElem, ListingsProps } from '@/types'
import { Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated'
// import {
//   BottomSheetFlatList,
//   BottomSheetFlatListMethods,
// } from '@gorhom/bottom-sheet'
import defaultStyles from '@/constants/Styles'
import styles from './listings.style'

const Listings = ({ listings: items, category, refresh }: ListingsProps) => {
  const [loading, setLoading] = useState(false)
  // const listRef = useRef<BottomSheetFlatListMethods>(null)
  const listRef = useRef<FlatList>(null)

  useEffect(() => {
    if (refresh) {
      listRef.current?.scrollToOffset({ offset: 0, animated: true })
    }
  }, [refresh])

  useEffect(() => {
    setLoading(true)

    const timer = setTimeout(() => {
      setLoading(false)
    }, 200)

    return () => clearTimeout(timer)
  }, [category])

  const renderRow: ListRenderItem<ListingElem> = useCallback(
    ({ item }) => (
      <Link href={`/listing/${item.id}`} asChild>
        <Pressable>
          <Animated.View
            style={styles.listing}
            entering={FadeInRight}
            exiting={FadeOutLeft}
          >
            <Image source={{ uri: item.medium_url }} style={styles.image} />
            <Pressable style={styles.heart}>
              <Ionicons name='heart-outline' size={24} color='#000' />
            </Pressable>

            <View style={[defaultStyles.row, styles.spaceBetween]}>
              <Text style={styles.title}>{item.name}</Text>
              <View style={[defaultStyles.row, { gap: 4 }]}>
                <Ionicons name='star' size={16} />
                <Text style={defaultStyles.fontMonSb}>
                  {item.review_scores_rating ?? 'N/A'}
                </Text>
              </View>
            </View>

            <Text style={defaultStyles.fontMonSb}>{item.room_type}</Text>

            <View style={[defaultStyles.row, { gap: 4 }]}>
              <Text style={defaultStyles.fontMonSb}>€ {item.price}</Text>
              <Text style={defaultStyles.fontMon}>night</Text>
            </View>
          </Animated.View>
        </Pressable>
      </Link>
    ),
    []
  )

  return (
    <View>
      {/* <BottomSheetFlatList */}
      <FlatList
        ref={listRef}
        data={loading ? [] : items}
        renderItem={renderRow}
        ListHeaderComponent={
          <Text style={styles.info}>{items.length} homes</Text>
        }
      />
    </View>
  )
}

export default Listings
