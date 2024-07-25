const common = require('../../../helpers/common');
const jwtAuth = require('../../../helpers/authentication');


const signIn = async (payload) => {
  const result = await userModel.findByEmail(payload)
  if(result.err) {
    return result;
  }

  if(await common.decryptHash(payload.password, result.data.password)) {
    const tokenData = {
      email: result.data.email,
      fullname: result.data.fullname,
      role: result.data.role,
    };
    const token = await jwtAuth.generateToken(tokenData);
    const refresh_token = await jwtAuth.generateRefreshToken(tokenData);
    const { email, fullname, role } = result.data;
    const data = { email, fullname, role, token, refresh_token };
    return {
      err: null,
      data: data
    }
  }

  return {
    err: { message: 'Email or password is wrong!', code: 401 },
    data: null
  }
}

const refreshToken = async (payload) => {
  const checkRefreshToken = await jwtAuth.verifyRefreshToken(payload);
  if(checkRefreshToken.err) {
    return checkRefreshToken;
  }

  const tokenData = {
    email: checkRefreshToken.data.email,
    fullname: checkRefreshToken.data.fullname,
    role: checkRefreshToken.data.role
  };
  const token = await jwtAuth.generateToken(tokenData);
  const refresh_token = await jwtAuth.generateRefreshToken(tokenData);
  const data = { token, refresh_token };
  return {
    err: null,
    data: data
  }
}

module.exports = {
  signIn,
  refreshToken
}