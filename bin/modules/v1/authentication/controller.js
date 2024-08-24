const common = require("../../../helpers/common");
const jwtAuth = require("../../../helpers/authentication");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const signIn = async (payload) => {
  const result = await prisma.user.findUnique({
    where: { email: payload.email },
  });
  if (!result) {
    return {
      err: { message: "User not found", code: 404 },
      data: null,
    };
  }

  if (await common.decryptHash(payload.password, result.password)) {
    const tokenData = {
      email: result.email,
      fullname: result.fullname,
      role: result.role,
    };
    const token = await jwtAuth.generateToken(tokenData);
    const refresh_token = await jwtAuth.generateRefreshToken(tokenData);
    const { email, fullname, role } = result;
    const data = { email, fullname, role, token, refresh_token };
    return {
      err: null,
      data: data,
    };
  }

  return {
    err: { message: "Email or password is wrong!", code: 401 },
    data: null,
  };
};

const refreshToken = async (payload) => {
  const checkRefreshToken = await jwtAuth.verifyRefreshToken(payload);
  if (checkRefreshToken.err) {
    return checkRefreshToken;
  }

  const tokenData = {
    email: checkRefreshToken.data.email,
    fullname: checkRefreshToken.data.fullname,
    role: checkRefreshToken.data.role,
  };
  const token = await jwtAuth.generateToken(tokenData);
  const refresh_token = await jwtAuth.generateRefreshToken(tokenData);
  const data = { token, refresh_token };
  return {
    err: null,
    data: data,
  };
};

module.exports = {
  signIn,
  refreshToken,
};
