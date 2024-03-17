import { createMuiTheme, } from "@material-ui/core/styles"
import deepPurple from "@material-ui/core/colors/deepPurple"
import deepOrange from "@material-ui/core/colors/deepOrange"

export default createMuiTheme({
  palette: {
    type: "dark",
    primary: deepPurple,
    secondary: deepOrange,
  },
})