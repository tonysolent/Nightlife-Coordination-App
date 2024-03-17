import React from "react"
import PropTypes from "prop-types"
import Paper from "@material-ui/core/Paper"
import withStyles from "@material-ui/core/styles/withStyles"

import { AppConsumer, } from "../contexts/AppContext"
import SearchResultsForm from "./SearchResultsForm"


const styles = theme => ({
  paper: {
    flex: "1 0 auto",
    flexDirection: "column",
    padding: theme.spacing.unit,
    marginBottom: 60,
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing.unit * 5,
    },
  },
})


class SearchResultsPage extends React.Component {

  static propTypes = {
    classes: PropTypes.object,
  }

  render() {
    const { classes, } = this.props
    return(
      <Paper className={classes.paper}>
        <AppConsumer>
          {
            (app) => <SearchResultsForm {...app}/>
          }
        </AppConsumer>
      </Paper>
    )
  }
}

export default withStyles(styles)(SearchResultsPage)