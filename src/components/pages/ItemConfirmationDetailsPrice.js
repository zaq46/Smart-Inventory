import React, { Component } from 'react';
import { View, Image, Text,TextInput,Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Button from '../ui/AddInventoryButton';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

class ItemConfirmationDetailsPrice extends Component{

	state : {
		price: '',
	} 

	constructor(props) {
		super(props);
		this.state = {
			price: '0'
		}
	}

	onChangedPrice(text){ 
		var newText = ''; 
		var numbers = '0123456789'; 
		
		if(text.length < 1){ 
			this.setState({ myNumber: '' }); 
		} 

		for (var i=0; i < text.length; i++) { 
			if(numbers.indexOf(text[i]) > -1 || text[i] == '.') { 
				newText = newText + text[i]; 
			}
		}
		this.props.sendPrice(newText);
	}

	render(){
		return(	
			<DismissKeyboard>	
				<View style={styles.priceContainer}>				
					<View style={{paddingLeft: 10}}>
						<Text style={{fontSize: 17, color: '#2F3A49'}}> Enter price:  
						</Text>
					</View>
					
		       		<View style={{paddingRight: 15,flexDirection: 'row'}}>
		       			<Text style={{fontSize: 17, color: '#2F3A49'}}> $
		       			</Text> 
						<TextInput 
						   style={{fontSize: 17, color: '#2F3A49'}}
						   keyboardType='numeric'
						   onChangeText={(text)=> this.onChangedPrice(text)}
						   value={this.state.price}
						   maxLength={10}  //setting limit of input
						/>
					</View>
				</View>	
			</DismissKeyboard>
		);
	}
};

const styles ={
	priceContainer:{
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	}
}

export default ItemConfirmationDetailsPrice;