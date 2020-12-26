const app = require('../src/app')
const request = require("supertest")

let agent;
class AgentSingleton {
    constructor() {
        if (!agent) {
            agent = request.agent(app)
        }
        return agent
    }
}

module.exports = AgentSingleton
