import Link from 'next/link'
export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold text-[#00ff9d]">404 - Page Not Found</h2>
      <p className="mb-4">Could not find requested resource</p>
      <Link href="/" className="text-[#7000ff] hover:underline">Return Home</Link>
    </div>
  )
}