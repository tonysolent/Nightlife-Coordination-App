import React, { Component, } from "react"

import { AppConsumer, } from "../../contexts/AppContext"
import HeaderForm from "./HeaderForm"

class HeaderContainer extends Component {

  render() {

    return (
      <AppConsumer>
        {
          (app) => <HeaderForm {...this.props} {...app} />
        }
      </AppConsumer>
    )
  }
}

export default HeaderContainer