import React from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { Calendar, MapPin, Phone } from 'lucide-react';
import LoadingScreen from './components/LoadingScreen';
const EventDetails = React.lazy(() => import('./pages/EventDetails'));

const performers = [
  {
    name: "Maya Berovic",
    date: "April 15, 2024",
    image: "https://aislike.rs/white/baner/1.png",
    url: "https://maya-berovic.netlify.app/",
    available: true
  },
  {
    name: "Stefan Rasta",
    date: "April 29, 2024",
    image: "https://aislike.rs/white/baner/3.png",
    url: "https://stefan-rasta.netlify.app/",
    available: true
  },
  {
    name: "Tanja Savic",
    date: "May 13, 2024",
    image: "https://aislike.rs/white/baner/2.png",
    url: "https://tanja-savic.netlify.app/",
    available: true
  },
  {
    name: "Sloba Radanovic",
    date: "May 27, 2024",
    image: "https://aislike.rs/white/baner/4.png",
    url: "https://sloba-radanovic.netlify.app/",
    available: true
  },
  {
    name: "Andrea Cekic",
    date: "June 3, 2024",
    image: "https://aislike.rs/white/baner/9.png",
    url: "https://andrea-cekic.netlify.app/",
    available: true
  },
  {
    name: "Relja Popovic",
    date: "June 10, 2024",
    image: "https://aislike.rs/white/baner/6.png",
    url: "https://zorana-micanovic.netlify.app/",
    available: true
  },
  {
    name: "Devito",
    date: "June 7, 2024",
    image: "https://aislike.rs/white/baner/devito.png",
    url: "https://devito.netlify.app/",
    available: true
  },
  {
    name: "Zorana Micanovic",
    date: "June 24, 2024",
    image: "https://aislike.rs/white/baner/5.png",
    url: "https://relja-popovic.netlify.app/",
    available: true
  }
];

function App() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [showHeroText, setShowHeroText] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowHeroText(window.scrollY < 100);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Simulate loading time and hide loader
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen />}
      <Routes>
        <Route 
          path="/event/:performerName/:date" 
          element={
            <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
              <EventDetails />
            </React.Suspense>
          } 
        />
        <Route 
          path="/" 
          element={
            <div className="min-h-screen bg-white text-black">
              {/* Hero Section */}
              <div 
                className="h-screen relative overflow-hidden"
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src="https://aislike.rs/white/baner/0419(1).mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/50" />
                {!isLoading && (
                  <nav className={`fixed top-0 w-full transition-all duration-300 z-50 ${
                    isScrolled 
                    ? 'py-0 bg-white/90 backdrop-blur-sm shadow-lg' 
                    : 'py-4'
                  }`}>
          <div className="container mx-auto flex justify-between items-center px-4">
            <img 
              src={isScrolled ? "https://aislike.rs/white/baner/logo transparent.png" : "https://aislike.rs/white/baner/beli logo.png"}
              loading="lazy"
              alt="WHITE club" 
              className={`transition-all duration-300 ${isScrolled ? 'h-12 md:h-20' : 'h-16 md:h-32'}`}
            />
            <div className="flex gap-3 md:gap-8 items-center">
              <a href="#events" className={`text-sm md:text-base font-medium transition-colors ${isScrolled ? 'text-black hover:text-gray-600' : 'text-white hover:text-gray-200'}`}>Events</a>
              <a href="#contact" className={`text-sm md:text-base font-medium transition-colors ${isScrolled ? 'text-black hover:text-gray-600' : 'text-white hover:text-gray-200'}`}>Contact</a>
              <a href="#events" className={`px-4 md:px-6 py-1.5 md:py-2 text-sm md:text-base rounded-full transition-colors ${isScrolled ? 'bg-black text-white hover:bg-gray-900' : 'bg-white text-black hover:bg-gray-200'}`}>
                Book Now
              </a>
            </div>
          </div>
                  </nav>
                )}
        
        <div className={`fixed top-1/2 transform -translate-y-1/2 w-full px-4 md:px-12 py-6 md:py-12 transition-opacity duration-300 ${showHeroText ? 'opacity-100' : 'opacity-0'}`}>
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-4xl md:text-6xl font-bold mb-3 md:mb-4 text-white animate-fade-in">White Club Predstavlja</h2>
            <p className="text-base md:text-xl max-w-2xl mb-6 md:mb-8 text-white animate-fade-in-delay">Dobrodošli u WHITE club Vrnjačka Banja - ekskluzivni noćni klub sa vrhunskom zabavom i nastupima najvećih zvezda. Rezervišite svoje mesto za nezaboravno veče u najboljem klubu Vrnjačke Banje.</p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-white text-sm md:text-base">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 md:w-5 md:h-5" />
                <span>Vrnjacka Banja, Kneza Milosa</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 md:w-5 md:h-5" />
                <span>+381 064 0543000</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Events Section */}
      <div id="events" className="py-20 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <Calendar className="w-8 h-8" />
            <h2 className="text-4xl font-bold">Upcoming Events</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
            {performers.map((performer, index) => (
              <div 
                key={index}
                className="group relative overflow-hidden rounded-lg cursor-pointer aspect-[9/16]"
                onClick={() => performer.available && window.open(performer.url, '_blank')}
              >
                <img 
                  src={performer.image} 
                  alt={performer.name}
                  loading="lazy"
                  className={`w-full h-full object-contain transition-transform duration-300 ${performer.available ? 'group-hover:scale-110' : 'opacity-75'} mx-auto`}
                />
                <div className="absolute bottom-0 w-full p-6 flex flex-col items-center gap-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      performer.available && window.open(performer.url, '_blank');
                    }}
                    className={`px-6 py-3 rounded-full font-bold uppercase tracking-wider transform transition-all duration-300 shadow-lg ${
                      performer.available 
                      ? 'bg-black text-white hover:scale-110 hover:shadow-black/25' 
                      : 'bg-gray-400 text-white/80 cursor-not-allowed'
                    }`}
                    disabled={!performer.available}
                  >
                    {performer.available ? 'RESERVE' : 'COMING SOON'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="py-24 bg-gradient-to-br from-gray-900 to-black relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-lg rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Kontaktirajte Nas
                </h2>
                <p className="text-gray-400 mb-8">
                  Imate pitanja o rezervacijama ili predstojećim događajima? Javite nam se.
                </p>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-gray-300">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-medium">Lokacija</h3>
                      <p className="text-gray-400">Vrnjacka Banja, Kneza Milosa</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-gray-300">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-medium">Telefon</h3>
                      <p className="text-gray-400">+381 064 0543000</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <form className="space-y-6">
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Vaše Ime"
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-white/30 transition-colors"
                    />
                    <input
                      type="email"
                      placeholder="Email Adresa"
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-white/30 transition-colors"
                    />
                    <textarea
                      placeholder="Vaša Poruka"
                      rows={4}
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-white/30 transition-colors resize-none"
                    ></textarea>
                  </div>
                  <button className="w-full bg-white text-black py-4 rounded-xl font-medium hover:bg-gray-100 transition-colors">
                    Pošalji Poruku
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-16 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <img 
                src="https://aislike.rs/white/baner/beli logo.png"
                loading="lazy"
                alt="WHITE club Vrnjačka Banja"
                className="h-24 mb-6"
              />
              <p className="text-gray-400">Najbolji noćni klub u Vrnjačkoj Banji sa vrhunskom zabavom i nastupima najvećih zvezda. Rezervišite svoje mesto za nezaboravno veče.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>Vrnjacka Banja, Kneza Milosa</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  <span>+381 064 0543000</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Dogadjaji</h3>
              <div className="space-y-2 text-gray-400">
                {performers.map((performer, index) => (
                  <Link
                    key={index}
                    to={performer.available ? performer.url : '#'}
                    target="_blank"
                    className={`block transition-colors ${
                      performer.available 
                      ? 'hover:text-white cursor-pointer' 
                      : 'opacity-75 cursor-not-allowed'
                    }`}
                  >
                    {performer.name}
                    {!performer.available && ' (Coming Soon)'}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 flex justify-between items-center">
            <p className="text-gray-400">&copy; {new Date().getFullYear()} WHITE club. All rights reserved.</p>
            <a 
              href="https://aisajt.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              Powered by: aisajt.com
            </a>
          </div>
        </div>
      </footer>
            </div>
          } 
        />
      </Routes>
    </>
  );
}

export default App;
