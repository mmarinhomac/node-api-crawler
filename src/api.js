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
    const port = process.env.PORT || 3000
    this.app.listen(port, () => {
      console.log(`Listening on port ${port}!`)
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
