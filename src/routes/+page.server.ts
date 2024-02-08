import {createClient} from "@vercel/kv";
// @ts-ignore
import { KV_REST_API_URL, KV_REST_API_TOKEN } from '$env/static/private';

const kv = createClient({
     url: KV_REST_API_URL,
     token: KV_REST_API_TOKEN,
});

//kv.set('F9', 8);

// @ts-ignore
export async function load({ locals }) {
     return {
          F9: await kv.get('F9')
     }
}