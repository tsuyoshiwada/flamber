"use strict";

import fetch from "isomorphic-fetch";
import queryString from "query-string";
import openPopup from "../utils/popup";
import checkStatus from "../utils/check-status";

export const AUTH_VALIDATE_ENDPOINT = "/auth/validate";


function listenForCredentials(popup, resolve, reject) {
  let params = {};

  try {
    params = queryString.parse(popup.location.search);
  } catch (err) {}

  if (params.code) {
    popup.close();
    fetch(`${AUTH_VALIDATE_ENDPOINT}?code=${params.code}`, {
        credentials: "include"
      })
      .then(checkStatus)
      .then(res => res.json())
      .then(res => {
        if (res.status === "ok") {
          resolve(res.token);
        } else {
          reject({error: res.err});
        }
      })
      .catch(error => reject({error}));

  } else if (popup.closed) {
    reject({error: "cancel"});

  } else {
    setTimeout(() => {
      listenForCredentials(popup, resolve, reject);
    }, 0);
  }
}

export function authenticate(url) {
  return new Promise((resolve, reject) => {
    const popup = openPopup(url, "googleauthpopup");
    listenForCredentials(popup, resolve, reject);
  });
}
