import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  welcomeContainer: {
    alignItems: 'left',
  },
  welcomeText: {
    fontSize: 50,
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Bold',
    marginTop: 20,
    paddingLeft: 20,
    paddingTop: 100,
  },
  gridContainer: {
    alignItems: 'center',
    width: '100%',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '96%',
  },
  square: {
    width: 150,
    height: 150,
    backgroundColor: '#007bff',
    margin: 10,
    borderRadius: 20,
  },
  squareContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  squareText: {
    paddingTop: 10,
    paddingLeft: 10,
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'left',
  },
  squareIconWrapper: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 5,
    position: 'absolute',
  },
  squareIcon: {
    //paddingBottom: 10,
    //paddingRight: 10,
  },
  taskListContainer: {
    maxHeight: 200,
    padding: 20,
  },
  taskListTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 30,
  },
  taskScrollView: {
    width: '100%',
  },
  taskItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  taskTitle: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 20,
  },
  taskDescription: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
  },
});

export default styles;