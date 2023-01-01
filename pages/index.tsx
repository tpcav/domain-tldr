import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Nav from '../dashboard/Nav';

  type Word = {
  word: string
  };

  const WordsPage = () => {
    const [relatedWords, setRelatedWords] = useState<Word[]>([]);
    const [rhymingWords, setRhymingWords] = useState<Word[]>([]);
    const [adjWords, setAdjWords] = useState<Word[]>([]);
    const [constWords, setConstWords] = useState<Word[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTerm1, setSearchTerm1] = useState('');
    const [searchTerm2, setSearchTerm2] = useState('');
    const [searchTerm3, setSearchTerm3] = useState('');
    const [showRelatedWords, setShowRelatedWords] = useState(false);
    const [showRhymingWords, setShowRhymingWords] = useState(false);
    const [showAdjWords, setShowAdjWords] = useState(false);
    const [showConstWords, setShowConstWords] = useState(false);

  const fetchRelatedWords = async () => {
    const res = await fetch(
      `https://api.datamuse.com/words?ml=${searchTerm}&max=27`
    );
    const data = await res.json();
    setRelatedWords(data);
  };

  const fetchRhymingWords = async () => {
    const res = await fetch(
      `https://api.datamuse.com/words?rel_rhy=${searchTerm1}&max=27`
    );
    const data = await res.json();
    setRhymingWords(data);
  };

  const fetchAdjWords = async () => {
    const res = await fetch(
      `https://api.datamuse.com/words?rel_jjb=${searchTerm2}&max=27`
    );
    const data = await res.json();
    setAdjWords(data);
  };

  const fetchConstWords = async () => {
    const res = await fetch(
      `https://api.datamuse.com/words?rel_cns=${searchTerm3}&max=27`
    );
    const data = await res.json();
    setConstWords(data);
  };

  const handleRelatedSubmit = (event: any) => {
    event.preventDefault();
    setSearchTerm(event.currentTarget.elements.search.value);
    fetchRelatedWords();
    setShowRelatedWords(true);
  };

  const handleRhymingSubmit = (event: any) => {
    event.preventDefault();
    setSearchTerm1(event.currentTarget.elements.search.value);
    fetchRhymingWords();
    setShowRhymingWords(true);
  };

  const handleAdjSubmit = (event: any) => {
    event.preventDefault();
    setSearchTerm2(event.currentTarget.elements.search.value);
    fetchAdjWords();
    setShowAdjWords(true);
  };

  const handleConstSubmit = (event: any) => {
    event.preventDefault();
    setSearchTerm3(event.currentTarget.elements.search.value);
    fetchConstWords();
    setShowConstWords(true);
  };

  return (
    <div className="items-center justify-center bg-gray-100 mt-20 h-screen">
      <Head>
        <title>Word Generator for Ideas</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name='description' content='DomainTLDR. Word Generator'/>
      </Head>


      <nav className="bg-white shadow-md fixed top-0 w-full">
        <div className="container mx-auto p-6 flex py-2 items-center justify-between">
          <Link href="/" className="font-bold text-2xl text-gray-900">DomainTLDR</Link>
          <ul className="md:flex md:items-center">
            <li className="mr-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
            </li>
            <li className="mr-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900">About</Link>
            </li>
            <li className="mr-6">
              <Link href="mailto:cavalcantethomas@icloud.com" className="text-gray-600 hover:text-gray-900">Contact</Link>
            </li>
          </ul>
        </div>
      </nav>
      
      <div className='p-4 pb-10'>
        <p className='text-center mt-10 mb-4 italic'>Stuck coming up with words?</p>
        <p className='text-center'>Use the tools below to generate words for ideas.</p>
      </div>


      <h1 className="mt-2 text-lg font-bold text-center">Related Words</h1>
        <form onSubmit={handleRelatedSubmit} className="text-center mb-10">
        <input
          name="search"
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
      {showRelatedWords && (
        <div className="grid grid-cols-3 md:grid-cols-6 w-auto gap-4 p-2">
          {relatedWords.map((word: Word) => (
            <div key={word.word} className="flex items-center justify-center h-10 bg-gray-400 rounded-md">
              {word.word}
            </div>
          ))}
        </div>
      )}

      <h1 className="text-lg font-bold text-center">Rhyming Words</h1>
        <form onSubmit={handleRhymingSubmit} className="text-center mb-10">
        <input
          name="search"
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
      {showRhymingWords && (
        <div className="grid grid-cols-3 md:grid-cols-6 w-auto gap-4 p-2">
          {rhymingWords.map((word: Word) => (
            <div key={word.word} className="flex items-center justify-center h-10 bg-gray-400 rounded-md">
              {word.word}
            </div>
          ))}
        </div>
      )}


      <h1 className="text-lg font-bold text-center">Adjective Words</h1>
        <form onSubmit={handleAdjSubmit} className="text-center mb-10">
        <input
          name="search"
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
      {showAdjWords && (
        <div className="grid grid-cols-3 md:grid-cols-6 w-auto gap-4 p-2">
          {adjWords.map((word: Word) => (
            <div key={word.word} className="flex items-center justify-center h-10 bg-gray-400 rounded-md">
              {word.word}
            </div>
          ))}
        </div>
      )}

    <h1 className="text-lg font-bold text-center">Consonant Matches</h1>
        <form onSubmit={handleConstSubmit} className="text-center mb-10">
        <input
          name="search"
          type="text"
          placeholder="Enter search term"
          value={searchTerm3}
          onChange={(event) => setSearchTerm3(event.target.value)}
          className="bg-gray-200 rounded p-2"
        />
        <button type="submit" className="m-2 p-2 bg-blue-200 rounded-lg">
          Search
        </button>
      </form>
      {showConstWords && (
        <div className="grid grid-cols-3 md:grid-cols-6 w-auto gap-4 p-2 mb-20">
          {constWords.map((word: Word) => (
            <div key={word.word} className="flex items-center justify-center h-10 bg-gray-400 rounded-md">
              {word.word}
            </div>
          ))}
        </div>
      )}

      <div className='flex justify-center items-center'>
        <Link href='https://domain-checkers-tpcav.vercel.app/' className='font-medium text-blue-600 dark:text-blue-500 hover:underline w-72'>
          <h1 className='text-center m-2 p-2 bg-blue-200 rounded-lg'>
            Domain Availability Checker
          </h1>
        </Link>
      </div>

      <footer className='text-center mt-10 p-4'>Made with
        <Link href='https://www.datamuse.com/api/' className='font-medium text-blue-600 dark:text-blue-500 hover:underline'> Datamuse API </Link>
        &
        <Link href='https://github.com/LayeredStudio/whoiser' className='font-medium text-blue-600 dark:text-blue-500 hover:underline'> Whoiser Client.</Link>
      </footer>
    </div>
  );
};

export default WordsPage;
