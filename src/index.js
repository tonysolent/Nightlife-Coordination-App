import React from "react"
import ReactDOM from "react-dom"
import queryString from "query-string"

import App from "./App"
import "./images/favicon.ico"
import "./images/placeholder.jpg"
import { AppProvider, } from "./views/contexts/AppContext"

const query = location.search ? queryString.parse(location.search) : undefined

ReactDOM.render(
  <AppProvider query={query}>
    <App/>
  </AppProvider>,
  document.getElementById("root")
)