export function summarize(id, raw){
  const name = raw.name || id
  const homepage = raw.homepage || raw.website || ''
  const downloadLink = raw.downloadLink || ''
  const sourceRepo = raw.sourceRepo || ''
  const icon = raw.icon || ''
  const license = (raw.configuration && raw.configuration.license && raw.configuration.license.name) || ''
  const modpacks = (raw.features && raw.features.modpacks) || []
  const modpackNames = modpacks.map(m => m.name).filter(Boolean)
  const modloaders = (raw.features && raw.features.modloaders) || []
  const java = (raw.features && raw.features.java) || { download: false, versionManagement: false, usingSystemInstall: false }
  const sandboxing = (raw.features && raw.features.sandboxing && raw.features.sandboxing.status) || ''
  const overlay = (raw.features && raw.features.overlay && raw.features.overlay.status) || ''
  const advertisements = (raw.features && raw.features.advertisements && raw.features.advertisements.status) || ''
  const platforms = raw.properties && raw.properties.platforms ? Object.keys(raw.properties.platforms) : []

  // Minecraft resources breakdown
  const resources = (raw.features && raw.features.minecraftResources) || {}
  function summarizeResource(r){
    if(!r) return ''
    const dl = r.downloading ? 'dl' : 'no-dl'
    const up = r.updating ? 'up' : 'no-up'
    const prov = Array.isArray(r.providers) ? r.providers.join(', ') : ''
    return [dl, up, prov].filter(Boolean).join(' | ')
  }
  const mods = summarizeResource(resources.mods)
  const resourcepacks = summarizeResource(resources.resourcepacks)
  const shaderpacks = summarizeResource(resources.shaderpacks)
  const worlds = summarizeResource(resources.worlds)
  const datapacks = summarizeResource(resources.datapacks)
  const plugins = summarizeResource(resources.plugins)

  const imports = (raw.features && raw.features.import) || []
  const exports = (raw.features && raw.features.export) || []

  return {
    id,
    name,
    homepage,
    downloadLink,
    sourceRepo,
    icon,
    license,
    modpacks,
    modpackNames,
    modloaders,
    java,
    mods,
    resourcepacks,
    shaderpacks,
    worlds,
    datapacks,
    plugins,
    imports,
    exports,
    sandboxing,
    overlay,
    advertisements,
    platforms,
    raw
  }
}
