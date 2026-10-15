import { useState, createContext, useContext } from 'react'
import { Head } from 'vite-react-ssg'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { toC, fmt, allocate, settle, lim, clamp } from './lib.js'

const SITE = 'https://example.com' // TODO: your domain
const BRAND = 'Splitkit'          // TODO: your brand

const Cur = createContext('USD')
const useCur = () => useContext(Cur)
const sym = c => (0).toLocaleString(undefined, { style: 'currency', currency: c }).replace(/[\d.,\s]/g, '')

/* ---------- SEO ---------- */
function Seo({ name, title, desc, path, faq }) {
  const url = SITE + path
  const ld = [{
    '@context': 'https://schema.org', '@type': 'WebApplication', name, url,
    applicationCategory: 'FinanceApplication', operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
  }]
  if (faq) ld.push({
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }))
  })
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary" />
      <script type="application/ld+json">{JSON.stringify(ld)}</script>
    </Head>
  )
}

/* ---------- Shared UI ---------- */
const Ico = ({ children }) => <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
const SOCIAL = [ // TODO: replace with your real profile URLs
  ['GitHub', 'https://github.com/maheshbhojane1', <Ico><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></Ico>],
  ['LinkedIn', 'https://linkedin.com/in/maheshbhojane', <Ico><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></Ico>],
  ['Instagram', 'https://www.instagram.com/mahesh__bhojane', <Ico><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></Ico>]
]

function Layout() {
  const [cur, setCur] = useState('USD'), [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return (
    <Cur.Provider value={cur}>
      <div className="wrap"><header className="top">
        <Link className="logo" to="/"><span className="mark">%</span><span><b>{BRAND}</b><small></small></span></Link>
        <button className="burger" aria-label="Menu" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(!open)}><span /><span /><span /></button>
        <nav id="menu" className={'menu' + (open ? ' open' : '')} aria-label="Main">
          <NavLink to="/" end onClick={close}>Split Bill</NavLink>
          <NavLink to="/split-rent-calculator/" onClick={close}>Split Rent</NavLink>
          <NavLink to="/split-expenses-calculator/" onClick={close}>Split Expenses</NavLink>
          <span className="pill hide">● No sign-up needed</span>
          <select aria-label="Currency" value={cur} onChange={e => setCur(e.target.value)} className="cur">
            {['USD', 'INR', 'GBP', 'EUR', 'CAD', 'AUD'].map(c => <option key={c}>{c}</option>)}
          </select>
        </nav>
      </header></div>
      <main><Outlet /></main>
      <footer className="ft"><div className="wrap">
        <div className="ft-grid">
          <div>
            <Link className="ft-brand" to="/"><span className="mark">%</span>{BRAND}</Link>
            <p>Free split calculators for dinners, roommates and road trips. No signup, and nothing you enter is stored or sent.</p>
            <div className="social">
              {SOCIAL.map(([name, url, icon]) => <a key={name} href={url} target="_blank" rel="noopener noreferrer me" aria-label={name}>{icon}</a>)}
            </div>
          </div>
          <div className="ft-links">
            <h3>Calculators</h3>
            <Link to="/">Split Bill Calculator</Link>
            <Link to="/split-rent-calculator/">Split Rent Calculator</Link>
            <Link to="/split-expenses-calculator/">Split Expenses Calculator</Link>
          </div>
        </div>
        <div className="ft-bottom">
          <span>© {new Date().getFullYear()} {BRAND}. All rights reserved.</span>
          <span>Results are estimates, not financial advice.</span>
        </div>
      </div></footer>
    </Cur.Provider>
  )
}

const Num = p => <input type="number" inputMode="decimal" min="0" step="any" {...p} />

function Faq({ items }) {
  return <section className="sec"><h2>Frequently asked questions</h2>
    {items.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</section>
}

const BILL_HELP = ['Enter the bill amount before tax and tip.', 'Add the tax rate and pick a tip. Tap a quick tip or type your own.', 'Choose whether the tip is calculated before or after tax.', 'Set the number of people. Each share appears on the right.']
const RENT_HELP = ['Enter the total monthly rent.', 'Choose a method: by room size, by income, or equally.', 'Add each roommate with their room size or income.', 'Each person’s share appears on the right.']
const EXP_HELP = ['List everyone sharing the cost, separated by commas.', 'Add each expense with the amount and who paid.', 'Every cost is divided equally among everyone listed.', 'The panel on the right shows who pays whom to settle up.']

function LabelHelp({ htmlFor, label, steps, onDemo }) {
  const [open, setOpen] = useState(false)
  return (<>
    <div className="lbl">
      <label htmlFor={htmlFor}>{label}</label>
      <button type="button" className="info" aria-label="How this tool works" aria-expanded={open} onClick={() => setOpen(!open)}>?</button>
      <button type="button" className="demo" onClick={onDemo}>Load demo</button>
    </div>
    {open && <div className="help" role="note"><b>How it works</b><ol>{steps.map(s => <li key={s}>{s}</li>)}</ol></div>}
  </>)
}

const TOOLS = [
  ['/', 'Split bill calculator', 'Tax, tip, and an even split for any group.'],
  ['/split-rent-calculator/', 'Split rent calculator', 'Share rent by room size, income, or equally.'],
  ['/split-expenses-calculator/', 'Split expenses calculator', 'Track who paid what and settle up.']
]
function Related({ here }) {
  return <section className="sec"><h2>More calculators</h2><div className="tools">
    {TOOLS.filter(t => t[0] !== here).map(([to, n, d]) =>
      <Link key={to} to={to}><div className="card"><b>{n}</b><span>{d}</span></div></Link>)}
  </div></section>
}

function Page({ seo, h1, intro, tool, children }) {
  return <>
    <Seo {...seo} />
    <div className="wrap"><section className="hero2">
      <div className="copy"><h1>{h1}</h1><p className="lead">{intro}</p></div>
      {tool}
    </section></div>
    <div className="band"><div className="wrap">{children}</div></div>
  </>
}

const BILL_FAQ = [
  ['How do I split a bill with tax and tip?', 'Enter the pre-tax subtotal, the tax rate, and the tip percentage. The calculator adds tax and tip, then divides the total by the number of people and shows each share.'],
  ['Should I tip on the pre-tax or post-tax amount?', 'Both are common. Many people tip on the pre-tax subtotal because tax is not a service charge. Use the toggle to switch the tip base and compare.'],
  ['How do I split money between friends fairly?', 'For a shared meal, an even split is simplest. When people pay for different things or one person covers everything, use the split expenses calculator to see who owes whom.'],
  ['How is the split cost rounded?', 'Totals rarely divide evenly. This calculator assigns the leftover cents to individual people so the shares always add up to the exact total.'],
  ['Is my data saved?', 'No. Calculations run in your browser and nothing is stored or uploaded.']
]

const RENT_FAQ = [
  ['How do you split rent fairly between roommates?', 'Equal splits work when rooms are similar. When rooms differ in size or people earn differently, splitting by room size or income is usually seen as fairer.'],
  ['How do I split rent by room size?', 'Enter each room’s square footage. Each person pays a share of the rent equal to their room’s share of the total area.'],
  ['Should utilities be split the same way as rent?', 'Often not. Utilities are usually split equally because everyone uses them. Use the split bill calculator for those, and this tool for rent.'],
  ['How do I split cost by income?', 'Choose “By income” and enter each person’s monthly income. Each person pays the same percentage of their income toward rent.']
]

const EXP_FAQ = [
  ['How do I split expenses when different people paid?', 'List everyone, add each expense with who paid, and the calculator works out each person’s balance and the fewest payments needed to settle up.'],
  ['How do I split money for a group trip?', 'Add every shared cost during the trip. At the end, the settle-up list shows who should pay whom, so you avoid many small transfers.'],
  ['What is the easiest way to split cost between friends?', 'Add each shared cost as it happens and let the calculator net everything out. Everyone then makes only the payments shown.'],
  ['Are expenses always split equally?', 'In this tool, yes. Each expense is divided equally among everyone listed. For uneven shares of a single bill, see the split bill calculator.']
]


/* ---------- Split bill (primary keyword) ---------- */
function Bill() {
  const cur = useCur()
  const [sub, setSub] = useState(''), [tax, setTax] = useState(''), [tip, setTip] = useState(18)
  const [base, setBase] = useState('pre'), [n, setN] = useState(2)
  const s = toC(sub), t = Math.round(s * clamp(tax, 100) / 100)
  const tp = Math.round((base === 'pre' ? s : s + t) * clamp(tip, 100) / 100)
  const total = s + t + tp, shares = allocate(total, Array(n).fill(1))
  const hi = Math.max(...shares), low = shares.filter(x => x !== hi).length
  const copy = () => navigator.clipboard?.writeText(`Total ${fmt(total, cur)} split ${n} ways: ${fmt(hi, cur)} each`)
  const tool = (
    <div className="grid">
      <div className="card">
        <LabelHelp htmlFor="sub" label="Bill amount (before tax and tip)" steps={BILL_HELP} onDemo={() => { setSub('86'); setTax('8'); setTip(18); setBase('pre'); setN(3) }} />
        <div className="amt"><span>{sym(cur)}</span><Num id="sub" value={sub} onChange={e => setSub(lim(e.target.value))} placeholder="0.00" /><em>{cur}</em></div>
        <div className="row">
          <div><label htmlFor="tax">Tax %</label><Num id="tax" value={tax} onChange={e => setTax(lim(e.target.value, 100))} placeholder="0" /></div>
          <div><label htmlFor="tip">Tip %</label><Num id="tip" value={tip} onChange={e => setTip(lim(e.target.value, 100))} /></div>
        </div>
        <label>Quick tip</label>
        <div className="chips">{[0, 10, 15, 18, 20].map(v =>
          <button key={v} className={'chip' + (+tip === v ? ' on' : '')} onClick={() => setTip(v)}>{v}%</button>)}</div>
        <div className="row two">
          <div>
            <label>Calculate tip on</label>
            <div className="chips">
              <button className={'chip' + (base === 'pre' ? ' on' : '')} onClick={() => setBase('pre')}>Before tax</button>
              <button className={'chip' + (base === 'post' ? ' on' : '')} onClick={() => setBase('post')}>After tax</button>
            </div>
          </div>
          <div>
            <label>Number of people</label>
            <div className="stepper">
              <button className="btn" aria-label="Fewer people" onClick={() => setN(Math.max(1, n - 1))}>−</button>
              <b>{n}</b>
              <button className="btn" aria-label="More people" onClick={() => setN(Math.min(50, n + 1))}>+</button>
            </div>
          </div>
        </div>
      </div>
      <div className="card receipt" aria-live="polite">
        <p className="mut">Each person pays</p>
        <p className="big">{fmt(hi, cur)}</p>
        {low > 0 && <div className="note">{low} {low === 1 ? 'person pays' : 'people pay'} {fmt(hi - Math.min(...shares), cur)} less so the total is exact.</div>}
        <div style={{ marginTop: 14 }}>
          <div className="line"><span>Subtotal</span><span>{fmt(s, cur)}</span></div>
          <div className="line"><span>Tax</span><span>{fmt(t, cur)}</span></div>
          <div className="line"><span>Tip</span><span>{fmt(tp, cur)}</span></div>
          <div className="line tot"><b>Total</b><b>{fmt(total, cur)}</b></div>
        </div>
        <button className="btn p" style={{ marginTop: 14, width: '100%' }} onClick={copy}>Copy result</button>
      </div>
    </div>
  )
  return (
    <Page tool={tool} h1="Split Bill Calculator"
      intro="Split a bill with tax and tip in seconds. Enter the amount and the number of people, and see exactly what each person pays."
      seo={{
        name: 'Split Bill Calculator', path: '/', faq: BILL_FAQ,
        title: 'Split Bill Calculator – Split Tax & Tip Evenly | ' + BRAND,
        desc: 'Free split bill calculator. Add tax and tip, split by any number of people, and get each share to the cent. No signup.'
      }}>
      <section className="sec first"><h2>How to split a bill</h2>
        <ol>
          <li>Enter the bill amount before tax and tip.</li>
          <li>Add the tax rate and choose a tip. Pick whether tip is calculated before or after tax.</li>
          <li>Set the number of people. Each share updates instantly.</li>
        </ol>
        <p>Splitting a monthly cost instead? Try the <Link to="/split-rent-calculator/">split rent calculator</Link>, or use the <Link to="/split-expenses-calculator/">split expenses calculator</Link> when different people paid for different things.</p>
      </section>
      <section className="sec"><h2>Example: dinner for 3</h2>
        <p>A meal is $86.00 before tax. With 8% tax ($6.88) and an 18% tip on the pre-tax amount ($15.48), the total is $108.36. Split three ways, each person pays $36.12.</p>
      </section>
      <Faq items={BILL_FAQ} />
      <Related here="/" />
    </Page>
  )
}

/* ---------- Split rent ---------- */
function Rent() {
  const cur = useCur()
  const [rent, setRent] = useState(''), [mode, setMode] = useState('size')
  const [rows, setRows] = useState([{ n: 'Room 1', v: '' }, { n: 'Room 2', v: '' }])
  const upd = (i, k, val) => setRows(rows.map((r, j) => j === i ? { ...r, [k]: val } : r))
  const w = rows.map(r => mode === 'equal' ? 1 : clamp(r.v))
  const sh = allocate(toC(rent), w), sum = w.reduce((a, b) => a + b, 0)
  const tool = (
    <div className="grid">
      <div className="card">
        <LabelHelp htmlFor="rent" label="Total monthly rent" steps={RENT_HELP} onDemo={() => { setRent('3000'); setMode('size'); setRows([{ n: 'Alex', v: '200' }, { n: 'Sam', v: '150' }, { n: 'Jo', v: '100' }]) }} />
        <div className="amt"><span>{sym(cur)}</span><Num id="rent" value={rent} onChange={e => setRent(lim(e.target.value))} placeholder="0.00" /><em>/ mo</em></div>
        <label>Split method</label>
        <div className="chips">{[['size', 'By room size'], ['income', 'By income'], ['equal', 'Equally']].map(([k, l]) =>
          <button key={k} className={'chip' + (mode === k ? ' on' : '')} onClick={() => setMode(k)}>{l}</button>)}</div>
        {rows.map((r, i) => (
          <div className="row" key={i} style={{ marginTop: 10 }}>
            <input aria-label={`Name ${i + 1}`} value={r.n} onChange={e => upd(i, 'n', e.target.value)} />
            {mode !== 'equal' && <Num aria-label={mode === 'size' ? 'Square feet' : 'Monthly income'} value={r.v}
              onChange={e => upd(i, 'v', lim(e.target.value))} placeholder={mode === 'size' ? 'Sq ft' : 'Income'} />}
            {rows.length > 2 && <button className="btn rm" aria-label="Remove" onClick={() => setRows(rows.filter((_, j) => j !== i))}>×</button>}
          </div>))}
        <button className="btn" style={{ marginTop: 14 }} onClick={() => setRows([...rows, { n: `Room ${rows.length + 1}`, v: '' }])}>+ Add roommate</button>
      </div>
      <div className="card receipt" aria-live="polite">
        <p className="mut">Each person pays</p>
        {rows.map((r, i) => <div className="line" key={i}>
          <span>{r.n || `Room ${i + 1}`} <span className="mut">{sum ? `(${(w[i] / sum * 100).toFixed(1)}%)` : ''}</span></span>
          <b>{fmt(sh[i], cur)}</b></div>)}
        <div className="line tot"><b>Total</b><b>{fmt(sh.reduce((a, b) => a + b, 0), cur)}</b></div>
      </div>
    </div>
  )
  return (
    <Page tool={tool} h1="Split Rent Calculator"
      intro="Split rent between roommates equally, by room size, or by income. Everyone sees what they owe and why."
      seo={{
        name: 'Split Rent Calculator', path: '/split-rent-calculator/', faq: RENT_FAQ,
        title: 'Split Rent Calculator – By Room Size or Income | ' + BRAND,
        desc: 'Free split rent calculator for roommates. Divide rent equally, by room size, or by income. Instant, fair results.'
      }}>
      <section className="sec first"><h2>Example: three roommates, $3,000 rent</h2>
        <p>Rooms of 200, 150, and 100 sq ft make 450 sq ft in total. The shares are $1,333.33, $1,000.00, and $666.67. For internet and power, use the <Link to="/">split bill calculator</Link>.</p>
      </section>
      <Faq items={RENT_FAQ} />
      <Related here="/split-rent-calculator/" />
    </Page>
  )
}

/* ---------- Split expenses (covers split cost / split money) ---------- */
function Expenses() {
  const cur = useCur()
  const [names, setNames] = useState('Alex, Sam, Priya')
  const [rows, setRows] = useState([{ d: '', a: '', p: '' }])
  const people = [...new Set(names.split(',').map(x => x.trim()).filter(Boolean))]
  const bal = Object.fromEntries(people.map(p => [p, 0]))
  rows.forEach(r => {
    const c = toC(r.a), payer = people.includes(r.p) ? r.p : people[0]
    if (!c || !payer) return
    allocate(c, people.map(() => 1)).forEach((x, i) => { bal[people[i]] -= x })
    bal[payer] += c
  })
  const moves = settle(bal)
  const upd = (i, k, v) => setRows(rows.map((r, j) => j === i ? { ...r, [k]: v } : r))
  const tool = (
    <div className="grid">
      <div className="card">
        <LabelHelp htmlFor="ppl" label="People (separate with commas)" steps={EXP_HELP} onDemo={() => { setNames('Alex, Sam, Priya'); setRows([{ d: 'Groceries', a: '86.40', p: 'Priya' }, { d: 'Airbnb', a: '420', p: 'Sam' }, { d: 'Gas and dinner', a: '132.10', p: 'Alex' }]) }} />
        <input id="ppl" value={names} onChange={e => setNames(e.target.value)} />
        <label>Expenses</label>
        {rows.map((r, i) => (
          <div className="row" key={i} style={{ marginBottom: 10, flexWrap: 'wrap' }}>
            <input aria-label="What for" placeholder="What for" value={r.d} onChange={e => upd(i, 'd', e.target.value)} style={{ flex: '2 1 120px' }} />
            <Num aria-label="Amount" placeholder="Amount" value={r.a} onChange={e => upd(i, 'a', lim(e.target.value))} style={{ flex: '1 1 90px' }} />
            <select aria-label="Paid by" value={r.p} onChange={e => upd(i, 'p', e.target.value)} style={{ flex: '1 1 100px' }}>
              {people.map(p => <option key={p}>{p}</option>)}
            </select>
            {rows.length > 1 && <button className="btn rm" aria-label="Remove expense" onClick={() => setRows(rows.filter((_, j) => j !== i))}>×</button>}
          </div>))}
        <button className="btn" onClick={() => setRows([...rows, { d: '', a: '', p: '' }])}>+ Add expense</button>
      </div>
      <div className="card receipt" aria-live="polite">
        <p className="mut">To settle up</p>
        {moves.length === 0 && <p>Add an expense to see who owes whom.</p>}
        {moves.map((m, i) => <div className="line" key={i}><span>{m.from} pays {m.to}</span><b>{fmt(m.amt, cur)}</b></div>)}
      </div>
    </div>
  )
  return (
    <Page tool={tool} h1="Split Expenses Calculator"
      intro="Add what each person paid and see who owes whom. Works for trips, households, and any shared cost."
      seo={{
        name: 'Split Expenses Calculator', path: '/split-expenses-calculator/', faq: EXP_FAQ,
        title: 'Split Expenses Calculator – Who Owes Whom | ' + BRAND,
        desc: 'Free split expenses calculator for groups. Add who paid what and get the fewest payments to settle up. No signup.'
      }}>
      <section className="sec first"><h2>How settling up works</h2>
        <p>Each expense is divided equally. The calculator nets everyone’s payments and shares, then finds the fewest transfers that clear all balances. Splitting just one bill with tip? Use the <Link to="/">split bill calculator</Link>. Sharing a lease? Try the <Link to="/split-rent-calculator/">split rent calculator</Link>.</p>
      </section>
      <Faq items={EXP_FAQ} />
      <Related here="/split-expenses-calculator/" />
    </Page>
  )
}

export const routes = [{
  path: '/', element: <Layout />,
  children: [
    { index: true, element: <Bill /> },
    { path: 'split-rent-calculator', element: <Rent /> },
    { path: 'split-expenses-calculator', element: <Expenses /> }
  ]
}]