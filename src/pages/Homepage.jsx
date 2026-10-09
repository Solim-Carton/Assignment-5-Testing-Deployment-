import Hero from '../assets/components/Hero';

function HomePage() {
  return (
    <div className="home-page">
      <Hero />

      <section className="why-shop">
        <h2>Why Shop with Us?</h2>
        <ul>
          <li>Quality tech, carefully selected</li>
          <li>Fast, reliable shipping</li>
          <li>Easy returns within 30 days</li>
          <li>Friendly customer support</li>
        </ul>
      </section>
    </div>
  );
}

export default HomePage;