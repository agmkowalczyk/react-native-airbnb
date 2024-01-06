import {
  FlatList,
  Image,
  Pressable,
  View,
  ListRenderItem,
  Text,
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Listing, ListingsProps } from '@/types'
import { Link } from 'expo-router'

import styles from './listings.style'
import { Ionicons } from '@expo/vector-icons'
import defaultStyles from '@/constants/Styles'

const Listings = ({ listings: items, category }: ListingsProps) => {
  const [loading, setLoading] = useState(false)
  const listRef = useRef<FlatList>(null)

  useEffect(() => {
    console.log(1, category, items.length)
    setLoading(true)

    const timer = setTimeout(() => {
      setLoading(false)
    }, 200)

    return () => clearTimeout(timer)
  }, [category])

  const renderRow: ListRenderItem<Listing> = ({
    item: { properties: item },
  }) => (
    <Link href={`/listing/${item.id}`} asChild>
      <Pressable>
        <View style={styles.listing}>
          <Image source={{ uri: item.medium_url }} style={styles.image} />
          <Pressable style={styles.heart}>
            <Ionicons name='heart-outline' size={24} color='#000' />
          </Pressable>

          <View style={[styles.row, styles.spaceBetween]}>
            <Text style={styles.title}>{item.name}</Text>
            <View style={[styles.row, { gap: 4 }]}>
              <Ionicons name='star' size={16} />
              <Text style={defaultStyles.fontMonSb}>
                {item.review_scores_rating ?? 'N/A'}
              </Text>
            </View>
          </View>

          <Text style={defaultStyles.fontMonSb}>{item.room_type}</Text>

          <View style={[styles.row, { gap: 4 }]}>
            <Text style={defaultStyles.fontMonSb}>€ {item.price}</Text>
            <Text style={defaultStyles.fontMon}>night</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  )

  return (
    <View style={{ backgroundColor: 'lightblue' }}>
      <FlatList
        ref={listRef}
        data={loading ? [] : items}
        renderItem={renderRow}
      />
    </View>
  )
}

export default Listings
