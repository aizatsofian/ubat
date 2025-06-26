/**
 * main.js
 * Titik masuk utama dan penyelaras untuk aplikasi.
 * Ia mengimport modul UI dan perkhidmatan API, kemudian menetapkan pendengar acara
 * untuk menghubungkan tindakan pengguna dengan logik aplikasi.
 */

// Import fungsi dan elemen yang diperlukan dari modul lain.
import { elements, displayImagePreview, updateExtractedText, copyTextToClipboard, setLoadingState, resetUI } from './ui.js';
import { getTextFromApi } from './apiService.js';

// Pembolehubah untuk menyimpan data base64 bagi imej yang sedang dipaparkan.
let currentImageBase64 = null;

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
    // Apabila selesai, ia akan memanggil balik dengan data base64 imej.
    displayImagePreview(file, (base64) => {
        currentImageBase64 = base64; // Simpan data imej.
        updateExtractedText('Imej sedia untuk diekstrak.'); // Kemas kini status UI.
    });
}

/**
 * Menguruskan keseluruhan proses pengekstrakan teks, daripada panggilan API hingga kemas kini UI.
 */
async function handleExtractionProcess() {
    if (!currentImageBase64) {
        updateExtractedText('Sila muat naik imej dahulu.');
        return;
    }

    setLoadingState(true); // Tunjukkan pemuat.
    updateExtractedText('Mengekstrak teks...'); // Beri maklum balas segera kepada pengguna.

    try {
        // Panggil fungsi perkhidmatan API untuk mendapatkan teks.
        const extractedText = await getTextFromApi(currentImageBase64);
        // Kemas kini UI dengan teks yang berjaya diekstrak.
        updateExtractedText(extractedText);
    } catch (error) {
        // Jika berlaku ralat, paparkannya pada UI.
        console.error('Pengekstrakan gagal:', error);
        updateExtractedText(`Ralat: ${error.message}`);
    } finally {
        // Pastikan pemuat disembunyikan selepas proses selesai (sama ada berjaya atau gagal).
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
    elements.copyButton.addEventListener('click', copyTextToClipboard);

    // Tetapkan semula UI kepada keadaan asal apabila aplikasi dimuatkan.
    resetUI();
}

// Tambah pendengar acara untuk memastikan skrip hanya berjalan selepas semua HTML dimuatkan.
document.addEventListener('DOMContentLoaded', initializeApp);
