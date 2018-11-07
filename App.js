import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
// import { Header, Button, Spinner, CardSection } from './components/ui/index';
import firebase from "firebase";
// import LoginForm from './components/LoginForm';
// import Signup from './components/pages/Signup';
import InventoriesList from './src/components/pages/InventoriesList';
import InventoryDetail from './src/components/pages/InventoryDetail';
import Landing from "./src/components/pages/Landing";
import { createStackNavigator } from "react-navigation";
import getTheme from "./native-base-theme/components/index";
import commonColor from "./native-base-theme/variables/variables";
import { StyleProvider } from "native-base";
import Authentication from './src/components/pages/Authentication'
import Camera from './src/components/pages/Camera'
import ItemConfirmation from './src/components/pages/ItemConfirmation'
import Item from './src/components/pages/Item'
import CameraTakePhoto from './src/components/pages/CameraTakePhoto'
import CameraPassPhotoToItem from './src/components/pages/CameraPassPhotoToItem'


class App extends Component {

  componentWillMount() {
    //TODO move this into its own file
    firebase.initializeApp({
      apiKey: "AIzaSyAEmfChIahjgpB8PQu3VLaeOX8sOwm0k4g",
      authDomain: "smartinventory-1f53b.firebaseapp.com",
      databaseURL: "https://smartinventory-1f53b.firebaseio.com",
      projectId: "smartinventory-1f53b",
      storageBucket: "smartinventory-1f53b.appspot.com",
      messagingSenderId: "164089194254"
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  render() {
    return (
      <StyleProvider style={getTheme(commonColor)}>
        <RootStack />
      </StyleProvider>
    );
  }
}
//Specify view pages as routes here to use navigation.
//https://reactnavigation.org/docs/en/getting-started.html
const RootStack = createStackNavigator(
  {
    Landing: Landing,
	  Authentication: Authentication,
     Login: LoginForm,
     Signup: Signup,
     InventoriesList: InventoriesList,
     Camera: Camera,
     ItemConfirmation, ItemConfirmation,
     Item, Item,
     CameraTakePhoto: CameraTakePhoto,
     CameraPassPhotoToItem: CameraPassPhotoToItem,
    InventoryDetail: InventoryDetail,
  },
  {
    initialRouteName: "Landing"
  },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
);

export default App;
