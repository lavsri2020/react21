import React from 'react';
import '../Styles/Home.css';
import Wallpaper from './Wallpaper';
import QuickSearch from './QuickSearch';
import axios from 'axios';

class Home extends React.Component{
    constructor() {
        super();
        this.state = {
            locations: [],
            mealTypes: []
        }
    }
    componentDidMount()
    {
    sessionStorage.clear();
    axios({
        url:'  https://peaceful-falls-80602.herokuapp.com/locations',
        method:'GET',
        headers:{'Content-Type': 'application/json'}
        }) .then(res => {
            this.setState({ locations: res.data.locations })
        
        })
        .catch(err => console.log(err))

    axios({
        url:'  https://peaceful-falls-80602.herokuapp.com/mealtypes',
        method: 'GET',
        headers: {'Content-Type': 'application/json' }
    })
        .then(res => {
            this.setState({ mealTypes: res.data.mealtypes })
        })
        .catch(err => console.log(err))
}
   
    render(){
        const{locations,mealTypes}=this.state;
        
    return (
        <div>
         
            <Wallpaper locationsData={locations} />
            <QuickSearch mealTypesData={mealTypes}   />
            </div>
            

        )
    }
}
export default Home;