import React, {Component} from "react";

import './randomChar.css';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from "../errorMessage";
import PropTypes from 'prop-types';

export default class RandomChar extends Component {
    constructor(props){
        super();
    }

    state ={
        char: {},
        loading: true,
        error: false
    }
    componentDidMount(){
        this.updateChar();
        this.timerId = setInterval(this.updateChar, this.props.interval);
    }
    componentWillUnmount(){
        clearInterval(this.timerId);
    }

    gotService = new gotService();

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        });
    }
    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }
    updateChar= () => {

        const id = Math.floor(Math.random() * 140 + 25);
        this.gotService.getCaracter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }
    
    render(){
        const {char, loading, error} = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = (!loading && !error) ? <View char={char}/> : null;

        return (
            <>
                <div className="random-block rounded">
                    {errorMessage}
                    {spinner}
                    {content}
                </div>  
            </>     
        )
    }
}

RandomChar.defaultProps = {
    interval :15000
}
RandomChar.propTypes = {
    interval: PropTypes.number
}

const View = ({char}) => {
    const {name, gender, born, died, culture} = char;
    return (
        <>  
            <h4>Random Character: {name ? name : 'no data'}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender</span>
                    <span>{gender ? gender : 'no data'}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born</span>
                    <span>{born ? born :'no data'}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died</span>
                        <span>{died ? died : 'no data'}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture</span>
                    <span>{culture ? culture : 'no data'}</span>
                </li>
            </ul>
        </>
        
    )
}