import React, {Component} from "react";
import ItemList from "../../itemList";
import ItemDetails,{Field} from "../../itemDetails";
import ErrorMessage from "../../errorMessage";
import GotService from "../../../services/gotService";
import RowBlock from '../../rowBlock';


export default class HousePage extends Component {

    gotService = new GotService();
    state = {
        selectedHouse: null,
        error: false
    }
    onItemSelected = (id) => {
        this.setState({
            selectedHouse: id
        })
    }
    componentDidCatch(){
        this.setState({
            error: true
        })
    }
    
    render(){
        if (this.state.error){
            return <ErrorMessage/>
        }
        const itemList = (
            <ItemList 
                        onItemSelected={this.onItemSelected}
                        getData={this.gotService.getAllHouses}
                        renderItem={(item) => item.name}/>
        )
        
        const charDetails = (
            <ItemDetails getItem = {this.gotService.getHouse} itemId={this.state.selectedHouse}>
                <Field field='region' label='Gender'/>
                <Field field='words' label='Words'/>
                <Field field='titles' label='Titles'/>
                <Field field='overlord' label='Overlord'/>
                <Field field='ancestralWeapon' label='Ancestral weapon'/>
            </ItemDetails>

        )
        return (
            <RowBlock left={itemList} right= {charDetails}/>
        )
    }
}

