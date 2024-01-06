import { View, Text, Pressable } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'
import { ListingsProps } from '@/types'
import BottomSheet from '@gorhom/bottom-sheet'
import Listings from '@/components/Listings'

import styles from './listingsbottomsheet.style'
import { Ionicons } from '@expo/vector-icons'

const ListingsBottomSheet = (props: ListingsProps) => {
  const bottomSheetRef = useRef<BottomSheet>(null)
  const snapPoints = useMemo(() => ['10%', '100%'], [])
  const [refresh, setRefresh] = useState(0)

  const showMap = () => {
    bottomSheetRef.current?.collapse()
    setRefresh((refresh) => refresh + 1)
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      handleIndicatorStyle={styles.indicator}
      style={styles.sheetContainer}
    >
      <View style={{ flex: 1 }}>
        <Listings {...props} refresh={refresh} />

        <View style={styles.absolutBtn}>
          <Pressable onPress={showMap} style={styles.btn}>
            <Text style={styles.btnText}>Map</Text>
            <Ionicons name='map' size={20} color='#fff' />
          </Pressable>
        </View>
      </View>
    </BottomSheet>
  )
}

export default ListingsBottomSheet
