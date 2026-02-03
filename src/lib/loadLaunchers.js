import JSON5 from 'json5'

export async function loadLaunchers(){
  const modules = import.meta.glob('/data/*.{json,json5}', { as: 'raw' })
  const entries = await Promise.all(Object.entries(modules).map(async ([p, resolver]) => {
    const text = await resolver()
    try{
      const parsed = JSON5.parse(text)
      const id = p.split('/').pop().replace(/\.(json5|json)$/, '')
      return [id, parsed]
    }catch(err){
      console.warn('failed to parse', p, err.message)
      return null
    }
  }))
  return Object.fromEntries(entries.filter(Boolean))
}
