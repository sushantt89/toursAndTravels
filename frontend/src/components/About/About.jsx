import React from "react";

const About = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Prixa Technologies</h1>
      <p style={styles.description}>
        Prixa Tech offers innovative, efficient, and optimized innovations to pioneer cutting-edge solutions customized to adapt to the needs of the client. We strive to bring world-class technological reforms to existing processes to ensure efficiency at optimum costs. Prixa Tech is headquartered in Satdobato, Lalitpur, and has a branch at Jawalakhel, Lalitpur.
      </p>

      <div style={styles.mapContainer}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.482202353757!2d85.30896277506189!3d27.671487627073006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19d81c96a557%3A0xb60bf52a809a2e46!2sPrixa%20Technologies!5e0!3m2!1sen!2snp!4v1718219532856!5m2!1sen!2snp"
        width="1600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <style jsx="true">{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem;
          background-color: #f9f9f9;
          font-family: 'Arial', sans-serif;
          color: #333;
        }

        .title {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: #2c3e50;
        }

        .description {
          font-size: 1.2rem;
          line-height: 1.6;
          max-width: 800px;
          text-align: center;
          margin-bottom: 2rem;
        }

        .mapContainer {
          max-width: 100%;
          border: 2px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
        }

        .mapContainer iframe {
          width: 100%;
          height: 100%;
          border: none;
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem',
    backgroundColor: '#f9f9f9',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    color: '#2c3e50',
  },
  description: {
    fontSize: '1.2rem',
    lineHeight: '1.6',
    maxWidth: '800px',
    textAlign: 'center',
    marginBottom: '2rem',
  },
  mapContainer: {
    maxWidth: '100%',
    border: '2px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
  },
};

export default About;
