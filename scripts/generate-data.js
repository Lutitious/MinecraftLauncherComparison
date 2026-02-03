const fs = require('fs')
const path = require('path')
const JSON5 = require('json5')

const dataDir = path.resolve(__dirname, '..', 'data')
const outDir = path.resolve(__dirname, '..', 'src', 'generated')
const outFile = path.join(outDir, 'launchers.json')

if(!fs.existsSync(dataDir)){
  console.error('data directory not found:', dataDir)
  process.exit(1)
}

if(!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json') || f.endsWith('.json5'))
const result = {}
files.forEach(f => {
  try{
    const raw = fs.readFileSync(path.join(dataDir, f), 'utf8')
    const parsed = JSON5.parse(raw)
    const id = path.basename(f).replace(/\.(json5|json)$/,'')
    result[id] = parsed
  }catch(err){
    console.warn('skipping', f, err.message)
  }
})

fs.writeFileSync(outFile, JSON.stringify(result, null, 2), 'utf8')
console.log('generated', outFile)
