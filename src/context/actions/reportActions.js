export const reportActions = (object) => {
    return {
        getReports: async (radius) => {
            const { dispatch } = object.actions
            // Construct the API url to call
            const { user: { token }, position } =  object.state
            const url = 'https://sportizen.ml/api/reports?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&limit=' + radius
            fetch(url, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
            }).then((response) => response.json())
                .then(json => {
                    dispatch({reports: json})
                })
                .catch((error) => {
                    console.log(error)
                })

            // Call the API, and set the state of the weather forecast
        },
        addReport: async (severity, description, position) => {
            const { user: { token }, current_activity } =  object.state
            const severities = ['slowing', 'annoying', 'blocking']
            const url = 'https://sportizen.ml/api/reports'
            fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
                body: JSON.stringify({
                    severity: severities[severity - 1],
                    description: description,
                    position: position,
                    way_type: current_activity.sport_choice,
                })
            }).then((response) => response.json())
                .then(json => {
                })
                .catch((error) => {
                    console.log(error)
                })

        }
    }
}