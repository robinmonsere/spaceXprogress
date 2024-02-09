import {getLatestLaunch} from "./launch_data.js";
import {launchProgressBar, yearProgressBar} from "./progress_bar.js";
import {getData, getSavedLaunchID, saveData} from "./kv_interface.js";
import {lol} from "./postToX.js";


export async function GET() {
    try {
        let latestLaunch = await getLatestLaunch();
        let latestSavedID = await getSavedLaunchID();
        lol()
        if (latestSavedID === null) {
            await saveData('latestLaunchID', latestLaunch.id)
        } else if (latestLaunch.id === latestSavedID) {
            return new Response(`No new launch. Latest launch ID: ${latestLaunch.id}, latest saved ID: ${latestSavedID}`)
        } else {
            return new Response(`New launch detected! Latest launch ID: ${latestLaunch.id}, latest saved ID: ${latestSavedID}`)
        }
    } catch (error) {
        console.error('error getting latest launch data:', error.message)
        return new Response(`Error getting latest launch data: ${error.message}`)
    }
}