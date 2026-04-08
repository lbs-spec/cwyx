// Cloudflare Pages Function: 新浪K线代理（A股）
// 路由: GET /api/kline?symbol=sz002460&scale=240&datalen=300
export async function onRequest(context) {
  const url = new URL(context.request.url);
  const params = new URLSearchParams();
  params.set('symbol', url.searchParams.get('symbol') || '');
  params.set('scale', url.searchParams.get('scale') || '240');
  params.set('ma', 'no');
  params.set('datalen', url.searchParams.get('datalen') || '300');

  const res = await fetch(
    `https://money.finance.sina.com.cn/quotes_service/api/json_v2.php/CN_MarketData.getKLineData?${params}`,
    {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'https://finance.sina.com.cn/',
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
