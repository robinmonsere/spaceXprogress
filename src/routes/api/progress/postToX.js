import {TwitterApi} from "twitter-api-v2";
import {X_CONSUMER_KEY, X_CONSUMER_SECRET, X_ACCESS_TOKEN, X_ACCESS_TOKEN_SECRET, X_BEARER_TOKEN} from "$env/static/private";
import {launchProgressBar, yearPercentageCalc, yearProgressBar} from "./progress_bar.js";
import axios from "axios";
import imageType from "image-type";


const Rocket = "🚀";
const Dragon = "🐉";
const Astronaut = "🧑‍🚀";
const Package = "📦";
const hourGlass = "⌛";

async function postToX(launchData) {
    const yearPercentage = yearPercentageCalc();
    const launchPercentage = Math.floor((launchData.total / 148) * 100);
    const launchBar = launchProgressBar(launchData.total);
    const timeBar = yearProgressBar();

    const firstPost =
        `${Rocket} @SpaceX just launched ${launchData.latest}\n${launchBar} ${launchData.total}/148 (${launchPercentage}%)\n\n${hourGlass} 2024 is ${yearPercentage}% complete\n${timeBar} ${yearPercentage}%`

    const secondPost =
        `The 2024 goal for @SpaceX is 148 launches.\nThis is 50 launches more than 2023.\n\n2024 stats:\n${Rocket} ${launchData.F9}x F9\n${Rocket} ${launchData.FH}x FH\n${Rocket} ${launchData.Starship}x Starship\n${Dragon} ${launchData.Cargo + launchData.Crew}x Dragon ( ${launchData.Crew}x ${Astronaut}, ${launchData.Cargo}x ${Package})\nWill #SpaceX complete the 148 launches in 2024?`

    const client = new TwitterApi({
        appKey: X_CONSUMER_KEY,
        appSecret: X_CONSUMER_SECRET,
        accessToken: X_ACCESS_TOKEN,
        accessSecret: X_ACCESS_TOKEN_SECRET,
    });

    const twitterClient = client.readWrite;

    const uri = launchData.image;

    try {
        // Fetch image data
        const response = await axios.get(uri, { responseType: 'arraybuffer' });
        const imageData = response.data;

        // Detect MIME type
        const mimeTypeResult = await imageType(imageData);
        const mimeType = mimeTypeResult.mime;
        console.log(`img MimeType: ${mimeType}`);

        // Upload media to Twitter
        const mediaId = await client.v1.uploadMedia(imageData, { mimeType: mimeType });

        console.log(`Media ID: ${mediaId}`);

        // Tweet thread
        await twitterClient.v2.tweetThread([
            { text: firstPost, media: { media_ids: [mediaId] } },
            { text: secondPost }
        ]);
    } catch (error) {
        console.error('Error uploading media:', error);
        throw new Error(error.message);
    }

}


export {postToX}