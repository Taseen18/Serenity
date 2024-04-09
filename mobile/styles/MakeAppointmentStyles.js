import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },
  heading: {
    marginBottom: 50,
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 35,
    textAlign: 'left',
  },
  subtitle: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 25,
    textAlign: 'left',
  },
  input: {
    width: '100%',
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
  },
  mhpItem: {
    padding: 15,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
})

export default styles;