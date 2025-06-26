/**
 * ui.js
 * Modul ini menguruskan semua interaksi dan kemas kini Antara Muka Pengguna (UI).
 * Ia kini dikonfigurasikan untuk memaparkan data berstruktur.
 */

// Objek untuk memegang semua rujukan elemen DOM, termasuk elemen paparan data baru.
export const elements = {
    imageUpload: document.getElementById('image-upload'),
    uploadButton: document.getElementById('upload-button'),
    extractButton: document.getElementById('extract-button'),
    imagePreview: document.getElementById('image-preview'),
    uploadPlaceholder: document.getElementById('upload-placeholder'),
    loader: document.getElementById('loader'),
    
    // Elemen baru untuk paparan berstruktur
    resultsPlaceholder: document.getElementById('results-placeholder'),
    structuredDataContainer: document.getElementById('structured-data-container'),
    dataFields: {
        nama: document.getElementById('data-nama'),
        no_kp: document.getElementById('data-nokp'),
        umur: document.getElementById('data-umur'),
        tarikh: document.getElementById('data-tarikh'),
        penyakit: document.getElementById('data-penyakit'),
        rx: document.getElementById('data-rx'),
    }
};

/**
 * Memaparkan pratonton imej yang dipilih oleh pengguna.
 * (Fungsi ini tidak berubah secara signifikan)
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
            // Pulangkan juga jenis mime fail.
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
    // Sembunyikan mesej placeholder dan tunjukkan bekas data.
    elements.resultsPlaceholder.classList.add('hidden');
    elements.structuredDataContainer.classList.remove('hidden');

    // Isi setiap medan dengan data, atau letak '-' jika tiada data.
    for (const key in elements.dataFields) {
        if (elements.dataFields.hasOwnProperty(key)) {
            elements.dataFields[key].textContent = data[key] || '-';
        }
    }
}

/**
 * Menogol keadaan pemuatan UI.
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
    // Sembunyikan pratonton imej dan tunjukkan placeholder asal.
    elements.imagePreview.src = '';
    elements.imagePreview.classList.add('hidden');
    elements.uploadPlaceholder.classList.remove('hidden');

    // Sembunyikan bekas data dan tunjukkan placeholder keputusan.
    elements.structuredDataContainer.classList.add('hidden');
    elements.resultsPlaceholder.classList.remove('hidden');

    // Kosongkan semua medan data.
    for (const key in elements.dataFields) {
        if (elements.dataFields.hasOwnProperty(key)) {
            elements.dataFields[key].textContent = '-';
        }
    }
    
    // Lumpuhkan butang ekstrak.
    elements.extractButton.disabled = true;
}
