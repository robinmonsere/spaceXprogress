
const base_url = "https://ll.thespacedevs.com/2.2.0/launch/previous/?";
const year = "2024";

const spacecraft_config_id_crew_dragon = "6";
const spacecraft_config_id_cargo_dragon = "7";
const launcher_config_id_falcon_9 = "164";
const launcher_config_id_falcon_heavy = "161";
const launcher_config_id_starship = "464";
const lsp_id = "121";

function getApiData(url) {
    //logger.log('info', `requesting data from: ${url}`)
    return fetch(url)
        .then(response => {
            if (response.ok) {
                //logger.log('info', `response = ok`)
                return response.json();
            } else if (response.status === 429) {
                //logger.log('info', `response != ok`)
                console.log('Rate limit exceeded');
                throw new Error('Rate limit exceeded');
            } else {
                //logger.log('info', `response != ok`)
                return null;
            }
        })
        .catch(error => {
            //logger.log('error', `Error fetching data: ${error.message}`)
            throw new Error(error.message);
        });
}

async function getAllLauncherData() {
    try {

        // Crew Dragon data
        //logger.log('info', 'Getting data for Crew Dragon')
        const crewDragonUrl = `${base_url}spacecraft_config__ids=${spacecraft_config_id_crew_dragon}&year=${year}&limit=1&mode=list`;
        const crewDragonData = await getApiData(crewDragonUrl);
        const crewDragonCount = crewDragonData?.count || 0;

        // Cargo Dragon data
        //logger.log('info', 'Getting data for Cargo Dragon')
        const cargoDragonUrl = `${base_url}spacecraft_config__ids=${spacecraft_config_id_cargo_dragon}&year=${year}&limit=1&mode=list`;
        const cargoDragonData = await getApiData(cargoDragonUrl);
        const cargoDragonCount = cargoDragonData?.count || 0;

        // Falcon 9 data
        //logger.log('info', 'Getting data for Falcon 9')
        const falcon9Url = `${base_url}launcher_config__id=${launcher_config_id_falcon_9}&year=${year}&limit=1&mode=list`;
        const falcon9Data = await getApiData(falcon9Url);
        const falcon9Count = falcon9Data?.count || 0;

        // Falcon Heavy data
        //logger.log('info', 'Getting data for Falcon Heavy')
        const falconHeavyUrl = `${base_url}launcher_config__id=${launcher_config_id_falcon_heavy}&year=${year}&limit=1&mode=list`;
        const falconHeavyData = await getApiData(falconHeavyUrl);
        const falconHeavyCount = falconHeavyData?.count || 0;

        // Starship data
        //logger.log('info', 'Getting data for Starship')
        const starshipUrl = `${base_url}launcher_config__id=${launcher_config_id_starship}&year=${year}&limit=1&mode=list`;
        const starshipData = await getApiData(starshipUrl);
        const starshipCount = starshipData?.count || 0;

        return {
            crew: crewDragonCount,
            cargo: cargoDragonCount,
            F9: falcon9Count,
            FH: falconHeavyCount,
            Starship: starshipCount,
        };
    } catch (error) {
        //logger.log('error',`Error getting launch data: ${error.message}` )
        return {

        };
    }
}

async function getLatestLaunch() {
    try {
        const mostRecentLaunchUrl = `${base_url}lsp__id=${lsp_id}&year=${year}&limit=1`;
        const response = await getApiData(mostRecentLaunchUrl);
        return response.results[0];
    } catch (error) {
        console.log(`Error getting latest launch: ${error.message}`)
        throw new Error(error.message);
    }
}

export { getAllLauncherData, getLatestLaunch }