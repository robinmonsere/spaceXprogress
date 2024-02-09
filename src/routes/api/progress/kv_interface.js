import {createClient, kv} from "@vercel/kv";

import { KV_REST_API_URL, KV_REST_API_TOKEN } from '$env/static/private';
//console.log(KV_REST_API_TOKEN)

const kv = createClient({
    url: KV_REST_API_URL,
    token: KV_REST_API_TOKEN,
});

// Define an async function to retrieve data from the Key-Value store
async function getData() {
    try {
        return {
            F9: await kv.get('falcon9'),
            FH: await kv.get('falconH'),
            Starship: await kv.get('starship'),
            cargo: await kv.get('dragonCargo'),
            crew: await kv.get('dragonCrew'),
            starlink: await kv.get('starlink'),
        };
    } catch (error) {
        console.error('Error retrieving data:', error);
    }
}

async function getSavedLaunchID() {
    try {
       return await kv.get('latestLaunchID');
    } catch (error) {
        console.error('error getting saved launch ID', error)
    }
}

// Define an async function to save data to the Key-Value store
async function saveData(key, value) {
    try {
        await kv.set(key, value);
    } catch (error) {
        console.error('Error saving data:', error);
    }
}

// Example usage: Retrieve data associated with the key 'myData'
export {getData, saveData, getSavedLaunchID}
