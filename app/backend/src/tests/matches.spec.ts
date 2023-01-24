import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Match';
import matchesMock from './mocks/matchesMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota /matches', () => {

  afterEach(function() { sinon.restore() });

  describe('Testa o método GET na rota /matches', () => {
    it('Obtenção de todos os dados pelo usuário', async () => {
      sinon.stub(Match, 'findAll').resolves(matchesMock as unknown as Match[]);

      const response = await chai
              .request(app)
              .get('/matches');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(matchesMock);
    })
  })
})