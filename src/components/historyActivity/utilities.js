/* eslint-disable linebreak-style */

/**
 * convert distance in meter too km and meters
 * @param {distance in meter} distance_m 
 */

export const _distance_converter_to_format = (distance_m) => {
    if (distance_m === undefined)
        return '0,00'
    const km = Math.floor(distance_m / 1000)
    const m = Math.floor(distance_m % 1000)
    return km.toString() + ',' + ((m < 10)? '0' + m.toString() : m.toString())
}

/**
 * convert an object to seconds integer
 * @param {* object with hours, min, days, seconds} object 
 */

export const _time_converter_to_sec = (object) => {
    if (object === null || object === undefined)
        return 0
    const days = object.days
    const hours = object.hours
    const min = object.minutes
    const seconds = object.seconds

    return (((seconds != undefined)? seconds : 0) + ((days != undefined)? days * 86400 : 0) + 
        ((hours != undefined)? hours * 3600 : 0) + ((min != undefined)? min * 60 : 0))
}
/**
 * convert seconds amount to HH:MM:SS
 * @param {*} seconds 
 */
export const _convert_second_to_format = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    let remainder = seconds - hours * 3600
    const mins = Math.floor(remainder / 60)
    remainder = remainder - mins * 60
    const secs = Math.floor(remainder)

    const hours_format = (hours < 10)? '0' + hours.toString() : hours.toString()
    const mins_format = (mins < 10)? '0' + mins.toString() : mins.toString()
    const secs_format = (secs < 10)? '0' + secs.toString() : secs.toString()
    return hours_format + ':' + mins_format + ':' + secs_format
}

/**
 * convert m/sec into km/h
 * @param {speed in m/s} time 
 */
export const _convert_m_sec_to_km_h_format = (speed) => {
    const speed_in_km_h = (speed * 3.6).toString()
    let separator_array = speed_in_km_h.split('.')
    if (separator_array.length === 2)
    {
        separator_array[1] = (separator_array[1].length === 1)? separator_array[1] + '0' : separator_array[1].substring(0, 2)
        return separator_array[0] + ':' + separator_array[1]
    }
    return separator_array[0] + ':00' 
}

/**
 * switch background color for date and summary activity
 * @param { current array index} indice_array 
 * @param { array length } dateDateLength 
 */

export const getBackground = (indice_array, dateDateLength) => {
    if (indice_array % dateDateLength == 0){
        return {backgroundColor : '#1E90FF'}
    } // red
    else if (indice_array % dateDateLength == 1)
        return {backgroundColor: 'purple'}
    else if (indice_array % dateDateLength == 2)
        return {backgroundColor: 'red'} // yellow
    else if (indice_array % dateDateLength == 3)
        return {backgroundColor: 'green'}
    else if (indice_array % dateDateLength == 4)
        return {backgroundColor: '#D3D366'}
}
