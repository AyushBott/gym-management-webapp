import { useState } from 'react';
import './Gallery.css';

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [activeFilter, setActiveFilter] = useState('all');

    const galleryImages = [
        // Gym Floor & Equipment
        {
            src: '/images/gym/gym-floor-main.jpg',
            title: 'Main Gym Floor',
            category: 'gym-floor',
            description: 'Expansive gym floor with premium FitClass equipment and functional training track'
        },
        {
            src: '/images/gym/cardio-treadmills.jpg',
            title: 'Cardio Zone',
            category: 'gym-floor',
            description: 'State-of-the-art treadmills and cardio equipment with scenic views'
        },

        // Studio & Classes
        {
            src: '/images/gym/studio-aerobics-dance.jpg',
            title: 'Dance & Aerobics Studio',
            category: 'studio',
            description: 'Dynamic studio for Zumba, aerobics, and dance fitness classes'
        },
        {
            src: '/images/gym/studio-yoga-class.jpg',
            title: 'Yoga Studio',
            category: 'studio',
            description: 'Serene yoga studio with "Find Your Balance" ambiance'
        },
        {
            src: '/images/gym/studio-boxing-balance.jpg',
            title: 'Boxing & Functional Training',
            category: 'studio',
            description: 'Dedicated area with punching bags, kettlebells, and stability equipment'
        },
        {
            src: '/images/gym/studio-kettlebells.jpg',
            title: 'Functional Training Zone',
            category: 'studio',
            description: 'Well-equipped area for functional and strength training'
        },
        {
            src: '/images/gym/studio-wide-view.jpg',
            title: 'Studio Overview',
            category: 'studio',
            description: 'Spacious studio with mirrored walls and gym equipment view'
        },

        // Reception & Lounge
        {
            src: '/images/gym/reception-desk.jpg',
            title: 'Reception Area',
            category: 'reception',
            description: 'Modern reception with blue accent wall and professional service desk'
        },
        {
            src: '/images/gym/reception-lounge.jpg',
            title: 'Member Lounge',
            category: 'reception',
            description: 'Comfortable lounge area with office spaces and seating'
        },
        {
            src: '/images/gym/reception-front.jpg',
            title: 'Welcome Area',
            category: 'reception',
            description: 'Inviting front desk with FitClass branding'
        },
        {
            src: '/images/gym/reception-office.jpg',
            title: 'Office Space',
            category: 'reception',
            description: 'Professional office area for consultations and member services'
        },

        // Locker Rooms & Amenities
        {
            src: '/images/gym/locker-room-showers.jpg',
            title: 'Shower Facilities',
            category: 'amenities',
            description: 'Premium shower facilities with lockers and changing areas'
        },
        {
            src: '/images/gym/locker-room-vanity.jpg',
            title: 'Vanity Area',
            category: 'amenities',
            description: 'Modern vanity with dual sinks and spacious mirrors'
        },
        {
            src: '/images/gym/locker-room-storage.jpg',
            title: 'Locker Storage',
            category: 'amenities',
            description: 'Spacious wooden lockers with gym floor view'
        },
        {
            src: '/images/gym/locker-room-jacuzzi.jpg',
            title: 'Jacuzzi & Spa',
            category: 'amenities',
            description: 'Relaxing jacuzzi area for post-workout recovery'
        },
        {
            src: '/images/gym/locker-room-entrance.jpg',
            title: 'Locker Room Entrance',
            category: 'amenities',
            description: 'Clean and organized locker room with cubbies and robes'
        },

        // Exterior
        {
            src: '/images/gym/building-exterior.jpg',
            title: 'FitClass Building',
            category: 'exterior',
            description: 'Modern FitClass gym building exterior with signature branding'
        }
    ];

    const categories = [
        { id: 'all', name: 'All' },
        { id: 'gym-floor', name: 'Gym Floor' },
        { id: 'studio', name: 'Studios' },
        { id: 'reception', name: 'Reception' },
        { id: 'amenities', name: 'Amenities' },
        { id: 'exterior', name: 'Exterior' }
    ];

    const filteredImages = activeFilter === 'all'
        ? galleryImages
        : galleryImages.filter(img => img.category === activeFilter);

    const openLightbox = (image) => {
        setSelectedImage(image);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'auto';
    };

    const navigateImage = (direction) => {
        const currentIndex = filteredImages.findIndex(img => img.src === selectedImage.src);
        let newIndex;

        if (direction === 'prev') {
            newIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
        } else {
            newIndex = currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1;
        }

        setSelectedImage(filteredImages[newIndex]);
    };

    return (
        <div className="gallery-page">
            {/* Hero Section */}
            <section className="gallery-hero">
                <div className="container">
                    <h1>GALLERY</h1>
                    <p className="hero-subtitle">Experience Our World-Class Facilities</p>
                </div>
            </section>

            {/* Filter Section */}
            <section className="gallery-filters">
                <div className="container">
                    <div className="filter-buttons">
                        {categories.map(category => (
                            <button
                                key={category.id}
                                className={`filter-btn ${activeFilter === category.id ? 'active' : ''}`}
                                onClick={() => setActiveFilter(category.id)}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="gallery-grid-section">
                <div className="container">
                    <div className="gallery-grid">
                        {filteredImages.map((image, idx) => (
                            <div
                                key={idx}
                                className="gallery-item"
                                onClick={() => openLightbox(image)}
                            >
                                <img src={image.src} alt={image.title} loading="lazy" />
                                <div className="gallery-overlay">
                                    <h3>{image.title}</h3>
                                    <p>{image.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div className="lightbox" onClick={closeLightbox}>
                    <button className="lightbox-close" onClick={closeLightbox}>×</button>
                    <button
                        className="lightbox-nav lightbox-prev"
                        onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
                    >
                        ‹
                    </button>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <img src={selectedImage.src} alt={selectedImage.title} />
                        <div className="lightbox-info">
                            <h3>{selectedImage.title}</h3>
                            <p>{selectedImage.description}</p>
                        </div>
                    </div>
                    <button
                        className="lightbox-nav lightbox-next"
                        onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
                    >
                        ›
                    </button>
                </div>
            )}

            {/* CTA Section */}
            <section className="gallery-cta">
                <div className="container text-center">
                    <h2>Ready to Experience FitClass?</h2>
                    <p>Book a tour and see our facilities in person</p>
                    <a href="/contact" className="btn btn-primary btn-large">BOOK A TOUR</a>
                </div>
            </section>
        </div>
    );
};

export default Gallery;
