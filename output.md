
## index.html

<!DOCTYPE html>
<html lang="ms">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pengekstrak Teks Pintar</title>
    
    <!-- Tailwind CSS for utility-first styling -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Google Fonts for typography -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Link to the external CSS file -->
    <link rel="stylesheet" href="style.css">
</head>
<body class="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
    <div class="container mx-auto p-4 md:p-8 max-w-4xl">
        <header class="text-center mb-8">
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Pengekstrak Maklumat Pintar</h1>
            <p class="text-md text-gray-600 dark:text-gray-400 mt-2">AI akan memahami dan menyusun maklumat dari gambar untuk anda.</p>
        </header>

        <main class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Image Upload and Preview Section (No changes here) -->
                <div class="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border-2 border-dashed border-gray-300 dark:border-gray-600">
                    <div id="image-preview-container" class="w-full h-64 flex items-center justify-center relative">
                        <img id="image-preview" src="" alt="Pratonton Imej" class="hidden max-h-full max-w-full rounded-md object-contain">
                        <div id="upload-placeholder" class="text-center text-gray-500 dark:text-gray-400">
                            <svg class="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                            <p class="mt-2">Pilih fail imej</p>
                            <p class="text-xs">PNG, JPG, GIF sehingga 10MB</p>
                        </div>
                    </div>
                    <input type="file" id="image-upload" class="hidden" accept="image/*">
                    <button id="upload-button" class="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-colors duration-200">
                        Pilih Imej
                    </button>
                </div>

                <!-- NEW: Structured Data Display Section -->
                <div class="flex flex-col">
                    <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Maklumat Diekstrak:</h2>
                    <div id="result-container" class="relative flex-grow bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                        <!-- Loader remains the same -->
                        <div id="loader" class="absolute inset-0 bg-gray-50 dark:bg-gray-700 bg-opacity-80 dark:bg-opacity-80 flex items-center justify-center hidden rounded-lg">
                            <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
                            <p class="ml-4 text-gray-600 dark:text-gray-300">Memahami maklumat...</p>
                        </div>

                        <!-- Wrapper for data and placeholder -->
                        <div id="structured-data-wrapper">
                            <!-- Initially show a placeholder message -->
                            <div id="results-placeholder" class="text-center text-gray-500 dark:text-gray-400">
                                <p>Maklumat yang diekstrak akan dipaparkan di sini.</p>
                                <p class="text-sm mt-2">Sila muat naik imej untuk memulakan.</p>
                            </div>
                            
                            <!-- This container is hidden initially and shown when data is available -->
                            <div id="structured-data-container" class="hidden space-y-3">
                                <div class="grid grid-cols-3 gap-4 items-start">
                                    <label class="font-medium text-gray-700 dark:text-gray-300 col-span-1 pt-2">Nama</label>
                                    <p id="data-nama" class="col-span-2 p-2 bg-white dark:bg-gray-800 rounded-md shadow-sm min-h-[40px]">-</p>
                                </div>
                                <div class="grid grid-cols-3 gap-4 items-start">
                                    <label class="font-medium text-gray-700 dark:text-gray-300 col-span-1 pt-2">No. K.P</label>
                                    <p id="data-nokp" class="col-span-2 p-2 bg-white dark:bg-gray-800 rounded-md shadow-sm min-h-[40px]">-</p>
                                </div>
                                <div class="grid grid-cols-3 gap-4 items-start">
                                    <label class="font-medium text-gray-700 dark:text-gray-300 col-span-1 pt-2">Umur</label>
                                    <p id="data-umur" class="col-span-2 p-2 bg-white dark:bg-gray-800 rounded-md shadow-sm min-h-[40px]">-</p>
                                </div>
                                <div class="grid grid-cols-3 gap-4 items-start">
                                    <label class="font-medium text-gray-700 dark:text-gray-300 col-span-1 pt-2">Tarikh</label>
                                    <p id="data-tarikh" class="col-span-2 p-2 bg-white dark:bg-gray-800 rounded-md shadow-sm min-h-[40px]">-</p>
                                </div>
                                <div class="grid grid-cols-3 gap-4 items-start">
                                    <label class="font-medium text-gray-700 dark:text-gray-300 col-span-1 pt-2">Penyakit</label>
                                    <p id="data-penyakit" class="col-span-2 p-2 bg-white dark:bg-gray-800 rounded-md shadow-sm min-h-[40px]">-</p>
                                </div>
                                <div class="grid grid-cols-3 gap-4 items-start">
                                    <label class="font-medium text-gray-700 dark:text-gray-300 col-span-1 pt-2">Rx</label>
                                    <p id="data-rx" class="whitespace-pre-wrap col-span-2 p-2 bg-white dark:bg-gray-800 rounded-md shadow-sm min-h-[80px]">-</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
             <div class="text-center mt-8">
                 <button id="extract-button" class="w-full md:w-auto px-8 py-3 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none" disabled>
                    Faham & Ekstrak
                </button>
            </div>
        </main>

        <footer class="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
            <p>Dikuasakan oleh Dr Aizat</p>
        </footer>
    </div>

    <!-- PENTING: Link ke fail JavaScript, pastikan type="module" dikekalkan -->
    <script type="module" src="script.js"></script>
</body>
</html>


## style.css

/* Sets the default font for the entire application to 'Inter' for a clean and modern look. */
body {
    font-family: 'Inter', sans-serif;
}

/* Styles for the loading spinner. */
.loader {
    /* Sets the color of the top border of the spinner, which is the part that moves. */
    border-top-color: #3498db; 
    
    /* Defines the animation properties: name (spin), duration (1s), timing function (linear), and iteration count (infinite). */
    -webkit-animation: spin 1s linear infinite;
    animation: spin 1s linear infinite;
}

/* Defines the 'spin' animation for WebKit browsers (like Safari). */
@-webkit-keyframes spin {
    /* The starting point of the animation: no rotation. */
    0% { -webkit-transform: rotate(0deg); }
    
    /* The ending point of the animation: a full 360-degree rotation. */
    100% { -webkit-transform: rotate(360deg); }
}

/* Defines the standard 'spin' animation for all other modern browsers. */
@keyframes spin {
    /* The starting point of the animation: no rotation. */
    0% { transform: rotate(0deg); }
    
    /* The ending point of the animation: a full 360-degree rotation. */
    100% { transform: rotate(360deg); }
}


## script.js

/**
 * script.js
 * Fail ini adalah titik permulaan (entry point) yang dimuatkan oleh index.html.
 * Satu-satunya tujuannya adalah untuk mengimport modul 'main.js',
 * yang seterusnya akan memulakan dan menyelaraskan keseluruhan aplikasi.
 */

// Import modul utama untuk memulakan aplikasi.
import './main.js';


## ui.js

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


## main.js

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


## apiservice.js

/**
 * apiService.js
 * Modul ini bertanggungjawab untuk semua komunikasi dengan API luaran (Gemini API).
 * Ia kini dikonfigurasikan untuk meminta data berstruktur dalam format JSON.
 */

// Kunci API anda.
const USER_API_KEY = "AIzaSyApKCHEqVP7Q-81-Q4ydAiqEvQDHJhGuOs";

// URL asas untuk API.
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=`;

/**
 * Memanggil Gemini API untuk menganalisis imej, memahami kandungannya, dan memulangkan
 * maklumat yang diekstrak dalam format objek JSON yang berstruktur.
 * @param {string} imageBase64 - Rentetan base64 bagi imej untuk diproses.
 * @param {string} mimeType - Jenis MIME bagi imej (cth., 'image/jpeg').
 * @returns {Promise<Object>} - Janji yang selesai dengan objek yang mengandungi data berstruktur.
 * @throws {Error} - Melontarkan ralat jika panggilan API gagal atau jika tiada teks ditemui.
 */
export async function getStructuredDataFromApi(imageBase64, mimeType) {
    if (USER_API_KEY === "PASTE_YOUR_API_KEY_HERE" || !USER_API_KEY) {
        throw new Error("Sila masukkan kunci API anda di dalam fail apiService.js.");
    }

    // Arahan baru yang lebih pintar untuk AI.
    const prompt = `
        From the text in this image, identify the following details:
        1.  Patient's Name (Nama)
        2.  Identification Card Number (No. K.P)
        3.  Age (Umur)
        4.  Date (Tarikh)
        5.  Diagnosis or Illness (Penyakit)
        6.  Prescription or Rx (Rx)
        
        If a piece of information is not found, leave the value as an empty string ("").
        Return the information in a valid JSON object.
    `;

    // Bina payload dengan konfigurasi baru untuk meminta output JSON.
    const payload = {
        contents: [{
            parts: [
                { text: prompt },
                {
                    inlineData: {
                        mimeType: mimeType,
                        data: imageBase64
                    }
                }
            ]
        }],
        generationConfig: {
            // Memaksa output menjadi JSON.
            responseMimeType: "application/json",
            // Mendefinisikan struktur JSON yang kita mahu.
            responseSchema: {
                type: "OBJECT",
                properties: {
                    nama: { type: "STRING" },
                    no_kp: { type: "STRING" },
                    umur: { type: "STRING" },
                    tarikh: { type: "STRING" },
                    penyakit: { type: "STRING" },
                    rx: { type: "STRING" },
                },
                required: ["nama", "no_kp", "umur", "tarikh", "penyakit", "rx"]
            }
        }
    };

    try {
        const response = await fetch(`${API_URL}${USER_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Permintaan API gagal dengan status ${response.status}: ${errorBody}`);
        }

        const result = await response.json();
        const jsonText = result.candidates?.[0]?.content?.parts?.[0]?.text;

        if (jsonText) {
            // AI memulangkan teks JSON, kita perlu mem-parse-nya menjadi objek JavaScript.
            return JSON.parse(jsonText);
        } else {
            const blockReason = result.promptFeedback?.blockReason;
            const errorMessage = blockReason
                ? `Gagal mengekstrak data. Sebab: ${blockReason}`
                : "Gagal mengekstrak data. Respons tidak dijangka diterima daripada API.";
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Ralat semasa pengekstrakan data berstruktur:', error);
        throw error;
    }
}


