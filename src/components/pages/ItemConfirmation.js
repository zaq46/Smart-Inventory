import React, { Component } from 'react';
import { Text,View } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from '../ui/index';


class ItemConfirmation extends Component {

	render() {
		const { navigation } = this.props;
		const itemName = navigation.getParam('itemName', 'NO-Name');

		return (
			<View>
			 <Text>item: {JSON.parse(JSON.stringify(itemName))}</Text>
			</View>
		);
	}
}

const styles = {

};

export default ItemConfirmation;

