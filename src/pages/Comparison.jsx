import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { loadLaunchers } from '../lib/loadLaunchers'
import { summarize } from '../lib/normalize'

export default function Comparison(){
  const [entries, setEntries] = useState(null)

  useEffect(() => {
    let mounted = true
    loadLaunchers().then(data => {
      if(!mounted) return
      const arr = Object.entries(data).map(([id, info]) => summarize(id, info))
      setEntries(arr)
    })
    return () => { mounted = false }
  }, [])

  if(!entries) return (<div className="page"><h1>Loading…</h1></div>)

  const rows = [
    { key: 'license', label: 'License', render: e => e.license || '—' },
    { key: 'modpacks', label: 'Modpacks', render: e => e.modpackNames.join(', ') || '—' },
    { key: 'modloaders', label: 'Modloaders', render: e => e.modloaders.join(', ') || '—' },
    { key: 'mods', label: 'Mods', render: e => e.mods || '—' },
    { key: 'resourcepacks', label: 'Resourcepacks', render: e => e.resourcepacks || '—' },
    { key: 'shaderpacks', label: 'Shaderpacks', render: e => e.shaderpacks || '—' },
    { key: 'worlds', label: 'Worlds', render: e => e.worlds || '—' },
    { key: 'datapacks', label: 'Datapacks', render: e => e.datapacks || '—' },
    { key: 'plugins', label: 'Plugins', render: e => e.plugins || '—' },
    { key: 'imports', label: 'Import', render: e => (e.imports && e.imports.join(', ')) || '—' },
    { key: 'exports', label: 'Export', render: e => (e.exports && e.exports.join(', ')) || '—' },
    { key: 'java-download', label: 'Java (download)', render: e => (e.java && e.java.download) ? 'Yes' : 'No' },
    { key: 'java-vm', label: 'Java (versionMgmt)', render: e => (e.java && e.java.versionManagement) ? 'Yes' : 'No' },
    { key: 'sandbox', label: 'Sandbox', render: e => e.sandboxing || 'No' },
    { key: 'overlay', label: 'Overlay', render: e => e.overlay || 'No' },
    { key: 'ads', label: 'Ads', render: e => e.advertisements || 'No' },
    { key: 'platforms', label: 'Platforms', render: e => e.platforms.join(', ') || '—' }
  ]

  return (
    <div className="page comparison">
      <h1>Full Launcher Comparison</h1>
      <div className="table-wrap">
        <table className="compare-table transposed">
          <thead>
            <tr>
              <th></th>
              {entries.map(e => (
                <th key={e.id} className="launcher-header">
                  <Link to={`/launcher/${e.id}`} className="launcher-link">
                    {e.icon ? <img src={e.icon} alt="logo" className="table-icon"/> : null}
                    <div className="launcher-name">{e.name}</div>
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.key}>
                <th className="attr-name">{row.label}</th>
                {entries.map(e => (
                  <td key={e.id + '-' + row.key}>{row.render(e)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="legend">¹ up = supports updating, dl = supports downloading, no-up = no updating, no-dl = no downloading, providers = list of supported providers.</div>
      </div>
    </div>
  )
}
