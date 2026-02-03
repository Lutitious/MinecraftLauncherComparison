import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { loadLaunchers } from '../lib/loadLaunchers'
import { summarize } from '../lib/normalize'

export default function Launcher(){
  const { id } = useParams()
  const [all, setAll] = useState(null)

  useEffect(() => {
    let mounted = true
    loadLaunchers().then(data => { if(mounted) setAll(data) })
    return () => { mounted = false }
  }, [])

  if(!all) return (<div className="page"><h2>Loading…</h2></div>)

  const raw = all[id]
  if(!raw) return (
    <div className="page">
      <h2>Launcher not found</h2>
      <Link to="/">Back</Link>
    </div>
  )

  const info = summarize(id, raw)

  const allProviders = Array.from(new Set(Object.values(all)
    .flatMap(l => (l.features && l.features.modpacks) ? l.features.modpacks.map(m => m.name) : [])
    .filter(Boolean))).sort()

  return (
    <div className="page launcher">
      <div className="launcher-head">
        {info.icon ? <img src={info.icon} alt="icon" className="launcher-icon"/> : null}
        <div>
          <h1>{info.name}</h1>
          <p className="links">
            {info.homepage ? <a href={info.homepage} target="_blank" rel="noreferrer">Homepage</a> : null}
            {info.downloadLink ? <> · <a href={info.downloadLink} target="_blank" rel="noreferrer">Download</a></> : null}
            {info.sourceRepo ? <> · <a href={info.sourceRepo} target="_blank" rel="noreferrer">Source</a></> : null}
          </p>
        </div>
      </div>

      <section className="section">
        <h2>Summary</h2>
        <table className="detail-table">
          <tbody>
            <tr><th>License</th><td>{info.license || '—'}</td></tr>
            <tr><th>Platforms</th><td>{info.platforms.join(', ') || '—'}</td></tr>
            <tr><th>Modloaders</th><td>{info.modloaders.join(', ') || '—'}</td></tr>
            <tr><th>Java download</th><td>{info.java && info.java.download ? 'Yes' : 'No'}</td></tr>
            <tr><th>Java version management</th><td>{info.java && info.java.versionManagement ? 'Yes' : 'No'}</td></tr>
            <tr><th>Sandboxing</th><td>{info.sandboxing || 'No'}</td></tr>
            <tr><th>Overlay</th><td>{info.overlay || 'No'}</td></tr>
            <tr><th>Advertisements</th><td>{info.advertisements || 'No'}</td></tr>
          </tbody>
        </table>
      </section>

      <section className="section">
        <h2>Modpack Provider Support</h2>
        <table className="modpack-table">
          <thead>
            <tr><th>Provider</th><th>Supported</th><th>Method</th><th>Updating</th></tr>
          </thead>
          <tbody>
            {allProviders.map((p) => {
              const m = (info.modpacks || []).find(x => x.name === p)
              const supported = !!m
              const method = m ? (m.method || 'Unknown') : '—'
              const updating = m ? (m.updating ? 'Yes' : 'No') : 'No'
              return (
                <tr key={p}>
                  <td>{p}</td>
                  <td>{supported ? 'Yes' : 'No'}</td>
                  <td>{method}</td>
                  <td>{updating}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>

      <section className="section">
        <h2>Import / Export</h2>
        <p><strong>Import:</strong> {(info.imports && info.imports.join(', ')) || 'None'}</p>
        <p><strong>Export:</strong> {(info.exports && info.exports.join(', ')) || 'None'}</p>
      </section>

      <p><Link to="/">Back</Link></p>
    </div>
  )
}
