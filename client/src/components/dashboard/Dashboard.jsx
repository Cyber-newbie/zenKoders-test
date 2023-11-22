import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { subscription } from "../../actions/authActions";
const Dashboard = (props) => {
  const { isAuthenticated, user } = props.auth;
  const navigate = useNavigate();
  //check if the user has already subscribed to news
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }

    if (user.subscribed === true) {
      navigate("/news");
    }
  }, [user, isAuthenticated]);

  const { sessionURL } = props.subscribe;
  useEffect(() => {
    if (sessionURL) {
      window.location.href = sessionURL;
    }
  }, [props.subscribe.sessionURL]);
  const subscribeHandler = (e) => {
    props.subscription();
  };
  return (
    <section className="subscription">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-grey-500">
            Global News Subscription
          </h2>
          <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
            Stay informed with our comprehensive global news subscription.
            Subscribe to access news from every country and stay up-to-date with
            the latest developments around the world.
          </p>
        </div>
        <div className="space-y-8 lg:grid lg:grid-cols-1 sm:grid-cols-1 mx-auto">
          {/* <!-- Pricing Card --> */}
          <div className="flex flex-col p-6 text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
            <h3 className="mb-4 text-2xl font-semibold">Global News</h3>
            <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
              Access global news at one place.
            </p>
            <div className="flex justify-center items-baseline my-8">
              <span className="mr-2 text-5xl font-extrabold">$99</span>
              <span className="text-gray-500 dark:text-gray-400">/month</span>
            </div>

            <Link
              onClick={subscribeHandler}
              className="text-white rounded-lg text-lg  px-5 py-2.5  dark:bg-gray-800 hover:bg-white  hover:text-gray-900"
            >
              Subscribe
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  subscribe: state.subscription,
});
export default connect(mapStateToProps, { subscription })(Dashboard);
