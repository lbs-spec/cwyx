// Cloudflare Pages Function: 腾讯K线代理（港股）
// 路由: GET /api/kline-tencent?symbol=hk01772&ktype=day
export async function onRequest(context) {
  const url = new URL(context.request.url);
  const symbol = url.searchParams.get('symbol') || 'hk01772';
  const ktype = url.searchParams.get('ktype') || 'day';

  const res = await fetch(
    `https://web.ifzq.gtimg.cn/appstock/app/fqkline/get?param=${symbol},${ktype},,,320,qfq`,
    {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'https://gu.qq.com/',
      },
    }
  );
  const data = await res.json();

  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 's-maxage=60',
    },
  });
}
