import {
    CLEAR_HEADLINES,
    CLEAR_SEARCH_NEWS,
    GET_ERROR,
    GET_HEADLINES,
    SEARCH_NEWS
} from "../type";

const api = "0f25c0807db94f44b007e224266be2b4"

export const getTopHeadlines = () => async dispatch => {
    dispatch({
        type: CLEAR_HEADLINES,
        payload: {}
    })
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${api}`);
    const headlines = await response.json()
    if (headlines.status === "ok") {
        let topHeadlines;
        // Filter out articles with source.id === null,
        const filteredArticles = headlines.articles.filter(article => article.source.id !== null);
        // Slice the first 10 articles
        topHeadlines = filteredArticles.length > 10 ? filteredArticles.slice(0, 10) : filteredArticles;

        dispatch({
            type: GET_HEADLINES,
            payload: topHeadlines
        })
    } else {
        dispatch({
            type: GET_ERROR,
            payload: headlines
        })
    }
}

export const searchNews = (query, navigate) => async dispatch => {
    dispatch({
        type: CLEAR_SEARCH_NEWS,
        payload: {}
    })
    const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${api}`);
    const newsFetched = await response.json()
    if (newsFetched.status === "ok") {
        let first10Articles;
        // Filter out articles with source.id === null,
        const filteredArticles = newsFetched.articles.filter(article => article.source.id !== null);

        // Slice the first 10 articles
        first10Articles = filteredArticles.length > 10 ? filteredArticles.slice(0, 10) : filteredArticles;



        dispatch({
            type: SEARCH_NEWS,
            payload: first10Articles
        })
        navigate("/search")
    } else {
        dispatch({
            type: GET_ERROR,
            payload: newsFetched
        })
    }
}