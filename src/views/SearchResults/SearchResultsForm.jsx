import React from "react"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import withStyles from "@material-ui/core/styles/withStyles"

import SearchResult from "./SearchResult"

const styles = () => ({
  default_display: { 
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    textAlign: "center",
    padding: "1.2rem",
  },
  title: {
    paddingBottom: "1.2rem",
  },
})


class SearchResultsForm extends React.Component {

  static propTypes = {
    classes: PropTypes.object,
    searchResults: PropTypes.array,
  }

  static defaultProps = {
    classes: {},
    searchResults: [],
  }

  render() {

    const { classes, searchResults, ...rest } = this.props

    const displayDefault = (
      <Grid container direction="row" className={classes.default_display}>
        <Typography variant="display1" className={classes.title}>
          {"Welcome to Meet Up Tonight!"}
        </Typography>
        <Typography variant="subheading">
          {"Enter your location above or let us automatically find you!"}
        </Typography>
      </Grid>
    )

    const displayResults = (
      <Grid container direction="row">
        <Grid item xs={12} className={classes.paper}>
          <Typography varient="subheading">
        Search Results
          </Typography>
        </Grid>
        {
          searchResults.map(result => {
            return (
              <Grid item xs={12} key={result.id}>
                <SearchResult
                  result={result}
                  {...rest}
                />
              </Grid>
            )
          })
        }
      </Grid>
    )

    return (

      searchResults.length > 0
        ? displayResults
        : displayDefault

    )
  }
}

export default withStyles(styles)(SearchResultsForm)