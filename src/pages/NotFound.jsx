import { Link } from 'react-router-dom'

export default function NotFound(){
  return (
    <div className="page not-found">
      <h1>404 — Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <p><Link to="/">Return To Home Page</Link></p>
    </div>
  )
}
