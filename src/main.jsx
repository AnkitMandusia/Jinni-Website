import React from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight, ArrowUpRight, Bike, CheckCircle2, ChevronDown, LoaderCircle,
  MapPin, Menu, ShoppingBasket, ShoppingBag, Store, Utensils, X
} from "lucide-react";
import "./style.css";

const PARTNER_PORTAL = (import.meta.env.VITE_PARTNER_PORTAL_URL || "https://partners.jinniwishes.in").replace(/\/+$/, "");
const API_BASE_URL = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");
const ASSETS = "https://raw.githubusercontent.com/AnkitMandusia/Jinni/main/superapp-mobile/assets";

const faqs = [
  ["What is Jinni?", "Jinni brings neighbourhood restaurants and grocery stores into one local discovery experience."],
  ["Can I order from Jinni in my area?", "Availability depends on your area and the services currently enabled there. Use the PIN code checker above to see active restaurant and grocery listings returned by Jinni."],
  ["How does the PIN code checker work?", "It checks Jinni's live restaurant and grocery listings for the six-digit PIN code you enter. The PIN code is sent to the Jinni API for this lookup and is not saved by this website."],
  ["I run a restaurant or grocery store. How can I join?", "Get in touch with the Jinni team using the partner enquiry link. Existing approved partners can sign in to their restaurant or grocery dashboard."],
  ["Does Jinni offer services beyond food and groceries?", "The current Jinni website focuses on food and grocery discovery."]
];

function App() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [activeFaq, setActiveFaq] = React.useState(0);
  const [pincode, setPincode] = React.useState("");
  const [availabilityState, setAvailabilityState] = React.useState("idle");
  const [availability, setAvailability] = React.useState(null);
  const [availabilityError, setAvailabilityError] = React.useState("");
  const closeMenu = () => setMenuOpen(false);
  const partnerLinks = { restaurant: PARTNER_PORTAL + "/restaurant", store: PARTNER_PORTAL + "/store" };

  async function checkAvailability(event) {
    event.preventDefault();
    if (!/^\d{6}$/.test(pincode)) {
      setAvailability(null);
      setAvailabilityError("Enter a valid six-digit PIN code.");
      setAvailabilityState("error");
      return;
    }
    if (!API_BASE_URL) {
      setAvailability(null);
      setAvailabilityError("The live area checker is not connected yet. Please email hello@jinniwishes.in and our team can help with area availability.");
      setAvailabilityState("error");
      return;
    }

    setAvailabilityState("loading");
    setAvailability(null);
    setAvailabilityError("");

    const requests = [
      ["restaurants", API_BASE_URL + "/api/v1/food/restaurants?pincode=" + pincode + "&page=1&page_size=1"],
      ["grocery", API_BASE_URL + "/api/v1/grocery/stores?pincode=" + pincode]
    ];
    const outcomes = await Promise.allSettled(requests.map(async ([kind, url]) => {
      const response = await fetch(url, { headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error(kind + " lookup returned " + response.status);
      const data = await response.json();
      const count = Number(data.total ?? (kind === "restaurants" ? data.restaurants?.length : data.stores?.length) ?? 0);
      return { kind, count: Number.isFinite(count) ? count : 0 };
    }));

    const fulfilled = outcomes.filter((item) => item.status === "fulfilled").map((item) => item.value);
    const failed = outcomes.filter((item) => item.status === "rejected");
    if (!fulfilled.length) {
      setAvailabilityError("We couldn't check this PIN code right now. Please try again in a moment or contact hello@jinniwishes.in.");
      setAvailabilityState("error");
      return;
    }
    const values = { restaurants: null, grocery: null };
    fulfilled.forEach(({ kind, count }) => { values[kind] = count; });
    setAvailability(values);
    setAvailabilityState("success");
    if (failed.length) setAvailabilityError("One category could not be checked just now. The figures shown are for the category that responded.");
  }

  const restaurantCount = availability?.restaurants ?? 0;
  const groceryCount = availability?.grocery ?? 0;
  const totalCount = restaurantCount + groceryCount;

  return <div className="site-shell">
    <div className="announcement"><span>✳</span> Your neighbourhood has good things to discover. <a href="#explore">Meet Jinni <ArrowUpRight size={13}/></a></div>
    <header className="nav-wrap">
      <nav className="nav container" aria-label="Main navigation">
        <a className="brand" href="#home" aria-label="Jinni home"><span className="brand-mark">j</span><span>jinni<span className="brand-dot">.</span></span></a>
        <div className="nav-links"><a href="#explore">Explore</a><a href="#how">How it works</a><a href="#why">Why Jinni</a><a href="#partners">For partners</a><a href="#about">About</a></div>
        <div className="nav-actions"><a className="login-link" href={partnerLinks.restaurant}>Partner login <ArrowUpRight size={14}/></a><a className="nav-cta" href="#availability">Check your area <ArrowRight size={15}/></a></div>
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>{menuOpen ? <X/> : <Menu/>}</button>
      </nav>
      {menuOpen && <div className="mobile-panel"><a href="#explore" onClick={closeMenu}>Explore</a><a href="#how" onClick={closeMenu}>How it works</a><a href="#why" onClick={closeMenu}>Why Jinni</a><a href="#partners" onClick={closeMenu}>For partners</a><a href={partnerLinks.restaurant}>Partner login</a></div>}
    </header>

    <main id="home">
      <section className="hero container">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot"/> THE GOOD STUFF, RIGHT AROUND YOU</div>
          <h1>Your neighbourhood,<br/><em>a little closer.</em></h1>
          <p className="hero-lede">The food you love. The groceries you need. Discover the local businesses that make your neighbourhood feel like home.</p>
          <div className="hero-buttons"><a className="button button-dark" href="#availability">Check your area <ArrowUpRight size={17}/></a><a className="text-button" href="#partners">I’m a local business <ArrowRight size={16}/></a></div>
          <div className="hero-foot"><div className="avatar-stack"><span>🍲</span><span>🥬</span><span>🧁</span></div><span>Food, groceries and local favourites.</span></div>
        </div>
        <div className="hero-art">
          <div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/>
          <div className="hero-photo"><img src={ASSETS + "/hero_jinni_carousel.png"} alt="Jinni's neighbourhood food and grocery experience" fetchPriority="high"/><span className="photo-tag">GOOD THINGS, CLOSE BY <i>✳</i></span></div>
          <div className="art-note note-top"><span className="note-icon">✳</span><span><b>Made nearby</b><small>Discover local favourites</small></span></div>
          <div className="art-note note-bottom"><span className="basket-icon"><ShoppingBasket size={18}/></span><span><b>Daily essentials</b><small>From stores around you</small></span></div>
          <span className="art-star star-one">✳</span><span className="art-star star-two">✳</span>
        </div>
      </section>

      <section className="ticker" aria-label="Jinni categories"><div className="ticker-track"><span>LOCAL FOOD <b>✳</b> EVERYDAY GROCERIES <b>✳</b> NEIGHBOURHOOD BUSINESSES <b>✳</b> GOOD THINGS, CLOSE BY <b>✳</b></span><span aria-hidden="true">LOCAL FOOD <b>✳</b> EVERYDAY GROCERIES <b>✳</b> NEIGHBOURHOOD BUSINESSES <b>✳</b> GOOD THINGS, CLOSE BY <b>✳</b></span></div></section>

      <section className="section explore-section" id="explore"><div className="container">
        <div className="section-head"><div><div className="eyebrow">A LITTLE BIT OF EVERYTHING</div><h2>Closer to what<br/><em>you love.</em></h2></div><p>From a meal you have been craving to the things you need for home — discover food and grocery businesses around your corner.</p></div>
        <div className="category-grid">
          <article className="category-card food-category"><div className="category-icon"><Utensils size={21}/></div><div className="category-visual image-visual"><img src={ASSETS + "/hero_food.jpg"} alt="Food from a local restaurant" loading="lazy"/></div><div className="category-info"><div><span className="card-label">FOR THE CRAVINGS</span><h3>Food, made with love.</h3><p>Discover neighbourhood restaurants, browse their menus and find dishes to come back to.</p></div><a href="#availability" aria-label="Check food availability"><ArrowUpRight/></a></div></article>
          <article className="category-card grocery-category"><div className="category-icon"><ShoppingBasket size={22}/></div><div className="category-visual image-visual"><img src={ASSETS + "/hero_stores.jpg"} alt="Everyday grocery essentials" loading="lazy"/></div><div className="category-info"><div><span className="card-label">FOR THE EVERYDAY</span><h3>Groceries, sorted.</h3><p>Explore grocery stores and everyday essentials available around your neighbourhood.</p></div><a href="#availability" aria-label="Check grocery availability"><ArrowUpRight/></a></div></article>
        </div>
      </div></section>

      <section className="availability-section" id="availability"><div className="container availability-grid"><div><div className="eyebrow">START WITH YOUR PIN CODE</div><h2>What’s around<br/><em>your corner?</em></h2><p>Enter your six-digit PIN code to check Jinni’s current restaurant and grocery listings in that area.</p><div className="privacy-hint"><CheckCircle2 size={15}/> Your PIN code is used for this lookup, not saved by this website.</div></div>
        <div className="checker-card"><div className="checker-title"><span className="checker-icon"><MapPin/></span><div><b>Check local availability</b><small>India · Six-digit PIN code</small></div></div><form onSubmit={checkAvailability} className="pin-form"><label htmlFor="pincode">Your PIN code</label><div className="pin-controls"><input id="pincode" value={pincode} onChange={e=>{setPincode(e.target.value.replace(/\D/g,"").slice(0,6));setAvailabilityError("");}} inputMode="numeric" autoComplete="postal-code" maxLength={6} placeholder="e.g. 302001" aria-describedby="pin-help" required/><button type="submit" disabled={availabilityState==="loading" || pincode.length!==6}>{availabilityState==="loading"?<LoaderCircle className="spin" size={17}/>:<>Check area <ArrowRight size={16}/></>}</button></div><small id="pin-help" className="input-help">We’ll check the latest listings returned for this PIN code.</small></form>
          {availabilityState==="success" && availability && <div className="availability-result" role="status"><div className="result-heading">{totalCount>0?"Here’s what Jinni found":"No active listings returned yet"}</div>{totalCount>0?<div className="result-counts">{availability.restaurants!==null&&<span><Utensils size={16}/><b>{restaurantCount}</b> restaurants</span>}{availability.grocery!==null&&<span><ShoppingBasket size={16}/><b>{groceryCount}</b> grocery stores</span>}</div>:<p>We didn’t find an active restaurant or grocery listing for this PIN code in the latest lookup. Check back as local availability changes.</p>}{availabilityError&&<p className="partial-note">{availabilityError}</p>}</div>}
          {availabilityState==="error" && <p className="checker-error" role="alert">{availabilityError}</p>}
        </div>
      </div></section>

      <section className="how-section" id="how"><div className="container how-grid"><div className="how-intro"><div className="eyebrow light-eyebrow">SIMPLE AS IT SHOULD BE</div><h2>Good things<br/>are <em>closer.</em></h2><p>Start with your area, explore the local options and discover what your neighbourhood has to offer.</p><a className="button button-light" href="#availability">Check your area <ArrowRight size={16}/></a></div><div className="steps"><div className="step"><span className="step-number">01</span><div className="step-icon"><MapPin/></div><div><h3>Check your area</h3><p>Enter your PIN code to see the latest local listings.</p></div></div><div className="step"><span className="step-number">02</span><div className="step-icon"><ShoppingBag/></div><div><h3>Explore what’s nearby</h3><p>Discover restaurants and grocery stores around you.</p></div></div><div className="step"><span className="step-number">03</span><div className="step-icon"><Bike/></div><div><h3>Stay close to local</h3><p>Find the neighbourhood businesses that fit your everyday needs.</p></div></div></div></div></section>

      <section className="why-section" id="why"><div className="container"><div className="why-heading"><div><div className="eyebrow">WHY JINNI</div><h2>Local makes<br/><em>life feel closer.</em></h2></div><p>A simpler way to discover the food and grocery businesses that are part of your everyday neighbourhood.</p></div><div className="why-grid"><article className="why-card"><span className="why-icon"><MapPin/></span><span className="card-label">LOCAL BY DESIGN</span><h3>Start with your area.</h3><p>Explore listings for your own PIN code, with availability checked against Jinni’s current local data.</p></article><article className="why-card"><span className="why-icon"><ShoppingBasket/></span><span className="card-label">TWO EVERYDAY NEEDS</span><h3>Food and grocery, together.</h3><p>Discover restaurant menus and everyday grocery options in one Jinni experience.</p></article><article className="why-card"><span className="why-icon"><Store/></span><span className="card-label">FOR LOCAL BUSINESSES</span><h3>A place to grow locally.</h3><p>Restaurant and grocery partners have dedicated dashboard entry points for their Jinni business.</p></article></div></div></section>

      <section className="section partner-section" id="partners"><div className="container"><div className="section-head"><div><div className="eyebrow">GROW WITH YOUR NEIGHBOURHOOD</div><h2>Good businesses<br/><em>deserve to shine.</em></h2></div><p>Making something delicious or stocking the things people love? Let’s help more neighbours discover your business.</p></div><div className="partner-grid">
        <article className="partner-card restaurant-card"><div className="partner-symbol"><Utensils/></div><span className="card-label">FOR RESTAURANTS & CAFÉS</span><h3>Your food has a story.<br/>Let’s share it.</h3><p>Bring your menu online, connect with nearby customers and grow your local presence on Jinni.</p><a className="partner-link" href={partnerLinks.restaurant}>Restaurant partner login <ArrowUpRight size={17}/></a><a className="subtle-link" href="mailto:hello@jinniwishes.in?subject=Restaurant%20partnership%20enquiry">Interested in joining? Contact Jinni</a></article>
        <article className="partner-card store-card"><div className="partner-symbol"><Store/></div><span className="card-label">FOR GROCERY STORES</span><h3>Your store. More<br/>neighbourhood love.</h3><p>Give your grocery store a digital presence and help nearby customers discover your range.</p><a className="partner-link" href={partnerLinks.store}>Grocery store partner login <ArrowUpRight size={17}/></a><a className="subtle-link" href="mailto:hello@jinniwishes.in?subject=Grocery%20store%20partnership%20enquiry">Interested in joining? Contact Jinni</a></article>
      </div></div></section>

      <section className="city-section" id="about"><div className="container city-content"><div><div className="eyebrow light-eyebrow">ROOTED IN THE NEIGHBOURHOOD</div><h2>Local at heart.<br/>Made for <em>every day.</em></h2><p>Jinni is focused on bringing neighbourhood food businesses and grocery stores closer to the people they serve.</p></div><div className="contact-card"><span className="contact-label">HAVE A QUESTION OR IDEA?</span><h3>We’d love to hear from you.</h3><p>For customer questions, partnerships and general enquiries, reach the Jinni team by email.</p><a className="button button-light" href="mailto:hello@jinniwishes.in">Say hello <ArrowUpRight size={16}/></a></div></div></section>

      <section className="faq-section"><div className="container faq-grid"><div><div className="eyebrow">THE LITTLE DETAILS</div><h2>A few things<br/><em>you might wonder.</em></h2></div><div className="faq-list">{faqs.map(([q,a],i)=><div className={"faq-item "+(activeFaq===i?"faq-active":"")} key={q}><button onClick={()=>setActiveFaq(activeFaq===i?-1:i)} aria-expanded={activeFaq===i}><span>{q}</span><ChevronDown size={19}/></button>{activeFaq===i&&<p>{a}</p>}</div>)}</div></div></section>
    </main>

    <footer className="footer"><div className="container"><div className="footer-top"><div><a className="brand footer-brand" href="#home"><span className="brand-mark">j</span><span>jinni<span className="brand-dot">.</span></span></a><p>Good things, closer to home.</p></div><div className="footer-columns"><div><b>EXPLORE</b><a href="#explore">Food & groceries</a><a href="#how">How it works</a><a href="#about">About Jinni</a></div><div><b>PARTNERS</b><a href={partnerLinks.restaurant}>Restaurant login</a><a href={partnerLinks.store}>Grocery store login</a><a href="mailto:hello@jinniwishes.in?subject=Partner%20enquiry">Become a partner</a></div><div><b>SAY HELLO</b><a href="mailto:hello@jinniwishes.in">hello@jinniwishes.in</a><a href="/privacy.html">Privacy notice</a><a href="/terms.html">Terms of use</a></div></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Jinni. Made for neighbourhoods.</span><span>Food <i>✳</i> Grocery <i>✳</i> Local love</span><a href="#home">Back to top ↑</a></div></div></footer>
  </div>;
}

createRoot(document.getElementById("root")).render(<App />);
