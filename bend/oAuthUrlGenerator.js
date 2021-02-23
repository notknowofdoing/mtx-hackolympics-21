const { OAuth2Client } = require('google-auth-library')

const keys = require('./credentials.json')

function generator(env) {
	return new Promise((resolve, reject) => {
		const client = new OAuth2Client(
			keys.web.client_id,
			keys.web.client_secret,
			/*TODO: use `env` to decide redirect uri during deployment*/
			keys.web.redirect_uris[0]
		)
		const authURL = client.generateAuthUrl({
			access_type: 'offline',
			scope: 'https://www.googleapis.com/auth/cloud-platform'
		})

		resolve(authURL)
	})
}

module.exports = generator