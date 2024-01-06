import { Fonts } from '@/types'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    position: 'relative',
    gap: 10,
    marginVertical: 16,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  heart: {
    position: 'absolute',
    right: 30,
    top: 30,
  },
  row: {
    flexDirection: 'row',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.monSb,
  },
  info: {
    textAlign: 'center',
    fontFamily: Fonts.monSb,
    fontSize: 16,
    marginTop: 4,
  },
})

export default styles
