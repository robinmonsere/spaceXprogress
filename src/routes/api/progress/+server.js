import {getLatestLaunch} from "./launch_data.js";
import {getData, getSavedLaunchID, saveData, saveLaunchId} from "./kv_interface.js";
import {postToX} from "./postToX.js";

const spacecraft_config_id_crew_dragon = 6;
const spacecraft_config_id_cargo_dragon = 7;
const launcher_config_id_falcon_9 = 164;
const launcher_config_id_falcon_heavy = 161;
const launcher_config_id_starship = 464;
const lsp_id = 121;

export async function GET() {
    try {
        let latestLaunch = await getLatestLaunch();
        let latestSavedID = await getSavedLaunchID();
        if (latestSavedID === null) {
            console.log("No saved launch ID found, saving latest launch ID");
            await saveLaunchId(latestLaunch.id);
        } else if (latestLaunch.id === latestSavedID) {
            console.log(`No new launch. Latest launch ID: ${latestLaunch.id}, latest saved ID: ${latestSavedID} \n\n data: ${latestLaunch}`);
            return new Response(`No new launch. Latest launch ID: ${latestLaunch.id}, latest saved ID: ${latestSavedID}`);
        } else {
            console.log('New launch detected!, trying to handle new launch');
            const newLaunchData = await handleNewLaunch(latestLaunch);
            console.log(`Handled new launch, Now trying to post to X`);
            console.log(newLaunchData);
            await postToX(newLaunchData);
            await saveData(newLaunchData);
            return new Response(`New launch detected! Latest launch ID: ${latestLaunch.id}, latest saved ID: ${latestSavedID}`);
        }
    } catch (error) {
        console.error('error:', error.message)
        return new Response(`Error: ${error.message}`)
    }
}

async function handleNewLaunch(launch) {
    let launchData = await getData();
    if (launch.rocket.configuration.id === launcher_config_id_falcon_9) {
        launchData.F9 += 1;

        //Check for Crew or Cargo Dragon
        if (launch.rocket.spacecraft_stage?.spacecraft?.spacecraft_config.id === spacecraft_config_id_crew_dragon) {
            launchData.Crew += 1;
        } else if (launch.rocket.spacecraft_stage?.spacecraft?.spacecraft_config.id === spacecraft_config_id_cargo_dragon) {
            launchData.Cargo += 1;
        } else {
            console.log('No spacecraft detected')
        }
    } else if (launch.rocket.configuration.id === launcher_config_id_falcon_heavy) {
        launchData.FH += 1;
    } else if (launch.rocket.configuration.id === launcher_config_id_starship) {
        launchData.Starship += 1;
    }
    return finalizeData(launchData, launch)
}

function finalizeData(launchData, launch) {
    launchData.total = launchData.F9 + launchData.FH;
    launchData.latest = launch.name;
    launchData.image = launch.image;
    launchData.latestLaunchID = launch.id;
    return launchData
}