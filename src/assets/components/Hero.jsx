import './Hero.css';
// Hero.jsx
function Hero({ title = "Welcome to Content Corner", subtitle = "Discover amazing content and products", buttonText = "Get Started" }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <h2 className="hero-title">{title}</h2>
        <p className="hero-subtitle">{subtitle}</p>
      </div>
    </section>
  );
}
 
export default Hero;