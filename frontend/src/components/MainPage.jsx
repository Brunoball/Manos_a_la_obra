import React, { useState } from 'react';
import './MainPage.css';

const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [activeTab, setActiveTab] = useState('findProfessional');
  
  // Estado para los filtros
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    rating: 0,
    availability: []
  });

  const professionalCategories = [
    'Plomería', 'Electricidad', 'Gasista', 'Albañilería', 'Pintura',
    'Carpintería', 'Herrería', 'Jardinería', 'Limpieza', 'Mudanzas',
    'Técnico de Aire', 'Técnico de Electrodomésticos', 'Cerrajería', 'Refrigeración'
  ];

  const daysOfWeek = [
    'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'
  ];

  // Datos de ejemplo de profesionales
  const professionals = [
    {
      id: 1,
      name: 'Juan Pérez',
      photo: 'https://randomuser.me/api/portraits/men/1.jpg',
      category: 'Plomería',
      rating: 4.8,
      reviews: 124,
      location: 'Palermo, CABA',
      availability: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
      description: 'Plomero con 10 años de experiencia en instalaciones y reparaciones.'
    },
    {
      id: 2,
      name: 'María González',
      photo: 'https://randomuser.me/api/portraits/women/1.jpg',
      category: 'Electricidad',
      rating: 4.9,
      reviews: 89,
      location: 'Belgrano, CABA',
      availability: ['Martes', 'Miércoles', 'Jueves', 'Sábado'],
      description: 'Electricista matriculada, especializada en instalaciones domiciliarias.'
    },
    {
      id: 3,
      name: 'Carlos Rodríguez',
      photo: 'https://randomuser.me/api/portraits/men/2.jpg',
      category: 'Gasista',
      rating: 4.7,
      reviews: 56,
      location: 'Caballito, CABA',
      availability: ['Lunes', 'Miércoles', 'Viernes', 'Domingo'],
      description: 'Gasista matriculado con amplia experiencia en instalaciones y reparaciones.'
    },
    {
      id: 4,
      name: 'Laura Martínez',
      photo: 'https://randomuser.me/api/portraits/women/2.jpg',
      category: 'Pintura',
      rating: 4.5,
      reviews: 42,
      location: 'Recoleta, CABA',
      availability: ['Lunes', 'Martes', 'Jueves', 'Viernes', 'Sábado'],
      description: 'Pintora profesional con técnicas modernas y acabados perfectos.'
    },
    {
      id: 5,
      name: 'Roberto Sánchez',
      photo: 'https://randomuser.me/api/portraits/men/3.jpg',
      category: 'Carpintería',
      rating: 4.6,
      reviews: 78,
      location: 'San Telmo, CABA',
      availability: ['Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      description: 'Carpintero especializado en muebles a medida y trabajos de calidad.'
    },
    {
      id: 6,
      name: 'Ana López',
      photo: 'https://randomuser.me/api/portraits/women/3.jpg',
      category: 'Limpieza',
      rating: 4.3,
      reviews: 65,
      location: 'Villa Urquiza, CABA',
      availability: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
      description: 'Servicio profesional de limpieza para hogares y oficinas.'
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Aplicar búsqueda
    console.log('Buscando:', searchTerm, 'en', location);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const toggleAvailabilityDay = (day) => {
    setFilters(prev => {
      const newAvailability = prev.availability.includes(day)
        ? prev.availability.filter(d => d !== day)
        : [...prev.availability, day];
      
      return {
        ...prev,
        availability: newAvailability
      };
    });
  };

  // Filtrar profesionales según los filtros aplicados
  const filteredProfessionals = professionals.filter(prof => {
    return (
      (filters.category === '' || prof.category === filters.category) &&
      (filters.location === '' || prof.location.includes(filters.location)) &&
      (filters.rating === 0 || prof.rating >= filters.rating) &&
      (filters.availability.length === 0 || 
       filters.availability.some(day => prof.availability.includes(day)))
    );
  });

  return (
    <div className="main-page">
      {/* Hero Section */}
      <header className="hero">
        <div className="container">
          <h1>Encuentra al profesional que necesitas</h1>
          <p>Contacta directamente con expertos locales para resolver tus problemas</p>

          <form className="search-form" onSubmit={handleSearch}>
            <div className="search-input-group">
              <div className="search-field">
                <i className="fas fa-tools"></i>
                <input 
                  type="text" 
                  placeholder="¿Qué servicio necesitas? (plomero, electricista...)" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="search-field">
                <i className="fas fa-map-marker-alt"></i>
                <input 
                  type="text" 
                  placeholder="Tu ubicación (barrio, ciudad)" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <button type="submit" className="search-button">
                Buscar
              </button>
            </div>
          </form>
        </div>
      </header>

      {/* Main Content */}
      <div className="container main-content">
        {/* Filters Panel */}
        <aside className="filters-panel">
          <h3>Filtrar resultados</h3>
          
          <div className="filter-section">
            <h4>Rubro</h4>
            <select 
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="filter-select"
            >
              <option value="">Todos los rubros</option>
              {professionalCategories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-section">
            <h4>Ubicación</h4>
            <input 
              type="text" 
              placeholder="Barrio o ciudad" 
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="filter-input"
            />
          </div>
          
          <div className="filter-section">
            <h4>Calificación mínima</h4>
            <div className="rating-filter">
              {[1, 2, 3, 4, 5].map(star => (
                <span 
                  key={star}
                  className={`star ${star <= filters.rating ? 'active' : ''}`}
                  onClick={() => handleFilterChange('rating', star)}
                >
                  ★
                </span>
              ))}
              {filters.rating > 0 && (
                <button 
                  className="clear-rating"
                  onClick={() => handleFilterChange('rating', 0)}
                >
                  Limpiar
                </button>
              )}
            </div>
          </div>
          
          <div className="filter-section">
            <h4>Días disponibles</h4>
            <div className="availability-filter">
              {daysOfWeek.map(day => (
                <button
                  key={day}
                  className={`day-btn ${filters.availability.includes(day) ? 'active' : ''}`}
                  onClick={() => toggleAvailabilityDay(day)}
                >
                  {day.substring(0, 3)}
                </button>
              ))}
            </div>
          </div>
          
          <button 
            className="reset-filters"
            onClick={() => setFilters({
              category: '',
              location: '',
              rating: 0,
              availability: []
            })}
          >
            Limpiar todos los filtros
          </button>
        </aside>

        {/* Professionals List */}
        <main className="professionals-list">
          <div className="results-header">
            <h2>{filteredProfessionals.length} profesionales encontrados</h2>
            <div className="sort-options">
              <span>Ordenar por:</span>
              <select className="sort-select">
                <option>Mejor calificados</option>
                <option>Más cercanos</option>
                <option>Menor precio</option>
                <option>Mayor precio</option>
              </select>
            </div>
          </div>
          
          {filteredProfessionals.length > 0 ? (
            <div className="professionals-grid">
              {filteredProfessionals.map(prof => (
                <div key={prof.id} className="professional-card">
                  <div className="professional-photo">
                    <img src={prof.photo} alt={prof.name} />
                    <div className="rating-badge">
                      ★ {prof.rating} <span>({prof.reviews})</span>
                    </div>
                  </div>
                  <div className="professional-info">
                    <h3>{prof.name}</h3>
                    <div className="professional-category">
                      <i className={`fas fa-${getCategoryIcon(prof.category)}`}></i>
                      {prof.category}
                    </div>
                    <div className="professional-location">
                      <i className="fas fa-map-marker-alt"></i>
                      {prof.location}
                    </div>
                    <div className="professional-availability">
                      <i className="fas fa-calendar-alt"></i>
                      Disponible: {prof.availability.join(', ')}
                    </div>
                    <p className="professional-description">{prof.description}</p>
                    <div className="professional-actions">
                      <button className="contact-btn">
                        <i className="fas fa-envelope"></i> Contactar
                      </button>
                      <button className="profile-btn">
                        Ver perfil completo
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <i className="fas fa-search"></i>
              <h3>No se encontraron profesionales con los filtros aplicados</h3>
              <p>Intenta ajustar tus criterios de búsqueda</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

// Función auxiliar para obtenesdsdsd
function getCategoryIcon(category) {
  const icons = {
    'Plomería': 'faucet',
    'Electricidad': 'bolt',
    'Gasista': 'fire',
    'Albañilería': 'hammer',
    'Pintura': 'paint-roller',
    'Carpintería': 'ruler-combined',
    'Herrería': 'industry',
    'Jardinería': 'leaf',
    'Limpieza': 'broom',
    'Mudanzas': 'truck-moving',
    'Técnico de Aire': 'fan',
    'Técnico de Electrodomésticos': 'blender',
    'Cerrajería': 'key',
    'Refrigeración': 'snowflake'
  };
  return icons[category] || 'user-cog';
}

export default MainPage;