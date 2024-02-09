const darkShade = "█";
const lightShade = "░";
const totalLaunchGoal = 148

function calculateBar(percentage) {
    const nDark = Math.floor(percentage / 5);
    const nLight = 20 - nDark;
    return darkShade.repeat(nDark) + lightShade.repeat(nLight);
}

function launchProgressBar(launchesPast) {
    let percentage = (launchesPast/totalLaunchGoal) * 100;
    return calculateBar(Math.floor(percentage));
}

function yearProgressBar() {
    return calculateBar(yearPercentageCalc());
}

function yearPercentageCalc() {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const endOfYear = new Date(now.getFullYear() + 1, 0, 1);

    const totalDays = (endOfYear - startOfYear) / (1000 * 60 * 60 * 24);
    const daysPassed = (now - startOfYear) / (1000 * 60 * 60 * 24);
    const percentagePassed = (daysPassed / totalDays) * 100;

    return Math.floor(percentagePassed)
}

export {yearProgressBar, launchProgressBar, yearPercentageCalc}