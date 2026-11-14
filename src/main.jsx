import React from "react";
import { createRoot } from "react-dom/client";
import { ArrowRight, ArrowUpRight, Bike, Check, ChevronDown, MapPin, Menu, ShoppingBasket, ShoppingBag, Store, Utensils, X } from "lucide-react";
import "./style.css";

const PARTNER_PORTAL = (import.meta.env.VITE_PARTNER_PORTAL_URL || "https://partners.jinniwishes.in").replace(/\/$/, "");

function App() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [activeFaq, setActiveFaq] = React.useState(0);
  const partnerLinks = { restaurant: PARTNER_PORTAL + "/restaurant", store: PARTNER_PORTAL + "/store" };
  const closeMenu = () => setMenuOpen(false);

  return <div className="site-shell">
    <div className="announcement"><span>✳</span> Good things are closer than you think. <a href="#explore">Meet Jinni <ArrowUpRight size={13}/></a></div>
    <header className="nav-wrap">
      <nav className="nav container">
        <a className="brand" href="#" aria-label="Jinni home"><span className="brand-mark">j</span><span>jinni<span className="brand-dot">.</span></span></a>
        <div className="nav-links"><a href="#explore">Explore</a><a href="#how">How it works</a><a href="#partners">For partners</a><a href="#about">About</a></div>
        <div className="nav-actions"><a className="login-link" href={partnerLinks.restaurant}>Partner login <ArrowUpRight size={14}/></a><a className="nav-cta" href="#explore">Discover Jinni <ArrowRight size={15}/></a></div>
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X/> : <Menu/>}</button>
      </nav>
      {menuOpen && <div className="mobile-panel"><a href="#explore" onClick={closeMenu}>Explore</a><a href="#how" onClick={closeMenu}>How it works</a><a href="#partners" onClick={closeMenu}>For partners</a><a href={partnerLinks.restaurant}>Partner login</a></div>}
    </header>

    <main>
      <section className="hero container">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot"/> THE GOOD STUFF, RIGHT AROUND YOU</div>
          <h1>Your neighbourhood,<br/><em>delivered.</em></h1>
          <p className="hero-lede">The food you crave. The groceries you need. All from the local businesses that make your neighbourhood feel like home.</p>
          <div className="hero-buttons"><a className="button button-dark" href="#explore">Explore what’s nearby <ArrowUpRight size={17}/></a><a className="text-button" href="#partners">I’m a local business <ArrowRight size={16}/></a></div>
          <div className="hero-foot"><div className="avatar-stack"><span>🍲</span><span>🥬</span><span>🧁</span></div><span>Local favourites. Everyday essentials.</span></div>
        </div>
        <div className="hero-art" aria-label="Illustration celebrating local food and groceries">
          <div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/>
          <div className="art-note note-top"><span className="note-icon">✳</span><span><b>Made nearby</b><small>From your local favourites</small></span></div>
          <div className="food-card"><div className="food-card-top"><span>GOOD FOOD, GOOD MOOD</span><span>✳</span></div><div className="food-illustration"><div className="plate"><div className="rice"/><div className="greens"/><div className="tomato tomato-one"/><div className="tomato tomato-two"/><div className="herb herb-one"/><div className="herb herb-two"/></div></div><div className="food-card-bottom"><span><b>A little closer to home.</b><small>Freshly made. Neighbourhood loved.</small></span><span className="round-arrow"><ArrowUpRight/></span></div></div>
          <div className="art-sticker">GOOD<br/>THINGS<br/><span>GROW</span><i>✳</i></div>
          <div className="art-note note-bottom"><span className="basket-icon"><ShoppingBasket size={18}/></span><span><b>Daily essentials</b><small>One less thing to worry about</small></span></div>
          <span className="art-star star-one">✳</span><span className="art-star star-two">✳</span>
        </div>
      </section>

      <section className="ticker"><div className="ticker-track">{Array.from({length:2}).map((_,i)=><span key={i}>LOCAL FOOD <b>✳</b> EVERYDAY GROCERIES <b>✳</b> NEIGHBOURHOOD BUSINESSES <b>✳</b> GOOD THINGS, CLOSE BY <b>✳</b></span>)}</div></section>

      <section className="section explore-section" id="explore"><div className="container">
        <div className="section-head"><div><div className="eyebrow">A LITTLE BIT OF EVERYTHING</div><h2>Closer to what<br/><em>you love.</em></h2></div><p>From your favourite comfort food to the things you forgot to add to the list — find the good stuff around your corner.</p></div>
        <div className="category-grid">
          <article className="category-card food-category"><div className="category-icon"><Utensils size={21}/></div><div className="category-visual food-visual"><span className="food-emoji">🍜</span><span className="food-emoji small-emoji">🥟</span><span className="visual-spark">✳</span></div><div className="category-info"><div><span className="card-label">FOR THE CRAVINGS</span><h3>Food, made with love.</h3><p>Discover neighbourhood restaurants and the dishes you keep coming back for.</p></div><a href="#partners" aria-label="Explore food partners"><ArrowUpRight/></a></div></article>
          <article className="category-card grocery-category"><div className="category-icon"><ShoppingBasket size={22}/></div><div className="category-visual grocery-visual"><span>🥑</span><span>🍊</span><span>🥬</span><span>🥖</span></div><div className="category-info"><div><span className="card-label">FOR THE EVERYDAY</span><h3>Groceries, sorted.</h3><p>Everyday essentials and fresh finds from stores around your neighbourhood.</p></div><a href="#partners" aria-label="Explore grocery partners"><ArrowUpRight/></a></div></article>
        </div>
      </div></section>

      <section className="how-section" id="how"><div className="container how-grid"><div className="how-intro"><div className="eyebrow light-eyebrow">SIMPLE AS IT SHOULD BE</div><h2>Good things<br/>are <em>closer.</em></h2><p>Jinni brings your neighbourhood’s food spots and grocery stores into one easy place.</p><a className="button button-light" href="#explore">Take a look around <ArrowRight size={16}/></a></div><div className="steps"><div className="step"><span className="step-number">01</span><div className="step-icon"><MapPin/></div><div><h3>Find your local gems</h3><p>Explore restaurants and grocery stores in your neighbourhood.</p></div></div><div className="step"><span className="step-number">02</span><div className="step-icon"><ShoppingBag/></div><div><h3>Pick what you love</h3><p>Browse menus and everyday essentials from local businesses.</p></div></div><div className="step"><span className="step-number">03</span><div className="step-icon"><Bike/></div><div><h3>Enjoy a little more ease</h3><p>Use the Jinni experience as ordering becomes available in your area.</p></div></div></div></div></section>

      <section className="section partner-section" id="partners"><div className="container"><div className="section-head"><div><div className="eyebrow">GROW WITH YOUR NEIGHBOURHOOD</div><h2>Good businesses<br/><em>deserve to shine.</em></h2></div><p>Making something delicious or stocking the things people love? Let’s help more neighbours find you.</p></div><div className="partner-grid">
        <article className="partner-card restaurant-card"><div className="partner-symbol"><Utensils/></div><span className="card-label">FOR RESTAURANTS & CAFÉS</span><h3>Your food has a story.<br/>Let’s share it.</h3><p>Bring your menu online, connect with nearby customers and grow your local reach.</p><a className="partner-link" href={partnerLinks.restaurant}>Restaurant partner login <ArrowUpRight size={17}/></a><a className="subtle-link" href="mailto:partners@jinniwishes.in?subject=Restaurant%20partnership">Interested in joining? Get in touch</a></article>
        <article className="partner-card store-card"><div className="partner-symbol"><Store/></div><span className="card-label">FOR GROCERY STORES</span><h3>Your store. More<br/>neighbourhood love.</h3><p>Make everyday shopping easier for your customers and give your store a digital home.</p><a className="partner-link" href={partnerLinks.store}>Grocery store partner login <ArrowUpRight size={17}/></a><a className="subtle-link" href="mailto:partners@jinniwishes.in?subject=Grocery%20partnership">Interested in joining? Get in touch</a></article>
      </div></div></section>

      <section className="city-section" id="about"><div className="container city-content"><div><div className="eyebrow light-eyebrow">LET’S START CLOSE TO HOME</div><h2>Rooted in local.<br/>Built for <em>every day.</em></h2><p>Jinni is bringing the neighbourhood’s food and grocery businesses closer to the people they serve.</p></div><div className="contact-card"><span className="contact-label">HAVE A QUESTION OR IDEA?</span><h3>We’d love to hear from you.</h3><p>For customers, partnerships and general enquiries, reach the Jinni team by email.</p><a className="button button-light" href="mailto:hello@jinniwishes.in">Say hello <ArrowUpRight size={16}/></a></div></div></section>

      <section className="faq-section"><div className="container faq-grid"><div><div className="eyebrow">THE LITTLE DETAILS</div><h2>A few things<br/><em>you might wonder.</em></h2></div><div className="faq-list">{[
        ["What is Jinni?","Jinni is a local food and grocery platform designed to help customers discover neighbourhood restaurants and grocery stores in one place."],
        ["Can I order from Jinni today?","Availability depends on the launch area and the services enabled there. This website introduces Jinni; it does not claim ordering is live everywhere."],
        ["I run a restaurant or grocery store. How do I join?","Use the partner contact link above to get in touch. Existing approved partners can use their respective dashboard login."],
        ["Does Jinni offer services beyond food and groceries?","The current Jinni focus is food and grocery. We are keeping the experience centred on these everyday essentials."]
      ].map(([q,a],i)=><div className={"faq-item "+(activeFaq===i?"faq-active":"")} key={q}><button onClick={()=>setActiveFaq(activeFaq===i?-1:i)}><span>{q}</span><ChevronDown size={19}/></button>{activeFaq===i&&<p>{a}</p>}</div>)}</div></div></section>
    </main>

    <footer className="footer"><div className="container"><div className="footer-top"><div><a className="brand footer-brand" href="#"><span className="brand-mark">j</span><span>jinni<span className="brand-dot">.</span></span></a><p>Good things, closer to home.</p></div><div className="footer-columns"><div><b>EXPLORE</b><a href="#explore">Food & groceries</a><a href="#how">How it works</a><a href="#about">About Jinni</a></div><div><b>PARTNERS</b><a href={partnerLinks.restaurant}>Restaurant login</a><a href={partnerLinks.store}>Grocery store login</a><a href="mailto:partners@jinniwishes.in">Become a partner</a></div><div><b>SAY HELLO</b><a href="mailto:hello@jinniwishes.in">hello@jinniwishes.in</a><a href="mailto:support@jinniwishes.in">Customer support</a></div></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Jinni. Made for neighbourhoods.</span><span>Food <i>✳</i> Grocery <i>✳</i> Local love</span><a href="#" onClick={e=>{e.preventDefault();window.scrollTo({top:0,behavior:"smooth"})}}>Back to top ↑</a></div></div></footer>
  </div>;
}

createRoot(document.getElementById("root")).render(<App />);
