import React, { Component } from 'react';
import { View, Image } from 'react-native';
import firebase from 'firebase';
import { Button, Text } from "native-base";
import ItemConfirmationDetails from './ItemConfirmationDetails'
 //{{ uri: this.state.path }}

class ItemConfirmation extends Component {

	render() {
		const { navigation } = this.props;
		const itemName = navigation.getParam('itemName', 'NO-Name');

		return (
			<View style={styles.background}>
			    
			    <View style={styles.card1}>
			        <View style={styles.itemNameContainer}>
			            <Text style={styles.itemNameStyle}> {JSON.parse(JSON.stringify(itemName))}</Text>
			        </View>
			    </View>
			

			    <View style={styles.card2}>
			        <Image
			            style={{ 
			              flex: 1,
			              width: null,
			              height: null,
			              borderRadius: 10
			            }} 
			            source= {{ uri: JSON.parse(JSON.stringify(itemName)) }}
			        />
			    </View>


			    <View style={styles.card3}>
			        <ItemConfirmationDetails>
			        </ItemConfirmationDetails>
			    </View>
			
			
			    <View style={styles.card4}>
			        <Button block onPress={() => this.props.navigation.navigate('Authentication')}>
                         <Text>CONTINUE</Text>
                    </Button>
			    </View>

			</View>
		);
	}
}

const styles = {
	background: {
		backgroundColor: '#2F3A49',
		flex: 1,
	},
	card1: {
		flex:2,
		backgroundColor: '#2F3A49'
	},
	itemNameContainer:{
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'flex-start',
		paddingLeft: 5
	},
	itemNameStyle: {
		textAlign: 'center',
		textAlignVertical: 'center',
		fontSize: 10,
		color: '#FCFCFC'
	},
	card2: {
		flex:4,
		alignItems: 'stretch',
		backgroundColor: 'pink',
		margin: 10,
		borderRadius: 10
	},
	card3: {
		flex:6,
		backgroundColor: '#FCFCFC',
		margin: 10,
		borderRadius: 10
	},
	card4: {
		flex: 1,
		backgroundColor: '#2F3A49',
		margin: 10,
	}

};

export default ItemConfirmation;