import { Head } from 'vite-react-ssg'
import { Link } from 'react-router-dom'

const UPDATED = 'November 5, 2026'

function Doc({ site, brand, path, title, desc, h1, intro, sections }) {
  const url = site + path
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={url} />
      </Head>
      <div className="wrap"><section className="hero2"><div className="copy"><h1>{h1}</h1><p className="lead">{intro}</p></div></section></div>
      <div className="band"><div className="wrap">
        {sections.map(([h, ...ps]) => (
          <section className="sec" key={h}>
            <h2>{h}</h2>
            {ps.map((p, i) => <p key={i}>{p}</p>)}
          </section>
        ))}
      </div></div>
    </>
  )
}

const Mail = ({ email }) => <a href={`mailto:${email}`}>{email}</a>

export function Privacy({ site, brand, email }) {
  return <Doc site={site} brand={brand} path="/privacy-policy/" h1="Privacy Policy"
    title={`Privacy Policy | ${brand}`} desc={`How ${brand} handles your information. The calculators run in your browser and your inputs are never stored.`}
    intro={`Last updated: ${UPDATED}`}
    sections={[
      ['Summary', `${brand} runs in your browser. There are no accounts, and the amounts and names you type into the calculators are never sent to us or stored.`],
      ['Information we handle',
        'Calculator inputs stay on your device and disappear when you reload or close the page.',
        'Our site is delivered through Cloudflare, which processes technical data such as your IP address, browser type and the pages requested, so that it can serve the site, keep it secure and measure traffic. If you email us, we receive your email address and message.'],
      ['Cookies, analytics and advertising',
        'The calculators themselves do not set cookies. We may use privacy-focused analytics such as Cloudflare Web Analytics, and we may use Google Analytics and Google AdSense.',
        <>Third-party vendors, including Google, use cookies to serve ads based on a person’s previous visits to this and other websites. You can opt out of personalized advertising in <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>, and you can read how Google uses data from sites that use its services at <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">policies.google.com/technologies/partner-sites</a>.</>,
        'Where the law requires it, for example in the EEA, the UK and Switzerland, we ask for your consent before setting non-essential cookies.'],
      ['How we use information', 'We use it to run and secure the site, understand which pages are useful, answer messages, and meet legal obligations. We do not sell personal information.'],
      ['Sharing', 'We share data only with service providers that help us run the site, such as hosting, analytics and advertising partners, or when the law requires it.'],
      ['Retention', 'We do not keep calculator inputs. Emails are kept only as long as needed to handle your request. Analytics and advertising providers keep data under their own policies.'],
      ['Your rights', <>Depending on where you live, you may have the right to access, correct or delete personal information we hold, or to object to certain processing. Email us at <Mail email={email} /> and we will respond.</>],
      ['Children', `${brand} is not directed at children under 13, and we do not knowingly collect their personal information.`],
      ['Changes', 'We may update this policy and will change the date above when we do.']
    ]} />
}

export function Terms({ site, brand, email }) {
  return <Doc site={site} brand={brand} path="/terms/" h1="Terms of Use"
    title={`Terms of Use | ${brand}`} desc={`The terms for using ${brand}. The calculators give estimates and are not financial advice.`}
    intro={`Last updated: ${UPDATED}`}
    sections={[
      ['Using the site', `By using ${brand} you agree to these terms. If you do not agree, please do not use the site.`],
      ['Estimates, not advice', 'The calculators are for general information. Results are estimates and are not financial, legal or tax advice. Check any important figure yourself before you rely on it.'],
      ['No warranty', 'The site is provided “as is” and “as available”. We work to keep the calculations accurate, but we do not promise that the site is free of errors, always available, or suitable for your purpose.'],
      ['Limitation of liability', 'To the fullest extent the law allows, we are not liable for any loss or damage that arises from using the site or relying on its results.'],
      ['Acceptable use', 'Do not misuse the site: do not try to disrupt it, overload it with automated requests, or interfere with its security.'],
      ['Our content', `The design, text and code of ${brand} belong to us or our licensors. You are welcome to share your own calculation results.`],
      ['Third-party links and ads', 'The site may link to other websites or show advertising. We do not control those sites or their content, and they have their own terms and policies.'],
      ['Changes', 'We may change the site or these terms at any time. Continued use means you accept the updated terms.'],
      ['Governing law', 'These terms are governed by the laws of India.'],
      ['Contact', <>Questions about these terms: <Mail email={email} />.</>]
    ]} />
}

export function About({ site, brand, email }) {
  return <Doc site={site} brand={brand} path="/about/" h1={`About ${brand}`}
    title={`About ${brand} | Free Split Calculators`} desc={`${brand} offers free, no-login calculators for splitting bills, rent and shared expenses fairly.`}
    intro="Free calculators for splitting money fairly, with no signup."
    sections={[
      ['What it is', <>{brand} has three free tools: the <Link to="/">split bill calculator</Link> for tax and tip, the <Link to="/split-rent-calculator/">split rent calculator</Link> for sharing rent by room size or income, and the <Link to="/split-expenses-calculator/">split expenses calculator</Link> for working out who owes whom after a trip or a shared month.</>],
      ['How the calculators work', 'Money is calculated in whole cents. When a total does not divide evenly, the leftover cents are given to specific people, so the shares always add up to the exact total. The expenses calculator matches people who owe money with people who are owed, which gives a short list of payments to settle up.'],
      ['Your privacy', <>Your inputs stay in your browser and are not stored. Read the full <Link to="/privacy-policy/">privacy policy</Link>.</>],
      ['Who runs it', `${brand} is built and maintained by an independent developer. The site may be supported by advertising.`],
      ['Get in touch', <>Found an error or have a suggestion? Visit the <Link to="/contact/">contact page</Link> or email <Mail email={email} />.</>]
    ]} />
}

export function Contact({ site, brand, email }) {
  return <Doc site={site} brand={brand} path="/contact/" h1="Contact"
    title={`Contact | ${brand}`} desc={`Contact ${brand} to report a calculation error, suggest a feature or ask a privacy question.`}
    intro="The best way to reach us is by email."
    sections={[
      ['Email', <Mail email={email} />],
      ['What to include', 'For a bug report, tell us which calculator you used, what you entered, what you expected and what you saw. That lets us reproduce the problem quickly.'],
      ['What we can help with', 'Calculation errors, feature suggestions, privacy requests and general feedback. We usually reply within a few days.'],
      ['What we cannot do', 'We cannot give financial, legal or tax advice, or help with disputes between people who are splitting a cost.']
    ]} />
}