import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

 const News = (props)=>  {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, settotalResults] = useState(0);







  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const updateNews = async ()=> {
    props.setProgress(10);
     let url =
      `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;

    let data = await fetch(url);
    setLoading(true)
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(60);
    setArticles(parsedData.articles)
    settotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
  }

  useEffect(()=>{
    document.title = `${capitalizeFirstLetter(
      props.category
    )} - NewsMonkey`;
    // eslint-disable-next-line
    updateNews();
  }, [])


  // async componentDidMount() {
  //   console.log("cdm")
  //   let url =
  //     `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a201fcb147584b619710c1a4c0b7944d&pageSize=${props.pageSize}`;
  //   let data = await fetch(url);
  //   this.setState({loading: true})
  //   let parsedData = await data.json();
  //   console.log(parsedData);
  //   this.setState({
  //     articles: parsedData.articles,
  //     totalResults: parsedData.totalResults,
  //     loading:false
  //   });
  //   this.updateNews();
  // }

  const handleprevClick = async () => {
    // console.log("previous");
    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a201fcb147584b619710c1a4c0b7944d&page=${
    //   this.state.page - 1
    // }&pageSize=${props.pageSize}`;
    // this.setState({loading: true})
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false
    // });
    // this.setState({ page: this.state.page - 1 });
    setPage(page - 1)
    this.updateNews();
  };
  const handleNextClick = async () => {
    // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize))){
    //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a201fcb147584b619710c1a4c0b7944d&page=${
    //     this.state.page + 1
    //   }&pageSize=${props.pageSize}`;
    //   this.setState({loading: true})
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   console.log(parsedData);
    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parsedData.articles,
    //     loading: false
    //   });
    // }
    setPage(page - 1)
    this.updateNews();
  };
 const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles))
    settotalResults(parsedData.totalResults)
  };
    return (
      <>
        <h2 className="text-center" style={{marginTop: '90px'}}>
          News monkey - top {capitalizeFirstLetter(props.category)}{"  "}
          Headlines
        </h2>
        {/* { this.state.loading && <Spinner/>} */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 45) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 88)
                          : ""
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handleprevClick}
          >
            {" "}
            &larr; previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / props.pageSize)
            }
          >
            next &rarr;
          </button>
        </div> */}
      </>
    );
  }



News.defaultProps = {
  country: "Pakistan",
  pageSize: 5,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};


export default News