import redis from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.clientGet = promisify(this.client.get).bind(this.client);
    this.clientSetEx = promisify(this.client.setex).bind(this.client);
    this.clientDel = promisify(this.client.del).bind(this.client);
  }
  
  isAlive() {
    return this.client.connected;
  }

  async set(key, value, duration) {
    return await this.clientSetEx(key, duration, value);
  }

  async get(key) { 
    return await this.clientGet(key);
  }

  async del() {
    return await this.clientDel(key);
  }
}
const redisClient = new RedisClient();
module.exports = redisClient;
