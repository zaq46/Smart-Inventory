// imports
import React, {Component} from 'react';
import {Text, ScrollView, View} from 'react-native';
import InventoryProfile from './InventoryProfile';
import {Header} from '../common/Header'
import SearchBar from 'react-native-search-bar'
import AddButton from '../common/AddButton';
import InventoryCardSection from './InventoryCardSection';


//make componet
export default class InventoriesList extends Component {
    state = {inventories: []};

    componentWillMount(){
       this.setState({inventories: {
        "data":[
            {name: "Homee", itemCount: "101", url: "https://www.amazon.com/Taylor-Swift/dp/B0014I4KH6", image: "https://www.grammy.com/sites/com/files/styles/image_landscape_hero/public/rihanna_hero_860988414.jpg", thumbnail_image: "https://i.imgur.com/K3KJ3w4h.jpg"}, 
            {name: "Default", itemCount: "50", url: "https://www.amazon.com/Taylor-Swift/dp/B0014I4KH6", image: "https://www.gstatic.com/webp/gallery/4.jpg", thumbnail_image: "https://i.imgur.com/K3KJ3w4h.jpg"},
            {name: "office", itemCount: "101", url: "https://www.amazon.com/Taylor-Swift/dp/B0014I4KH6", image: "https://www.gstatic.com/webp/gallery/1.png", thumbnail_image: "https://i.imgur.com/K3KJ3w4h.jpg"}, 
            {name: "storage", itemCount: "50", url: "https://www.amazon.com/Taylor-Swift/dp/B0014I4KH6", image: "https://www.gstatic.com/webp/gallery/4.jpg", thumbnail_image: "https://i.imgur.com/K3KJ3w4h.jpg"},
        ]
        }});
    }

    renderInventories(){
        //console.log(this.state.inventories);
        return this.state.inventories.data.map(inventory => 
            <InventoryProfile key={inventory.name} inventory={inventory}/>
        );
    }

    renderSearchBar(){
        return <SearchBar placeholder={'Type inventory name to search'} />;
    }

    render() {
        return (

            <View style={{flex: 1}}>
                <InventoryCardSection>
                    <Text style={styles.textStyle}>
                        Inventories
                    </Text>
                    <AddButton onPress={()=> Linking.openURL(props.inventory.url)}>
                        <Text>{'+'}</Text>
                    </AddButton>
                    
                </InventoryCardSection>
                
                <View>
                    {this.renderSearchBar()}
                </View>
                <ScrollView>
                    {this.renderInventories()}
                </ScrollView>
            </View>
        );
    }
}

const styles={
    textStyle: {
        fontSize: 40,
        marginLeft: 10,
	}
};
// make components available for App

