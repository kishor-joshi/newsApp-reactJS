import React, { Component } from 'react';
//import axios from 'axios'
//var url = 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=42d07a9026f843b9b5da0f2d72c8c1c1';
import $ from 'jquery';  

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
//this is jquery functionality.
$(document).ready(function () {

    $("#submit").click()
})

export default class News extends Component {

    newsObject = {
        NewsURL: "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=42d07a9026f843b9b5da0f2d72c8c1c1",
        heading: "Top business news in the US right now"
    }
    bitcoinsObject = {
        NewsURL: "https://newsapi.org/v2/everything?q=bitcoin&from=2019-12-31&sortBy=publishedAt&apiKey=42d07a9026f843b9b5da0f2d72c8c1c1",
        heading: "All articles about Bitcoin from the last month, sorted by recent first"
    }
    appleObject = {
        NewsURL: "https://newsapi.org/v2/everything?q=apple&from=2020-01-30&to=2020-01-30&sortBy=popularity&apiKey=42d07a9026f843b9b5da0f2d72c8c1c1",
        heading: "All articles mentioning Apple from yesterday, sorted by popular publishers first"
    }
    techCrunchObject = {
        NewsURL: "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=42d07a9026f843b9b5da0f2d72c8c1c1",
        heading: "Top headlines from TechCrunch right now"
    }
    wallStreetObject = {
        NewsURL: "https://newsapi.org/v2/everything?domains=wsj.com&apiKey=42d07a9026f843b9b5da0f2d72c8c1c1",
        heading: "All articles published by the Wall Street Journal in the last 6 months, sorted by recent first"
    }
    businessObject = {
        NewsURL: "https://newsapi.org/v2/everything?domain=wsj.com&apiKey=42d07a9026f843b9b5da0f272c8c1c1",
        heading: "All articles published by the wall street journal in the last 6 months,sorted by recent first"
    }
    constructor(prop) {
        super(prop);
        this.state = {
            isLoading: true,
            allnews: [],
            error: null,
            newsHeadeing: null
        }

        //res.data.articles[0].description)
    } //this is the reactjs method will run after html page is rendered.

    componentDidMount() {
        this.fetchPosts();
    }
    fetchPosts(URL, newsTitle) {
        // The API where we're fetching data from
        fetch(URL)
            // We get a response and receive the data in JSON format...
            .then(response => response.json())
            // ...then we update the state of our application
            .then(
                data =>
                    this.setState({
                        allnews: data.articles,
                        isLoading: false,
                        newsTitle: newsTitle
                    })
            )
            // If we catch errors instead of a response, let's update the app
            .catch(error => this.setState({ error, isLoading: false }));
    }

    //this is the reacctJS inbuilt method .it will render html page.so data can be 
    render() {

        const { isLoading, allnews } = this.state;

        return (
            <div style={{ width: "100%" }}>

                <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top" >

                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <button type="button" id="submit" className="btn" onClick={() => this.fetchPosts(this.newsObject.NewsURL, this.newsObject.heading)}>US</button>
                            <button className="btn" onClick={() => this.fetchPosts(this.bitcoinsObject.NewsURL, this.bitcoinsObject.heading)}>Bitcoin</button>
                            <button className="btn" onClick={() => this.fetchPosts(this.appleObject.NewsURL, this.appleObject.heading)}>Apple</button>
                            <button className="btn" onClick={() => this.fetchPosts(this.techCrunchObject.NewsURL, this.techCrunchObject.heading)}>TechCrunch</button>
                            <button className="btn" onClick={() => this.fetchPosts(this.wallStreetObject.NewsURL, this.wallStreetObject.heading)}>Wall-Street-Journal</button>


                        </div>

                    </div>
                </nav>

                <br></br>
                <br></br>

                <div className="container" style={{ backgroundColor: "red", borderRadius: "7px" }}>

                    <h1 style={{ textAlign: "center" }}>{this.state.newsTitle}</h1>
                </div>
                <div className="card-group" style={{ margin: "0rem", width: "100%" }}>
                    {!isLoading ? Object.keys(allnews).map(key => <Post key={key} body={allnews[key]} />) : <h3>Loading...</h3>}
                </div>
            </div>
        );

    }
}



