import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
      fontSize: 48, // Adjust the size as needed
      color: 'white', // Choose a color that stands out against your background
      fontWeight: 'bold',
      position: 'absolute',
      top: 100, // Adjust the distance from the top as needed
      textShadowColor: 'rgba(0, 0, 0, 0.75)', // Optional: Adds a shadow for better readability
      textShadowOffset: { width: -1, height: 1 },
      textShadowRadius: 10
    },
    overlay: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.45)', // Add a slight background overlay to ensure text is readable
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        padding: 10,
        width: '80%',
        backgroundColor: 'white',
    },
    baseText: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
    }
});

export default styles;