import * as types from './types';

import rix from './helpers/rix';
import { getCurrencyBalance } from './accounts';

const { Api, JsonRpc, RpcError } = require('@arisencore/js');
const { JsSignatureProvider } = require('@arisencore/js/dist/rixjs-jssig');      // development only
const fetch = require('node-fetch');                                    // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require('util');
const rpc = new JsonRpc('https://greatchains.arisennodes.io', { fetch });

const axios = require('axios');

export function transfer(from, to, quantity, memo, symbol = 'RIX', private_key) {

  const defaultPrivateKey = private_key; // bob
  const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);

  const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

  return (dispatch: () => void, getState) => {
    const {
      balances,
      connection
    } = getState();
    dispatch({
      type: types.SYSTEM_TRANSFER_PENDING
    });
    try {
       axios.post(`http://51.15.78.253:3001/avote/transfer`,{
        from:from,
        to:to,
        quantity:quantity,
        memo:memo,
        private_key:private_key
      })
      .then(function (response) {
        var tx = response.data.result;

        dispatch(getCurrencyBalance(from));
        return dispatch({
          payload: { tx },
          type: types.SYSTEM_TRANSFER_SUCCESS
        });
      })
      .catch(function (error) {
        var err = error.response.data.error.json.error;
        dispatch({
          payload: { err },
          type: types.SYSTEM_TRANSFER_FAILURE
        })
      });
 
    } catch (err) {
      return dispatch({
        payload: { err },
        type: types.SYSTEM_TRANSFER_FAILURE
      });
    }
  };
}

export default {
  transfer
};
