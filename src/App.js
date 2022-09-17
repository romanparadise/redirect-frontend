import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import PassPhrase from 'PassPhrase'
import { fetchLinksData, addLink } from 'requests'
import Core from 'core'

function App() {
  const [ userIsVerified, setUserIsVerified ] = useState(false)
  const [ links, setLinks] = useState()
  const { isLoading } = useQuery(
    ['links'],
    async () => {
      const { data } = await fetchLinksData();
      setLinks(data)
    },
    {
      refetchInterval: 600000,
    }
  );

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

  return <Core 
    linksData={links}
  />
}

export default App;
