import express from 'express'

import Crawler from './crawler.js'

class API {
  constructor () {
    this.app = express()
    
    this.app.use(express.json())
    this.routes()

    this.init()
  }

  init() {
    this.crawler = new Crawler()

    this.app.listen(3000, () => {
      console.log('Listening on port 3000!')
    })
  }

  routes () {
    this.app.get('/', (req, res) => {
      res.json({
        baseResponse: 'Crawler API Started ⚡'
      })
    })
    this.app.get('/dribbble', async (req, res) => {
      const title = await this.crawler.dribbble()
      
      res.json({
        title
      })
    })
  }
}

export default new API()
