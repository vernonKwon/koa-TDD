const app = require('../src/app')
const assert = require('assert')
const should = require("should")
const request = require("supertest")

const AgentSingleton = require('../module/supertest')
const agent = new AgentSingleton()

describe('게시판 조회', () => {
    it('로그인이 됐을때', (done) => {
        agent.get('/post/list')
            .end((err, res) => {
                assert.equal('200', res.status)
                assert.equal(true, Array.isArray(res.body.postList))

                done()
            })
    })

    it('로그인이 안됐을때', (done) => {
        request(app).get('/post/list')
            .end((err, res) => {
                assert.equal(400, res.status)
                assert.equal('undefined', typeof res.body.postList)
                done()
            })
    })
})

describe('게시글 조회', () => {
    it('로그인이 됐을때', (done) => {
        agent.get('/post/list/1')
            .end((err, res) => {
                assert(200, res.status)
                res.body.post.should.have.properties('seq', 'title', 'content', 'date', 'writer')
                done()
            })
    })

    it('로그인이 안됐을때', (done) => {
        request(app).get('/post/list/1')
            .end((err, res) => {
                assert(400, res.status)
                assert('undefined', typeof res.body.post)
                done()
            })
    })
})

app.close()
