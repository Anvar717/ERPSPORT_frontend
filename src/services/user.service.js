import ApiService from './api.service'
import {TokenService} from './storage.service'


class AuthenticationError extends Error {
  constructor(errorCode, message) {
    super(message)
    this.name = this.constructor.name
    this.message = message
    this.errorCode = errorCode
  }
}

const UserService = {
  /**
   * Login the user and store the access token to TokenService.
   *
   * @returns access_token
   * @throws AuthenticationError
   **/
  login: async function (username, password) {
    const requestData = {
      method: 'post',
      url: '/Account/GenerateToken',
      data: {
        Username: username,
        Password: password
      }
    };

    try {
      const response = await ApiService.customRequest(requestData)
      TokenService.saveToken(response.data.token)
      TokenService.saveRefreshToken(response.data.token);
      TokenService.setUserInfo(response.data.userinfo);
      TokenService.setLocale(response.data.userinfo.Lang);
      ApiService.setHeader();

      ApiService.mount401Interceptor();

      return response.data;
    } catch (error) {
      throw new AuthenticationError(error.response.status, error.response.data.detail)
    }
  },
  loginEsp: async function (signedData) {
    const requestData = {
      method: 'post',
      url: '/Account/GenerateToken',
      data: {
		  signedData: signedData,
      }
    };

    try {
      const response = await ApiService.customRequest(requestData)
      TokenService.saveToken(response.data.token)
      TokenService.saveRefreshToken(response.data.token)
      TokenService.setUserInfo(response.data.userinfo);
      TokenService.setLocale(response.data.userinfo.Lang);
      ApiService.setHeader();

      ApiService.mount401Interceptor();

      return response.data;
    } catch (error) {
      throw new AuthenticationError(error.response.status, error.response.data.detail)
    }
  },

  loginByToken(token) {
    TokenService.saveToken(token)
    ApiService.setHeader()

    ApiService.mount401Interceptor();

    return token
  },
  /**
   * Refresh the access token.
   **/
  refreshToken: async function () {
    const requestData = {
      method: 'get',
      url: '/Account/RefreshToken'
    };

    try {
      const response = await ApiService.customRequest(requestData)
      TokenService.saveToken(response.data.token)
      TokenService.saveRefreshToken(response.data.token);
      TokenService.setUserInfo(response.data.userinfo);
      TokenService.setLocale(response.data.userinfo.Lang);
     
      return response.data;
    } catch (error) {
      throw new AuthenticationError(error.response.status, error.response.data.detail)
    }
  },

  /**
   * Logout the current user by removing the token from storage.
   *
   * Will also remove `Authorization Bearer <token>` header from future requests.
   **/
  logout() {
    // Remove the token and remove Authorization header from Api Service as well
    TokenService.removeToken();
    TokenService.removeLocale();
    TokenService.removeRefreshToken();
    //TokenService.removeMenuMinimize();
    ApiService.removeHeader();
    TokenService.removeUserInfo();

    ApiService.unmount401Interceptor()
  }
}

export default UserService

export {UserService, AuthenticationError}
