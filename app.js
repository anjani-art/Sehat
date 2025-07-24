document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation and Page Management ---
    const navLinks = document.querySelectorAll('.nav-links a');
    const pages = document.querySelectorAll('.page');
    const appTitle = document.querySelector('.app-title');

    function showPage(pageId) {
        pages.forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById(pageId).classList.add('active');

        navLinks.forEach(link => {
           
 if (link.getAttribute('href') === `#${pageId}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
        
     e.preventDefault();
            const targetPageId = e.target.getAttribute('href').substring(1);
            showPage(targetPageId);
        });
    });

    appTitle.addEventListener('click', () => {
        showPage('home');
 });

    // Handle navigation from informasi links
    document.querySelectorAll('.navigate-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = e.target.dataset.target.substring(1);
            showPage(targetId);
            // If it's an informasi link, also show the specific informasi
            if (e.target.dataset.articleId) {
  
               const articleId = e.target.dataset.articleId;
                showInformasiDetail(articleId); // Changed from showArticleDetail
            }
        });
    });
 // Initial page load
    showPage('home');

    // --- Home Page Functionality ---
    const dailyHealthSummary = document.getElementById('daily-health-summary');
 const dailyHealthTip = document.getElementById('daily-health-tip');
    const quickAccessContent = document.getElementById('quick-access-content');

    function updateHomePage() {
        // Daily Health Summary - Placeholder, could be dynamic based on user input
        dailyHealthSummary.textContent = "Data kesehatan harian Anda akan muncul di sini setelah Anda mulai menggunakan alat bantu!";
 // Daily Health Tip - Loaded from HTML, but could be dynamic
        // dailyHealthTip.textContent is already set in the HTML

        // Quick Access - Placeholder for reminders
        [span_0](start_span)quickAccessContent.innerHTML = '<p>Anda belum memiliki pengingat cepat.[span_0](end_span)[span_1](start_span)Tambahkan pengingat obat atau target air minum di bagian "Alat Bantu".[span_1](end_span)</p>';
 // Update with actual reminders if available (e.g., from medicine reminders)
        const activeMedicineReminders = JSON.parse(localStorage.getItem('medicineReminders') || '[]');
 if (activeMedicineReminders.length > 0) {
            let remindersHtml = '<h3>Pengingat Aktif:</h3><ul>';
 activeMedicineReminders.forEach(reminder => {
                remindersHtml += `<li>Obat: ${reminder.name}, Dosis: ${reminder.dose}, Jadwal: ${reminder.schedule}</li>`;
            });
 remindersHtml += '</ul>';
            quickAccessContent.innerHTML = remindersHtml;
        }
    }
    updateHomePage();
 // Call on initial load

    // --- Informasi Kesehatan (Informasi) Functionality ---
    const informasiSearchInput = document.getElementById('informasi-search'); // Changed from article-search
 const searchButton = document.getElementById('search-button');
    const categoryFilters = document.querySelectorAll('.category-filter');
    const informasiList = document.querySelector('.informasi-list'); // Changed from article-list
    const informasiDetailView = document.getElementById('informasi-detail-view'); // Changed from article-detail-view
    const detailInformasiTitle = document.getElementById('detail-informasi-title'); // Changed from detail-article-title
 const detailInformasiContent = document.getElementById('detail-informasi-content'); // Changed from detail-article-content
    const backToInformasisBtn = document.getElementById('back-to-informasis'); // Changed from back-to-articles
    const favoriteButtons = document.querySelectorAll('.add-to-favorite');
 let informasisData = [ // Changed from articlesData
        {
            id: '1',
            title: 'Manfaat Konsumsi Air Putih Cukup',
            category: 'nutrisi',
            [span_2](start_span)content: 'Cukupan asupan air putih memegang peranan krusial bagi optimalnya fungsi tubuh secara menyeluruh, jauh melampaui sekadar pelepas dahaga.[span_2](end_span)[span_3](start_span)Dengan terhidrasi dengan baik, Anda membantu menjaga keseimbangan cairan tubuh yang vital untuk transportasi nutrisi, pengaturan suhu tubuh, dan pelumas sendi.[span_3](end_span)[span_4](start_span)Air adalah komponen utama darah dan berperan dalam membawa oksigen serta nutrisi penting ke sel-sel, sekaligus membantu membuang racun dan produk limbah metabolik melalui ginjal.[span_4](end_span)[span_5](start_span)Konsumsi air yang cukup juga mendukung fungsi kognitif yang optimal, meningkatkan konsentrasi, daya ingat, dan suasana hati, serta mencegah kelelahan.[span_5](end_span)[span_6](start_span)Bagi kesehatan fisik, air berkontribusi pada kulit yang sehat dan terhidrasi, mempercepat proses metabolisme yang penting untuk manajemen berat badan, dan membantu mencegah sembelit dengan melancarkan sistem pencernaan.[span_6](end_span)[span_7](start_span)Dengan demikian, minum air putih yang cukup setiap hari adalah investasi sederhana namun powerful untuk kesehatan jangka panjang dan kualitas hidup yang lebih baik.'[span_7](end_span)
 },
        {
            id: '2',
            title: 'Panduan Olahraga Ringan di Rumah',
            category: 'gerak',
            [span_8](start_span)content: 'Tidak perlu ke gym, Anda bisa berolahraga ringan di rumah dengan efektif.Olahraga ringan di rumah adalah cara yang bagus untuk menjaga kebugaran tanpa perlu peralatan mahal atau pergi ke gym.[span_8](end_span)[span_9](start_span)Mulailah dengan pemanasan 5-10 menit seperti jalan di tempat atau peregangan dinamis.[span_9](end_span)[span_10](start_span)Kemudian, lakukan gerakan sederhana seperti squat, lunges, push-up (modifikasi lutut jika perlu), plank, dan jumping jack, masing-masing 10-15 repetisi atau tahan selama 30 detik, ulangi 2-3 set.[span_10](end_span)[span_11](start_span)Akhiri dengan pendinginan berupa peregangan statis untuk membantu pemulihan otot.[span_11](end_span)[span_12](start_span)Konsistensi adalah kunci, jadi usahakan berolahraga 3-4 kali seminggu, dan selalu dengarkan tubuh Anda untuk menghindari cedera.'[span_12](end_span)
 },
        {
            id: '3',
            title: 'Tips Meningkatkan Kualitas Tidur Anda',
            category: 'tidur',
            [span_13](start_span)content: 'Tidur yang berkualitas penting untuk kesehatan fisik dan mental, ada beberapa langkah yang bisa Anda terapkan secara konsisten.[span_13](end_span)[span_14](start_span)Prioritaskan untuk menjaga jadwal tidur yang teratur, bahkan di akhir pekan, dan ciptakan lingkungan kamar tidur yang gelap, tenang, dan sejuk.[span_14](end_span)[span_15](start_span)Hindari kafein dan alkohol menjelang waktu tidur, serta batasi paparan layar gawai atau perangkat elektronik setidaknya satu jam sebelum Anda beranjak ke tempat tidur.[span_15](end_span)[span_16](start_span)Melakukan aktivitas relaksasi seperti membaca buku atau mandi air hangat juga dapat membantu mempersiapkan tubuh Anda untuk tidur nyenyak.'[span_16](end_span)
 },
        {
            id: '4',
            title: 'Kebersihan Diri dan Lingkungan',
            category: 'perawatan',
            [span_17](start_span)content: 'Kesehatan optimal adalah aset berharga yang berakar kuat pada kebersihan, baik kebersihan diri maupun lingkungan di sekitar kita.[span_17](end_span)[span_18](start_span)Mencuci tangan dengan sabun, mandi teratur, dan menjaga kebersihan mulut adalah praktik personal vital yang menjadi perisai utama kita dari kuman dan infeksi.[span_18](end_span)[span_19](start_span)Sejalan dengan itu, menjaga kebersihan rumah—dengan rutin membersihkan permukaan, mengelola sampah, dan membersihkan area lembap seperti kamar mandi—serta tidak membuang sampah sembarangan di area publik, sangat krusial untuk mencegah penumpukan bakteri, virus, dan hama.[span_19](end_span)[span_20](start_span)Kedua aspek kebersihan ini saling melengkapi; kebersihan diri mencegah penyebaran kuman dari dan ke tubuh kita, sementara lingkungan yang bersih menciptakan ruang hidup yang sehat, secara sinergis membentuk benteng pertahanan terdepan kita melawan berbagai penyakit dan memastikan kualitas hidup yang lebih baik.'[span_20](end_span)
 }
    ];

    function renderInformasis(filterCategory = 'all', searchTerm = '') { // Changed from renderArticles
        const informasiItems = document.querySelectorAll('.informasi-item'); // Changed from article-item
 informasiItems.forEach(item => {
            const informasiCategory = item.dataset.category;
            const informasiTitle = item.querySelector('h3').textContent.toLowerCase();
            const informasiContent = item.querySelector('p').textContent.toLowerCase();
            const matchesCategory = filterCategory === 'all' || informasiCategory === filterCategory;
            const matchesSearch = searchTerm === '' || informasiTitle.includes(searchTerm) || informasiContent.includes(searchTerm);

           
  if (matchesCategory && matchesSearch) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
 }

    // Initial render
    renderInformasis(); // Changed from renderArticles
 searchButton.addEventListener('click', () => {
        const searchTerm = informasiSearchInput.value.toLowerCase();
        const activeCategory = document.querySelector('.category-filter.active').dataset.category;
        renderInformasis(activeCategory, searchTerm); // Changed from renderArticles
    });
 informasiSearchInput.addEventListener('keyup', (e) => { // Changed from articleSearchInput
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });
 categoryFilters.forEach(filter => {
        filter.addEventListener('click', (e) => {
            e.preventDefault();
            categoryFilters.forEach(f => f.classList.remove('active'));
            e.target.classList.add('active');
            const filterCategory = e.target.dataset.category;
            const searchTerm = informasiSearchInput.value.toLowerCase(); // Changed from articleSearchInput
            renderInformasis(filterCategory, searchTerm); // Changed from renderArticles
      
    });
    });

    document.querySelectorAll('.informasi-detail-link').forEach(link => { // Changed from article-detail-link
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const informasiId = e.target.dataset.articleId; // Retained dataset name for compatibility
            showInformasiDetail(informasiId); // Changed from showArticleDetail
        });
    });
 function showInformasiDetail(informasiId) { // Changed from showArticleDetail
        const informasi = informasisData.find(a => a.id === informasiId); // Changed from article and articlesData
 if (informasi) {
            detailInformasiTitle.textContent = informasi.title; // Changed from detailArticleTitle and article
            detailInformasiContent.innerHTML = `<p>${informasi.content}</p>`; // Changed from detailArticleContent and article
 informasiList.style.display = 'none'; // Changed from articleList
            document.querySelector('.search-bar').style.display = 'none';
            document.querySelector('.informasi-categories').style.display = 'none'; // Changed from article-categories
            document.querySelector('.myth-vs-fact').style.display = 'none';
            informasiDetailView.style.display = 'block'; // Changed from articleDetailView
            window.scrollTo(0, 0);
 // Scroll to top for better viewing
        }
    }

    backToInformasisBtn.addEventListener('click', () => { // Changed from backToArticlesBtn
        informasiDetailView.style.display = 'none'; // Changed from articleDetailView
        informasiList.style.display = 'block'; // Changed from articleList
        document.querySelector('.search-bar').style.display = 'flex';
        document.querySelector('.informasi-categories').style.display = 'block'; // Changed from article-categories
        document.querySelector('.myth-vs-fact').style.display = 'block';
        detailInformasiTitle.textContent = ''; // Changed from detailArticleTitle
        detailInformasiContent.innerHTML = ''; // Changed from detailArticleContent
    });
 // Favorite informasis (using localStorage)
    let favoriteInformasis = JSON.parse(localStorage.getItem('favoriteInformasis') || '[]'); // Changed from favoriteArticles
 function updateFavoriteStatus(informasiId, isFavorite) { // Changed from updateFavoriteStatus and articleId
        const informasiItem = document.querySelector(`.informasi-item[data-article-id="${informasiId}"]`); // Changed from article-item; kept data-article-id for compatibility
 if (informasiItem) {
            const statusSpan = informasiItem.querySelector('.favorite-status');
 const button = informasiItem.querySelector('.add-to-favorite');
            if (isFavorite) {
                statusSpan.textContent = ' (Favorit)';
 button.textContent = 'Hapus dari Favorit';
            } else {
                statusSpan.textContent = '';
 button.textContent = 'Tambah ke Favorit';
            }
        }
    }

    favoriteButtons.forEach(button => {
        const informasiItem = button.closest('.informasi-item'); // Changed from article-item
        const informasiId = informasiItem.dataset.articleId; // Kept dataset name for compatibility
        const isCurrentlyFavorite = favoriteInformasis.includes(informasiId);
        updateFavoriteStatus(informasiId, isCurrentlyFavorite);

        button.addEventListener('click', () => {
            const index = favoriteInformasis.indexOf(informasiId);
         
    if (index > -1) {
                // Already in favorites, remove it
                favoriteInformasis.splice(index, 1);
                updateFavoriteStatus(informasiId, false);
            } else {
                // Not in favorites, add it
   
              favoriteInformasis.push(informasiId);
                updateFavoriteStatus(informasiId, true);
            }
            localStorage.setItem('favoriteInformasis', JSON.stringify(favoriteInformasis)); // Changed from favoriteArticles
        });
    });
 // --- Tools Page Functionality ---

    // Water Tracker
    const waterConsumedSpan = document.getElementById('water-consumed');
 const waterProgressBar = document.getElementById('water-progress-bar');
    const addWaterBtn = document.getElementById('add-water-btn');
    const waterTargetSpan = document.getElementById('water-target');
    let waterConsumed = parseInt(localStorage.getItem('waterConsumed') || '0');
 let waterTarget = parseInt(localStorage.getItem('waterTarget') || '2000'); // Default 2000 ml

    function updateWaterTracker() {
        waterConsumedSpan.textContent = waterConsumed;
 waterTargetSpan.textContent = waterTarget;
        const progress = (waterConsumed / waterTarget) * 100;
        waterProgressBar.style.width = `${Math.min(100, progress)}%`;
 if (waterConsumed >= waterTarget) {
            waterProgressBar.style.backgroundColor = '#28a745';
 // Green when target met
        } else {
            waterProgressBar.style.backgroundColor = '#007bff';
 // Blue otherwise
        }
        localStorage.setItem('waterConsumed', waterConsumed);
 }

    addWaterBtn.addEventListener('click', () => {
        waterConsumed += 250; // Add 250 ml per click
        updateWaterTracker();
    });
 // Reset water consumed daily (for a real app, this would be handled by a date check)
    // For demonstration, we can simulate a reset or add a manual reset button
    // For now, it will persist until manually cleared or new day logic is added.
 updateWaterTracker(); // Initial update

    // Medicine Reminders
    const addMedicineForm = document.getElementById('add-medicine-form');
 const medicineNameInput = document.getElementById('medicine-name');
    const medicineDoseInput = document.getElementById('medicine-dose');
    const medicineScheduleInput = document.getElementById('medicine-schedule');
    const activeMedicineRemindersList = document.getElementById('active-medicine-reminders');
 let medicineReminders = JSON.parse(localStorage.getItem('medicineReminders') || '[]');

    function renderMedicineReminders() {
        activeMedicineRemindersList.innerHTML = '';
 if (medicineReminders.length === 0) {
            activeMedicineRemindersList.innerHTML = '<p>Belum ada pengingat obat aktif.</p>';
 } else {
            medicineReminders.forEach((reminder, index) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    Obat: <strong>${reminder.name}</strong>, Dosis: ${reminder.dose}, Jadwal: ${reminder.schedule}
                    <button 
 class="delete-medicine-reminder btn-danger" data-index="${index}">Hapus</button>
                `;
                activeMedicineRemindersList.appendChild(li);
            });
 }
        updateHomePage(); // Update quick access on home page
    }

    addMedicineForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = medicineNameInput.value;
        const dose = medicineDoseInput.value;
        const schedule = medicineScheduleInput.value; // HH:MM, HH:MM

        if (name && dose && schedule) {
            medicineReminders.push({ name, dose, schedule 
 });
            localStorage.setItem('medicineReminders', JSON.stringify(medicineReminders));
            renderMedicineReminders();
            medicineNameInput.value = '';
            medicineDoseInput.value = '';
            medicineScheduleInput.value = '';
            alert('Pengingat obat berhasil ditambahkan!');
        } else {
        
     alert('Harap isi semua kolom untuk pengingat obat.');
        }
    });
 activeMedicineRemindersList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-medicine-reminder')) {
            const indexToDelete = parseInt(e.target.dataset.index);
            medicineReminders.splice(indexToDelete, 1);
            localStorage.setItem('medicineReminders', JSON.stringify(medicineReminders));
            renderMedicineReminders();
        }
    });
 renderMedicineReminders(); // Initial render

    // Mood Journal
    const moodEmojis = document.querySelectorAll('.mood-emoji');
 const moodNotesInput = document.getElementById('mood-notes');
    const saveMoodBtn = document.getElementById('save-mood-btn');
    const moodHistoryList = document.getElementById('mood-history');
    let selectedMood = '';
 let moodHistory = JSON.parse(localStorage.getItem('moodHistory') || '[]');

    function renderMoodHistory() {
        moodHistoryList.innerHTML = '';
 if (moodHistory.length === 0) {
            moodHistoryList.innerHTML = '<p>Belum ada catatan mood.</p>';
 } else {
            moodHistory.forEach(entry => {
                const li = document.createElement('li');
                li.textContent = `${new Date(entry.timestamp).toLocaleString()}: ${entry.mood} - ${entry.notes}`;
                moodHistoryList.appendChild(li);
            });
 }
    }

    moodEmojis.forEach(emoji => {
        emoji.addEventListener('click', () => {
            moodEmojis.forEach(e => e.classList.remove('selected'));
            emoji.classList.add('selected');
            selectedMood = emoji.dataset.mood;
        });
    });
 saveMoodBtn.addEventListener('click', () => {
        if (selectedMood) {
            const notes = moodNotesInput.value.trim();
            moodHistory.unshift({ // Add to the beginning for reverse chronological order
                timestamp: new Date().toISOString(),
                mood: selectedMood,
                
 notes: notes || 'Tidak ada catatan'
            });
            localStorage.setItem('moodHistory', JSON.stringify(moodHistory));
            renderMoodHistory();
            selectedMood = '';
            moodNotesInput.value = '';
            moodEmojis.forEach(e => e.classList.remove('selected'));
            alert('Mood berhasil disimpan!');
  
        } else {
            alert('Harap pilih mood Anda sebelum menyimpan.');
        }
    });
 renderMoodHistory(); // Initial render

    // Basic Health Calculators

    // BMI Calculator
    const bmiHeightInput = document.getElementById('bmi-height');
 const bmiWeightInput = document.getElementById('bmi-weight');
    const calculateBmiBtn = document.getElementById('calculate-bmi-btn');
    const bmiResultSpan = document.getElementById('bmi-result');
    const bmiCategorySpan = document.getElementById('bmi-category');
 calculateBmiBtn.addEventListener('click', () => {
        const heightCm = parseFloat(bmiHeightInput.value);
        const weightKg = parseFloat(bmiWeightInput.value);

        if (isNaN(heightCm) || isNaN(weightKg) || heightCm <= 0 || weightKg <= 0) {
            alert('Harap masukkan tinggi dan berat badan yang valid.');
            return;
        }

        const heightM = heightCm / 100;
   
      const bmi = weightKg / (heightM * heightM);
        let category = '';

        if (bmi < 18.5) {
            category = 'Kekurangan Berat Badan';
        } else if (bmi >= 18.5 && bmi < 24.9) {
            category = 'Berat Badan Normal';
        } else if (bmi >= 25 && 
 bmi < 29.9) {
            category = 'Kelebihan Berat Badan';
        } else {
            category = 'Obesitas';
        }

        bmiResultSpan.textContent = bmi.toFixed(2);
        bmiCategorySpan.textContent = category;
    });
 // Estimated Calorie Needs Calculator
    const calorieAgeInput = document.getElementById('calorie-age');
    const calorieGenderSelect = document.getElementById('calorie-gender');
    const calorieHeightInput = document.getElementById('calorie-height');
 const calorieWeightInput = document.getElementById('calorie-weight');
    const calorieActivitySelect = document.getElementById('calorie-activity');
    const calculateCalorieBtn = document.getElementById('calculate-calorie-btn');
    const calorieResultSpan = document.getElementById('calorie-result');
 calculateCalorieBtn.addEventListener('click', () => {
        const age = parseInt(calorieAgeInput.value);
        const gender = calorieGenderSelect.value;
        const heightCm = parseFloat(calorieHeightInput.value);
        const weightKg = parseFloat(calorieWeightInput.value);
        const activityLevel = calorieActivitySelect.value;

        if (isNaN(age) || isNaN(heightCm) || isNaN(weightKg) || age <= 0 || heightCm <= 0 || weightKg <= 0) {
            alert('Harap masukkan usia, tinggi, 
 dan berat badan yang valid.');
            return;
        }

        let bmr; // Basal Metabolic Rate

        // Mifflin-St Jeor Equation
        if (gender === 'male') {
            bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
        } else { // female
  
           bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;
        }

        let activityFactor;
        switch (activityLevel) {
            case 'sedentary':
                activityFactor = 1.2;
                break;
 case 'light':
                activityFactor = 1.375;
 break;
            case 'moderate':
                activityFactor = 1.55;
 break;
            case 'active':
                activityFactor = 1.725;
 break;
            case 'very-active':
                activityFactor = 1.9;
 break;
            default:
                activityFactor = 1.2;
 }

        const tdee = bmr * activityFactor;
 // Total Daily Energy Expenditure
        calorieResultSpan.textContent = tdee.toFixed(0);
    });
 // Emergency Contacts
    const addContactForm = document.getElementById('add-contact-form');
    const contactNameInput = document.getElementById('contact-name');
    const contactNumberInput = document.getElementById('contact-number');
 const emergencyContactsList = document.getElementById('emergency-contacts-list');

    let emergencyContacts = JSON.parse(localStorage.getItem('emergencyContacts') || '[]');
 function renderEmergencyContacts() {
        emergencyContactsList.innerHTML = '';
 if (emergencyContacts.length === 0) {
            emergencyContactsList.innerHTML = '<p>Belum ada kontak darurat yang disimpan.</p>';
 } else {
            emergencyContacts.forEach((contact, index) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <strong>${contact.name}</strong>: <a href="tel:${contact.number}">${contact.number}</a>
                    <button class="delete-contact-btn btn-danger" data-index="${index}">Hapus</button>
 
                `;
                emergencyContactsList.appendChild(li);
            });
 }
    }

    addContactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = contactNameInput.value.trim();
        const number = contactNumberInput.value.trim();

        if (name && number) {
            emergencyContacts.push({ name, number });
            localStorage.setItem('emergencyContacts', JSON.stringify(emergencyContacts));
            renderEmergencyContacts();
       
      contactNameInput.value = '';
            contactNumberInput.value = '';
            alert('Kontak darurat berhasil ditambahkan!');
        } else {
            alert('Harap isi nama dan nomor telepon kontak.');
        }
    });
 emergencyContactsList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-contact-btn')) {
            const indexToDelete = parseInt(e.target.dataset.index);
            emergencyContacts.splice(indexToDelete, 1);
            localStorage.setItem('emergencyContacts', JSON.stringify(emergencyContacts));
            renderEmergencyContacts();
        }
    });
 renderEmergencyContacts(); // Initial render

    // --- Profile & Settings Functionality ---

    // User Information
    const userNameInput = document.getElementById('user-name');
 const userDobInput = document.getElementById('user-dob');
    const userGenderSelect = document.getElementById('user-gender');
    const saveUserInfoBtn = document.getElementById('save-user-info');

    let userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
 function loadUserInfo() {
        userNameInput.value = userInfo.name || '';
        userDobInput.value = userInfo.dob || '';
 userGenderSelect.value = userInfo.gender || '';
    }

    saveUserInfoBtn.addEventListener('click', () => {
        userInfo.name = userNameInput.value.trim();
        userInfo.dob = userDobInput.value;
        userInfo.gender = userGenderSelect.value;
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        alert('Informasi pengguna berhasil disimpan!');
    });
 loadUserInfo(); // Initial load

    // Set Daily Water Target
    const setWaterTargetInput = document.getElementById('set-water-target');
 const saveWaterTargetBtn = document.getElementById('save-water-target');

    // Initialize the input with the current target from localStorage or default
    setWaterTargetInput.value = waterTarget;
 saveWaterTargetBtn.addEventListener('click', () => {
        const newTarget = parseInt(setWaterTargetInput.value);
        if (!isNaN(newTarget) && newTarget > 0) {
            waterTarget = newTarget;
            localStorage.setItem('waterTarget', waterTarget);
            updateWaterTracker(); // Update the main water tracker display
            alert('Target air minum berhasil diperbarui!');
        } else 
 {
            alert('Harap masukkan target air minum yang valid (angka positif).');
        }
    });
 // Service Worker Registration for PWA features
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                })
   
              .catch(err => {
                    console.log('ServiceWorker registration failed: ', err);
                });
        });
 }
});


