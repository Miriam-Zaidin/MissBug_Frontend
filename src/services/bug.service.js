import Axios from 'axios'

var axios = Axios.create({
    withCredentials: true,
})

const BASE_URL = '//localhost:3030/api/bug/'

export const bugService = {
    query,
    getById,
    remove,
    save,
    getDefaultFilter
}

async function query(filterBy = {}) {
    // const queryParams =
    //     `?txt=${filterBy.txt}&minSpeed=${filterBy.minSpeed}&pageIdx=${filterBy.pageIdx}`
    var { data: bugs } = await axios.get(BASE_URL, { params: filterBy })
    return bugs
}

async function getById(bugId) {
    const url = BASE_URL + bugId

    var { data: bug } = await axios.get(url)
    console.log(bug);
    return bug
}

async function remove(bugId) {
    const url = BASE_URL + bugId
    var { data: res } = await axios.delete(url)
    return res
}

async function save(bug) {
    // const queryParams =
    // 	`?_id=${bug._id || ''}&vendor=${bug.vendor}&speed=${bug.speed}`
    // const url = BASE_URL + 'save' + queryParams


    const method = bug._id ? 'put' : 'post'
    const { data: savedBug } = await axios[method](BASE_URL, bug)
    return savedBug
}

function getDefaultFilter() {
    return { txt: '', severity: '', pageIdx: undefined }
}