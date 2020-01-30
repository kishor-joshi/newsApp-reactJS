import React, { Component } from 'react';
//import axios from 'axios'
var url = 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=42d07a9026f843b9b5da0f2d72c8c1c1';


function Post(props) {
    console.log(props.body.title);
    const title = props.body.title;
    const description = props.body.description;
    console.log('i am running');
    return (
        <div style={{ width: "20%" }}>

            <div className="card h-100"  >
                <img src={props.body.urlToImage} className="card-img-top" alt="..." style={{ height: "9rem" }} />
                <div className="card-body">
                    <h5 className="card-title" >{title}</h5>
                    <p className="card-text">{description}</p>
                </div>
                <div className="card-footer">
                    <a href={props.body.url} className="btn btn-primary">Read more</a>
                </div>
            </div>
        </div>
    );
};

export default class News extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            isLoading: true,
            allnews: [],
            error: null
        }
        //res.data.articles[0].description)
    }
    componentDidMount() {
        this.fetchPosts();
    }
    fetchPosts() {
        // The API where we're fetching data from
        fetch(url)
            // We get a response and receive the data in JSON format...
            .then(response => response.json())
            // ...then we update the state of our application
            .then(
                data =>
                    this.setState({
                        allnews: data.articles,
                        isLoading: false,
                    })
            )
            // If we catch errors instead of a response, let's update the app
            .catch(error => this.setState({ error, isLoading: false }));
    }


    render() {

        const { isLoading, allnews } = this.state;
        console.log(isLoading)
        console.log(allnews);
        let b = this.state.allnews.length
        console.log('length ' + b)

        return (
            <div  style={{ margin: "0rem", width: "100%" }}>
                <div className="container" style={{ backgroundColor: "red", borderRadius: "7px" }}>
                    <h1 style={{ textAlign: "center" }}>Top business news in the US right now</h1>
                </div>
                <div className="card-group" style={{ margin: "0rem", width: "100%" }}>
                    {!isLoading ? Object.keys(allnews).map(key => <Post key={key} body={allnews[key]} />) : <h3>Loading...</h3>}
                </div>
            </div>
        );

    }
}



