import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 15,
  },
  welcomeContainer: {
    alignItems: 'left',
    marginTop: 20,
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 50,
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Bold',
  },
  gridContainer: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
  square: {
    width: 160,
    height: 160,
    margin: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
  squareContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  squareText: {
    paddingTop: 15,
    paddingLeft: 12,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 15,
    textAlign: 'left',
  },
  squareIconWrapperResources: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderRadius: 10,
    bottom: 20,
    right: 20,
    borderColor: 'None',
    backgroundColor: '#C8D4F3',
  },
  squareIconWrapperAppointment: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderRadius: 10,
    bottom: 20,
    right: 20,
    borderColor: 'None',
    backgroundColor: '#FFEAE0',
  },
  squareIconWrapperOther1: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderRadius: 10,
    bottom: 20,
    right: 20,
    borderColor: 'None',
    backgroundColor: '#CEC0C0',
  },
  squareIconWrapperOther2: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderRadius: 10,
    bottom: 20,
    right: 20,
    borderColor: 'None',
    backgroundColor: '#9FA7D8',
  },
  squareIcon: {
    //paddingBottom: 10,
    //paddingRight: 10,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
  },
  addButton: {
    //paddingTop: 10,
  },

  taskListContainer: {
    maxHeight: 300,
    padding: 10,
  },
  taskListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskListTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 30,
  },
  taskScrollView: {
    width: '100%',
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    paddingTop: 10,
  },
  taskTextContainer: {
    flex: 1,
    marginBottom: 10,
  },
  taskTitle: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 20,
  },
  taskDescription: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
  },
  taskMarkAsComplete: {
    marginLeft: 10,
    marginTop: 10,
  },
});

export default styles;