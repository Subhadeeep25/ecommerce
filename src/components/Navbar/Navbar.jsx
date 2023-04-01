import React, { useContext } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
} from "@material-ui/core";
import useStyles from "./styles";
import "./navbar.css";
import SearchIcon from '@mui/icons-material/Search';
import { CallMissedSharp, ShoppingCart } from "@material-ui/icons";
import { Button } from "@material-ui/core";
import logo from "../../assets/2.png";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { SearchContext } from "./SearchContext";

const Navbar = ({ totalItems }) => {
  const classes = useStyles();
  const { user, loginWithRedirect, isAuthenticated } = useAuth0();
  const { query, setQuery, handleSearch } = useContext(SearchContext);
  const { results } = useContext(SearchContext);
  const { logout } = useAuth0();

  function trim(str) {
    if (str.length > 12) str = str.substr(0, 12) + "...";
    return str;
  }

  return (
    <>
      
      <AppBar
        position="fixed"
        className={CallMissedSharp.appBar}
        color="inherit"
      >
        <Toolbar>
          <Typography variant="h6"className={classes.title} color="inherit">
            <img
              src={logo}
              alt="Commerce.js"
              height="25px"
              className="{classes.image} logo"
            />
            <Link to="/" className="{classes.Link} name" results={[]}>
              One Click Pick
            </Link>
          </Typography>
          <div className="search-box">
            <input className="search-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search something.."
            />
            <button className="search-btn" onClick={handleSearch}>
              <IconButton><SearchIcon/></IconButton>
            </button>
          </div>
          
          <div className={classes.grow} />
          {isAuthenticated && (
            <div>
              <Typography varient="h6" className={classes.title}>
                {trim(user.name)}
              </Typography>
            </div>
          )}
          <div className={classes.button}>
            <IconButton
              component={Link}
              to="/cart"
              aria-label="Show cart items"
              color="inherit"
            >
              
              <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>
          
          {isAuthenticated ? (
            <div>
              <Button
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                Log Out
              </Button>
            </div>
          ) : (
            <div className={classes.button}>
              <Button onClick={() => loginWithRedirect()}>Log In</Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
      
    </>
  );
};

export default Navbar;
