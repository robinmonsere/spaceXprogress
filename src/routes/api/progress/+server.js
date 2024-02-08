import {getLatestLaunch} from "./LaunchData.js";


export async function GET() {
    let number = 0;
    let test = await getLatestLaunch()
    return new Response(`Hello cron with data: ${test.count}!`);
}