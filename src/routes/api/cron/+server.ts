import {createClient} from "@vercel/kv";
// @ts-ignore
import { KV_REST_API_URL, KV_REST_API_TOKEN } from '$env/static/private';

const kv = createClient({
    url: KV_REST_API_URL,
    token: KV_REST_API_TOKEN,
});



// @ts-ignore
async function getData() {
    return {
        F9: await kv.get('F9')
    }
}

async function setData(data:number) {
   await kv.set('F9', data)
}

export async function GET() {
    let number = 0;
    await getData().then((data) => {
        // @ts-ignore
        number = data.F9 + 1;
    })
    await setData(number)
    return new Response(`Hello cron with data: ${number}!`);
}