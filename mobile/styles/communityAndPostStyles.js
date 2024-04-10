import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    community :{
        flex: 1,
        justifyContent: 'flex-start',
        color: 'black',
    },

    communityTitle : {
        margin: 'auto',
        fontSize: 20,
        color: 'black',
        marginTop: 100,
        justifyContent: 'center',
    },

    addPostButton:{
        borderRadius: 40,
        backgroundColor: '#A82D2D',
        width: 326,
        height: 65,
        justifyContent: 'center',
    },

    addPostButtonText: {
        fontFamily: 'Montserrat-SemiBold',
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
        borderRadius: 37,
        backgroundColor: 'white',
        width: '90%',
        height: 95,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent:'space-between',
        marginLeft: 20,       
    },

    frontPostTitle:{
        fontSize: 35,
        fontFamily: 'Montserrat-Medium',
        marginLeft:50,   
    },

    frontPostedBy:{
        marginRight:50,
        fontSize: 15,
        fontFamily: 'Montserrat-Regular',
    },

    openPost:{
        width: '100%',
        borderRadius: 23,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        height: '67%',
        backgroundColor: '#D9D9D9',
        top: '25%',
    },

    postTitle:{
        
    },

    postContent:{

    },

    postedBy:{
        
    },
    PostDate:{

    },
    AddCommentButton:{

    },
    addCommmentWrapper:{

    }
  });
  
  export default styles;