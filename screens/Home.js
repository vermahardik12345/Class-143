import React,{Component} from "react";
import{View,Text,StyleSheet,Image,TouchableOpacity} from 'react-native';
import { Header,Airbnbrating,Icon } from 'react-native-elements';

import RFValue from 'react-native-responsive-fontsize';

import axios from 'axios';

export default class HomeScreen extends Component{
    constructor(){
        super();
        this.state={
            movieDetails:{}
        };
    }

    componentDidMount(){
        this.getMovie();
        
    }

    timeConvert(num){
        var hours = Math.floor(num/60);
        var minutes= num % 60;
        return `${hours} hrs ${minutes} mins`;
    
}

getmovie = () => {
    const url = "https://localhost:5000/get-movie";
    axios
    .get(url)
    .then(Response=>{
        let details= response.data.data;
        details["duration"] = this.timeConvert(details.duration);
        this.setState({ movieDetails: details});
    })
    .catch(error =>{
        console.log(error.message)
 
    });
    
};

likedmovies=()=>{
    const url = "https://localhost:5000/liked-movie";
    axios
    .post(url)
    .then(Response=>{
        this.getmovie();
        
    })
    .catch(error=>{
        console.log(error.message);
    });

};


notlikedmovies=()=>{
    const url = "https://localhost:5000/notliked-movie";
    axios
    .post(url)
    .then(Response=>{
        this.getmovie();
        
    })
    .catch(error=>{
        console.log(error.message);
    });

};


notwatchedmovies=()=>{
    const url = "https://localhost:5000/did-not-watch-movie";
    axios
    .post(url)
    .then(Response=>{
        this.getmovie();
        
    })
    .catch(error=>{
        console.log(error.message);
    });

};


render(){
    const{movieDetails}=this.state;
    if (movieDetails.poster_link){
        const{
            poster_link,
            title,
            release_date,
            duration,
            overview,
            rating
        } = movieDetails;

        return(
            <View style={styles.container}>
            <View style={styles.headerContainer}> 
            <Header
            centerComponent={{
                Text:"movie recommended",
                style:"styles.headertitle",
            }}
            rightComponent={{
                icon:"search",
                color:"#fff"
            }}
            backgroundColor={"d500f9"}
            containerstyle={{
                flex:1
            }}
            >
               
            </Header>
            </View>
             <View style={styles.subcontainer}>
               <View style={styles.subtopcontainer}>
                
                <Image style={styles.posterimage} source={{uri:poster_link}}></Image>
                
                </View> 
                <View style={styles.subBottomContainer}>
                    <View style={styles.subtopcontainer}>


                      <Image style={styles.posterImage} source={{uri:poster_link}}></Image>  
                    <Text style={styles.title}>{title}</Text>
                    </View>

                   <View style={styles.middleBottomContainer}>
                    <View style={{flex:0.3}}>
                     <Airbnbrating
                     count={10}
                     reviews={["","","","",""]}
                     defaultRatings={rating}
                     isDisabled={True}
                     size={RFValue(25)}
                     starContainerStyle={{marginTop:-30}}
                     ></Airbnbrating>
                        
                    </View>
<View style={{flex:0.7,padding:15}}>
    <Text style={styles.overview}>  {overview} </Text>
    </View>
    </View> 

    <View style={Styles.lowerBottomContainer}>
        <View style={styles.iconButtoncontainer}>

           <TouchableOpacity onPress={this.likedmovies}>
            
            <Icon  reverse
             name={"check"}
             type={"entypo"}
             size={RFValue(30)}
             color={"#76ff03"}
             
             >
            </Icon>
            </TouchableOpacity> 

            <TouchableOpacity onPress={this.unlikedmovie}>
            <Icon  reverse
             name={"cross"}
             type={"entypo"}
             size={RFValue(30)}
             color={"#ff1744"}
             
             >
                </Icon>

            </TouchableOpacity>
</View>

<View style={styles.buttonConatiner}>
    <TouchableOpacity style={styles.button} onPress={this.notwatchedmovies}>
        <Text style={styles.buttonText}> didnotwatch  </Text>
    </TouchableOpacity>
    </View>
                   
                </View>
                
                </View>   
            </View>
            </View>
        
        )   
    }
}
    


}