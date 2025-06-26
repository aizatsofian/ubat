/**
 * ui.js
 * Modul ini menguruskan semua interaksi dan kemas kini Antara Muka Pengguna (UI).
 * Ia kini dikonfigurasikan untuk memaparkan data berstruktur dan mengawal butang simpan.
 */

// Objek untuk memegang semua rujukan elemen DOM.
export const elements = {
    imageUpload: document.getElementById('image-upload'),
    uploadButton: document.getElementById('upload-button'),
    extractButton: document.getElementById('extract-button'),
    imagePreview: document.getElementById('image-preview'),
    uploadPlaceholder: document.getElementById('upload-placeholder'),
    loader: document.getElementById('loader'),
    
    // Elemen paparan berstruktur
    resultsPlaceholder: document.getElementById('results-placeholder'),
    structuredDataContainer: document.getElementById('structured-data-container'),
    dataFields: {
        nama: document.getElementById('data-nama'),
        no_kp: document.getElementById('data-nokp'),
        umur: document.getElementById('data-umur'),
        tarikh: document.getElementById('data-tarikh'),
        penyakit: document.getElementById('data-penyakit'),
        rx: document.getElementById('data-rx'),
    },

    // Elemen untuk fungsi simpan ke Google Sheet
    saveSheetButton: document.getElementById('save-sheet-button'),
    sheetSaveStatus: document.getElementById('sheet-save-status'),
};

/**
 * Memaparkan pratonton imej yang dipilih oleh pengguna.
 * @param {File} file - Fail imej yang dipilih oleh pengguna.
 * @param {function(string, string): void} callback - Panggil balik yang mengembalikan base64 dan jenis mime.
 */
export function displayImagePreview(file, callback) {
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            elements.imagePreview.src = e.target.result;
            elements.imagePreview.classList.remove('hidden');
            elements.uploadPlaceholder.classList.add('hidden');
            elements.extractButton.disabled = false;
            
            const imageBase64 = e.target.result.split(',')[1];
            callback(imageBase64, file.type); 
        };
        reader.readAsDataURL(file);
    }
}

/**
 * Memaparkan data berstruktur yang diterima daripada API ke dalam borang.
 * @param {Object} data - Objek JavaScript dengan maklumat yang diekstrak.
 */
export function displayStructuredData(data) {
    elements.resultsPlaceholder.classList.add('hidden');
    elements.structuredDataContainer.classList.remove('hidden');

    for (const key in elements.dataFields) {
        if (elements.dataFields.hasOwnProperty(key)) {
            elements.dataFields[key].textContent = data[key] || '-';
        }
    }
}

/**
 * Menogol keadaan pemuatan UI untuk pengekstrakan.
 * @param {boolean} isLoading - Sama ada untuk menunjukkan pemuat atau tidak.
 */
export function setLoadingState(isLoading) {
    elements.loader.classList.toggle('hidden', !isLoading);
    elements.extractButton.disabled = isLoading;
    elements.uploadButton.disabled = isLoading;
    elements.extractButton.classList.toggle('cursor-not-allowed', isLoading);
}

/**
 * Menetapkan semula UI kepada keadaan awal.
 */
export function resetUI() {
    elements.imagePreview.src = '';
    elements.imagePreview.classList.add('hidden');
    elements.uploadPlaceholder.classList.remove('hidden');

    elements.structuredDataContainer.classList.add('hidden');
    elements.resultsPlaceholder.classList.remove('hidden');

    for (const key in elements.dataFields) {
        if (elements.dataFields.hasOwnProperty(key)) {
            elements.dataFields[key].textContent = '-';
        }
    }
    
    elements.extractButton.disabled = true;

    elements.saveSheetButton.classList.add('hidden');
    
    // --- PERUBAHAN DI SINI ---
    // Menggunakan innerHTML = '' untuk memadam sebarang HTML seperti pautan.
    elements.sheetSaveStatus.innerHTML = ''; 
    elements.sheetSaveStatus.classList.remove('text-green-500', 'text-red-500');
}
