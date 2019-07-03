/* eslint-disable linebreak-style */

const get_date = () => {
    var today = new Date()
    var dd = String(today.getDate()).padStart(2, '0')
    var mm = String(today.getMonth() + 1).padStart(2, '0')
    var yyyy = today.getFullYear()
    
    return dd + '/' + mm + '/' + yyyy
}

_fillData = (data) => { // readjust data depending of the date: data = [[{}]], each data of the same data are in the same array 
    let dateval = []
    let new_data = []

    Array.prototype.forEach.call(data, (element, index) => {
        if (dateval.find((date) => {
            return date === element.created_at // meaning no date was found in the array, so we have to create a new array containing all activty from this date
        }) == undefined)
        {
            dateval.push(element.created_at)
            new_data = [...new_data, [element]]
        }
        else {
            new_data[new_data.length - 1].push(element)
        }
    })
    return new_data
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
                    dispatch({historyActions: _fillData(json)})
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
