import React from "react"
import PropTypes from "prop-types"
import Grid from "@material-ui/core/Grid"
import withStyles from "@material-ui/core/styles/withStyles"

import SearchBar from "../SearchBar"
import SearchResults from "../SearchResults"

const styles = theme => ({
  main: {
    flex: "1 0 auto",
    marginTop: "60px",
    justifyContent: "center",
  },
  container: {
    [theme.breakpoints.up("lg")]: {
      width: 1170,
      margin: "auto",
    },
  },
  wrapper: {
    padding: 12,
  },
})

class Main extends React.Component {

  static propTypes = {
    classes: PropTypes.object,
  }

  static defaultProps = {
    classes: {},
  }

  render() {
    const { classes, } = this.props
    return (
      <main className={ classes.main }>
        <div className={ classes.wrapper }>
          <Grid
            className={ classes.container }
            container
            justify="center"
            spacing={24}
          >
            <Grid item xs={12}>
              <SearchBar />
            </Grid>
            <Grid item xs={12}>
              <SearchResults />
            </Grid>
          </Grid>
        </div>
      </main>
    )
  }
}

export default withStyles(styles)(Main)