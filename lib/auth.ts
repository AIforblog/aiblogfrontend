export const assertUserAuthenticated = async () => {
	// Auth Guy do some auth stuff here and return user object
	return {
		accessToken: process.env.ACCESS_TOKEN,
		userId: 5,
	};
};
