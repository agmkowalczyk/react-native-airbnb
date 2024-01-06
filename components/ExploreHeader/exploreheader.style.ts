import { Fonts } from '@/types'
import Colors from '@/constants/Colors'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    backgroundColor: '#fff',
    height: 130,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 16,
    gap: 10,
  },
  filterBtn: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 24,
  },
  searchBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderColor: '#c2c2c2',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 30,
    flex: 1,
    padding: 14,
    backgroundColor: '#fff',

    elevation: 2,
    shadowColor: '#000',
    shadowRadius: 8,
    shadowOpacity: 0.12,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  searchBtnText: {
    fontFamily: Fonts.mon,
    color: Colors.grey,
  },
  searchBtnTextBold: {
    fontFamily: Fonts.monSb,
  },
  categoryBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8,
  },
  categoryBtnActive: {
    borderBottomColor: '#000',
    borderBottomWidth: 2,
  },
  categoryIcon: {
    color: '#a0a0a0',
  },
  categoryIconActive: {
    color: '#000',
  },
  categoryText: {
    fontSize: 14,
    fontFamily: Fonts.monSb,
    color: '#a0a0a0',
  },
  categoryTextActive: {
    color: '#000',
  },
})

export default styles
