import { Text, View, StyleSheet } from 'react-native'
import React from 'react'
import { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import MapView from 'react-native-map-clustering'
import { ListingElem, ListingsMapProps } from '@/types'
import { useRouter } from 'expo-router'

import defaultStyles from '@/constants/Styles'
import styles from './listingsmap.style'

const INITIAL_REGION = {
  latitude: 48.85,
  longitude: 2.28,
  latitudeDelta: 1,
  longitudeDelta: 1,
}

const ListingsMap = ({ listings: items }: ListingsMapProps) => {
  const router = useRouter()

  const onMarkerSelected = (event: ListingElem) => {
    router.push(`/listing/${event.id}`)
  }

  const renderCluster = (cluster: any) => {
    const { id, geometry, onPress, properties } = cluster
    const points = properties.point_count

    return (
      <Marker
        key={`cluster-${id}`}
        onPress={onPress}
        coordinate={{
          latitude: geometry.coordinates[1],
          longitude: geometry.coordinates[0],
        }}
      >
        <View style={[styles.marker, styles.markerCluster]}>
          <Text style={styles.markerClusterText}>{points}</Text>
        </View>
      </Marker>
    )
  }
  return (
    <View style={defaultStyles.container}>
      <MapView
        animationEnabled={false}
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        showsMyLocationButton
        initialRegion={INITIAL_REGION}
        renderCluster={renderCluster}
      >
        {items.map((item) => (
          <Marker
            key={item.id}
            onPress={() => onMarkerSelected(item)}
            coordinate={{
              latitude: item.geolocation.lat,
              longitude: item.geolocation.lon,
            }}
          >
            <View style={styles.marker}>
              <Text style={styles.markerText}>€ {item.price}</Text>
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  )
}

export default ListingsMap
