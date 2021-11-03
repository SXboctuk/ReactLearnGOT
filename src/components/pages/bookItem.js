import React, {Component} from "react";
import GotService from "../../services/gotService";
import ItemDetails, {Field} from "../itemDetails";

export default class BookItem extends Component {
    gotService = new GotService();
    render (){
        return (
            <ItemDetails getItem = {this.gotService.getBook} itemId={this.props.bookId}>
                <Field field='numberOfPages' label='Number of pages'/>
                <Field field='publiser' label='Publiser'/>
                <Field field='released' label='Released'/>
            </ItemDetails>
        )
    }
}