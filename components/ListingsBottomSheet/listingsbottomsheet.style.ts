import Colors from '@/constants/Colors'
import { Fonts } from '@/types'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  indicator: {
    backgroundColor: Colors.grey,
  },
  absolutBtn: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: Colors.dark,
    padding: 16,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    gap: 8,
  },
  btnText: {
    fontFamily: Fonts.monSb,
    color: '#fff',
  },
  sheetContainer: {
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
})

export default styles
