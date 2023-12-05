import { redirect } from 'next/navigation'

export default function Home() {
  return (
    // Whenever application rendered it will redirect to the dashboard page
   redirect('/dashboard')
  )
}
