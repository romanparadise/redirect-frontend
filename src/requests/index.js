import axios from 'axios'

const fetchLinksData = async () => {
    const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/links`
    );

    return data;
}

const addLink = async () => {
    const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/create`
    );

    return data;
}

export {
    fetchLinksData,
    addLink,
}