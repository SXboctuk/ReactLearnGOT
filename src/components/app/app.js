import React, {Component} from 'react';

import { Container, Row, Col } from 'reactstrap';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import RandomChar from '../randomChar/randomChar';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../pages/characterPage';
import HousePage from '../pages/housePage';
import BookPage from '../pages/bookPage';
import Header from '../header';
import BookItem from '../pages/bookItem';

export default class App extends Component{
    
    state = {
        showRandomChar: true,
        error: false
    }
    componentDidCatch(){
        this.setState({
            error: true
        })
    }
    toggleRandomChar = () => {
        this.setState(() => { 
            if (this.state.showRandomChar)
            {
                return {showRandomChar: false}
            } else {
                return {showRandomChar: true}
            }
        })
    }

    render(){

        const randChar = this.state.showRandomChar ? <RandomChar interval={15000}/> : null

        if (this.state.error) {
           return <ErrorMessage/>
        }
        return (
            <Router>
                <div className="app ">
                    <Container>
                        <Header/>
                    </Container>
                    <Container >
                        <Row className="mt-5 mb-5">
                            <Col md='6'>
                                {randChar}
                                <div className="d-flex justify-content-center">
                                    <button
                                        onClick={this.toggleRandomChar} 
                                        color="primary" 
                                        size="lg"
                                        className="mt-4 text-center btn btn-primary">
                                        Toggle Random Character
                                    </button>  
                                </div>   
                            </Col>
                        </Row>
                        <Route path='/characters' component={CharacterPage}/>
                        <Route path='/houses' component={HousePage}/>
                        <Route path='/books' exact component={BookPage}/>
                        <Route path='/books/:id'  render={
                            ({match, location, history}) => {
                                const {id} = match.params;
                            return <BookItem bookId={id}/>
                        }
                        }/>
                    </Container>
                </div>
            </Router>
        )
    }
}