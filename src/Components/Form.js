import React, { Component } from 'react';
import axios from 'axios';
import DonutChart from 'react-donut-chart';
import { PieChart } from 'react-minimal-pie-chart';
import './style.css'

class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
            myProfile: [],
            otherProfile: [],
            ownId: "",
            otherId: "",
            flag: false,
            flag2: false
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log(e.target.value)
    }

    /*********************************************************    
    submitHandler = async () => {
        await fetch(`https://api.github.com/users/${this.state.ownId}`).then((response) => {
            if (response.ok) {
                return response.json();
            }
            else {
                throw new Error('Something went wrong');
            }
        })    
        .then((responseJson) => {
            this.setState({
                myProfile: responseJson
            });
            console.log(this.state.myProfile)
        })
        .catch((error) => {
            console.log(error)
            //return Promise.reject();
        })
    }
    *****************************************/


    submitHandler = async () => {
        try {
            const res = await axios.get(`https://api.github.com/users/${this.state.ownId}`);
            if (res.status === 404) {
                throw Error(res.statusText);
            }
            else {
                this.setState({
                    myProfile: res.data,
                    flag: true
                });
            //console.log(this.state.myProfile);
                
            }
        }

        catch (error) {
            this.setState({ flag: false });
        }

        try {
            const res1 = await axios.get(`https://api.github.com/users/${this.state.otherId}`);
            if (res1.status === 404) {
                throw Error(res1.statusText);
            }
            else {
                this.setState({
                    otherProfile: res1.data,
                    flag2: true
                });
            }
        } catch (error) {
            this.setState({ flag2: false });
        }

    }


    render() {
        const { flag, flag2 } = this.state;
        return (
            <div className='container' >
                <h2>Your Profile</h2>
                <input type='text' placeholder='GitHub ID' name='ownId' onChange={this.handleChange} autoComplete="off"
                    required /><br />
                {/*{flag ? null : <span style={{ color: "red" }}>Invalid UserId</span>}*/}
                <h2>Compared With</h2>
                <input type='text' placeholder='GitHub ID' name='otherId' onChange={this.handleChange} autoComplete="off"
                    required />
                &nbsp;&nbsp;
                <input type='submit' onClick={this.submitHandler} /><br />
                {/*{flag & flag1 ? <span style={{ color: "red" }}>Invalid UserId</span> : null }*/}
                
                { flag & flag2 ? <React.Fragment >
                    <h3>Repository and Followers Details</h3>
                    <div className='card'>
                        <div className='chart-card'>
                            <PieChart data={[
                                { title: this.state.myProfile.login, value: this.state.myProfile.public_repos, color: '#E38627' },
                                { title: this.state.otherProfile.login, value: this.state.otherProfile.public_repos, color: '#C13C37' }
                            ]} />
                        </div>
                        <div className='chart-card'>
                            <DonutChart
                                data={[{
                                    label: this.state.myProfile.login,
                                    value: this.state.myProfile.followers
                                },
                                {
                                    label: this.state.otherProfile.login,
                                    value: this.state.otherProfile.followers
                                }]} />
                        </div>
                    </div>
                    <div className='table-chrt'>
                        <table border='1'>
                            <thead>
                                <tr>
                                    <th>
                                        UserId
                                </th>
                                    <th>
                                        Total Repository
                                </th>
                                    <th>
                                        Followers
                                </th>
                                    <th>
                                        Following
                                </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{this.state.myProfile.login}</td>
                                    <td>{this.state.myProfile.public_repos}</td>
                                    <td>{this.state.myProfile.followers}</td>
                                    <td>{this.state.myProfile.following}</td>
                                </tr>
                                <tr>
                                    <td>{this.state.otherProfile.login}</td>
                                    <td>{this.state.otherProfile.public_repos}</td>
                                    <td>{this.state.otherProfile.followers}</td>
                                    <td>{this.state.otherProfile.following}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </React.Fragment > : null }
            </div >
        );
    }
}
//shivamkumar
export default Form;