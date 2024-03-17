import React from "react"
import PropTypes from "prop-types"
import { injectGlobal, } from "styled-components"
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider"
import withStyles from "@material-ui/core/styles/withStyles"

import { withAuth, } from "./views/contexts/AppContext"
import theme from "./theme"
import { Header, Footer, } from "./views/layout"
import Main from "./views/components/Main"


injectGlobal`
  body {
    margin: 0;
    padding: 0;
  }
`

const styles = {
  body: {
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
    backgroundColor: theme.palette.background.default,
  },
  main: {
    flex: "1 0 auto",
  },
}


class App extends React.Component {

  state = {
    
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    handleValidateAuth: PropTypes.func.isRequired,
    getUserDetails: PropTypes.func.isRequired,
  }

  async componentDidMount() {
    const isauth = await this.props.handleValidateAuth()
    isauth && this.props.getUserDetails()
  }

  render() {

    const { classes, } = this.props

    return (
      <MuiThemeProvider theme={ theme }>
        <div className={classes.body}>
          <Header />
          <Main className={ classes.main } />
          <Footer />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(withAuth(App))