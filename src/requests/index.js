import axios from 'axios'

const fetchLinksData = async () => {
    const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/links`
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
        `${process.env.REACT_APP_API_BASE_URL}/create`,
        link
    );

    return data;
}

const deleteLink = async (linkId) => {
    const { data } = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/delete/${linkId}`
    );

    return data;
}

export {
    fetchLinksData,
    addLink,
    deleteLink,
}