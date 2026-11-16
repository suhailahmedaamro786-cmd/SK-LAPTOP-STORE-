export const runtime = "nodejs";
export async function GET(request: Request) {
 const api=process.env.STORE_API_URL;
 if(!api)return Response.json({error:"tracking_not_configured"},{status:503});
 const token=new URL(request.url).searchParams.get("token")??"";
 if(!/^[A-Za-z0-9_-]{16,128}$/.test(token))return Response.json({error:"tracking_not_found"},{status:404});
 try{const upstream=await fetch(new URL("/api/public/track?token="+encodeURIComponent(token),api),{cache:"no-store"});return new Response(await upstream.text(),{status:upstream.status,headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}});}
 catch{return Response.json({error:"tracking_unavailable"},{status:503});}
}
