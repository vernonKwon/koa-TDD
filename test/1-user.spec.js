const app = require('../src/app')
const assert = require('assert')
const should = require("should")
const request = require('supertest')

const AgentSingleton = require('../module/supertest')
const agent = new AgentSingleton()

describe('로그인 테스트', () => {
    it('로그인 요청', (done) => {
        agent.post('/auth/signin')
            .send({ id: "idb", pw: "pwb" })
            .end((err, res) => {
                assert.equal('success', res.body.status)
                done()
            })
    })
})

describe('내 정보 조회', () => {
    it('로그인 됐을 때', (done) => {
        agent.get('/auth/myinfo')
            .end((err, res) => {
                res.body.should.have.properties('id', 'name', 'userKey', 'nickname')
                done()
            })
    })

    it('로그인 안됐을 때', done => {
        request(app).get('/auth/myinfo')
            .end((err, res) => {
                assert.equal(400, res.status)
                done()
            })
    })
})
