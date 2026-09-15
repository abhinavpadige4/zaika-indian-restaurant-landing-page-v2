// JavaScript for Zaika Restaurant Landing Page

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            // Animate hamburger to X
            this.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });
    
    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Account for header height
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Testimonials Slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        let currentIndex = 0;
        const testimonials = [
            {
                quote: "The best Indian food I've ever had outside of India! The flavors are authentic and the service is impeccable.",
                name: "Priya Sharma",
                rating: 5,
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&facearea=auto"
            },
            {
                quote: "Zaika exceeded all my expectations. The butter chicken was divine and the naan was fresh and fluffy.",
                name: "Rahul Patel",
                rating: 5,
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&facearea=auto"
            },
            {
                quote: "Amazing ambiance and incredible food. The staff made us feel like family and the dishes were bursting with flavor.",
                name: "Anita Desai",
                rating: 4,
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&facearea=auto"
            }
        ];
        
        function showTestimonial(index) {
            testimonialSlider.innerHTML = `
                <div class="testimonial-card">
                    <p class="testimonial-text">"${testimonials[index].quote}"</p>
                    <div class="testimonial-info">
                        <img src="${testimonials[index].image}" alt="${testimonials[index].name}" class="testimonial-avatar">
                        <div>
                            <h3>${testimonials[index].name}</h3>
                            <div class="rating">
                                ${'★'.repeat(testimonials[index].rating)}${'☆'.repeat(5 - testimonials[index].rating)}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Auto-advance testimonials every 5 seconds
        setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        }, 5000);
        
        // Show first testimonial
        showTestimonial(currentIndex);
    }
    
    // Form Validation
    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
        bookingForm.innerHTML = `
            <form id="bookingForm" novalidate>
                <div class="form-group">
                    <label for="name">Full Name *</label>
                    <input type="text" id="name" name="name" required>
                    <div class="error-message" id="nameError"></div>
                </div>
                
                <div class="form-group">
                    <label for="email">Email Address *</label>
                    <input type="email" id="email" name="email" required>
                    <div class="error-message" id="emailError"></div>
                </div>
                
                <div class="form-group">
                    <label for="phone">Phone Number *</label>
                    <input type="tel" id="phone" name="phone" required>
                    <div class="error-message" id="phoneError"></div>
                </div>
                
                <div class="form-group">
                    <label for="date">Date *</label>
                    <input type="date" id="date" name="date" required>
                    <div class="error-message" id="dateError"></div>
                </div>
                
                <div class="form-group">
                    <label for="time">Time *</label>
                    <input type="time" id="time" name="time" required>
                    <div class="error-message" id="timeError"></div>
                </div>
                
                <div class="form-group">
                    <label for="guests">Number of Guests *</label>
                    <input type="number" id="guests" name="guests" min="1" max="20" required>
                    <div class="error-message" id="guestsError"></div>
                </div>
                
                <div class="form-group">
                    <label for="message">Special Requests</label>
                    <textarea id="message" name="message" rows="4"></textarea>
                    <div class="error-message" id="messageError"></div>
                </div>
                
                <button type="submit" class="btn">Make Reservation</button>
                <div id="formSuccess" class="success-message"></div>
            </form>
        `;
        
        // Add form validation
        const form = document.getElementById('bookingForm');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset error messages
            const errorMessages = document.querySelectorAll('.error-message');
            errorMessages.forEach(msg => msg.textContent = '');
            
            let isValid = true;
            
            // Name validation
            const nameInput = document.getElementById('name');
            if (nameInput.value.trim() === '') {
                document.getElementById('nameError').textContent = 'Please enter your name';
                isValid = false;
            }
            
            // Email validation
            const emailInput = document.getElementById('email');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput.value)) {
                document.getElementById('emailError').textContent = 'Please enter a valid email address';
                isValid = false;
            }
            
            // Phone validation
            const phoneInput = document.getElementById('phone');
            const phonePattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
            if (!phonePattern.test(phoneInput.value)) {
                document.getElementById('phoneError').textContent = 'Please enter a valid phone number';
                isValid = false;
            }
            
            // Date validation
            const dateInput = document.getElementById('date');
            if (dateInput.value === '') {
                document.getElementById('dateError').textContent = 'Please select a date';
                isValid = false;
            }
            
            // Time validation
            const timeInput = document.getElementById('time');
            if (timeInput.value === '') {
                document.getElementById('timeError').textContent = 'Please select a time';
                isValid = false;
            }
            
            // Guests validation
            const guestsInput = document.getElementById('guests');
            if (guestsInput.value === '' || parseInt(guestsInput.value) < 1) {
                document.getElementById('guestsError').textContent = 'Please enter a valid number of guests';
                isValid = false;
            }
            
            if (isValid) {
                // Show success message
                document.getElementById('formSuccess').textContent = 'Thank you! Your reservation has been received. We will contact you shortly to confirm.';
                document.getElementById('formSuccess').style.display = 'block';
                form.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    document.getElementById('formSuccess').style.display = 'none';
                }, 5000);
            }
        });
    }
    
    // Populate Menu Section
    const menuGrid = document.querySelector('.menu-grid');
    if (menuGrid) {
        const menuItems = [
            {
                name: "Butter Chicken",
                description: "Tender chicken pieces in a rich, creamy tomato-based sauce with aromatic spices",
                price: "$14.99",
                image: "https://images.unsplash.com/photo-1588190255575-9d4a09b6a0c9?w=300&h=200&fit=crop"
            },
            {
                name: "Chicken Tikka Masala",
                description: "Marinated chicken grilled to perfection and served in a spiced tomato-cream sauce",
                price: "$15.99",
                image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=300&h=200&fit=crop"
            },
            {
                name: "Vegetable Biryani",
                description: "Fragrant basmati rice cooked with mixed vegetables and aromatic spices",
                price: "$12.99",
                image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a49d?w=300&h=200&fit=crop"
            },
            {
                name: "Garlic Naan",
                description: "Soft, leavened flatbread infused with fresh garlic and cilantro",
                price: "$3.99",
                image: "https://images.unsplash.com/photo-1586190849264-97ea1a414ec4?w=300&h=200&fit=crop"
            },
            {
                name: "Samosa Chaat",
                description: "Crispy samosas topped with yogurt, tamarind chutney, and fresh herbs",
                price: "$8.99",
                image: "https://images.unsplash.com/photo-1567620905732-26d407a1ba7c?w=300&h=200&fit=crop"
            },
            {
                name: "Paneer Tikka",
                description: "Marinated cottage cheese grilled with bell peppers, onions, and Indian spices",
                price: "$13.99",
                image: "https://images.unsplash.com/photo-1586190847862-23a9b81bb57e?w=300&h=200&fit=crop"
            },
            {
                name: "Lamb Rogan Josh",
                description: "Tender lamb slow-cooked in a rich gravy of yogurt, garlic, and aromatic spices",
                price: "$18.99",
                image: "https://images.unsplash.com/photo-1586190849548-30ee0b4a1110?w=300&h=200&fit=crop"
            },
            {
                name: "Mango Lassi",
                description: "Refreshing yogurt-based drink blended with ripe mango and a hint of cardamom",
                price: "$4.99",
                image: "https://images.unsplash.com/photo-1586190848201-7f2c833e7c1a?w=300&h=200&fit=crop"
            }
        ];
        
        menuGrid.innerHTML = menuItems.map(item => `
            <div class="menu-item">
                <img src="${item.image}" alt="${item.name}" class="menu-item-image">
                <div class="menu-item-content">
                    <h3>${item.name}</h3>
                    <p class="menu-item-description">${item.description}</p>
                    <div class="menu-item-price">${item.price}</div>
                </div>
            </div>
        `).join('');
    }
    
    // Populate About Chefs Section
    const chefsGrid = document.querySelector('.chefs-grid');
    if (chefsGrid) {
        const chefs = [
            {
                name: "Chef Rajesh Kumar",
                role: "Executive Chef",
                bio: "With over 20 years of experience in authentic Indian cuisine, Chef Rajesh specializes in North Indian dishes and brings traditional cooking techniques to every plate.",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&facearea=auto"
            },
            {
                name: "Chef Priya Sharma",
                role: "Head Chef - South Indian Cuisine",
                bio: "Chef Priya brings the flavors of South India to Zaika with her expertise in dosas, idlis, and aromatic curries passed down through generations.",
                image: "https://images.unsplash.com/photo-1494790108777-2833d5a6343e?w=200&h=200&fit=crop&facearea=auto"
            },
            {
                name: "Chef Arjun Patel",
                role: "Sous Chef - Tandoor Specialist",
                bio: "Master of the tandoor oven, Chef Arjun creates perfectly charred breads and meats that capture the essence of traditional Indian cooking.",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&facearea=auto"
            }
        ];
        
        chefsGrid.innerHTML = chefs.map(chef => `
            <div class="chef-card">
                <img src="${chef.image}" alt="${chef.name}" class="chef-image">
                <div class="chef-info">
                    <h3>${chef.name}</h3>
                    <p class="chef-role">${chef.role}</p>
                    <p class="chef-bio">${chef.bio}</p>
                </div>
            </div>
        `).join('');
    }
    
    // Add active class to nav links based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
});