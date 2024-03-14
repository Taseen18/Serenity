import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF', // Assuming a dark theme based on your CSS
        paddingVertical: 100,
        paddingHorizontal: '20%',
    },
    title: {
        fontSize: 20, // Adjusted from 800% to an absolute size for React Native
        color: '#123', // Set text color to white
    },
    wrapper: {
        marginTop: '2%',
        width: 400,
        height: 440,
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent (no backdrop-filter in React Native)
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 30,
        elevation: 20, // For Android shadow
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginContainer: {
        width: '100%',
        padding: 40,
    },
    heading: {
        fontSize: 24,
        color: '#FFF', // Set text color to white
        textAlign: 'center',
    },
    inputBox: {
        width: '100%',
        height: 50,
        borderBottomWidth: 2,
        borderBottomColor: '#000',
        marginVertical: 30,
    },
    input: {
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        color: '#000',
        fontWeight: '600',
        fontSize: 16,
    },
    button: {
        width: '100%',
        height: 45,
        backgroundColor: '#FFF',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'blue', // Assuming you want the text color to be black on a white button
    },
});
