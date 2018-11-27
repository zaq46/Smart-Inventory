import React from 'react';
import {Text,TextInput, View, TouchableOpacity} from 'react-native';
import {Button, ButtonGroup, Avatar} from 'react-native-elements';
import CardSection from "../ui/CardSection";
import Firebase from "../../Firebase";
import * as firebase from 'firebase';
import Toaster, { ToastStyles } from 'react-native-toaster'
import store from "../../redux/store";
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob'

const options = {
  title: 'SmartInventory',
  takePhotoButtonTitle: 'Take photo with Camera',
  chooseFromLibraryButtonTitle: 'Choose photo from Gallery',
  
};

class Create extends React.Component {

  state={name: '', disableCreate: true, selectedIndex: 0, message: null, inventories: [], avatarSource: null}

  constructor(props) {
    super(props);

    this.updateIndex = this.updateIndex.bind(this);

    store.subscribe(() => {
      // When state will be updated(in our case, when items will be fetched), 
      // we will update local component state and force component to rerender 
      // with new data.
  
      this.setState({
        inventories: store.getState().inventories,
      });
    });
  }

  
  pickImage = () =>{
    const Blob = RNFetchBlob.polyfill.Blob
    const fs = RNFetchBlob.fs
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    window.Blob = Blob

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        const image = source.uri.slice(7)
        // You can also display the image using data:
        //const source = { uri: 'data:image/jpeg;base64,' + response.data };
        //const image = source
        console.log('before blob', source.uri.slice(7))
        let uploadBlob = null
        
        const imageRef = firebase.storage().ref('Images').child("test1.jpg")
        
        let mime = 'image/jpg'
        fs.readFile(image, 'base64')
          .then((data) => {
            return Blob.build(data, { type: `${mime};BASE64` })
        })
        .then((blob) => {
            uploadBlob = blob
            return imageRef.put(blob, { contentType: mime })
          })
          .then(() => {
            uploadBlob.close()
            return imageRef.getDownloadURL()
          })
          .then((url) => {
            // URL of the image uploaded on Firebase storage
            this.setState({
              avatarSource: url,
            });
            console.log('gotcha--->',url);
            
          })
          .catch((error) => {
            console.log(error);
     
          })  
        
      }
    });
  
  }

  create = () => {
    console.log(this.state.avatarSource);

    var add = true;
    if (this.state.name === ''){
      console.log('Inventory name not set')
    }
    else{
      //create an inventory object and add user as owner
      this.props.inventories.map(inv => {
        console.log(inv.name);
        if (inv.name.toLowerCase() === this.state.name.toLowerCase()) {
          add = false;
        }
      });
      if( add === true){
            ref = Firebase.firestore.collection('Inventories').doc()
            ref.set({
              //image: 'https://c1.staticflickr.com/5/4916/45053006915_f22a94ea77_c.jpg',
              image: this.state.avatarSource,
              items: [],
              name: this.state.name,
              owner_id: Firebase.auth.currentUser.uid,
              users: [],
              invite_id: ref.id,
            }).then(ref => {
              console.log('Added document with ID: ', ref.id);
            });

            this.setState({message: { text: 'Inventory Created!', styles: ToastStyles.success }});
            
        }
        else{
          this.setState({message: { text: 'Cannot Create Inventory! Name already in use.Choose another name.', styles: ToastStyles.error }});
        }
    }
  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex});
  }

  render(){
    const buttons = ['Shared', 'Private'];
    const { selectedIndex } = this.state;
    console.log(this.state.inventories);
    return (
      <View style={{flex: 1, height: '100%',width:'100%', backgroundColor: '#2f3a49', alignItems: 'center'}}>
        <TextInput
          onChangeText={(text) => {this.setState({name: text});
            this.setState({ disableCreate: (this.state.name.length < 2) });}}
          clearButtonMode='while-editing'
          autoFocus={true}
          style={{
            color: "white",
            height: 40,
            fontSize: 18,
            width: "80%",
            backgroundColor: "#8190a5",
            borderWidth: 1,
            borderRadius: 3,
            marginBottom: 15,
            marginTop: 10,
          }}
          placeholder={" Inventory name"}
          placeholderTextColor={"white"}/>

        <Text style={{color: "white", height: 22,fontSize: 18, alignSelf: 'auto', marginBottom: 1}}>
          Sharing:
        </Text>

        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{height: 35, width: "60%", borderWidth: 0, marginTop: 2}}
          innerBorderStyle={{color: '#e79100'}}
          selectedBackgroundColor={"#e79627"}
          selectedTextStyle={{color: '#fff'}}
          selectedButtonStyle={{backgroundColor: '#e79627'}}
          buttonStyle={{backgroundColor:"#2f3a49", borderWidth: 0}}
          textStyle={{color:'#fff'}} />

      
          <TouchableOpacity onPress={this.pickImage} style={{margin: 25}}>
            <Text>Select Image</Text>

          </TouchableOpacity>

        {<Toaster message={this.state.message} onHide={()=> {this.setState({message: null})}}/>}
         
        <View style={{width: '40%', alignItems:'stretch'}}>
          <Button onPress={this.create} title='CREATE' disabled={this.state.disableCreate}/>
        </View>

      </View >
    );
  }

};

const styles= {

};

export default Create;
