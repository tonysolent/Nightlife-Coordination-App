import React from "react"
import cx from "classnames"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"
import Tooltip from "@material-ui/core/Tooltip"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import ThumbUp from "@material-ui/icons/ThumbUp"
import Done from "@material-ui/icons/Done"
import Star from "@material-ui/icons/Star"
import StarHalf from "@material-ui/icons/StarHalf"
import LocationOn from "@material-ui/icons/LocationOn"
import Card from "@material-ui/core/Card"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"
import withStyles from "@material-ui/core/styles/withStyles"


const styles = theme => ({
  card: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#555",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  content: {
    flex: "1 0 auto",
    order: 1,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
  icons: {
    fontSize: "16px",
    float: "left",
  },
  star: {
    color: "gold",
    fontSize: "16px",
  },
  pin: {
    color: "#dd4c40",
  },
  buttonWrapper: {
    display: "flex",
    flex: "1 0 auto",
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
    width: 200,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "row",
      width: "100%",
    },
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
    order: 2,
  },
  button: {
    flex: "1 0 auto",
    margin: theme.spacing.unit,
    border: "2px solid",
  },
  buttonProgress: {
    color: theme.palette.secondary.light,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  gobutton: {
    borderColor: theme.palette.secondary.light,
    backgroundColor: "#aa614a",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  gobuttondisabled: {

  },
  media: {
    flex: "0 1 auto",
    width: 250,
    order: 0,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      paddingTop: "40%",
    },
  },

  margin: {
    margin: theme.spacing.unit * 2,
  },
  headline: {
    fontWeight: theme.typography.fontWeightLight,
    textAlign: "center",
  },
  textField: {
    flexBasis: 450,
  },
  textLink: {
    textDecoration: "none",
    color: "inherit",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  titleText: {
    color: theme.palette.secondary.light,
  },
  goingMenuItem: {
    cursor: "auto",
    "&:hover": {
      backgroundColor: "inherit",
    },
  },
})

class SearchResultForm extends React.Component {

  static propTypes = {
    anchorEl: PropTypes.object,
    buildDescription: PropTypes.func.isRequired,
    classes: PropTypes.object,
    getMapUrl: PropTypes.func.isRequired,
    handleGoingClick: PropTypes.func.isRequired,
    handleOpenMenu: PropTypes.func.isRequired,
    handleCloseMenu: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    loggedIn: PropTypes.bool,
    placeholderImagePath: PropTypes.string,
    result: PropTypes.object,
    url: PropTypes.string,
    user: PropTypes.object,
  }

  static defaultProps = {
    anchorEl: null,
    classes: {},
    loggedIn: false,
    placeholderImagePath: "",
    result: {},
    url: "#",
    user: { _id: null,},
  }

  render() {

    const ITEM_HEIGHT = 48

    
    const {
      anchorEl,
      buildDescription,
      classes,
      getMapUrl,
      handleGoingClick,
      handleOpenMenu,
      handleCloseMenu,
      loading,
      loggedIn,
      placeholderImagePath,
      result,
      user,
    } = this.props
    
    const {
      categories,
      going=[],
      image_url,
      location,
      name,
      rating,
      url,
    } = result
    
    const userGoing = going.map(({_id,}) => _id).includes(user._id) || false
    const usersGoing = going.map(user => user.twitter.displayName)
    
    const cardImage = (

      <CardMedia
        className={classes.media}
        image={image_url || placeholderImagePath}
        title={name}
      />
    )

    const cardContent = (
      <CardContent className={classes.content}>
        <Typography variant="title">
          <a
            className={cx(classes.textLink, classes.titleText)}
            href={url}
            rel="noreferrer noopener"
            target={"_blank"}
          >
            {name}
          </a>
        </Typography>
        <Typography variant="body1">
          <em>{buildDescription(categories)}</em>
        </Typography>
        <Typography variant="body1">
          <a 
            className={classes.textLink}
            href={getMapUrl(
              location.display_address.map(
                _=>_.split(" ").join("+")
              ).join("+")
            )}
            rel="noreferrer noopener"
            target={"_blank"}
          >
            <LocationOn className={cx(classes.icons, classes.pin)}>
            location_on
            </LocationOn>
            {location.display_address.join(" ")}
          </a>
        </Typography>
        {
          Array(~~rating).fill("").map((v,i) => (
            <Star
              className={cx(classes.icons, classes.star)}
              key={i}
            />
          ))
        }
        {
          rating % 1 > 0 && (
            <StarHalf
              className={cx(classes.icons, classes.star)}
            />
          )
        }

      </CardContent>
    )

    const cardButtons = (
      <div className={classes.buttons}>
        <div className={classes.buttonWrapper}>
          <Button
            className={cx(classes.button, classes.goingbutton)}
            disabled={going.length === 0}
            onClick={handleOpenMenu}
            variant="outlined"
          >
            <Typography variant="button">
              {`${going.length} ${going.length === 1 ? "Person" : "People"} Going`}
            </Typography>
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={!!anchorEl}
            onClose={handleCloseMenu}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: 200,
              },
            }}
          >
            {
              usersGoing.length > 0 && usersGoing.map(user => {
                return(
                  <MenuItem
                    className={classes.goingMenuItem}
                    disableRipple={true}
                    key={user}
                  >
                    {user}
                  </MenuItem>
                )})
            }
          </Menu>
        </div>
        <Tooltip
          title={ !loggedIn
            ? "You must be logged in to perform that action"
            : ""
          }
          placement="left-start"
        >
          <div className={classes.buttonWrapper}>
            <Button
              className={
                cx(classes.button, {[classes.gobutton]: loggedIn,} )
              }
              disabled={!loggedIn}
              onClick={handleGoingClick}
              variant="outlined"
            >
              {userGoing ? "I'm Going!" : "I Want To Go!"}
              {userGoing
                ?
                (
                  <Done
                    className={cx(classes.rightIcon, classes.iconSmall)}
                  >
                    {"going"}
                  </Done>
                )
                :
                (
                  <ThumbUp
                    className={cx(classes.rightIcon, classes.iconSmall)}
                  >
                    {"thumbs_up"}
                  </ThumbUp>
                )
              }
              { loading && 
                <CircularProgress
                  className={classes.buttonProgress}
                  size={24}
                />}
            </Button>
          </div>
        </Tooltip>
      </div>
    )

    return (
      <Card
        className={cx(classes.margin, classes.card)}
        elevation={1}
      >
        { cardImage }
        { cardContent }
        { cardButtons }
      </Card>
    )
  }
}

export default withStyles(styles)(SearchResultForm)