import { getDrive } from "./drive";

export function fetchUser(oauth2Client, token) {
  return new Promise((resolve, reject) => {
    const drive = getDrive(oauth2Client, token);

    drive.about.get({
      fields: "user, storageQuota"
    }, (err, res) => {
      if (err) {
        reject(err);

        return;
      }

      resolve(Object.assign({}, res.user, res.storageQuota));
    });
  });
}

export function fetchToken(oauth2Client, code) {
  return new Promise((resolve, reject) => {
    oauth2Client.getToken(code, (err, token) => {

      /* eslint-disable no-console */
      if (err) {
        console.log("Error while trying to retrieve access token", err);
        reject(err);

        return;
      }
      /* eslint-enable no-console */

      resolve(token);
    });
  });
}

export default function verifyAuth(oauth2Client, code) {
  return new Promise((resolve, reject) => {
    let token = null;

    fetchToken(oauth2Client, code)
      .then(_token => {
        token = _token;

        return fetchUser(oauth2Client, token);
      })
      .then(user => {
        resolve({ user, token });
      })
      .catch(err => reject({ error: err }));
  });
}

export function refreshAccessToken(oauth2Client, expiryDate) {
  return new Promise((resolve, reject) => {
    if (!expiryDate || new Date() <= new Date(expiryDate)) {
      resolve();

      return;
    }

    oauth2Client.refreshAccessToken((err, tokens) => {
      if (err) {
        return reject(err);
      }

      resolve(tokens);
    });
  });
}