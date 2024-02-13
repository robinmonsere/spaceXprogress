import {createClient} from "@vercel/kv";
// @ts-ignore
import { KV_REST_API_URL, KV_REST_API_TOKEN } from '$env/static/private';

const kv = createClient({
     url: KV_REST_API_URL,
     token: KV_REST_API_TOKEN,
});

export async function load() {
     return {
          F9: await kv.get('falcon9'),
          FH: await kv.get('falconH'),
          Starship: await kv.get('starship'),
          Crew: await kv.get('dragonCrew'),
          Cargo: await kv.get('dragonCargo'),
     }
}
