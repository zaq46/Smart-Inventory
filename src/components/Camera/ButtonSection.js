import React from 'react'
import { View } from 'react-native'

const ButtonSection = (props) => {
	return (
		<View style={styles.containerStyle}>
		{props.children}
		</View>
	);
};

const styles = {
	containerStyle: {
		borderColor: '#ddd',
		backgroundColor: '#fff',
		borderBottomWidth: 1,
		flexDirection: 'row',
		position: 'absolute',
		alignSelf: 'flex-end',
		bottom: 75,
		padding: 5

	}
}
export default ButtonSection;
