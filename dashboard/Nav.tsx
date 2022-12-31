export default function Nav() {
  return (
    <nav className="bg-white shadow-md fixed top-0 w-full">
      <div className="container mx-auto px-6 py-2 flex items-center justify-between">
        <a href="#" className="font-bold text-xl text-gray-900">Linkwear</a>
        <ul className="md:flex md:items-center">
          <li className="mr-6">
            <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
          </li>
          <li className="mr-6">
            <a href="/about" className="text-gray-600 hover:text-gray-900">About</a>
          </li>
          <li className="mr-6">
            <a href="mailto:tpc75@drexel" className="text-gray-600 hover:text-gray-900">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}