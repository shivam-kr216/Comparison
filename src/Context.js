import React, { Component } from 'react';


const Context = React.createContext();

export class Provider extends Component {

    constructor(props){
        super(props);
        this.state = {
            users:[],
            amount:0
        };
    }

    /*async componentDidMount(){
        const res = await axios.get('https://api.github.com/users');
        this.setState({
            users: res.data
        });
        console.log(this.state.users.length)
    }

    async componentDidMount(){
        await fetch('https://api.github.com/users')
        .then(res => res.json())
        .then(result=>
            this.setState({
                users: result
            })
        )
        
        console.log(this.state.users)
    }*/

    render() { 
        return ( 
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
         );
    }
}
 
export const Consumer = Context.Consumer;