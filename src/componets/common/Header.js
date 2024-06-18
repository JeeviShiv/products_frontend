import { Link } from "react-router-dom";
const Header = () => {
    return <>
            <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
            <h5 class="my-0 mr-md-auto font-weight-normal">Company name</h5>
            <nav class="my-2 my-md-0 mr-md-3">
                <Link className="p-2 text-dark" to="/">Home</Link>
                <Link className="p-2 text-dark" to="/products">Products</Link>
                <Link className="p-2 text-dark" to="/category">Category</Link>
            </nav>
            </div>
        </>;
}
export default Header;