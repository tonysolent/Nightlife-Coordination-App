import React from "react"
import PropTypes from "prop-types"

import queryString from "query-string"

const AppContext = React.createContext("app")

export const AppConsumer = AppContext.Consumer
export class AppProvider extends React.Component {

  state = {
    loggedIn: false,
    locationFound: false,
    location: this.props.query.location,
    placeholder: "Enter your location",
    placeholderImagePath: "/images/placeholder.jpg",
    searchResults: [],
    query: this.props.query,
    user: {_id: null, twitter: {},},
  }

  static propTypes = {
    children: PropTypes.any,
    query: PropTypes.object,
  }

  static defaultProps = {
    location: "",
    query: { 
      location: "",
      term: "nightlife",
    },
  }

  componentDidMount() {
    this.fetchSearchResults()
    this.getUserDetails()
  }

  componentDidUpdate() {
    const { query, } = this.state
    history.pushState({}, null, `/?${queryString.stringify(query)}`)
  }


  fetchJSON = (path, options) => {
    return fetch(
      path,
      {
        method: "GET",
        credentials: "include",
        ...options,
      }
    ).then(res => res.json())
  }


  fetchSearchResults = (params=this.state.query, updateLocation=true) => {
    
    if (!params["location"]) {
      if (!(params["latitude"] && params["longitude"])) {
        return
      }
    }

    const searchUrl = `/api/search?${queryString.stringify(params)}`

    const updateState = ({
      locationFound,
      location="",
      placeholder="",
      query={},
      ...rest
    }) => {
      this.setState(prevState => ({
        location: updateLocation ? location : prevState.location,
        locationFound: locationFound || prevState.locationFound,
        query: Object.assign(prevState.query, query),
        placeholder,
        ...rest,
      }))
    }

    return new Promise( async (resolve, reject) => {

      try {

        const { response, success, } = await this.fetchJSON(searchUrl)
  
        if (!success) {
          switch(response.error.code) {
            case "LOCATION_NOT_FOUND":
              updateState({placeholder: "Location Not Found",})
          }
          console.error(response.error.description)
          return resolve(response.error)
        }
  
        if (response.jsonBody.businesses.length === 0) {
          updateState("No Results Found in Your Area")
          return resolve("fetchSearchResults No Results Found")
        }
  
        const { city, state, } = response.jsonBody.businesses[0].location

        updateState({
          location: `${city}, ${state}`,
          searchResults: response.jsonBody.businesses,
          query: {location: `${city},+${state}`, },
        })

        this.updateResultsFromDb()
  
        resolve("fetchSearchResults Successful")
      } catch(error) { 
        reject(error)
      }
    })
  }



  handleLocationChange = e => {
    this.setState({
      location: e.target.value,
      placeholder: "Enter your location",
    })
  }


  handleLocationFormSubmit = e => {
    e.preventDefault()

    const { location, query: {term, },} = this.state
    this.fetchSearchResults({ location, term, })

  }


  handleGeolocate = () => {
    return new Promise((resolve, reject) => {

      const handleSuccess = async ({ coords: { latitude, longitude, },}) => {
  
        await this.setState(prevState => ({
          locationFound: true,
          query: Object.assign({
            latitude: latitude.toFixed(2),
            longitude: longitude.toFixed(2),
          }, prevState.query),
        }))
  
        this.fetchSearchResults()
        resolve("handleGeolocate Successful")
      }
  
      const handleFailure = error => {
        console.error(error)
        reject(error)
      }
  
      navigator.geolocation.getCurrentPosition(handleSuccess, handleFailure)

    })
  }


  // Check server to see if user is authenticated
  handleValidateAuth = async () => {
    const {isauth,} = await this.fetchJSON("/isauth")

    this.setState({
      loggedIn: isauth,
    })

    return isauth
  }

  getUserDetails = async () => {

    if (!this.state.loggedIn) return

    const user = await this.fetchJSON("/user")
    this.setState({ user, })

    return user
  }

  buildDescription = (categories) => categories.map(c => c.title).join(", ")

  handleGoing = async (location) => {
    await this.fetchJSON("/api/app/going", {
      method: "POST",
      body: JSON.stringify({location,}),
      headers: { "Content-Type": "application/json", },
    })
    return this.updateResultsFromDb()

  }

  updateResultsFromDb = () => {
    const { searchResults, } = this.state
    const resultIds = searchResults.map(v => v.id)
    return new Promise( async (resolve, reject) => {
      
      try {
        const {updates,} = await this.fetchJSON("/api/app/updatedresults", {
          method: "POST",
          body: JSON.stringify({ resultIds, }),
          headers: { "Content-Type": "application/json", },
        })
    
        const updateIds = updates.map(v=>v.id)
    
        const updatedResults = searchResults.map(result => {
          const resultIndex = updateIds.indexOf(result.id)
          if (resultIndex !== -1) {
            return Object.assign(result, { going: updates[resultIndex].going,})
          }
          return Object.assign(result, { going: [], })
        })
        this.setState({ searchResults: updatedResults, })

        resolve("updateResultsFromDb Successful")

      } catch (err) {
        reject(err)
      }

    })
  }


  render() {

    return (
      <AppContext.Provider
        value={{
          ...this.state,
          buildDescription: this.buildDescription,
          getUserDetails: this.getUserDetails,
          handleGeolocate: this.handleGeolocate,
          handleGoing: this.handleGoing,
          handleLocationChange: this.handleLocationChange,
          handleLocationFormSubmit: this.handleLocationFormSubmit,
          handleRequestLocation: this.handleRequestLocation,
          handleValidateAuth: this.handleValidateAuth,
        }}
      >
        { this.props.children }
      </AppContext.Provider>
    )
  }
}


export function withAuth(Component) {
  return function AuthComponent(props) {
    return(
      <AppConsumer>
        {
          ({ loggedIn, handleValidateAuth, getUserDetails, }) => (
            <Component
              loggedIn={loggedIn}
              handleValidateAuth={handleValidateAuth}
              getUserDetails={getUserDetails}
              {...props}
            />
          )
        }
      </AppConsumer>
    )
  }
}