import React from "react"
import PropTypes from "prop-types"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import withStyles from "@material-ui/core/styles/withStyles"
import IconButton from "@material-ui/core/IconButton"
import FontAwesomeIcon from "@fortawesome/react-fontawesome"

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
    textAlign: "center",
  },
}

class Footer extends React.Component {

  render() {
    const { children, classes, items, } = this.props
    
    return (
      <footer>
        <div className={ classes.root }>
          <AppBar position="static">
            <Toolbar>
              <span className={classes.flex}>
                {items.map(item => (
                  <IconButton
                    href={item.href}
                    key={ item.icon.iconName }
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <FontAwesomeIcon
                      icon={ item.icon }
                    />
                  </IconButton>
                ))}
              </span>
              <Typography
                className={ classes.flex }
                color="inherit"
                variant="title"
              >
                { children }
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
      </footer>
    )
  }
}

Footer.propTypes = {
  title: PropTypes.string,
  classes: PropTypes.object,
  items: PropTypes.array,
}

Footer.defaultProps = {
  classes: {
    root: {
      flexGrow: 1,
    },
    flex: {
      flex: 1,
    },
  },
  items: [],
  title: "Title",
}
export default withStyles(styles)(Footer)