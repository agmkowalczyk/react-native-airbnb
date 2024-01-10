import Colors from '@/constants/Colors'
import { Fonts } from '@/types'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 26,
  },
  separatorView: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 30,
  },
  separator: {
    fontFamily: Fonts.monSb,
    color: Colors.grey,
  },
  btnOutline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.grey,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  btnOutlineDisabled: {
    opacity: 0.5,
  },
  btnOutlineText: {
    color: '#000',
    fontSize: 16,
    fontFamily: Fonts.monSb,
  },
  linkContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  link: {
    padding: 5,
  },
})

export default styles
