import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TextInput, 
  Button, TouchableOpacity, ScrollView, Platform, ImageBackground, Modal } from 'react-native';
import styles from '../styles/ResourcesStyles';
import ExerciseArticle from './ExerciseArticle';
import { MaterialIcons, FontAwesome, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import exerciseImage from '/Users/nyram/Documents/GitHub/Serenity/mobile/assets/images/exercise.webp';
import dietImage from '/Users/nyram/Documents/GitHub/Serenity/mobile/assets/images/diet.jpeg';
import mhImage from '/Users/nyram/Documents/GitHub/Serenity/mobile/assets/images/brain.png';
// Assuming you have a navigation setup with React Navigation


const Resources = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Resources</Text>
      </View>
      <View style={styles.gridContainer}>
        <View style={styles.grid}>
          <TouchableOpacity
            style={styles.square}
            onPress={() => navigation.navigate('ExerciseArticle')}
          >
            <ImageBackground
              source={require('../assets/images/exercise.webp')}
              resizeMode='cover'
              style={{ flex: 1 }}
            >
              <View style={{flex: 1, justifyContent: 'space-between'}}>
                <Text style={styles.squareText}>Exercise</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.square}
            onPress={() => navigation.navigate('Diet')}
          >
            <ImageBackground
              source={require('../assets/images/diet.jpeg')}
              resizeMode='cover'
              style={{ flex: 1 }}
            >
              <View style={{flex: 1, justifyContent: 'space-between'}}>
                <Text style={styles.squareText}>Diet</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.square}
            onPress={() => navigation.navigate('MentalHealth')}
          >
            <ImageBackground
              source={require('../assets/images/brain.png')}
              resizeMode='cover'
              style={{ flex: 1 }}
            >
              <View style={{flex: 1, justifyContent: 'space-between'}}>
                <Text style={styles.squareText}>Mental Health</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>
    </View>

    // <View style={styles.gridContainer}>
    //     <View style={styles.grid}>
    //       <TouchableOpacity
    //         style={styles.square}
    //         onPress={() => navigateToScreen('Screen1')}
    //       >
    //         <ImageBackground
    //           source={require('../assets/images/squares/tropical.png')}
    //           resizeMode='cover'
    //           style={{ flex: 1 }}
    //         >
    //           <View style={{flex: 1, justifyContent: 'space-between'}}>
    //             <Text style={styles.squareText}>Community</Text>
    //             <View style={styles.squareIconWrapperCommunity}>
    //               <FontAwesome name="users" size={24} color="black" style={styles.squareIcon} />
    //             </View>
    //           </View>
    //         </ImageBackground>
    //       </TouchableOpacity>
    //       <TouchableOpacity
    //         style={styles.square}
    //         onPress={() => navigateToScreen('Screen2')}
    //       >
    //         <ImageBackground
    //           source={require('../assets/images/squares/sandy.png')}
    //           resizeMode='cover'
    //           style={{ flex: 1 }}
    //         >
    //           <View style={{flex: 1, justifyContent: 'space-between'}}>
    //             <Text style={styles.squareText}>Make Appointment</Text>
    //             <View style={styles.squareIconWrapperAppointment}>
    //               <AntDesign name="clockcircle" size={24} color="black" style={styles.squareIcon} />
    //             </View>
    //           </View>
    //         </ImageBackground>
    //       </TouchableOpacity>
    //       <TouchableOpacity
    //         style={styles.square}
    //         onPress={() => navigateToScreen('Screen3')}
    //       >
    //         <ImageBackground
    //           source={require('../assets/images/squares/mountain.png')}
    //           resizeMode='cover'
    //           style={{ flex: 1 }}
    //         >
    //           <View style={{flex: 1, justifyContent: 'space-between'}}>
    //             <Text style={styles.squareText}>Other</Text>
    //             <View style={styles.squareIconWrapperOther1}>
    //               <FontAwesome name="heart" size={24} color="black" style={styles.squareIcon} />
    //             </View>
    //           </View>
    //         </ImageBackground>
    //       </TouchableOpacity>
    //       <TouchableOpacity
    //         style={styles.square}
    //         onPress={() => navigateToScreen('Screen4')}
    //       >
    //         <ImageBackground
    //           source={require('../assets/images/squares/woods.png')}
    //           resizeMode='cover'
    //           style={{ flex: 1 }}
    //         >
    //           <View style={{flex: 1, justifyContent: 'space-between'}}>
    //             <Text style={styles.squareText}>Journal</Text>
    //             <View style={styles.squareIconWrapperOther2}>
    //               <FontAwesome5 name="book-open" size={24} color="black" style={styles.squareIcon} />
    //             </View>
    //           </View>
    //         </ImageBackground>
    //       </TouchableOpacity>
    //     </View>
    //   </View>



    // <View style={styles.container}>
    //   <Text style={styles.title}>Resources</Text>
    //   <TouchableOpacity onPress={() => navigation.navigate('Diet')}>
    //     <Image source={dietImage} style={styles.image} />
    //   </TouchableOpacity>
    //   <TouchableOpacity onPress={() => navigation.navigate('Exercise')}>
    //     <Image source={exerciseImage} style={styles.image} />
    //   </TouchableOpacity>
    //   <TouchableOpacity onPress={() => navigation.navigate('MentalHealth')}>
    //     <Image source={mhImage} style={styles.image} />
    //   </TouchableOpacity>
    // </View>
  );
};

export default Resources;
