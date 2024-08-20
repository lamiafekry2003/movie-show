import { Link } from "react-router-dom";


export default function Footer() {
  return (
    <div className="text-center bg-neutral-600 bg-opacity-35 text-neutral-400 py-4">
    <div className='flex items-center justify-center gap-4'>
        <Link to="/" >About</Link>
        <Link to="/">Contact</Link>
      </div>
      <p className='text-sm'>Created By Dynamic Coding with Lamia</p>
  </div>
  )
}
