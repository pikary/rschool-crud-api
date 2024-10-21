import {createServer} from 'http'
import request from 'supertest';
import server from '../../app';

describe('User api tests', ()=>{
  it('should return array', async()=>{
    const result = await request(server).get('/api/users')
    expect(result.status).toBe(200)
    expect(result.body).toBe([])

  })

})