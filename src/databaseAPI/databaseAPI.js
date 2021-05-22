import { database } from '../firebase'

let globalData = []

const exportData = () => {
    pullDummyData()
    return globalData
}

const pullDummyData = () => {
    let ref = database.ref('emailLists')

    ref.on('value', gotData, errData)
}

const gotData = (data) => {
    let emailLists = data.val()
    let keys = Object.keys(emailLists)
    globalData = keys
    console.log(keys)
}

const errData = (err) => {
    console.log("ERROR: ")
    console.log(err)
}

export default exportData