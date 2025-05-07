export default function Home() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Bienvenido a Misterio en el Faro</h1>
      <p>Presioná Start para comenzar tu aventura en Cabo Polonio.</p>
      <button onClick={() => window.location.href = '/scene1'}>Presioná Start</button>
    </div>
  );
}
