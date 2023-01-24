import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';

// import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

import Team from '../database/models/Team';
import teamMock from '../tests/mocks/teamMock';

describe('Testa a rota teams', () => {

  afterEach(function() { sinon.restore() });
  
  describe('Endpoint GET/teams', () => {
    it('Obtenção de todos os items pelo usuário', async () => {
      sinon.stub(Team, 'findAll').resolves(teamMock as unknown as Team[]);

      const response = await chai
              .request(app)
              .get('/teams');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(teamMock);

    });

    it('Obtenção de um time pelo Id', async () => {
      sinon.stub(Team, 'findByPk').resolves(teamMock[0] as unknown as Team);

      const response = await chai
              .request(app)
              .get('/teams/1');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(teamMock[0]);
    })


  })
})