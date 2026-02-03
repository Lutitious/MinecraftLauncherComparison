import React from 'react'
import { Link } from 'react-router-dom'

export default function LauncherCard({id, info}){
  return (
    <article className="card">
      <h3>{info.name || id}</h3>
      <p className="meta">{info.homepage || info.website || ''}</p>
      <p className="desc">{info.description ? info.description.substring(0,120) : ''}</p>
      <Link to={`/launcher/${id}`} className="view">View</Link>
    </article>
  )
}
