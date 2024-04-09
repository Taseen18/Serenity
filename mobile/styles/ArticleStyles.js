import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
      },
      header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 20,
      },
      subheader: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 20,
        marginBottom: 10,
        color: '#333333',
      },
      paragraph: {
        fontSize: 18,
        lineHeight: 26,
        color: '#34495e',
        marginBottom: 16,
      },
      listItem: {
        fontSize: 18,
        lineHeight: 26,
        color: '#34495e',
        marginBottom: 8,
        paddingLeft: 10,
      },
      bold: {
        fontWeight: 'bold',
      },
      link: {
        color: '#2980b9',
        textDecorationLine: 'underline',
        marginBottom: 8,
      },
})

export default styles;