import React from "react"
import PropTypes from "prop-types"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import Input from "@material-ui/core/Input"
import FormControl from "@material-ui/core/FormControl"
import InputAdornment from "@material-ui/core/InputAdornment"
import InputLabel from "@material-ui/core/InputLabel"
import IconButton from "@material-ui/core/IconButton"
import GpsNotFixed from "@material-ui/icons/GpsNotFixed"
import GpsFixed from "@material-ui/icons/GpsFixed"
import CircularProgress from "@material-ui/core/CircularProgress"
import withStyles from "@material-ui/core/styles/withStyles"
import cx from "classnames"


const styles = theme => ({
  searchBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    width: "100%",
  },
  paper: {
    flex: "1 0 auto",
    padding: theme.spacing.unit * 2,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  headline: {
    fontWeight: theme.typography.fontWeightLight,
    textAlign: "center",
  },
  textField: {
    flexBasis: 450,
  },
  fabProgress: {
    color: theme.palette.secondary.light,
    position: "absolute",
    top: 4,
    left: 4,
    zIndex: 1,
  },
})

class SearchBarForm extends React.Component {

  static propTypes = {
    classes: PropTypes.object,
    handleGeolocate: PropTypes.func.isRequired,
    handleLocationChange: PropTypes.func.isRequired,
    handleLocationFormSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    location: PropTypes.string,
    locationFound: PropTypes.bool.isRequired,
    placeholder: PropTypes.string,
  }

  static defaultProps = {
    classes: {},
    location: "",
    placeholder: "",
  }

  render() {

    const {
      classes,
      handleGeolocate,
      handleLocationChange,
      handleLocationFormSubmit,
      loading,
      location,
      locationFound,
      placeholder,
    } = this.props

    return (
      <Paper className={classes.paper}>
        <Grid container direction="row">
          <form
            className={classes.searchBar}
            noValidate
            onSubmit={handleLocationFormSubmit}
          >
            <Typography
              variant="headline"
              className={classes.headline}
            >
              Enter Location or Find It Automatically!
            </Typography>
            <FormControl
              fullWidth
              className={cx(classes.margin, classes.textField)}
            >
              <InputLabel htmlFor="adornment-gps">Location</InputLabel>
              <Input
                id="adornment-gps"
                placeholder={placeholder}
                type="text"
                value={location}
                onChange={handleLocationChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Request GPS Location"
                      onClick={handleGeolocate}
                      disabled={ "navigator" in navigator }
                    >
                      { locationFound ? <GpsFixed /> : <GpsNotFixed /> }
                      { loading && (
                        <CircularProgress
                          className={classes.fabProgress}
                          size={40}
                        />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </form>
        </Grid>
      </Paper>
    )
  }
}

export default withStyles(styles)(SearchBarForm)