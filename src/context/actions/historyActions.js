/* eslint-disable linebreak-style */

const get_date = () => {
    var today = new Date()
    var dd = String(today.getDate()).padStart(2, '0')
    var mm = String(today.getMonth() + 1).padStart(2, '0')
    var yyyy = today.getFullYear()
    
    return dd + '/' + mm + '/' + yyyy
} 

export const historyActions = (object) =>{ 
    return {
        getHistory: async () => {
            const { dispatch } = object.actions
            const { user: { token }} =  object.state
            const url = 'https://sportizen.ml/api/activities'
            return fetch(url, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token
                }
            }).then((response) => response.json())
                .then(json => {
                    console.log('json is ', json)
                    dispatch({historyActions: json})
                })
                .catch((error) => {
                    console.log(error)
                })
        },

        postHistory : async (way_type) => { //FIXME
            console.log('way_type is : ', way_type)
            const { dispatch } = object.actions
            const { user: { token }} =  object.state
            const url = 'https://sportizen.ml/api/activities'
            fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
                body: JSON.stringify({
                    created_at: get_date(),
                    favorite: false,
                    duration: {
                        seconds: 10,
                        minutes: 49,
                        hours: 3,
                        days: 17
                    },
                    distance: 31,
                    points: [],
                    way_type: way_type
                })
            }).then((response) => {console.log('response is: ', response); return response.json()})
                .then(json => {
                    console.log('json is: ', json)
                })
                .catch((error) => {
                    console.log(error)
                })
        },

        refresh_data: (new_data_array) => {
            const { dispatch } = object.actions
            console.log('new data array', new_data_array)
            dispatch({historyActions : new_data_array})
        }
    }
}
