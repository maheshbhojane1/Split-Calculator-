import { Head } from "vite-react-ssg";
import { Link } from "react-router-dom";

const DATE = "2026-11-07";

export function RentGuide({ site, brand }) {
  const path = "/how-to-split-rent-fairly/";
  const url = site + path;
  const h1 = "How to Split Rent Fairly Between Roommates";
  const title = `${h1} | ${brand}`;
  const desc =
    "Equal, by room size, by income, or a mix. Learn how each way of splitting rent works, when it is fair, and see worked examples with real numbers.";
  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: h1,
    description: desc,
    datePublished: DATE,
    dateModified: DATE,
    mainEntityOfPage: url,
    author: { "@type": "Organization", name: brand },
    publisher: { "@type": "Organization", name: brand },
  };
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
      <div className="wrap">
        <section className="hero2">
          <div className="copy">
            <h1>{h1}</h1>
            <p className="lead">
              Equal, by room size, by income, or a mix. Here is how each method
              works, when it is fair, and how to calculate it.
            </p>
          </div>
        </section>
      </div>
      <div className="band">
        <div className="wrap">
          <section className="sec">
            <h2>Start by agreeing what “fair” means</h2>
            <p>
              Fair does not always mean equal. Rooms differ in size, some have a
              private bathroom, and roommates often earn different amounts.
              Before you pick a method, talk about what matters to your
              household. Then use the{" "}
              <Link to="/split-rent-calculator/">split rent calculator</Link> to
              check the numbers.
            </p>
          </section>
          <section className="sec">
            <h2>Method 1: split rent equally</h2>
            <p>
              Divide the rent by the number of people. It works well when the
              rooms are similar and everyone earns about the same. It is simple
              and avoids arguments about measuring. The downside is that the
              person with the smallest room pays the same as the person with the
              largest.
            </p>
            <p>Example: $3,000 rent shared by 3 people is $1,000 each.</p>
          </section>
          <section className="sec">
            <h2>Method 2: split rent by room size</h2>
            <p>
              Measure each bedroom in square feet, add the areas together, and
              charge each person the share of the rent that matches their room’s
              share of the total. Count bedrooms only, since everyone uses the
              kitchen and living room. Measure every room the same way, and
              decide beforehand whether closets count.
            </p>
            <p>
              Example: rooms of 200, 150, and 100 sq ft add up to 450 sq ft. On
              $3,000 rent, the shares are $1,333.33, $1,000.00, and $666.67.
            </p>
          </section>
          <section className="sec">
            <h2>Method 3: split rent by income</h2>
            <p>
              Each person pays the same percentage of their income toward rent.
              It suits couples and friends with large income gaps who are
              comfortable sharing those figures. It can feel unfair to the
              higher earner, so everyone needs to agree to it.
            </p>
            <p>
              Example: incomes of $6,000, $4,000, and $2,000 add up to $12,000.
              That is 50%, 33.3%, and 16.7%, so on $3,000 rent the shares are
              $1,500, $1,000, and $500. Some households compromise by splitting
              half the rent equally and half by income.
            </p>
          </section>
          <section className="sec">
            <h2>Adjust for extras like a private bathroom</h2>
            <p>
              Features such as a private bathroom, balcony, parking space, or a
              big closet change what a room is worth. A simple way to handle
              them:
            </p>
            <ol>
              <li>Agree a monthly premium for each feature.</li>
              <li>Subtract the premiums from the total rent.</li>
              <li>Split what is left equally, or by room size.</li>
              <li>
                Add each premium back to the person who gets that feature.
              </li>
            </ol>
            <p>
              Example: $3,000 rent for 3 people, with a $150 premium for the
              private bathroom. Subtract $150 to leave $2,850, which is $950
              each. The person with the bathroom pays $950 + $150 = $1,100, and
              the other two pay $950 each. The total is still $3,000.
            </p>
          </section>
          <section className="sec">
            <h2>How to choose a method</h2>
            <ol>
              <li>Similar rooms and similar incomes: split equally.</li>
              <li>Rooms that differ in size: split by room size.</li>
              <li>
                Large income differences: split by income, or a half-and-half
                mix.
              </li>
              <li>
                Rooms with special features: use the premium adjustment on top
                of any method.
              </li>
            </ol>
          </section>
          <section className="sec">
            <h2>Put the agreement in writing</h2>
            <p>
              Write down the amounts, who pays the landlord, the due date, and
              what happens if someone moves out. Many households also split the
              security deposit in the same proportions as rent. Leases often
              make every tenant responsible for the full rent, so agree in
              advance what happens if someone cannot pay. This guide is general
              information and not legal advice, so check your own lease.
            </p>
            <p>
              For shared bills such as electricity and internet, use the{" "}
              <Link to="/">split bill calculator</Link>. For groceries and other
              shared purchases, the{" "}
              <Link to="/split-expenses-calculator/">
                split expenses calculator
              </Link>{" "}
              shows who owes whom.
            </p>
          </section>
          <section className="sec">
            <h2>Work out your own numbers</h2>
            <p>
              Enter your total rent in the{" "}
              <Link to="/split-rent-calculator/">split rent calculator</Link>,
              choose equal, by room size, or by income, and add each roommate.
              The calculator shows what each person pays, and the amounts always
              add up to the exact rent.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
