const path = require("path")
const queryString = require("query-string")


module.exports = (app, passport) => {

  const root = path.resolve(__dirname, "..")
  const publicPath = path.join(root, "public")

  ///////////////////////////////////////////////////////////
  // Testing/Debug Middleware
  ///////////////////////////////////////////////////////////
  app.use((req, res, next) => {
    const { user = { username: null, }, } = req
    console.debug(`DEBUG originalUrl: ${req.originalUrl}`)
    next()
  })


  ///////////////////////////////////////////////////////////
  // Setup Additional Routers
  ///////////////////////////////////////////////////////////
  const searchRouter = require("./yelp")()
  const authRouter = require("./twitter")(passport)
  const appRouter = require("./app")()


  ///////////////////////////////////////////////////////////
  // Search API
  ///////////////////////////////////////////////////////////
  app.use("/api/search", searchRouter)


  ///////////////////////////////////////////////////////////
  // Auth API
  ///////////////////////////////////////////////////////////
  app.use("/auth", authRouter)

  app.get("/isauth", (req, res, next) => {
    res.json({ isauth: req.isAuthenticated(), })
  })

  app.get("/user", (req, res, next) => {
    res.json(req.user)
  })


  ///////////////////////////////////////////////////////////
  // App API
  ///////////////////////////////////////////////////////////
  app.use("/api/app", appRouter)


  ///////////////////////////////////////////////////////////
  // Root Router Handler, Serves React App
  ///////////////////////////////////////////////////////////
  app.get("/", (req, res) => {
    console.info(`Main Route Handler used for ${req.hostname + req.path}`)
    res.sendFile(path.join(publicPath, "index.html"))
  })


  ///////////////////////////////////////////////////////////
  // Default Route Handler, Redirects to root
  ///////////////////////////////////////////////////////////
  app.get("*", (req, res) => {
    console.info(`Default Route Handler used for ${req.hostname + req.path}`)
    res.redirect("/")
  })


  ///////////////////////////////////////////////////////////
  // Error Handler
  ///////////////////////////////////////////////////////////
  /* eslint no-unused-vars: 0 */
  app.use((err, req, res, next) => {
    const query = queryString.stringify(req.query)
    const errmsg = (err.message ? err.message : err).replace("Error: ", "")

    console.error(`Error Middleware: ${errmsg}`)
    res.type("json").send({
      success: false,
      message: errmsg,
      error: err,
      path: `${req.path}${query && `?${query}`}`,
    })
  })

}