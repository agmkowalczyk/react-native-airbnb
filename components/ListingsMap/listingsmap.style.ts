import { Fonts } from '@/types'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  marker: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    padding: 6,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
  markerText: {
    fontSize: 14,
    fontFamily: Fonts.monSb,
  },
  markerCluster: {
    backgroundColor: '#cdeac7',
    padding: 4,
    borderRadius: 100,
    borderColor: '#eef8ec',
    borderWidth: 5,
    width: 40,
    height: 40,
  },
  markerClusterText: {
    color: '#000',
    textAlign: 'center',
    fontFamily: Fonts.monSb,
  },
})

export default styles
