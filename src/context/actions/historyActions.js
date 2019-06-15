/* eslint-disable linebreak-style */
export const historyActions = (object) => {
    return {
        getHistory: async (range) => {
            const { dispatch } = object.actions
            const { user: { token }} =  object.state
            const url = 'https://sportizen.ml/api/activities'
            fetch(url, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token
                }
            }).then((response) => response.json())
                .then(json => {
                    console.log(json)
                    //dispatch({historyActions: json})
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
}