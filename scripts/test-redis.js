const Redis = require('ioredis');

const redis = new Redis({
  host: '127.0.0.1',
  port: 6379,
});

const initialData = {
  "1702459181837": '{"title":"sunt aut","content":"quia et suscipit suscipit recusandae","updateTime":"2023-12-13T09:19:48.837Z"}',
  "1702459182837": '{"title":"qui est","content":"est rerum tempore vitae sequi sint","updateTime":"2023-12-13T09:19:48.837Z"}',
  "1702459188837": '{"title":"ea molestias","content":"et iusto sed quo iure","updateTime":"2023-12-13T09:19:48.837Z"}'
}

async function test() {
  try {
    console.log('Clearing notes...');
    await redis.del("notes");
    
    console.log('Testing hset with object...');
    await redis.hset("notes", initialData);
    
    console.log('Success!');
    const data = await redis.hgetall("notes");
    console.log('Data:', data);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    redis.quit();
  }
}

test();
