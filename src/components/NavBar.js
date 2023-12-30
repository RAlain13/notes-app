import Link from "next/link"

const Navbar = () => {

  return (
    <header>
      <div className="container">
        <Link href="/">
          <h1>Note list</h1>
        </Link>
      </div>
    </header>
  )
}

export default Navbar