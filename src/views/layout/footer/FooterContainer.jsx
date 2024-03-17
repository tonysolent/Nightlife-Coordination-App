import React from "react"
import PropTypes from "prop-types"
import withStyles from "@material-ui/core/styles/withStyles"
import Typography from "@material-ui/core/Typography"
import faTwitter from "@fortawesome/fontawesome-free-brands/faTwitter"
import faFacebookF from "@fortawesome/fontawesome-free-brands/faFacebookF"
import faLinkedinIn from "@fortawesome/fontawesome-free-brands/faLinkedinIn"
import faGithubAlt from "@fortawesome/fontawesome-free-brands/faGithubAlt"


import FooterForm from "./FooterForm"

const styles = theme => ({
  textLink: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
})

class FooterContainer extends React.Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  render() {

    const { classes, } = this.props

    const socialIcons = [
      {
        href: "https://www.facebook.com/christopher.j.mccormack",
        icon: faFacebookF,
      },
      {
        href: "https://twitter.com/chrisjmccormack",
        icon: faTwitter,
      },
      {
        href: "https://github.com/cmccormack",
        icon: faGithubAlt,
      },
      {
        href: "https://www.linkedin.com/in/christopherjmccormack",
        icon: faLinkedinIn,
      },
    ]
  
    const attribution = (
      <Typography
        variant="body1"
      >
        {"Created by "}
        <a
          className={classes.textLink}
          href="https://mackville.net"
          rel="noopener noreferrer"
          target="_blank"
        >
          {"Christopher McCormack"}
        </a>
      </Typography>
    )
  
    return(

      <FooterForm items={socialIcons}>
        {attribution}
      </FooterForm>
    )
  }
}


export default withStyles(styles)(FooterContainer)