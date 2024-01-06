import { View } from 'react-native'
import React, { useMemo, useState } from 'react'
import { Stack } from 'expo-router'
import ExploreHeader from '@/components/ExploreHeader'
import ListingsMap from '@/components/ListingsMap'
import ListingsBottomSheet from '@/components/ListingsBottomSheet'
import categories from '@/constants/categories'
import { ListingElem } from '@/types'

import listingsData from '@/assets/data/airbnb-listings.json'

const Page = () => {
  const [category, setCategory] = useState(categories[0].name)
  const items = useMemo(() => listingsData as ListingElem[], [])

  const onDataChanged = (category: string) => {
    setCategory(category)
  }

  return (
    <View style={{ flex: 1, marginTop: 130 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      />
      <ListingsMap listings={items} />
      <ListingsBottomSheet listings={items} category={category} refresh={0} />
    </View>
  )
}

export default Page
