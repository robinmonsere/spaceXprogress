import {TwitterApi} from "twitter-api-v2";
import {X_CONSUMER_KEY, X_CONSUMER_SECRET, X_ACCESS_TOKEN, X_ACCESS_TOKEN_SECRET, X_BEARER_TOKEN} from "$env/static/private";
import {launchProgressBar, yearPercentageCalc, yearProgressBar} from "./progress_bar.js";


const Rocket = "🚀";
const Dragon = "🐉";
const Astronaut = "🧑‍🚀";
const Package = "📦";
const hourGlass = "⌛";

function lol() {
    const client = new TwitterApi({
        appKey: X_CONSUMER_KEY,
        appSecret: X_CONSUMER_SECRET,
        accessToken: X_ACCESS_TOKEN,
        accessSecret: X_ACCESS_TOKEN_SECRET,
    });

    const twitterClient = client.readWrite;
    twitterClient.v2.tweet("Hello World")
}
async function postToX(launchData) {
    logger.log('info', "posting to X")
    const yearPercentage = yearPercentageCalc();
    const launchBar = launchProgressBar(launchData.total);
    const timeBar = yearProgressBar();

    const firstPost =
        `${Rocket} @SpaceX just launched ${launchData.latest}\n${launchBar} ${launchData.total}/144\n\n${hourGlass} 2024 is ${yearPercentage}% complete\n${timeBar} ${yearPercentage}%`

    const secondPost =
        `The 2024 goal for @SpaceX is 144 launches.\nThis is 46 launches more than 2023.\n\n2024 stats:\n${Rocket} ${launchData.F9}x F9\n${Rocket} ${launchData.FH}x FH\n${Rocket} ${launchData.Starship}x Starship\n${Dragon} ${launchData.cargo + launchData.crew}x Dragon ( ${launchData.crew}x ${Astronaut}, ${launchData.cargo}x ${Package})\nWill #SpaceX complete the 144 launches in 2024?`

    const client = new TwitterApi({
        appKey: X_CONSUMER_KEY,
        appSecret: X_CONSUMER_SECRET,
        accessToken: X_ACCESS_TOKEN,
        accessSecret: X_ACCESS_TOKEN_SECRET,
    });

    const bearer = new TwitterApi(X_BEARER_TOKEN);

    const twitterClient = client.readWrite;
    const twitterBearer = bearer.readOnly;

    const filename = "image.png";
    const uri = launchData.image;

    download(uri, filename, async function(){
        try {
            const mediaId = await twitterClient.v1.uploadMedia("./image.png");
            await twitterClient.v2.tweetThread([
                {text: firstPost, media: { media_ids: [mediaId]}},
                {text: secondPost,},
            ]);
        } catch (e) {
            console.log(e)
        }
    });
}

const download = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        request(uri).pipe(fs.createWriteStream(filename)).on("close", callback);
    });
};

export {postToX, lol}