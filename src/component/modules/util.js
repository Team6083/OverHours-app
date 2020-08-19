export function secondToString(sec) {
    const day = 60 * 60 * 24;
    const hr = 60 * 60;
    const min = 60;

    let out = "";
    if (sec / day >= 1) {
        let calc = Math.floor(sec / day);
        out += calc + "d ";
        sec = sec - calc * day;
    }
    if (sec / hr >= 1) {
        let calc = Math.floor(sec / hr);
        out += calc + "h ";
        sec = sec - calc * hr;
    }
    if (sec / min >= 1) {
        let calc = Math.floor(sec / min);
        out += calc + "m ";
        sec = sec - calc * min;
    }
    out += sec + "s";

    return out;
}