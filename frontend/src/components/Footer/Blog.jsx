import React, { useState } from 'react';
import './Blog.css';

const Blog = () => {
  // Stare pentru filtrarea articolelor pe categorii
  const [activeCategory, setActiveCategory] = useState('all');

  // Datele articolelor (poți înlocui cu fetch dintr-un API mai târziu)
  const posts = [
    {
      id: 1,
      title: "Stage 1 vs Stage 2: Ce trebuie să știi înainte de reprogramare",
      excerpt: "Diferențele dintre cele mai populare etape de tuning, costuri, beneficii și riscuri. Ghid complet pentru începători.",
      content: "Lorem ipsum... (conținut complet în variantă reală)",
      date: "15 Aprilie 2025",
      category: "educational",
      image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      author: "Alexandru Jurjiță",
      readTime: "8 min",
      featured: true
    },
    {
      id: 2,
      title: "Cum creștem puterea pe motorul 2.0 TDI – Studiu de caz",
      excerpt: "Am reprofilat o Skoda Octavia RS de la 184 CP la 230 CP. Vezi graficele dinamometrului și impresiile clientului.",
      date: "2 Aprilie 2025",
      category: "case-study",
      image: "https://images.unsplash.com/photo-1568605117036-5fe5e7fa0ac7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      author: "Echipa AJ Performance",
      readTime: "12 min",
      featured: false
    },
    {
      id: 3,
      title: "Top 5 cele mai căutate mașini pentru ECU remapping în 2025",
      excerpt: "Audi S3, BMW 330d, VW Golf GTI, Ford Focus ST și Mercedes C220d – de ce sunt preferate și ce câștigă.",
      date: "25 Martie 2025",
      category: "trending",
      image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      author: "Andrei Popescu",
      readTime: "6 min",
      featured: false
    },
    {
      id: 4,
      title: "Mituri demontate: Tuning-ul de soft distruge motorul?",
      excerpt: "Specialiștii noștri explică de ce un remapping profesionist poate fi chiar mai sigur decât softul din fabrică.",
      date: "10 Martie 2025",
      category: "educational",
      image: "https://images.unsplash.com/photo-1625047509168-a7026f36de04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      author: "Dr. Ing. Mihai Ionescu",
      readTime: "10 min",
      featured: false
    },
    {
      id: 5,
      title: "Interviu cu un client: „Am câștigat 50 CP și 4% consum mai mic”",
      excerpt: "Povestea unui client cu un BMW 520d care a ales Stage 1 după ce a comparat mai multe ateliere.",
      date: "28 Februarie 2025",
      category: "testimonials",
      image: "https://images.unsplash.com/photo-1616422233638-8cb0dbd0e0e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      author: "Cristina M.",
      readTime: "5 min",
      featured: false
    }
  ];

  // Filtrare articole după categorie
  const filteredPosts = activeCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === activeCategory);

  // Articol featured (primul din listă care are featured: true)
  const featuredPost = posts.find(post => post.featured) || posts[0];

  return (
    <div className="blog-page">
      <div className="blog-container">
        
        {/* Header cu imagine de fond + titlu */}
        <div className="blog-header">
          <div className="blog-header-overlay">
            <div className="blog-header-content">
              <h1>Blog AJ Performance Tuning</h1>
              <p>Ghiduri, noutăți și studii de caz din lumea tuning-ului auto</p>
              {/* Poți adăuga aici o poză cu echipa sau logo, dar overlay-ul acoperă */}
            </div>
          </div>
          {/* Imaginea de fundal – înlocuiește cu URL-ul imaginii tale reale */}
          <div className="blog-header-image" style={{backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')"}}></div>
        </div>

        {/* Zonă specială pentru branding / echipă – poți pune aici o poză cu echipa ta */}
        <div className="team-spotlight">
          <div className="team-spotlight-inner">
            <img 
              src="https://via.placeholder.com/200x200?text=Poza+Echipa" 
              alt="Echipa AJ Performance" 
              className="team-image"
            />
            <div className="team-text">
              <h3>Echipa noastră de specialiști</h3>
              <p>Cu peste 10 ani de experiență în tuning-ul electronic, oferim soluții personalizate pentru fiecare motor în parte.</p>
              <button className="team-cta">Vezi toți membrii →</button>
            </div>
          </div>
        </div>

        {/* Filtru categorii */}
        <div className="blog-filter">
          <button 
            className={activeCategory === 'all' ? 'active' : ''} 
            onClick={() => setActiveCategory('all')}
          >Toate</button>
          <button 
            className={activeCategory === 'educational' ? 'active' : ''} 
            onClick={() => setActiveCategory('educational')}
          >Educațional</button>
          <button 
            className={activeCategory === 'case-study' ? 'active' : ''} 
            onClick={() => setActiveCategory('case-study')}
          >Studii de caz</button>
          <button 
            className={activeCategory === 'trending' ? 'active' : ''} 
            onClick={() => setActiveCategory('trending')}
          >Tendințe</button>
          <button 
            className={activeCategory === 'testimonials' ? 'active' : ''} 
            onClick={() => setActiveCategory('testimonials')}
          >Testimoniale</button>
        </div>

        {/* Articol principal (featured) */}
        {activeCategory === 'all' && (
          <div className="featured-post">
            <div className="featured-image">
              <img src={featuredPost.image} alt={featuredPost.title} />
            </div>
            <div className="featured-content">
              <span className="post-category featured-category">Recomandat</span>
              <h2>{featuredPost.title}</h2>
              <p>{featuredPost.excerpt}</p>
              <div className="post-meta">
                <span><i className="fas fa-user"></i> {featuredPost.author}</span>
                <span><i className="fas fa-calendar-alt"></i> {featuredPost.date}</span>
                <span><i className="fas fa-clock"></i> {featuredPost.readTime}</span>
              </div>
              <button className="read-more-btn">Citește articolul →</button>
            </div>
          </div>
        )}

        {/* Grila de articole */}
        <div className="blog-grid">
          {filteredPosts.map(post => (
            <article key={post.id} className="blog-card">
              <div className="card-image">
                <img src={post.image} alt={post.title} />
                <span className="card-category">{post.category === 'educational' ? 'Educațional' : post.category === 'case-study' ? 'Studiu caz' : post.category === 'trending' ? 'Tendințe' : 'Testimonial'}</span>
              </div>
              <div className="card-content">
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <div className="card-meta">
                  <span><i className="fas fa-user"></i> {post.author}</span>
                  <span><i className="fas fa-calendar-alt"></i> {post.date}</span>
                </div>
                <button className="card-read-more">Detalii →</button>
              </div>
            </article>
          ))}
        </div>

        {/* Secțiune de newsletter și social proof */}
        <div className="blog-newsletter-section">
          <div className="newsletter-box">
            <h3>Nu rata niciun articol nou</h3>
            <p>Abonează-te la newsletter și primește săptămânal cele mai importante noutăți din tuning.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Adresa ta de email" required />
              <button type="submit">Abonare gratuită</button>
            </form>
            <p className="newsletter-note">Fără spam, te poți dezabona oricând.</p>
          </div>
        </div>

        {/* Footer secundar cu linkuri rapide către servicii */}
        <div className="blog-footer-links">
          <div className="blog-footer-inner">
            <span>Servicii populare:</span>
            <a href="/servicii/stage1">Stage 1</a>
            <a href="/servicii/stage2">Stage 2</a>
            <a href="/servicii/dpf-off">DPF Off</a>
            <a href="/servicii/egr-off">EGR Off</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;