const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')

/* StackOverflow copy-paste https://stackoverflow.com/a/2117523/13982210 */
function uuidv4() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

function main(keys, code) {
	return new Promise(async (resolve, reject) => {

		/*create a new OAuth2Client*/
		const client = new OAuth2Client(
			keys.web.client_id,
			keys.web.client_secret,
			/*TODO: use `env` to decide redirect uri during deployment*/
			keys.web.redirect_uris[0]
		)

		/*get access tokens from GCP API using code from user login*/
		client.getToken(code, (err, googletoken) => {

			/*generate a JWT*/	
			const jswtoken = jwt.sign(
				{
					iss: "geacpyy-deploy",
					"sub": uuidv4()
				},
				keys.JWT_sign_key,
				{ algorithm: 'RS256' })

			console.log(googletoken)
			console.log(jswtoken)

			/*hash & save both tokens to db*/

			resolve(jswtoken)
		})
	})
}

module.exports = main