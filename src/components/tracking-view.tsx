"use client";
import {useEffect,useState} from "react";
type Data={order_reference:string;status:string;created_at:string;shipment?:{carrier:string;tracking_number:string;tracking_url:string|null;shipped_at:string;delivered_at:string|null}|null;events:{status:string;note:string|null;created_at:string}[]};
export default function TrackingView({token}:{token:string}){
 const [data,setData]=useState<Data|null>(null),[error,setError]=useState("Loading secure tracking…");
 useEffect(()=>{let live=true;fetch("/api/tracking?token="+encodeURIComponent(token),{cache:"no-store"}).then(async r=>{const d=await r.json();if(!r.ok)throw new Error(d.error==="tracking_not_found"?"Tracking link is invalid or unavailable.": "Tracking service is temporarily unavailable.");if(live){setData(d);setError("");}}).catch(e=>{if(live)setError(e instanceof Error?e.message:"Tracking unavailable");});return()=>{live=false};},[token]);
 if(!data)return <p role="status">{error}</p>;
 return <section className="tracking-panel"><h2>{data.order_reference}</h2><p className="order-pill">{data.status.replaceAll("_"," ")}</p>{data.shipment&&<div><p><strong>Courier:</strong> {data.shipment.carrier}</p><p><strong>Tracking number:</strong> {data.shipment.tracking_number}</p>{data.shipment.tracking_url&&<a href={data.shipment.tracking_url} target="_blank" rel="noreferrer">Open courier tracking ↗</a>}</div>}<h3>Order timeline</h3><ol>{data.events.map((e,i)=><li key={i}><strong>{e.status}</strong><span>{new Date(e.created_at).toLocaleString()}</span>{e.note&&<p>{e.note}</p>}</li>)}</ol></section>;
}
