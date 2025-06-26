/**
 * main.js
 * Titik masuk utama dan penyelaras untuk aplikasi.
 * Ia kini mengendalikan aliran kerja dari pengekstrakan hingga penyimpanan ke Google Sheet.
 */

// Import fungsi dan elemen yang diperlukan dari modul lain.
import { elements, displayImagePreview, displayStructuredData, setLoadingState, resetUI } from './ui.js';
import { getStructuredDataFromApi } from './apiService.js';
import { saveDataToSheet } from './googleSheetService.js';

// --- BARU: Pautan ke Google Sheet anda ---
const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1tt0WfvQV3mS4crKk7bKvl-rmNow_m_TzvjlTkg_2RA0/edit';

// Pembolehubah untuk menyimpan data semasa.
let currentImageBase64 = null;
let currentMimeType = null;
let currentStructuredData = null; // Menyimpan data JSON yang diekstrak.

/**
 * Mengendalikan logik apabila pengguna memilih fail imej.
 * @param {Event} event - Peristiwa 'change' daripada input fail.
 */
function handleImageSelection(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Panggil fungsi UI untuk memaparkan pratonton.
    displayImagePreview(file, (base64, mimeType) => {
        currentImageBase64 = base64;
        currentMimeType = mimeType;
        
        // Tetapkan semula UI sepenuhnya untuk imej baru.
        resetUI();
        elements.imagePreview.src = `data:${mimeType};base64,${base64}`;
        elements.imagePreview.classList.remove('hidden');
        elements.uploadPlaceholder.classList.add('hidden');
        elements.extractButton.disabled = false;
        elements.resultsPlaceholder.textContent = 'Imej sedia untuk diekstrak.';
    });
}

/**
 * Menguruskan proses pengekstrakan data dari imej.
 */
async function handleExtractionProcess() {
    if (!currentImageBase64 || !currentMimeType) {
        alert('Sila muat naik imej dahulu.');
        return;
    }

    setLoadingState(true);
    elements.resultsPlaceholder.classList.add('hidden');
    elements.structuredDataContainer.classList.add('hidden');
    elements.sheetSaveStatus.innerHTML = ''; // Kosongkan status simpan.

    try {
        const structuredData = await getStructuredDataFromApi(currentImageBase64, currentMimeType);
        currentStructuredData = structuredData; // Simpan data untuk digunakan oleh fungsi simpan.
        displayStructuredData(structuredData);
        
        // Paparkan butang simpan selepas berjaya ekstrak.
        elements.saveSheetButton.classList.remove('hidden'); 
    } catch (error) {
        console.error('Pengekstrakan gagal:', error);
        elements.resultsPlaceholder.classList.remove('hidden');
        elements.resultsPlaceholder.textContent = `Ralat: ${error.message}`;
    } finally {
        setLoadingState(false);
    }
}

/**
 * Menguruskan proses menghantar data ke Google Sheet.
 */
async function handleSaveProcess() {
    if (!currentStructuredData) {
        alert("Tiada data untuk disimpan. Sila ekstrak maklumat dahulu.");
        return;
    }

    const saveButton = elements.saveSheetButton;
    const statusDisplay = elements.sheetSaveStatus;

    saveButton.disabled = true; // Lumpuhkan butang semasa proses menyimpan.
    statusDisplay.textContent = 'Menyimpan ke Google Sheet...';
    statusDisplay.classList.remove('text-green-500', 'text-red-500');

    try {
        await saveDataToSheet(currentStructuredData);
        
        // --- PERUBAHAN DI SINI ---
        // Daripada hanya memaparkan teks, kita kini memaparkan HTML dengan pautan.
        const successMessageHTML = `
            <span class="text-green-500">Data berjaya disimpan!</span> 
            <a href="${GOOGLE_SHEET_URL}" target="_blank" class="text-blue-500 hover:underline ml-2">
                Klik Untuk Tengok Data Ubat Disimpan
            </a>
        `;
        statusDisplay.innerHTML = successMessageHTML;

    } catch (error) {
        console.error('Proses simpan gagal:', error);
        statusDisplay.textContent = `Gagal menyimpan: ${error.message}`;
        statusDisplay.classList.add('text-red-500');
    } finally {
        saveButton.disabled = false; // Aktifkan semula butang selepas selesai.
    }
}

/**
 * Memulakan aplikasi dengan menetapkan semua pendengar acara.
 */
function initializeApp() {
    elements.uploadButton.addEventListener('click', () => elements.imageUpload.click());
    elements.imageUpload.addEventListener('change', handleImageSelection);
    elements.extractButton.addEventListener('click', handleExtractionProcess);
    elements.saveSheetButton.addEventListener('click', handleSaveProcess);

    resetUI();
}

document.addEventListener('DOMContentLoaded', initializeApp);
