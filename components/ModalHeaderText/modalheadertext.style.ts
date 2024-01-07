import Colors from '@/constants/Colors'
import { Fonts } from '@/types'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  text: {
    fontFamily: Fonts.monSb,
    fontSize: 18,
    color: Colors.grey,
  },
  textActive: {
    color: '#000',
    textDecorationLine: 'underline',
  },
})

export default styles
