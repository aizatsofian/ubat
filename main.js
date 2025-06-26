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
let currentMimeType = null;

function handleImageSelection(event) {
    const file = event.target.files[0];
    if (!file) return;

    const mimeType = file.type; // <- Dapatkan jenis MIME
    currentMimeType = mimeType; // <- Simpan untuk digunakan kemudian

    displayImagePreview(file, (base64) => {
        currentImageBase64 = base64;
        updateExtractedText('Imej sedia untuk diekstrak.');
    });
}

/**
 * Menguruskan keseluruhan proses pengekstrakan teks, daripada panggilan API hingga kemas kini UI.
 */
async function handleExtractionProcess() {
    if (!currentImageBase64 || !currentMimeType) {
        updateExtractedText('Sila muat naik imej dahulu.');
        return;
    }

    setLoadingState(true);
    updateExtractedText('Mengekstrak teks...');

    try {
        const extractedText = await getTextFromApi(currentImageBase64, currentMimeType); // <- Tambah argumen kedua
        updateExtractedText(extractedText);
    } catch (error) {
        console.error('Pengekstrakan gagal:', error);
        updateExtractedText(`Ralat: ${error.message}`);
    } finally {
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
