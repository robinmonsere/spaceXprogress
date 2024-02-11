import {createClient} from "@vercel/kv";

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
            Cargo: await kv.get('dragonCargo'),
            Crew: await kv.get('dragonCrew'),
            Starlink: await kv.get('starlink'),
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

async function saveLaunchId(id) {
    try {
        await kv.set('latestLaunchID', id);
    } catch (error) {
        console.error('Error saving launch ID:', error);
    }
}

// Define an async function to save data to the Key-Value store
async function saveData(data) {
    try {
        await kv.set("falcon9", data.F9);
        await kv.set("falconH", data.FH);
        await kv.set("starship", data.Starship);
        await kv.set("dragonCargo", data.Cargo);
        await kv.set("dragonCrew", data.Crew);
        await kv.set("starlink", data.Starlink);
        await kv.set("latestLaunchID", data.latestLaunchID);
    } catch (error) {
        console.error('Error saving data:', error);
    }
}

// Example usage: Retrieve data associated with the key 'myData'
export {getData, saveData, getSavedLaunchID, saveLaunchId}
