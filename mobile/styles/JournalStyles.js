import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    JournalTitle : {
        margin: 'auto',
        fontSize: 35,
        color: 'black',
        justifyContent: 'center',
        fontFamily: 'Montserrat-Bold',

    },
    AddEntryButton:{
        borderRadius: 40,
        backgroundColor: '#0098EE',
        width: 326,
        height: 65,
        justifyContent: 'center',
        marginBottom: 20,
        marginTop:10,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    entryStyling:{
        marginTop:10,
        borderRadius: 18,
        backgroundColor: 'white',
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 5,
        overflow: 'hidden',
        textAlign: 'center',
        padding:20,
    },
    entryTitleStyle:{
        textAlign:'center',
        fontSize:20,

    }
})

export default styles;