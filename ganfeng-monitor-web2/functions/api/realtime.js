// Cloudflare Pages Function: 新浪实时行情代理
// 路由: GET /api/realtime?symbols=sz002460,rt_hk01772
export async function onRequest(context) {
  const url = new URL(context.request.url);
  const symbols = url.searchParams.get('symbols') || '';

  const res = await fetch(`https://hq.sinajs.cn/list=${symbols}`, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Referer': 'https://finance.sina.com.cn/',
    },
  });
  const buf = await res.arrayBuffer();
  let text;
  try {
    text = new TextDecoder('gbk').decode(buf);
  } catch (e) {
    text = new TextDecoder('utf-8').decode(buf);
  }

  return new Response(text, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 's-maxage=5',
    },
  });
}
