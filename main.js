/**
 * main.js
 * Titik masuk utama dan penyelaras untuk aplikasi.
 * Ia kini mengendalikan aliran kerja untuk mendapatkan dan memaparkan data berstruktur.
 */

// Import fungsi dan elemen yang diperlukan dari modul lain.
import { elements, displayImagePreview, displayStructuredData, setLoadingState, resetUI } from './ui.js';
import { getStructuredDataFromApi } from './apiService.js';

// Pembolehubah untuk menyimpan data imej yang sedang diproses.
let currentImageBase64 = null;
let currentMimeType = null;

/**
 * Mengendalikan logik apabila pengguna memilih fail imej.
 * @param {Event} event - Peristiwa 'change' daripada input fail.
 */
function handleImageSelection(event) {
    const file = event.target.files[0];
    if (!file) {
        return; // Keluar jika tiada fail dipilih.
    }

    // Panggil fungsi UI untuk memaparkan pratonton.
    // Apabila selesai, ia akan memanggil balik dengan data base64 dan jenis mime imej.
    displayImagePreview(file, (base64, mimeType) => {
        currentImageBase64 = base64; // Simpan data base64.
        currentMimeType = mimeType;   // Simpan jenis mime.
        
        // Tetapkan semula paparan data untuk imej baru.
        resetUI();
        elements.imagePreview.src = `data:${mimeType};base64,${base64}`;
        elements.imagePreview.classList.remove('hidden');
        elements.uploadPlaceholder.classList.add('hidden');
        elements.extractButton.disabled = false;
        elements.resultsPlaceholder.textContent = 'Imej sedia untuk diekstrak.';

    });
}

/**
 * Menguruskan keseluruhan proses pengekstrakan teks, daripada panggilan API hingga kemas kini UI.
 */
async function handleExtractionProcess() {
    if (!currentImageBase64 || !currentMimeType) {
        alert('Sila muat naik imej dahulu.');
        return;
    }

    setLoadingState(true);
    // Sembunyikan placeholder dan tunjukkan loader di tengah.
    elements.resultsPlaceholder.classList.add('hidden');
    elements.structuredDataContainer.classList.add('hidden');


    try {
        // Panggil fungsi perkhidmatan API untuk mendapatkan data berstruktur.
        const structuredData = await getStructuredDataFromApi(currentImageBase64, currentMimeType);
        // Panggil fungsi UI untuk memaparkan data dalam borang.
        displayStructuredData(structuredData);
    } catch (error) {
        // Jika berlaku ralat, paparkannya pada UI.
        console.error('Pengekstrakan gagal:', error);
        elements.resultsPlaceholder.classList.remove('hidden');
        elements.resultsPlaceholder.textContent = `Ralat: ${error.message}`;
    } finally {
        // Pastikan pemuat disembunyikan selepas proses selesai.
        setLoadingState(false);
    }
}

/**
 * Memulakan aplikasi dengan menetapkan semua pendengar acara yang diperlukan.
 */
function initializeApp() {
    elements.uploadButton.addEventListener('click', () => elements.imageUpload.click());
    elements.imageUpload.addEventListener('change', handleImageSelection);
    elements.extractButton.addEventListener('click', handleExtractionProcess);

    // Tetapkan semula UI kepada keadaan asal apabila aplikasi dimuatkan.
    resetUI();
}

// Tambah pendengar acara untuk memastikan skrip hanya berjalan selepas semua HTML dimuatkan.
document.addEventListener('DOMContentLoaded', initializeApp);
