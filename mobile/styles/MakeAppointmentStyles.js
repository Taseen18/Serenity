import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
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
  date: {
    marginBottom: 30,
  },
  reason: {
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
  },
  mhp: {
    alignItems: 'center',
  },
  mhpItem: {
    padding: 15,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  makeAppointmentSubmit: {

  }
})

export default styles;