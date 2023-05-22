import { readTextFile } from 'https://deno.land/x/read_file/mod.ts';

// 从本地读取bg_music.mp3文件
const musicBuffer = await Deno.readFile('bg_music.mp3');

// 从本地读取index.html文件
const htmlContent = await readTextFile('index.html');

// 创建一个HTTP服务器
const server = Deno.listen({ port: 8000 });

console.log('Server is running at http://localhost:8000/');

// 接受客户端请求
for await (const conn of server) {
  // 在每个连接上创建一个新的HTTP连接处理程序
  (async () => {
    const httpConn = Deno.serveHttp(conn);

    for await (const requestEvent of httpConn) {
      const { request, respondWith } = requestEvent;
      const { method, url } = request;

      // 处理根路径的请求
      if (url === '/') {
        // 将index.html作为响应内容
        const headers = new Headers();
        headers.set('Content-Type', 'text/html');
        respondWith(new Response(htmlContent, { status: 200, headers }));
      }

      // 处理bg_music.mp3的请求
      if (url === '/bg_music.mp3') {
        // 将bg_music.mp3作为响应内容
        const headers = new Headers();
        headers.set('Content-Type', 'audio/mpeg');
        respondWith(new Response(musicBuffer, { status: 200, headers }));
      }
    }
  })();
}