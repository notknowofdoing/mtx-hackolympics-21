const { OAuth2Client } = require('google-auth-library')

function generator(keys, env) {
	return new Promise((resolve, reject) => {

		/*create new client*/
		const client = new OAuth2Client(
			keys.web.client_id,
			keys.web.client_secret,
			/*TODO: use `env` to decide redirect uri during deployment*/
			keys.web.redirect_uris[0]
		)
		/*generate an auth url*/
		const authURL = client.generateAuthUrl({
			access_type: 'offline',
			scope: 'https://www.googleapis.com/auth/cloud-platform'
		})

		resolve(authURL)
	})
}

module.exports = generator