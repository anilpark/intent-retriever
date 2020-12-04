import {IntentRetriever} from '../IntentRetriever'
import {ResponseType} from '../types/response-type'
import {expect} from 'chai'
import sinon = require('sinon')

describe('IntentRetriever class', () => {
  it('Error should be thrown if the instance was created without utterance', () => {
    // @ts-ignore
    expect(() => new IntentRetriever()).to.throw('Instance must be created with utterance')
  })
})

describe('Get topIntent', () => {
  const retriever = new IntentRetriever('rfr')

  before(() => {
    sinon
      .stub(retriever, '_getPrediction')
      .returns(new Promise<ResponseType>((res, rej) => {
        res({
          prediction: {
            topIntent: 'modifyOrder'
          }
        } as ResponseType)
      }))
  })

  it('getIntent method should be defined', () => {
    expect(retriever.getIntent).to.be.not.undefined
  })

  it('should return topIntent', (done) => {
    retriever.getIntent()
      .then(res => {
        expect(res).to.equal('modifyOrder')
        done()
      })
  });
});