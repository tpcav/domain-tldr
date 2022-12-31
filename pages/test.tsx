import { useEffect, useState } from 'react';
import Head from 'next/head';

type Word = {
  word: string
};

const WordsPage = () => {
  const [relatedWords, setRelatedWords] = useState<Word[]>([]);
  const [rhymingWords, setRhymingWords] = useState<Word[]>([]);
  const [adjWords, setAdjWords] = useState<Word[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTerm1, setSearchTerm1] = useState('');
  const [searchTerm2, setSearchTerm2] = useState('');

  useEffect(() => {
    const fetchRelatedWords = async () => {
      const res = await fetch(
        `https://api.datamuse.com/words?ml=${searchTerm}`
      );
      const data = await res.json();
      setRelatedWords(data);
    };

    const fetchRhymingWords = async () => {
      const res = await fetch(
        `https://api.datamuse.com/words?rel_rhy=${searchTerm1}`
      );
      const data = await res.json();
      setRhymingWords(data);
    };

    const fetchAdjWords = async () => {
      const res = await fetch(
        `https://api.datamuse.com/words?rel_jjb=${searchTerm2}`
      );
      const data = await res.json();
      setAdjWords(data);
    };

    fetchRelatedWords();
    fetchRhymingWords();
    fetchAdjWords();
  }, [searchTerm, searchTerm1, searchTerm2]);

  const handleRelatedSubmit = (event: any) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

  const handleRhymingSubmit = (event: any) => {
    event.preventDefault();
    setSearchTerm1(event.target.value);
  };

  const handleAdjSubmit = (event: any) => {
    event.preventDefault();
    setSearchTerm2(event.target.value);
  };

  return (
    <div className="grid p-4">
      <Head>
        <title>DomainTLDR - Word Generator</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name='description' content='DomainTLDR. Word Generator'/>
      </Head>
      <div className='p-4 pb-10'>
        <h1 className='text-2xl font-bold mb-4'>DomainTLDR</h1>
        <p className='text-center mt-10 mb-4 italic'>Are your names for ideas too long?</p>
        <p className='text-center'>Use our tools to make them short and memorable.</p>
      </div>

      <h1 className="text-lg font-bold text-center">Related Words</h1>
        <form onSubmit={handleRelatedSubmit} className="p-4 text-center">
        <input
          type="text"
          placeholder="Enter search term"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="bg-gray-200 rounded p-2"
        />
        <button type="submit" className="m-2 p-2 bg-blue-200 rounded-lg">
          Search
        </button>
      </form>
      <div className="grid grid-cols-3 md:grid-cols-6 w-auto gap-4">
        {relatedWords.map((word: Word) => (
          <div key={word.word} className="flex items-center justify-center h-10 bg-gray-400 rounded-md">
            {word.word}
          </div>
        ))}
      </div>
      <h1 className="text-lg font-bold text-center mt-4">Rhyming Words</h1>
      <form onSubmit={handleRhymingSubmit} className="p-4 text-center">
        <input
          type="text"
          placeholder="Enter search term"
          value={searchTerm1}
          onChange={(event) => setSearchTerm1(event.target.value)}
          className="bg-gray-200 rounded p-2"
        />
        <button type="submit" className="m-2 p-2 bg-blue-200 rounded-lg">
          Search
        </button>
      </form>
      <div className="grid grid-cols-3 md:grid-cols-6 w-auto gap-4">
        {rhymingWords.map((word: Word) => (
          <div key={word.word} className="flex items-center justify-center h-10 bg-gray-400 rounded-md">
            {word.word}
          </div>
        ))}
      </div>
      <h1 className="text-lg font-bold text-center mt-4">Adjective Words</h1>
      <form onSubmit={handleAdjSubmit} className="p-4 text-center">
        <input
          type="text"
          placeholder="Enter search term"
          value={searchTerm2}
          onChange={(event) => setSearchTerm2(event.target.value)}
          className="bg-gray-200 rounded p-2"
        />
        <button type="submit" className="m-2 p-2 bg-blue-200 rounded-lg">
          Search
        </button>
      </form>
      <div className="grid grid-cols-3 md:grid-cols-6 w-auto gap-4">
        {adjWords.map((word: Word) => (
          <div key={word.word} className="flex items-center justify-center h-10 bg-gray-400 rounded-md">
            {word.word}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordsPage;



import requests

# Replace these with your own Twitter API keys
consumer_key = "YOUR_CONSUMER_KEY"
consumer_secret = "YOUR_CONSUMER_SECRET"

# Set up the authentication for the Twitter API
auth = requests.auth.OAuth1(consumer_key, consumer_secret)

# Set the base URL for the Twitter API
base_url = "https://api.twitter.com/1.1"

def check_username_availability(username):
  # Make a request to the Twitter API to check the availability of the username
  response = requests.get(f"{base_url}/users/username_available.json?username={username}", auth=auth)

  # Check the response status code to determine if the username is available
  if response.status_code == 204:
    return True
  elif response.status_code == 206:
    return False
  else:
    # Handle any other unexpected status codes
    raise Exception(f"Unexpected response from Twitter API: {response.status_code}")

# Example usage: check if the username "twitter" is available
username = "twitter"
is_available = check_username_availability(username)

if is_available:
  print(f"Username '{username}' is available!")
else:
  print(f"Username '{username}' is not available.")



