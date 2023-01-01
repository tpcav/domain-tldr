const whoiser = require('whoiser');

async function checkDomainAvailability(domainName) {
  // retrieve WHOIS info from Registrar WHOIS servers
  const domainWhois = await whoiser(domainName, { follow: 1 });
  const firstDomainWhois = whoiser.firstResult(domainWhois);
  const firstTextLine = (firstDomainWhois.text[0] || '').toLowerCase();

  let domainAvailability = 'unknown';

  if (firstTextLine.includes('reserved')) {
    domainAvailability = 'reserved';
  } else if (firstDomainWhois['Domain Name'] && firstDomainWhois['Domain Name'].toLowerCase() === domainName) {
    domainAvailability = 'registered';
  } else if (firstTextLine.includes(`no match for "${domainName}"`)) {
    domainAvailability = 'available';
  }

  console.log(`Domain "${domainName}" is "${domainAvailability}"`);

  if (domainAvailability === 'registered') {
    console.log('Domain was registered on', firstDomainWhois['Created Date'], 'at', firstDomainWhois.Registrar);
    console.log('Registration will expire on', firstDomainWhois['Expiry Date']);
    console.log('Domain uses name servers:', firstDomainWhois['Name Server']);
  } else if (domainAvailability === 'available') {
    console.log('This domain is available for registration right now');
  }

  return {
    domainAvailability,
    domainWhois,
    firstDomainWhois,
    firstTextLine
  };
}

module.exports = {
  checkDomainAvailability
};
