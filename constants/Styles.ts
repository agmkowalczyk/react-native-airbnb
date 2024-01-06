import { StyleSheet } from 'react-native'
import Colors from '@/constants/Colors'
import { Fonts } from '@/types'

const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fontMon: {
    fontFamily: Fonts.mon,
  },
  fontMonB: {
    fontFamily: Fonts.monB,
  },
  fontMonSb: {
    fontFamily: Fonts.monSb,
  },
  inputField: {
    height: 44,
    borderWidth: 1,
    borderColor: '#ababab',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
    color: 'red',
  },
  btn: {
    backgroundColor: Colors.primary,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: Fonts.monB,
  },
  btnIcon: {
    position: 'absolute',
    left: 16,
  },
  footer: {
    position: 'absolute',
    height: 100,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopColor: Colors.grey,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  hairline: {
    borderTopColor: '#000',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
})

export default defaultStyles

export const profilestyles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    padding: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    fontFamily: Fonts.monB,
    fontSize: 24,
  },
  card: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    marginHorizontal: 24,
    marginTop: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    alignItems: 'center',
    gap: 14,
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
  editRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
})
