import { TOTP } from "totp-generator"

export const checkIsTOTPURL = (url) => {
    const urlPattern = new RegExp('otpauth:\/\/totp\/');
    return urlPattern.test(url);
  };
  

  function parseTOTPUrl(url) {
      const urlParts = url.split('?');
      const prefix = urlParts[0].split('://');
      const protocol = prefix[0];
      const urlBody = prefix[1];
      const parameters = urlParts[1];
  
      const urlComponents = {
          protocol: protocol,
          domain: urlBody.split('/')[0],
          account: urlBody.split('/')[1].split(':')[0],
          email: urlBody.split('/')[1].split(':')[1].split('?')[0],
          parameters: parseParameters(parameters)
      };
  
      return urlComponents;
  }
  
  function parseParameters(parameters) {
      const params = {};
      parameters.split('&').forEach(param => {
          const keyValue = param.split('=');
          params[keyValue[0]] = keyValue[1];
      });
      return params;
  }
  
  export const getTOTP = (url) => {
      if (checkIsTOTPURL(url)) {
          return parseTOTPUrl(url);
      } else {
          return null;
      }
  }

  export const getTOTPToken = (url) => {
    const params = parseTOTPUrl(url).parameters;
    const { otp, expires } = TOTP.generate(params?.secret);
    const expiresInSeconds = Math.floor((expires - Date.now()) / 1000)+1; // Convert milliseconds to seconds
    return { otp, expires: expiresInSeconds };
  }
  