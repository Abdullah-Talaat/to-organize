export default function dif(date1, date2, form = "-") {
    const [y1, m1, d1] = date1.split(form)
    const [y2, m2, d2] = date2.split(form)
    const dt1 = new Date(y1, m1 - 1, d1)
    const dt2 = new Date(y2, m2 - 1, d2)
    const diffTime = dt1 - dt2
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
}
export function toT(dif) {
    let res = ""
    switch (dif) {
        case 0:
            res = "today"
            break
        case 1:
            res = "yesterday"
            break
        case -1:
            res = "tomorrow"
            break
        default:
            break
    }
    if (dif < -1) {
        res = `${-dif} days after` 
    } else if (dif > 1) {
        res = `${dif} days before`
    }
    return res
}
const date = new Date
export const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`