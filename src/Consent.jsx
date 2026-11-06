import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const KEY = 'cs-consent' // stored value: 'granted' or 'denied'

const read = () => { try { return localStorage.getItem(KEY) } catch { return null } }
const save = v => { try { localStorage.setItem(KEY, v) } catch { /* storage unavailable */ } }

function loadGA(id) {
  if (!id || window['ga-loaded-' + id]) return
  window['ga-loaded-' + id] = true
  window['ga-disable-' + id] = false
  window.dataLayer = window.dataLayer || []
  window.gtag = function () { window.dataLayer.push(arguments) }
  window.gtag('js', new Date())
  window.gtag('config', id)
  const s = document.createElement('script')
  s.async = true
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + id
  document.head.appendChild(s)
}

function stopGA(id) {
  window['ga-disable-' + id] = true
  document.cookie.split(';').forEach(c => {
    const name = c.split('=')[0].trim()
    if (name === '_ga' || name.startsWith('_ga_')) {
      const gone = '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
      document.cookie = name + gone
      document.cookie = name + gone + '; domain=.' + location.hostname
    }
  })
}

export default function Consent({ gaId }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const saved = read()
    if (saved === 'granted') loadGA(gaId)
    else if (saved !== 'denied') setOpen(true)
    const reopen = () => setOpen(true)
    window.addEventListener('open-consent', reopen)
    return () => window.removeEventListener('open-consent', reopen)
  }, [gaId])

  const choose = value => {
    save(value)
    if (value === 'granted') loadGA(gaId)
    else stopGA(gaId)
    setOpen(false)
  }

  if (!open) return null
  return (
    <div className="consent" role="dialog" aria-label="Cookie consent">
      <p>
        We’d like to use analytics cookies to see which pages are useful. Nothing is set unless you accept.
        See our <Link to="/privacy-policy/">Privacy Policy</Link>.
      </p>
      <div className="consent-row">
        <button type="button" className="consent-btn" onClick={() => choose('denied')}>Reject</button>
        <button type="button" className="consent-btn" onClick={() => choose('granted')}>Accept</button>
      </div>
    </div>
  )
}