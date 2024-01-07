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
  row: {
    flexDirection: 'row',
  },
  inputField: {
    height: 44,
    borderWidth: 1,
    borderColor: '#ababab',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
    color: '#000',
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
  closeModalBtn: {
    borderColor: Colors.grey,
    borderRadius: 20,
    borderWidth: 1,
    padding: 4,
  },
  pressed: {
    opacity: 0.5,
  },
})

export default defaultStyles

export const profileStyles = StyleSheet.create({
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
    height: 50,
  },
})

export const bookingStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 18,
    fontFamily: Fonts.monSb,
    textDecorationLine: 'underline',
  },
  previewText: {
    fontFamily: Fonts.monSb,
    fontSize: 14,
    color: Colors.grey,
  },
  previewDate: {
    fontFamily: Fonts.monSb,
    fontSize: 14,
    color: Colors.grey,
  },
  cardPreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    margin: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    gap: 20,
  },
  cardHeader: {
    fontFamily: Fonts.monB,
    fontSize: 24,
    padding: 20,
  },
  cardBody: {
    paddingHorizontal: 20,
  },
  searchSection: {
    height: 50,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ababab',
    borderRadius: 8,
    backgroundColor: '#fff',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  inputField: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  searchIcon: {
    padding: 10,
  },
  place: {
    width: 120,
    height: 120,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'lightgrey',
  },
  selectedPlace: {
    borderColor: Colors.grey,
  },
  placeText: {
    fontFamily: Fonts.mon,
    paddingTop: 6,
  },
  placeTextActive: {
    fontFamily: Fonts.monSb,
  },
  guestItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  itemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.grey,
  },
  controlsContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlTitle: {
    fontFamily: Fonts.monSb,
    fontSize: 14,
  },
  controlText: {
    fontFamily: Fonts.mon,
    fontSize: 14,
    color: Colors.grey,
  },
})
