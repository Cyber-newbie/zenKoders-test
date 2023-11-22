import React, { useEffect } from "react";
import { connect } from "react-redux";
import img from "../../img/no_img.png";
import { getTopHeadlines } from "../../actions/newsActions";
import { Link } from "react-router-dom";
import classNames from "classnames";
const News = (props) => {
  //on component mount, fetch headlines
  let articles;
  const { topHeadlines } = props.news;
  useEffect(() => {
    props.getTopHeadlines();
  }, []);
  if (topHeadlines) {
    articles = topHeadlines.map((article, index) => (
      <div key={index} className="bg-white p-4 rounded-md shadow-md">
        <img
          src={article.urlToImage === null ? img : article.urlToImage}
          alt={article.title}
          className="w-full h-32 object-cover rounded-md mb-4"
        />
        <Link
          to={`/news/article/${article.source.id}`}
          className="text-lg font-semibold mb-2"
        >
          {article.title}
        </Link>
        <p className="text-gray-600">{`By ${article.author}`}</p>
      </div>
    ));
  } else {
    articles = (
      <h1 className="text-center mt-5 text-3xl">
        Sorry Cannot Find Headlines...
      </h1>
    );
  }
  return (
    <section className="mt-5">
      <h1 className="mb-5 mt-5 text-4xl text-center tracking-tight font-extrabold text-gray-900 dark:text-grey-500">
        Top Headlines
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {articles}
      </div>
    </section>
  );
};
const mapStateToProps = (state) => ({
  news: state.news,
  errors: state.errors,
});

export default connect(mapStateToProps, { getTopHeadlines })(News);
