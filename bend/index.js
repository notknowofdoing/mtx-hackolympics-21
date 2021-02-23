const app = require('express')()
const generateAuthUrl = require('./oAuthUrlGenerator')

/* configuration values for hosting */
const h_cfg = {
	env: process.env.node_environment || "dev",
	backend: {
		port: process.env.BPORT || 3000,
		domain: process.env.BDOMAIN || "localhost",
	},
	frontend: {
		port: process.env.FPORT || 4200,
		domain: process.env.FDOMAIN || "localhost"
	}
}

app.listen(h_cfg.backend.port, () => {
	console.log(`Express server started\
	\nListening on: http://${h_cfg.backend.domain}:${h_cfg.backend.port}`)
	console.log(h_cfg)
})

app.get('/', (req, res) => {
	res.status(200).end("STATUS 200: GET /")
})

app.get('/oauth/generate-url', (req, res) => {
	generateAuthUrl(h_cfg.env)
		.then((authUrl) => {
			res.status(302).redirect(authUrl)
		})
})

/* redirect all unhandled routes to frontend */
app.use((req, res) => {
	res.redirect(301, `http://${h_cfg.frontend.domain}:${h_cfg.frontend.port}`)
})