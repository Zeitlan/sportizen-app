
export const weatherActions = (object) => {
    return { getWeather: async () => {
        const { dispatch } = object.actions
        const  { position } = object.state
        // Construct the API url to call

        let url = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&units=metric&lang=fr&APPID=79d8299eaf52439691aa531853ba88d1'
        console.log('position : ', position)
        // Call the API, and set the state of the weather forecast
        const response = await fetch(url)
        const weather = await response.json()
        dispatch({weather})
    }}
}