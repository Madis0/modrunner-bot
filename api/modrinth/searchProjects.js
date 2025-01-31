const { api_max_retries, modrinth_base_url, modrinth_user_agent } = require('../api_config.json');
const { request } = require('undici');
const logger = require('../../logger');
const { ApiCallManager } = require('../apiCallManager');

async function searchProjects(query) {
	for (let i = api_max_retries; i > 0; i--) {
		ApiCallManager.trackCall('modrinth');
		try {
			const responseData = await request(`${modrinth_base_url}/search?${new URLSearchParams({ query })}`, {
				method: 'GET',
				headers: {
					'User-Agent': modrinth_user_agent,
				},
			});
			return responseData;
		} catch (error) {
			logger.error(`A ${ error.name } has occured while requesting data from Modrinth (Search Projects)`);
		}
	}
	return null;
}

module.exports = { searchProjects };