const Redis = require('ioredis');

const redis = new Redis({
  host: '127.0.0.1',
  port: 6379,
});

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
*最后更新于: ${new Date().toLocaleString()}*
`,
  updateTime: new Date().toISOString()
};

async function seed() {
  try {
    console.log('正在连接 Redis...');
    const id = '1744267070091';
    await redis.hset("notes", id, JSON.stringify(markdownNote));
    console.log('Markdown 示例笔记已成功添加到 Redis！');
    console.log('ID: ' + id);
  } catch (err) {
    console.error('发生错误:', err);
  } finally {
    process.exit();
  }
}

seed();
