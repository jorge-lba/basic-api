import express from 'express'
import axios from 'axios'
import cors from 'cors'

const app = express()

app.use(cors())

app.get('/:nickname', async (request, response) => {
  try {
    const {nickname}  = request.params
  
    const  [profile, repositories] = await Promise.all([
      axios.get(`https://api.github.com/users/${nickname}`), 
      axios.get(`https://api.github.com/users/${nickname}/repos`)
    ])
  
    const repositoriesInfos = repositories.data.map((repository: any) => ({
      name: repository.name,
      description: repository.description,
      url: repository.html_url
    }))
  
    return response.status(200).json({
      profileIndo:{name: profile.data.name},
      repositoriesInfos
    })
  } catch (error) {
    return response.status(400).json({
      //@ts-ignore
      error: error.message
    })
  }
})

app.listen(3333, () => {
  console.log('Server on')
})