import React from "react"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"

import Grid from "@material-ui/core/Grid"
import withStyles from "@material-ui/core/styles/withStyles"


import SearchResult from "../containers"
import { withAuth, } from "../contexts/AppContext"
import "../../images/placeholder.jpg"


const styles = theme => ({

  paper: {
    flex: "1 0 auto",
    padding: theme.spacing.unit * 2,
  },

})


class SearchResultsSuccess extends React.Component {

  render() {

    const { classes, searchResults, } = this.props

    return(
      <Grid container direction="row">
        <Grid item xs={12} className={classes.paper}>
          <Typography varient="subheading">
        Search Results
          </Typography>
        </Grid>
              
        {
          searchResults.map(result => {
            <SearchResult
              {...result}
              {...this.props}
            />
          })
        }
      </Grid>
    )
  }
}

SearchResultsSuccess.propTypes = {
  classes: PropTypes.string,
  searchResults: PropTypes.array,
}

SearchResultsSuccess.defaultProps = {
  searchResults: [],
}

export default withStyles(styles)(withAuth(SearchResultsSuccess))