import Redis from 'ioredis'

const globalForRedis = global;

const redis = globalForRedis.redis || new Redis({
  host: '127.0.0.1',
  port: 6379,
});

if (process.env.NODE_ENV !== "production") globalForRedis.redis = redis;

// 初始化示例笔记
async function initializeSampleNote() {
  try {
    const notes = await redis.hgetall("notes");
    const noteCount = Object.keys(notes || {}).length;
    
    if (noteCount === 0) {
      console.log('检测到笔记数量为0，正在添加 Markdown 示例笔记...');
      const id = Date.now().toString();
      const markdownNote = {
        title: "Markdown 语法示例",
        content: `# 欢迎使用 Markdown 笔记

这是一段测试内容，展示了常用的 Markdown 语法。

## 1. 文本样式
- **加粗文本**
- *斜体文本*
- ~~删除线~~
- \`行内代码\`

## 2. 列表
1. 第一项
2. 第二项
3. 第三项

## 3. 代码块
\`\`\`javascript
function helloWorld() {
  console.log("Hello, Markdown!");
}
\`\`\`

## 4. 引用
> 这是一个引用区块。
> 它可以包含多行文字。

## 5. 图片
![示例图片](https://lishhsx6kmthaacj.public.blob.vercel-storage.com/delivered-web-apps-min.svg)
![示例图片](https://lishhsx6kmthaacj.public.blob.vercel-storage.com/delivered-commerce-min.svg)

---
*最后更新于: ${new Date().toLocaleString('zh-CN')}*
`,
        updateTime: new Date().toISOString()
      };
      
      await redis.hset("notes", id, JSON.stringify(markdownNote));
      console.log('Markdown 示例笔记已自动添加！ID:', id);
    }
  } catch (err) {
    console.error('初始化示例笔记失败:', err);
  }
}

// 在 Redis 连接成功
redis.on('connect', async () => {
  console.log('Redis connected');
});

redis.on('error', (err) => {
  console.error('Redis error:', err);
});

export async function getAllNotes() {
  await initializeSampleNote();
  const data = await redis.hgetall("notes");
  return data || {};
}

export async function addNote(data) {
  const uuid = Date.now().toString();
  await redis.hset("notes", uuid, data);
  return uuid
}

export async function updateNote(uuid, data) {
  await redis.hset("notes", uuid, data);
}

export async function getNote(uuid) {
  return JSON.parse(await redis.hget("notes", uuid));
}

export async function delNote(uuid) {
  return redis.hdel("notes", uuid)
}

export default redis
