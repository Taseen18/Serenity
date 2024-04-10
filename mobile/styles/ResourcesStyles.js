import { CurrentRenderContext } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // A light background color
    marginTop:10,
  },
  headerText: {
    fontSize: 50,
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Bold',
    paddingLeft: 20,
  },
  grid: {
    marginTop: 30,
    flexDirection: 'column',
    alignContent:'center',
    flexWrap: 'wrap',
    justifyContent:'center',
  },
  card: {
    width: '48%',
    height: 200,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden', 
    elevation: 4, 
  },
  cardImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end', // Aligns the text to the bottom
  },
  cardText: {
    textAlign:'center',
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
    padding: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
});

export default styles;