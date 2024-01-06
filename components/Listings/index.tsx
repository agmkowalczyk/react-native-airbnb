import { Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { ListingsProps } from '@/types'

const Listings = ({ listings, category }: ListingsProps) => {
  useEffect(() => {
    console.log(1, category, listings.length)
  }, [category])

  return (
    <View>
      <Text>Listings</Text>
    </View>
  )
}

export default Listings
