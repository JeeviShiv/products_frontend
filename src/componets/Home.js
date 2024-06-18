import React from "react";
import Header from "./common/Header";
import Footer from "./common/Footer";
import { Link } from "react-router-dom";

const Home = () => {
    return <React.Fragment>
                <Header />
                <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            </div>

                <div class="container">
                <div className="row">
                    <div className="col-md-10"><h4 class="display-4">Welcome to the site</h4></div>
                    <div className="col-md-10 m-3">
                        <p>Explore our products <Link to="/products">Products</Link></p>
                    </div>
                </div>
                </div>
                <Footer />
            </React.Fragment>;
}
export default Home;