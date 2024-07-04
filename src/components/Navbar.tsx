import {Component} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import logo from "../images/MYWEB.png"
import { Link } from "react-router-dom";


class Navbar extends Component {


    render(){
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">
          <img
            src={logo}
            alt="MYWEB Logo"
            width={60}
            height={30}
            className="d-inline-block align-top"
          />
        </Link>
            

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                <li className="nav-item active">
                    <Link className="nav-link" to="/home">Home <span className="sr-only">(current)</span></Link>
                </li>   
                {
                   /* <li className="nav-item active">
                    <Link className="nav-link" to="/dashboard">Dashboard <span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/explore">Explore</Link>
                </li> */
                }
                
                
                
                </ul>
            </div>
            </nav>

          );
    }
}

export default Navbar;