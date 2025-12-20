const { type, name } = $arguments
const compatible_outbound = {
  tag: 'COMPATIBLE',
  type: 'direct',
}

let compatible
let config = JSON.parse($files[0])
let proxies = await produceArtifact({
  name,
  type: /^1$|col/i.test(type) ? 'collection' : 'subscription',
  platform: 'sing-box',
  produceType: 'internal',
})

config.outbounds.push(...proxies)

config.outbounds.map(i => {
  if (['🍀𝕌𝕝𝕥𝕚𝕞𝕒𝕥𝕖'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies))
  }
  if (['🤖𝔸𝕚𝔸𝕘𝕖𝕟𝕥'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^(?!.*(?:✰✰|★★)).*(?:美国|US|🇺🇸|自建).*$/i))
  }
  if (['🎓𝔻𝕦𝕠𝕝𝕚𝕟𝕘𝕠', '🎵𝕊𝕡𝕠𝕥𝕚𝕗𝕪'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /(?:新加坡|SG|🇸🇬).*$/i))
  }
  if (['🎨𝕐𝕠𝕦𝕋𝕦𝕓𝕖'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^((?!✰✰|★★|微斯).)*$/i))
  }
  if (['🎧𝕋𝕚𝕜𝕥𝕠𝕜'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^(?!.*(?:✰✰|★★|日本|JP|🇯🇵|微斯)).*(?:台湾|TW|🇹🇼|🇨🇳|自建).*$/i))
  }
  if (['🐳𝕋𝕨𝕚𝕥𝕥𝕖𝕣'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^(?!.*(?:微斯)).*(?:美国|US|🇺🇸新加坡|SG|🇸🇬|台湾|TW|🇹🇼|🇨🇳|自建).*$/i))
  }
  if (['🎬𝔼𝕞𝕓𝕪'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^(?!.*(?:✰✰|★★|美国|US|🇺🇸|日本|JP|🇯🇵|微斯)).*(?:新加坡|SG|🇸🇬|台湾|TW|🇹🇼|🇨🇳|自建).*$/i))
  }
  if (['☁️ℙ𝕚𝕜ℙ𝕒𝕜'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^(?!.*(?:✰✰|★★|美国|US|🇺🇸|日本|JP|🇯🇵|微斯)).*(?:新加坡|SG|🇸🇬|台湾|TW|🇹🇼|🇨🇳|自建).*$/i))
  }
  if (['all', 'all-auto'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies))
  }
  if (['hk', 'hk-auto'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /港|hk|hongkong|hong kong|🇭🇰/i))
  }
  if (['tw', 'tw-auto'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /台|tw|taiwan|🇹🇼/i))
  }
  if (['jp', 'jp-auto'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /日本|jp|japan|🇯🇵/i))
  }
  if (['sg', 'sg-auto'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^(?!.*(?:us)).*(新|sg|singapore|🇸🇬)/i))
  }
  if (['us', 'us-auto'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /美|us|unitedstates|united states|🇺🇸/i))
  }
})

config.outbounds.forEach(outbound => {
  if (Array.isArray(outbound.outbounds) && outbound.outbounds.length === 0) {
    if (!compatible) {
      config.outbounds.push(compatible_outbound)
      compatible = true
    }
    outbound.outbounds.push(compatible_outbound.tag);
  }
});

$content = JSON.stringify(config, null, 2)

function getTags(proxies, regex) {
  return (regex ? proxies.filter(p => regex.test(p.tag)) : proxies).map(p => p.tag)
}
