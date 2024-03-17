import React from "react"
import PropTypes from "prop-types"

import SearchResultForm from "./SearchResultForm"

const mapUrl = "https://www.google.com/maps/search"
const mapZoom = 18

export default class SearchResultPage extends React.Component {

  state = {
    anchorEl: null,
    loading: false,
  }

  static propTypes = {
    coordinates: PropTypes.object,
    handleGoing: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool,
    name: PropTypes.string,
    result: PropTypes.object.isRequired,
  }

  static defaultProps = {
    coordinates: { latitude: "", longitude: "",},
    loggedIn: false,
    name: "",
  }


  handleGoingClick = async () => {
    
    const { loggedIn, handleGoing, result, } = this.props
    if (!loggedIn || this.state.loading) return

    const { alias, id, } = result
    const location = { alias, id, }
    this.setState({loading: true,})
    await handleGoing(location)
    this.setState({loading: false,})

  }

  handleOpenMenu = (e) => {
    this.setState({ anchorEl: e.currentTarget, })
  }
  handleCloseMenu = () => {
    this.setState({ anchorEl: null, })
  }

  getMapUrl = () => {
    const { name, coordinates: {latitude, longitude,}, } =this.props.result
    const geoPos = `@${latitude},${longitude},${mapZoom}z`
    return `${mapUrl}/${encodeURIComponent(name)}/${geoPos}`

  }

  render() {
    return(
      <SearchResultForm
        {...this.state}
        {...this.props}
        getMapUrl={this.getMapUrl}
        handleOpenMenu={this.handleOpenMenu}
        handleCloseMenu={this.handleCloseMenu}
        handleGoingClick={this.handleGoingClick}
      />
    )
  }
}