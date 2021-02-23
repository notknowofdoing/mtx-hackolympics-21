const express = require('express')
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

const app = express()

app.use(express.json())

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

app.post('/oauth/authenticate', (req, res) => {

	if (req.body.code) {
		res.status(200).json({ isSuccess: true, jwt: "/*TODO: will implement later*/" })
	} else {
		res.status(400).json({ isSuccess: false, err: "there was no `code` key in the json body OR there was no json body", body: req.body })
	}

})

/* redirect all unhandled routes to frontend */
app.use((req, res) => {
	res.redirect(301, `http://${h_cfg.frontend.domain}:${h_cfg.frontend.port}`)
})