import React from 'react';
import './Policy.css';

const Policy = () => {
  return (
    <div className="policy-page">
      <div className="container">
        <h1>Politică de Confidențialitate</h1>
        <p>Ultima actualizare: Aprilie 2025</p>

        <section>
          <h2>1. Colectarea datelor</h2>
          <p>AJ Performance Tuning colectează datele personale (nume, email, număr de telefon) doar atunci când ne contactezi prin formular sau când îți creezi un cont pe platforma noastră.</p>
        </section>

        <section>
          <h2>2. Utilizarea datelor</h2>
          <p>Datele sunt folosite exclusiv pentru a oferi serviciile de tuning auto, a comunica oferte personalizate și pentru îmbunătățirea experienței clienților.</p>
        </section>

        <section>
          <h2>3. Securitatea datelor</h2>
          <p>Stocăm datele pe servere securizate și nu le vindem sau partajăm cu terți fără consimțământul tău explicit.</p>
        </section>

        <section>
          <h2>4. Drepturile tale</h2>
          <p>Ai dreptul de a solicita ștergerea sau modificarea datelor tale personale oricând, contactându-ne la adresa: privacy@ajperformance.ro.</p>
        </section>

        <section>
          <h2>5. Cookie-uri</h2>
          <p>Site-ul folosește cookie-uri pentru a îmbunătăți performanța și a analiza traficul. Poți controla cookie-urile din setările browserului.</p>
        </section>

        <div className="policy-contact">
          <strong>Pentru orice întrebare legată de confidențialitate, scrie-ne la:</strong> contact@ajperformance.ro
        </div>
      </div>
    </div>
  );
};

export default Policy;