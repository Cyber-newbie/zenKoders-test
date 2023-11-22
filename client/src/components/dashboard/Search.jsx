import React from "react";
import { connect } from "react-redux";
import img from "../../img/no_img.png";
import { Link } from "react-router-dom";
const Search = (props) => {
  let searchArticles;
  const { articles } = props.news;
  if (articles) {
    searchArticles = articles.map((article, index) => (
      <div key={index} className="bg-white p-4 rounded-md shadow-md">
        <img
          src={article.urlToImage === null ? img : article.urlToImage}
          alt={article.title}
          className="w-full h-32 object-cover rounded-md mb-4"
        />
        <Link
          to={`/search/article/${article.source.id}`}
          className="text-lg font-semibold mb-2"
        >
          {article.title}
        </Link>
        <p className="text-gray-600">{`By ${article.author}`}</p>
      </div>
    ));
  } else {
    searchArticles = (
      <h1 className="text-center mt-5 text-3xl">
        Sorry Cannot Find Any News...
      </h1>
    );
  }
  return (
    <section className="mt-5">
      <h1 className="mb-5 mt-5 text-4xl text-center tracking-tight font-extrabold text-gray-900 dark:text-grey-500>Top Headlines">
        News:
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {searchArticles}
      </div>
    </section>
  );
};
const mapStateToProps = (state) => ({
  news: state.news,
});
export default connect(mapStateToProps)(Search);
