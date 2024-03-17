import React, { Component, } from "react"
import PropTypes from "prop-types"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import Tooltip from "@material-ui/core/Tooltip"
import Avatar from "@material-ui/core/Avatar"
import queryString from "query-string"
import AccountCircle from "@material-ui/icons/AccountCircle"
import withStyles from "@material-ui/core/styles/withStyles"

const styles = {
  root: {
    flexGrow: 1,
  },
  avatar: {
    border: "2px solid white",
  },
  flex: {
    flex: 1,
  },
  menu: {
    top: "20px",
  },
  menuItem: {
    width: 100,
    justifyContent: "center",
  },
  textLink: {
    textDecoration: "none",
    color: "inherit",
  },
}


class HeaderForm extends Component {

  state = {
    anchorEl: null,
  }

  static propTypes = {
    classes: PropTypes.object,
    loggedIn: PropTypes.bool.isRequired,
    query: PropTypes.object,
    user: PropTypes.object,
  }

  static defaultProps = {
    classes: {},
    query: {},
    user: {
      id: "userid",
      profile_image: "",
      displayName: "",
    },
  }

  handleMenuOpen = (e) => {
    this.setState({
      anchorEl: e.currentTarget,
    })
  }

  handleMenuClose = () => {
    this.setState({
      anchorEl: null,
    })
  }


  render() {

    const { classes, loggedIn, query, } = this.props
    const { profile_image, displayName, } = this.props.user.twitter

    const { anchorEl, } = this.state

    const title="Meet Up Tonight"

    const items = (

      !loggedIn
        ? (
          <React.Fragment>
            <IconButton
              color="inherit"
              href={`/auth/twitter?${queryString.stringify(query)}`}
            >
              <Tooltip title="Log in with Twitter" placement="left">
                <AccountCircle />
              </Tooltip>
            </IconButton>
          </React.Fragment>
        )
        : (
          <React.Fragment>
            <Avatar
              alt={displayName}
              className={classes.avatar}
              onClick={this.handleMenuOpen}
              src={profile_image}
            />
            <Menu
              anchorEl={anchorEl}
              className={classes.menu}
              open={Boolean(anchorEl)}
              onClose={this.handleMenuClose}
            >
              <a href="/auth/logout">
                <MenuItem
                  className={classes.menuItem}
                  onClick={this.handleMenuClose}
                >
                  {"Logout"}
                </MenuItem>
              </a>
            </Menu>
          </React.Fragment>
        )
    )


    return (
      <header>
        <div className={ classes.root }>
          <AppBar position="static">
            <Toolbar>
              <Typography
                className={ classes.flex }
                color="inherit"
                variant="title"
              >
                <a href="/" className={classes.textLink}>
                  { title }
                </a>
              </Typography>
              { items }
            </Toolbar>
          </AppBar>
        </div>
      </header>
    )
  }
}

export default withStyles(styles)(HeaderForm)