export type ResponseType = {
  query: string,
  prediction: PredictionType
}

type PredictionType = {
  topIntent: string,
  intents: Object,
  entities: Object
}