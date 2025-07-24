document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation Logic ---
    const navLinks = document.querySelectorAll('.nav-links a');
    const pages = document.querySelectorAll('.page');

    function showPage(id) {
        pages.forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById(id).classList.add('active');

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = e.target.getAttribute('href').substring(1);
            showPage(targetId);
        });
    });

    // Handle featured info card navigation
    document.querySelectorAll('.navigate-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPageId = e.target.dataset.target.substring(1);
            const infoId = e.target.dataset.infoId;
            showPage(targetPageId);
            if (targetPageId === 'info-kesehatan' && infoId) {
                showInfoDetail(infoId);
            }
        });
    });


    // --- Home Section Logic ---
    const dailyHealthSummary = document.getElementById('daily-health-summary');
    const quickAccessContent = document.getElementById('quick-access-content');

    function updateDailySummary() {
        const waterConsumed = localStorage.getItem('waterConsumed') || 0;
        const waterTarget = localStorage.getItem('waterTarget') || 2000;
        const moodHistory = JSON.parse(localStorage.getItem('moodHistory') || '[]');
        const medicineReminders = JSON.parse(localStorage.getItem('medicineReminders') || '[]');

        let summaryText = `Anda telah minum ${waterConsumed} ml dari target ${waterTarget} ml.`;

        if (moodHistory.length > 0) {
            const lastMood = moodHistory[moodHistory.length - 1];
            summaryText += `<br>Mood terakhir Anda: ${lastMood.mood} pada ${new Date(lastMood.timestamp).toLocaleDateString('id-ID')}.`;
        } else {
            summaryText += `<br>Anda belum mencatat mood hari ini.`;
        }

        dailyHealthSummary.innerHTML = summaryText;

        // Quick Access Content
        let quickAccessHtml = '';
        if (medicineReminders.length > 0) {
            quickAccessHtml += '<h3>Pengingat Obat Mendatang:</h3><ul>';
            medicineReminders.forEach(reminder => {
                quickAccessHtml += `<li><strong>${reminder.name}</strong> (${reminder.dose}) - Jadwal: ${reminder.schedule}</li>`;
            });
            quickAccessHtml += '</ul>';
        } else {
            quickAccessHtml += '<p>Anda belum memiliki pengingat cepat. Tambahkan pengingat obat atau target air minum di bagian "Alat Bantu".</p>';
        }

        quickAccessContent.innerHTML = quickAccessHtml;
    }


    // --- Informasi Kesehatan Section Logic ---
    const infoSearchInput = document.getElementById('info-search');
    const searchButton = document.getElementById('search-button');
    const categoryFilters = document.querySelectorAll('.category-filter');
    const infoList = document.querySelector('.info-list');
    const infoItems = document.querySelectorAll('.info-item');
    const infoDetailView = document.querySelector('.info-detail-view');
    const detailInfoTitle = document.getElementById('detail-info-title');
    const detailInfoContent = document.getElementById('detail-info-content');
    const backToInformasiBtn = document.getElementById('back-to-informasi');

    function filterInfoItems(searchText, category) {
        infoItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const content = item.querySelector('p').textContent.toLowerCase();
            const itemCategory = item.dataset.category;

            const matchesSearch = (searchText === '' || title.includes(searchText) || content.includes(searchText));
            const matchesCategory = (category === 'all' || itemCategory === category);

            if (matchesSearch && matchesCategory) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    infoSearchInput.addEventListener('input', (e) => {
        const currentCategory = document.querySelector('.category-filter.active').dataset.category;
        filterInfoItems(e.target.value.toLowerCase(), currentCategory);
    });

    searchButton.addEventListener('click', () => {
        const currentCategory = document.querySelector('.category-filter.active').dataset.category;
        filterInfoItems(infoSearchInput.value.toLowerCase(), currentCategory);
    });

    categoryFilters.forEach(button => {
        button.addEventListener('click', (e) => {
            categoryFilters.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            const category = e.target.dataset.category;
            filterInfoItems(infoSearchInput.value.toLowerCase(), category);
        });
    });

    function showInfoDetail(infoId) {
        infoList.style.display = 'none';
        infoDetailView.style.display = 'block';
        infoSearchInput.style.display = 'none'; // Hide search bar when in detail view
        searchButton.style.display = 'none';
        document.querySelector('.info-categories').style.display = 'none';
        document.querySelector('.myth-vs-fact').style.display = 'none';


        const selectedItem = document.querySelector(`.info-item[data-info-id="${infoId}"]`);
        if (selectedItem) {
            detailInfoTitle.textContent = selectedItem.querySelector('h3').textContent.replace(/<span class="favorite-status"><\/span>/g, '').trim();
            detailInfoContent.innerHTML = `<p>${selectedItem.querySelector('p').textContent}</p>`;
        }
    }

    function hideInfoDetail() {
        infoList.style.display = 'block';
        infoDetailView.style.display = 'none';
        infoSearchInput.style.display = 'block'; // Show search bar when in list view
        searchButton.style.display = 'block';
        document.querySelector('.info-categories').style.display = 'flex';
        document.querySelector('.myth-vs-fact').style.display = 'block';
    }

    document.querySelectorAll('.info-detail-link').forEach(button => {
        button.addEventListener('click', (e) => {
            const infoId = e.target.dataset.infoId;
            showInfoDetail(infoId);
        });
    });

    backToInformasiBtn.addEventListener('click', hideInfoDetail);

    // Favorite functionality
    function loadFavorites() {
        const favorites = JSON.parse(localStorage.getItem('favoriteInfo') || '[]');
        infoItems.forEach(item => {
            const infoId = item.dataset.infoId;
            const favoriteStatusSpan = item.querySelector('.favorite-status');
            const addToFavoriteBtn = item.querySelector('.add-to-favorite');

            if (favorites.includes(infoId)) {
                favoriteStatusSpan.textContent = '⭐ Favorit';
                addToFavoriteBtn.textContent = 'Hapus dari Favorit';
                addToFavoriteBtn.classList.add('favorited');
            } else {
                favoriteStatusSpan.textContent = '';
                addToFavoriteBtn.textContent = 'Tambah ke Favorit';
                addToFavoriteBtn.classList.remove('favorited');
            }
        });
    }

    document.querySelectorAll('.add-to-favorite').forEach(button => {
        button.addEventListener('click', (e) => {
            const infoItem = e.target.closest('.info-item');
            const infoId = infoItem.dataset.infoId;
            let favorites = JSON.parse(localStorage.getItem('favoriteInfo') || '[]');

            if (favorites.includes(infoId)) {
                favorites = favorites.filter(id => id !== infoId);
                alert('Dihapus dari favorit!');
            } else {
                favorites.push(infoId);
                alert('Ditambahkan ke favorit!');
            }
            localStorage.setItem('favoriteInfo', JSON.stringify(favorites));
            loadFavorites(); // Re-render favorite status
        });
    });


    // --- Alat Bantu Section Logic ---

    // Water Tracker
    const waterConsumedSpan = document.getElementById('water-consumed');
    const waterTargetSpan = document.getElementById('water-target');
    const waterProgressBar = document.getElementById('water-progress-bar');
    const addWaterBtn = document.getElementById('add-water-btn');
    const setWaterTargetInput = document.getElementById('set-water-target');
    const saveWaterTargetBtn = document.getElementById('save-water-target');

    let waterConsumed = parseInt(localStorage.getItem('waterConsumed') || '0');
    let waterTarget = parseInt(localStorage.getItem('waterTarget') || '2000');

    function updateWaterTracker() {
        waterConsumedSpan.textContent = waterConsumed;
        waterTargetSpan.textContent = waterTarget;
        setWaterTargetInput.value = waterTarget; // Update settings input

        const progress = (waterConsumed / waterTarget) * 100;
        waterProgressBar.style.width = `${Math.min(100, progress)}%`;
        waterProgressBar.style.backgroundColor = progress >= 100 ? '#28a745' : '#4CAF50';
    }

    addWaterBtn.addEventListener('click', () => {
        waterConsumed += 250;
        localStorage.setItem('waterConsumed', waterConsumed);
        updateWaterTracker();
        updateDailySummary(); // Update summary on home page
    });

    saveWaterTargetBtn.addEventListener('click', () => {
        const newTarget = parseInt(setWaterTargetInput.value);
        if (!isNaN(newTarget) && newTarget > 0) {
            waterTarget = newTarget;
            localStorage.setItem('waterTarget', waterTarget);
            updateWaterTracker();
            updateDailySummary(); // Update summary on home page
            alert('Target air minum berhasil disimpan!');
        } else {
            alert('Masukkan target air minum yang valid.');
        }
    });


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
            activeMedicineRemindersList.innerHTML = '<li>Belum ada pengingat obat.</li>';
            return;
        }
        medicineReminders.forEach((reminder, index) => {
            const li = document.createElement('li');
            // Menambahkan data-index ke tombol untuk identifikasi yang mudah saat menghapus
            li.innerHTML = `
                <strong>${reminder.name}</strong> (${reminder.dose}) - Jadwal: ${reminder.schedule}
                <button class="delete-reminder-btn btn-link" data-index="${index}">Hapus</button>
            `;
            activeMedicineRemindersList.appendChild(li);
        });

        // Pastikan event listener ditambahkan SETELAH elemen-elemen baru dibuat
        document.querySelectorAll('.delete-reminder-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const indexToDelete = parseInt(e.target.dataset.index);
                medicineReminders.splice(indexToDelete, 1);
                localStorage.setItem('medicineReminders', JSON.stringify(medicineReminders));
                renderMedicineReminders(); // Render ulang setelah menghapus
                updateDailySummary(); // Update summary on home page
            });
        });
    }

    addMedicineForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newReminder = {
            name: medicineNameInput.value,
            dose: medicineDoseInput.value,
            schedule: medicineScheduleInput.value
        };
        medicineReminders.push(newReminder);
        localStorage.setItem('medicineReminders', JSON.stringify(medicineReminders));
        renderMedicineReminders(); // Render ulang setelah menambahkan
        updateDailySummary(); // Update summary on home page
        addMedicineForm.reset();
    });


    // Daily Mood Journal
    const moodEmojis = document.querySelectorAll('.mood-emoji');
    const moodNotesTextarea = document.getElementById('mood-notes');
    const saveMoodBtn = document.getElementById('save-mood-btn');
    const moodHistoryList = document.getElementById('mood-history');

    let selectedMood = '';
    let moodHistory = JSON.parse(localStorage.getItem('moodHistory') || '[]');

    function renderMoodHistory() {
        moodHistoryList.innerHTML = '';
        if (moodHistory.length === 0) {
            moodHistoryList.innerHTML = '<li>Belum ada riwayat mood.</li>';
            return;
        }
        moodHistory.forEach((entry, index) => {
            const li = document.createElement('li');
            const date = new Date(entry.timestamp).toLocaleDateString('id-ID');
            li.innerHTML = `
                ${date}: ${entry.mood} ${entry.emoji}
                ${entry.notes ? `<br><em>"${entry.notes}"</em>` : ''}
                <button class="delete-mood-btn btn-link" data-index="${index}">Hapus</button>
            `;
            moodHistoryList.appendChild(li);
        });

        // Pastikan event listener ditambahkan SETELAH elemen-elemen baru dibuat
        document.querySelectorAll('.delete-mood-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const indexToDelete = parseInt(e.target.dataset.index);
                moodHistory.splice(indexToDelete, 1);
                localStorage.setItem('moodHistory', JSON.stringify(moodHistory));
                renderMoodHistory(); // Render ulang setelah menghapus
                updateDailySummary(); // Update summary on home page
            });
        });
    }

    moodEmojis.forEach(emoji => {
        emoji.addEventListener('click', () => {
            moodEmojis.forEach(e => e.classList.remove('selected'));
            emoji.classList.add('selected');
            selectedMood = emoji.dataset.mood;
        });
    });

    saveMoodBtn.addEventListener('click', () => {
        if (!selectedMood) {
            alert('Silakan pilih mood Anda terlebih dahulu.');
            return;
        }
        const newMoodEntry = {
            mood: selectedMood,
            emoji: document.querySelector('.mood-emoji.selected').textContent.trim(),
            notes: moodNotesTextarea.value.trim(),
            timestamp: new Date().toISOString()
        };
        moodHistory.push(newMoodEntry);
        localStorage.setItem('moodHistory', JSON.stringify(moodHistory));
        renderMoodHistory(); // Render ulang setelah menyimpan
        updateDailySummary(); // Update summary on home page
        moodNotesTextarea.value = '';
        moodEmojis.forEach(e => e.classList.remove('selected'));
        selectedMood = '';
        alert('Mood berhasil disimpan!');
    });


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
            alert('Masukkan tinggi dan berat badan yang valid.');
            return;
        }

        const heightM = heightCm / 100;
        const bmi = weightKg / (heightM * heightM);
        bmiResultSpan.textContent = bmi.toFixed(2);

        let category = '';
        if (bmi < 18.5) {
            category = 'Kekurangan berat badan';
        } else if (bmi >= 18.5 && bmi < 24.9) {
            category = 'Berat badan normal';
        } else if (bmi >= 25 && bmi < 29.9) {
            category = 'Kelebihan berat badan';
        } else {
            category = 'Obesitas';
        }
        bmiCategorySpan.textContent = category;
    });


    // Calorie Calculator
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
            alert('Masukkan data yang valid untuk perhitungan kalori.');
            return;
        }

        // Harris-Benedict Equation for Basal Metabolic Rate (BMR)
        let bmr;
        if (gender === 'male') {
            bmr = 88.362 + (13.397 * weightKg) + (4.799 * heightCm) - (5.677 * age);
        } else { // female
            bmr = 447.593 + (9.247 * weightKg) + (3.098 * heightCm) - (4.330 * age);
        }

        let activityMultiplier;
        switch (activityLevel) {
            case 'sedentary':
                activityMultiplier = 1.2;
                break;
            case 'light':
                activityMultiplier = 1.375;
                break;
            case 'moderate':
                activityMultiplier = 1.55;
                break;
            case 'active':
                activityMultiplier = 1.725;
                break;
            case 'very-active':
                activityMultiplier = 1.9;
                break;
            default:
                activityMultiplier = 1.2; // Default to sedentary
        }

        const tdee = bmr * activityMultiplier; // Total Daily Energy Expenditure
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
            emergencyContactsList.innerHTML = '<li>Belum ada kontak darurat.</li>';
            return;
        }
        emergencyContacts.forEach((contact, index) => {
            const li = document.createElement('li');
            // Menambahkan data-index ke tombol untuk identifikasi yang mudah saat menghapus
            li.innerHTML = `
                <strong>${contact.name}</strong>: <a href="tel:${contact.number}">${contact.number}</a>
                <button class="delete-contact-btn btn-link" data-index="${index}">Hapus</button>
            `;
            emergencyContactsList.appendChild(li);
        });

        // Pastikan event listener ditambahkan SETELAH elemen-elemen baru dibuat
        document.querySelectorAll('.delete-contact-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const indexToDelete = parseInt(e.target.dataset.index);
                emergencyContacts.splice(indexToDelete, 1);
                localStorage.setItem('emergencyContacts', JSON.stringify(emergencyContacts));
                renderEmergencyContacts(); // Render ulang setelah menghapus
            });
        });
    }

    addContactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newContact = {
            name: contactNameInput.value,
            number: contactNumberInput.value
        };
        emergencyContacts.push(newContact);
        localStorage.setItem('emergencyContacts', JSON.stringify(emergencyContacts));
        renderEmergencyContacts(); // Render ulang setelah menambahkan
        addContactForm.reset();
    });


    // --- Profile & Settings Logic ---

    // User Information
    const userNameInput = document.getElementById('user-name');
    const userDobInput = document.getElementById('user-dob');
    const userGenderSelect = document.getElementById('user-gender');
    const saveUserInfoBtn = document.getElementById('save-user-info');

    function loadUserInfo() {
        userNameInput.value = localStorage.getItem('userName') || '';
        userDobInput.value = localStorage.getItem('userDob') || '';
        userGenderSelect.value = localStorage.getItem('userGender') || '';
    }

    saveUserInfoBtn.addEventListener('click', () => {
        localStorage.setItem('userName', userNameInput.value);
        localStorage.setItem('userDob', userDobInput.value);
        localStorage.setItem('userGender', userGenderSelect.value);
        alert('Informasi pengguna berhasil disimpan!');
    });


    // --- Initial Load ---
    function initializeApp() {
        // Set default page to home
        showPage('home');

        // Load and update all dynamic content
        updateDailySummary();
        updateWaterTracker();
        renderMedicineReminders();
        renderMoodHistory();
        renderEmergencyContacts();
        loadFavorites();
        loadUserInfo();
    }

    initializeApp();
});
