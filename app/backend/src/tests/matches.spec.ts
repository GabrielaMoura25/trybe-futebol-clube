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

  describe('Testa método GET na rota /matches?inProgress=true', () => {
    it('Obtenção de todas as partidas que estão em progresso', async () => {

      const matchesInProgress = matchesMock.filter((match) => match.inProgress === true);

      sinon.stub(Match, "findAll").resolves(matchesInProgress as unknown as Match[]);

      const response = await chai
              .request(app)
              .get('/matches?inProgress=true');


      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(matchesInProgress);
    });

    it('Obtenção de todas as partidas que estão finalizadas', async () => {

      const matchesFinished = matchesMock.filter((match) => match.inProgress === false);

      sinon.stub(Match, "findAll").resolves(matchesFinished as unknown as Match[]);

      const response = await chai
              .request(app)
              .get('/matches?inProgress=false');


      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(matchesFinished);
    });
  });
})