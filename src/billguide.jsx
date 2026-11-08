import { Head } from 'vite-react-ssg'
import { Link } from 'react-router-dom'

const DATE = '2026-11-08'

export function BillGuide({ site, brand }) {
  const path = '/how-to-split-a-restaurant-bill/'
  const url = site + path
  const h1 = 'How to Split a Restaurant Bill With Tax and Tip'
  const title = `${h1} | ${brand}`
  const desc = 'Learn how to split a restaurant bill fairly: tip before or after tax, splitting evenly, splitting by what each person ordered, and handling rounding. With worked examples.'
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: h1,
    description: desc,
    datePublished: DATE,
    dateModified: DATE,
    mainEntityOfPage: url,
    author: { '@type': 'Organization', name: brand },
    publisher: { '@type': 'Organization', name: brand }
  }
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={url} />
        <script type="application/ld+json">{JSON.stringify(ld)}</script>
      </Head>
      <div className="wrap"><section className="hero2"><div className="copy">
        <h1>{h1}</h1>
        <p className="lead">The simple formula, the tip question everyone argues about, and how to split fairly when people ordered different amounts.</p>
      </div></section></div>
      <div className="band"><div className="wrap">
        <section className="sec">
          <h2>The basic formula</h2>
          <p>Every restaurant bill splits the same way: add the tax and the tip to the subtotal to get the total, then divide by the number of people. For a quick answer, enter the amounts in the <Link to="/">split bill calculator</Link>, which works as a bill splitter for any group size.</p>
          <p>Example: a meal costs $86.00 before tax. With 8% tax ($6.88) and an 18% tip on the pre-tax amount ($15.48), the total is $108.36. Split three ways, each person pays $36.12.</p>
        </section>
        <section className="sec">
          <h2>Tip before tax or after tax?</h2>
          <p>Both are common. Many people tip on the pre-tax subtotal, because tax is not a charge for service. Others tip on the final total because it is easier to calculate from the receipt. Pick one and tell the group, so everyone is working from the same number.</p>
          <p>The difference is small. On the same $86.00 meal, an 18% tip on the after-tax amount ($92.88) is $16.72 instead of $15.48. The total becomes $109.60 instead of $108.36, which is $1.24 more for the whole table.</p>
        </section>
        <section className="sec">
          <h2>Check for a service charge first</h2>
          <p>Some restaurants add a service charge or automatic gratuity to the bill, especially for larger groups. Look at the receipt before adding a tip, so you do not tip twice. If the charge is already included, set the tip in the calculator to 0%.</p>
        </section>
        <section className="sec">
          <h2>Splitting by what each person ordered</h2>
          <p>An even split is fair when everyone ate about the same. When people ordered very different amounts, split by item. Each person pays for their own food, plus the same tax rate and tip rate applied to it.</p>
          <ol>
            <li>Add up each person’s own items.</li>
            <li>Split shared dishes, such as appetizers, equally between the people who shared them, and add that to their items.</li>
            <li>Add tax and tip to each person’s amount at the same rates as the bill.</li>
          </ol>
          <p>Example: Alex ordered $40.00, Sam $30.00, and Priya $16.00, which makes the same $86.00 subtotal. With 8% tax and an 18% tip on the pre-tax amount, Alex pays $50.40, Sam pays $37.80, and Priya pays $20.16. Together that is $108.36, the same as the table total.</p>
          <p>To get each person’s amount, enter their items in the <Link to="/">split bill calculator</Link> with the number of people set to 1. It adds the tax and tip and shows what that person owes.</p>
        </section>
        <section className="sec">
          <h2>What to do about rounding</h2>
          <p>Totals often do not divide evenly. For example, $109.60 split three ways is $36.53 with a third of a cent left over. Someone has to cover the extra cent. The calculator gives the leftover cents to specific people, so the shares always add up to the exact total, and it tells you how many people pay a cent less.</p>
        </section>
        <section className="sec">
          <h2>When one person paid the whole bill</h2>
          <p>The simplest way is for everyone to send the paying person their share. If you have several bills across a trip or a weekend and different people paid for different things, add them to the <Link to="/split-expenses-calculator/">split expenses calculator</Link>. It works out who owes whom with as few payments as possible.</p>
        </section>
        <section className="sec">
          <h2>Quick checklist</h2>
          <ol>
            <li>Check the receipt for a service charge.</li>
            <li>Agree whether to tip before or after tax.</li>
            <li>Split evenly if everyone ordered about the same, or by item if not.</li>
            <li>Let the calculator handle the rounding.</li>
          </ol>
          <p>Sharing a home instead of a meal? See <Link to="/how-to-split-rent-fairly/">how to split rent fairly between roommates</Link>.</p>
        </section>
      </div></div>
    </>
  )
}