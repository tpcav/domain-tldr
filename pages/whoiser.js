import { useEffect, useState } from 'react';
const whoiser = require('whoiser');


function useDomainAvailability(domainName) {
  const [domainAvailability, setDomainAvailability] = useState('unknown');

  useEffect(() => {
    async function fetchDomainAvailability() {
      // retrieve WHOIS info from Registrar WHOIS servers
      const domainWhois = await whoiser('tc7.org');

      const firstDomainWhois = whoiser.firstResult(domainWhois);
      const firstTextLine = (firstDomainWhois.text[0] || '').toLowerCase();

      if (firstTextLine.includes('reserved')) {
        setDomainAvailability('reserved');
      } else if (firstDomainWhois['Domain Name'] && firstDomainWhois['Domain Name'].toLowerCase() === domainName) {
        setDomainAvailability('registered');
      } else if (firstTextLine.includes(`no match for "${domainName}"`)) {
        setDomainAvailability('available');
      }
    }

    fetchDomainAvailability();
  }, [domainName]);

  return domainAvailability;
}

export default function DomainAvailability() {
  const [domainName, setDomainName] = useState('');
  const domainAvailability = useDomainAvailability(domainName);

  return (
    <div>
      <input type="text" value={domainName} onChange={event => setDomainName(event.target.value)} />
      <p>Domain "{domainName}" is "{domainAvailability}"</p>
      {domainAvailability === 'registered' && (
        <>
          <p>Domain was registered on {firstDomainWhois['Created Date']} at {firstDomainWhois.Registrar}</p>
          <p>Registration will expire on {firstDomainWhois['Expiry Date']}</p>
          <p>Domain uses name servers: {firstDomainWhois['Name Server']}</p>
        </>
      )}
      {domainAvailability === 'available' && <p>This domain is available for registration right now</p>}
    </div>
  );
}
