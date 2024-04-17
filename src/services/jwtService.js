const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const generalAccessToken = async (payload) => {
  console.log('payload:', payload);
  const access_token = jwt.sign(
    {
      ...payload,
    },
    process.env.ACCESS_TOKEN,
    { expiresIn: '30s' }
  );
  return access_token;
};
const generalRefreshToken = async (payload) => {
  const refresh_token = jwt.sign(
    {
      ...payload,
    },
    process.env.REFRESH_TOKEN,
    { expiresIn: '365d' }
  );
  return refresh_token;
};
//
const refreshTokenJWTService = async (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
        if (err) {
          console.log('err jwt:', err);
          resolve({
            status: 'ERROR',
            message: 'the authentication',
          });
        }
        const access_token = await generalAccessToken({
          id: user?.id,
          isAdmin: user?.isAdmin,
        });
        console.log('access-token:', access_token);
        resolve({
          status: 'OK',
          message: 'Success',
          access_token,
        });
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  generalAccessToken,
  generalRefreshToken,
  refreshTokenJWTService,
};
