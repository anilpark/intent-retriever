import {ResponseType} from './types/response-type'
const requestPromise = require('request-promise')
const queryString = require('querystring')

require('dotenv').config()

const LUIS_APP_ID: string = process.env.LUIS_APP_ID
const LUIS_PREDICTION_KEY: string = process.env.LUIS_PREDICTION_KEY
const LUIS_ENDPOINT: string = process.env.LUIS_ENDPOINT

type QueryParams = {
  'show-all-intents': boolean,
  'verbose': boolean,
  'query': string,
  'subscription-key': string,
}

export class IntentRetriever {
  constructor(utterance: string) {
    if (!utterance || typeof utterance !== 'string') throw Error('Instance must be created with utterance')

    this._queryParams['query'] = utterance
  }

  private _queryParams: QueryParams = {
    'show-all-intents': true,
    'verbose': true,
    'query': '',
    'subscription-key': LUIS_PREDICTION_KEY
  }

  async _getPrediction(): Promise<ResponseType> {
    const URI: string = `${LUIS_ENDPOINT}luis/prediction/v3.0/apps/${LUIS_APP_ID}/slots/production/predict?${queryString.stringify(this._queryParams)}`

    return JSON.parse(await requestPromise(URI))
  }

  async getIntent(): Promise<string> {
    return this._getPrediction()
      .then(res => res.prediction.topIntent)
  }
}