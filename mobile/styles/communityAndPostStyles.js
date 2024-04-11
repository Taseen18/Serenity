import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    community :{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
    },

    communityTitle : {
        margin: 'auto',
        fontSize: 35,
        color: 'black',
        justifyContent: 'center',
        fontFamily: 'Montserrat-Bold',

    },

    addPostButton:{
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

    addPostButtonText: {
        fontFamily: 'Montserrat-Bold',
        color: '#fff'
        
    },
    addPostWrapper:{
        top:'32%',
        borderRadius: 18,
        backgroundColor: '#D9D9D9',
        width: '90%',
        height: '45%',
        padding:10,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent:'space-between',
        marginLeft: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 5,
        overflow: 'auto',
        marginBottom:30,

    },
    postsWrapper:{
        display:'flex',
        flexDirection: 'column',
        width: 200,
        height: 400,
        width: '100%',
        borderRadius: 23,
        backgroundColor: '#D9D9D9',
        //margin: 'auto',
        justifyContent: 'center',
    },

    post:{
        
    },

    PostHolder:{
        marginTop:10,
        borderRadius: 18,
        backgroundColor: 'white',
        width: '90%',
        height: 95,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent:'space-between',
        marginLeft: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 5,
        overflow: 'hidden',
    },

    frontPostTitle:{
        fontSize: 35,
        fontFamily: 'Montserrat-Medium',
        marginLeft:5,
        width:'50%',
        overflow: 'hidden',
    },

    frontPostedBy:{
        width:'50%',
        overflow: 'hidden',
        fontSize: 15,
        fontFamily: 'Montserrat-Regular',
    },

    openPost:{
        width: '100%',
        borderRadius: 23,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        height: '75%',
        backgroundColor: '#D9D9D9',
        top: '18%',
       },

    PostHolder2:{
        marginTop:10,
        borderRadius: 18,
        backgroundColor: 'white',
        width: '90%',
        height: 95,
        height:'auto',
        maxHeight:140,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent:'space-between',
        marginLeft: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 5,
        overflow: 'hidden',
    },
    postInfo:{
        display:'flex',
        flexDirection:'row',
        marginTop:5
        
    },
    postTitle:{
        fontSize:20,
        fontFamily: 'Montserrat-Bold',
    },

    postContent:{
        fontFamily: 'Montserrat-Regular',
        fontSize:12,
        marginTop:5,
    },

    postedBy:{
        fontFamily: 'Montserrat-SemiBold',
        fontSize:10,
    },
    PostDate:{
        fontFamily: 'Montserrat-SemiBold',
        marginLeft:5,
        fontSize:10,
    },
    CommentSection:{
        marginTop:10,
        borderRadius: 18,
        backgroundColor: 'white',
        width: '90%',
        height: '55%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        marginLeft: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 5,
        overflow: 'scroll',
        marginBottom:30,
    },
    CommentInfo:{
        display:'flex',
        flexDirection:'row',
    },
    addCommmentWrapper:{
        top:'32%',
        borderRadius: 18,
        backgroundColor: '#D9D9D9',
        width: '90%',
        height: '45%',
        padding:10,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent:'space-between',
        marginLeft: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 5,
        overflow: 'auto',
        marginBottom:30,
    },
    CommentHolder:{
        
        borderRadius:5,
        marginTop:10,

    },
    Comment:{
        marginTop:5,
        borderRadius:5,
        backgroundColor:'#D9D9D9',
        paddingLeft:10,
        paddingRight:10,
    }

  });
  
  export default styles;