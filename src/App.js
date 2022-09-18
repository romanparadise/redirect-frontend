import { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import PassPhrase from 'PassPhrase'
import { fetchLinksData, deleteLink } from 'requests'
import Core from 'core'

//TODO: add mutations on link creation
function App() {
  const [ userIsVerified, setUserIsVerified ] = useState(false)
  const [ links, setLinks] = useState([])
  const [ selectedLinks, setSelectedLinks ] = useState([])
  const { isLoading, linksData } = useQuery(
    ['links'],
    async () => {
      const { data } = await fetchLinksData();
      setLinks(data)

      return data
    },
    {
      refetchInterval: 1500,
    }
  );

  useEffect(() => {
    setSelectedLinks(prev => {
      const prevIds = prev.map(i => i._id)
      const nextSelected = []

      prevIds.forEach(id => {
        const refetchedItem = links.find(l => l._id === id)

        refetchedItem && nextSelected.push(refetchedItem)
      })

      return nextSelected
    })
  }, [links])

  if (!userIsVerified) {
    return (
      <PassPhrase
        verifyUser = {() => setUserIsVerified(true)}
      />
    )
  }

  if (isLoading) {
    return (
      <div style={{color: 'white'}}>Loading data...</div>
    )
  }

  const onLinkClick = link => {
    if (selectedLinks.map(l => l._id).includes(link._id)) {
      setSelectedLinks(prev => prev.filter(l => l._id !== link._id))
    } else {
      setSelectedLinks(prev => [link, ...prev])
    }
  }

  const removeLink = async link => {
    let confirmed = window.confirm("ТОЧНО?");

    if (!confirmed) return

    await deleteLink(link._id)

    setLinks(prev => prev.filter(l => l._id !== link._id))
  }

  return <Core 
    linksData={links}
    selectedLinks={selectedLinks}
    onLinkClick={onLinkClick}
    removeLink={removeLink}
  />
}

export default App;
