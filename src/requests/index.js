import axios from 'axios'

const fetchLinksData = async () => {
    const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/links?token=${process.env.REACT_APP_ACCESS_TOKEN}`
    );

    return data;
}

const addLink = async ({ name, redirectsTo, description, tags }) => {
    const link = {
        name,
        redirectsTo,
        description,
        tags
    }

    const { data } = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/create?token=${process.env.REACT_APP_ACCESS_TOKEN}`,
        link
    );

    return data;
}

const deleteLink = async (linkId) => {
    const { data } = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/delete/${linkId}?token=${process.env.REACT_APP_ACCESS_TOKEN}`
    );

    return data;
}

export {
    fetchLinksData,
    addLink,
    deleteLink,
}