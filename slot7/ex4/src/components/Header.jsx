export default function Header() {
  return (
    <header style={{ backgroundColor: '#f39251ff' }} className="text-center py-4">
      {/* Logo */}
      <img 
        src="/fpt-logo.png" 
        alt="FPT Logo" 
        width="500" 
        className="mb-3" 
      />
      
      {/* Menu */}
      <nav>
        <a href="#home" className="text-white mx-2">Home</a>
        <a href="#about" className="text-white mx-2">About</a>
        <a href="#contact" className="text-white mx-2">Contact</a>
      </nav>
    </header>
  );
}
