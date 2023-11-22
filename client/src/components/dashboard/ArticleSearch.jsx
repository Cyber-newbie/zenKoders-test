import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ArticleSearch = (props) => {
  const { id } = useParams();
  const { articles } = props.news;
  let article;

  if (articles) {
    article = articles.find((article) => article.source.id === id);
  } else {
    // Handle the case where the article is not found
    return (
      <div className="mb-5 mt-5 text-4xl text-center tracking-tight font-extrabold text-red-600 dark:text-grey-500">
        Article not found
      </div>
    );
  }
  const { title, content, author, urlToImage } = article;
  return (
    <section>
      <Link
        to={"/search"}
        className="bg-gray-700 text-white font-bold py-3 px-4 w-30 rounded mt-4 mx-4"
      >
        Back
      </Link>

      <div className="container mx-auto mt-8">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-md shadow-md">
          <h1 className="text-4xl font-semibold mb-4">{title}</h1>
          <p className="text-gray-600">{`By ${author}`}</p>
          <img
            src={urlToImage}
            alt={title}
            className="w-full h-64 object-cover rounded-md mb-4"
          />
          <p className="text-gray-800">{content}</p>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  news: state.news,
  errors: state.errors,
});

export default connect(mapStateToProps, {})(ArticleSearch);
