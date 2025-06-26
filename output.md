
## index.html

<!DOCTYPE html>
<html lang="ms">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pengekstrak Teks Gambar</title>
    
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
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Pengekstrak Teks Gambar</h1>
            <p class="text-md text-gray-600 dark:text-gray-400 mt-2">Muat naik imej untuk mengekstrak teks di dalamnya menggunakan AI.</p>
        </header>

        <main class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Image Upload and Preview Section -->
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

                <!-- Extracted Text Section -->
                <div class="flex flex-col">
                    <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Teks yang Diekstrak:</h2>
                    <div id="result-container" class="relative flex-grow bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                        <div id="loader" class="absolute inset-0 bg-gray-50 dark:bg-gray-700 bg-opacity-80 dark:bg-opacity-80 flex items-center justify-center hidden rounded-lg">
                            <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
                            <p class="ml-4 text-gray-600 dark:text-gray-300">Mengekstrak teks...</p>
                        </div>
                        <div id="extracted-text" class="w-full h-full min-h-[200px] whitespace-pre-wrap overflow-y-auto text-gray-700 dark:text-gray-300">Sila muat naik imej untuk memulakan.</div>
                        <button id="copy-button" class="absolute top-2 right-2 p-2 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 hidden" title="Salin ke Papan Klip">
                            <svg class="w-5 h-5 text-gray-600 dark:text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                            </svg>
                        </button>
                         <div id="copy-success" class="absolute bottom-2 right-2 px-3 py-1 bg-green-500 text-white text-sm rounded-md hidden">
                            Disalin!
                        </div>
                    </div>
                </div>
            </div>
             <div class="text-center mt-8">
                 <button id="extract-button" class="w-full md:w-auto px-8 py-3 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none" disabled>
                    Ekstrak Teks
                </button>
            </div>
        </main>

        <footer class="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
            <p>Dikuasakan oleh Gemini</p>
        </footer>
    </div>

    <!-- Link to the external JavaScript file -->
    <script src="script.js"></script>
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
 * Ia tidak mengandungi logik perniagaan atau panggilan API.
 */

// Objek untuk memegang semua rujukan elemen DOM untuk akses yang mudah dan teratur.
export const elements = {
    imageUpload: document.getElementById('image-upload'),
    uploadButton: document.getElementById('upload-button'),
    extractButton: document.getElementById('extract-button'),
    imagePreview: document.getElementById('image-preview'),
    uploadPlaceholder: document.getElementById('upload-placeholder'),
    extractedText: document.getElementById('extracted-text'),
    loader: document.getElementById('loader'),
    copyButton: document.getElementById('copy-button'),
    copySuccess: document.getElementById('copy-success'),
};

/**
 * Memaparkan pratonton imej yang dipilih oleh pengguna.
 * @param {File} file - Fail imej yang dipilih oleh pengguna.
 * @param {function(string): void} callback - Fungsi panggil balik yang akan dilaksanakan selepas imej dibaca,
 * mengembalikan rentetan base64 imej tersebut.
 */
export function displayImagePreview(file, callback) {
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            // Paparkan imej dalam elemen pratonton.
            elements.imagePreview.src = e.target.result;
            elements.imagePreview.classList.remove('hidden');
            elements.uploadPlaceholder.classList.add('hidden');
            
            // Dayakan butang ekstrak.
            elements.extractButton.disabled = false;
            
            // Pulangkan rentetan base64 melalui panggil balik.
            const imageBase64 = e.target.result.split(',')[1];
            callback(imageBase64);
        };
        reader.readAsDataURL(file);
    }
}

/**
 * Mengemas kini kawasan teks dengan hasil yang diekstrak.
 * @param {string} text - Teks untuk dipaparkan.
 */
export function updateExtractedText(text) {
    elements.extractedText.textContent = text;
    // Tunjukkan butang salin jika ada teks untuk disalin.
    elements.copyButton.classList.toggle('hidden', !text);
}


/**
 * Mengendalikan logik untuk menyalin teks ke papan klip.
 */
export function copyTextToClipboard() {
    const textToCopy = elements.extractedText.textContent;
    
    // Gunakan navigator.clipboard untuk kaedah moden dan selamat.
    navigator.clipboard.writeText(textToCopy).then(() => {
        // Tunjukkan mesej kejayaan.
        elements.copySuccess.classList.remove('hidden');
        setTimeout(() => {
            elements.copySuccess.classList.add('hidden');
        }, 2000);
    }).catch(err => {
        console.error('Gagal menyalin teks: ', err);
        alert("Gagal menyalin. Sila cuba secara manual.");
    });
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
    elements.imagePreview.src = '';
    elements.imagePreview.classList.add('hidden');
    elements.uploadPlaceholder.classList.remove('hidden');
    updateExtractedText('Sila muat naik imej untuk memulakan.');
    elements.extractButton.disabled = true;
}


## main.js

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


## apiservice.js

/**
 * apiService.js
 * Modul ini bertanggungjawab untuk semua komunikasi dengan API luaran (Gemini API).
 */

// --- PENTING: KEMAS KINI DI SINI ---
// Gantikan "PASTE_YOUR_API_KEY_HERE" dengan kunci API Google AI anda sendiri.
// Anda boleh mendapatkannya secara percuma dari Google AI Studio: https://aistudio.google.com/app/apikey
const USER_API_KEY = "AIzaSyApKCHEqVP7Q-81-Q4ydAiqEvQDHJhGuOs";

// URL asas untuk API. Kunci akan ditambah kemudian.
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=`;

/**
 * Memanggil Gemini API untuk mengekstrak teks daripada imej yang disediakan.
 * @param {string} imageBase64 - Rentetan base64 bagi imej untuk diproses.
 * @returns {Promise<string>} - Janji yang selesai dengan teks yang diekstrak.
 * @throws {Error} - Melontarkan ralat jika panggilan API gagal atau jika tiada teks ditemui.
 */
export async function getTextFromApi(imageBase64) {
    // Semakan untuk memastikan pengguna telah memasukkan kunci API mereka.
    if (USER_API_KEY === "PASTE_YOUR_API_KEY_HERE" || !USER_API_KEY) {
        throw new Error("Sila masukkan kunci API anda di dalam fail apiService.js.");
    }

    const prompt = "Extract any and all text from this image. Provide only the text content, without any additional comments or explanations.";

    // Bina payload untuk permintaan API.
    const payload = {
        contents: [{
            parts: [
                { text: prompt },
                {
                    inlineData: {
                        mimeType: "image/jpeg",
                        data: imageBase64
                    }
                }
            ]
        }],
        generationConfig: {
            temperature: 0.2,
        }
    };

    try {
        // Buat panggilan fetch menggunakan kunci API pengguna.
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
        const text = result.candidates?.[0]?.content?.parts?.[0]?.text;

        if (text) {
            return text.trim();
        } else {
            const blockReason = result.promptFeedback?.blockReason;
            const errorMessage = blockReason
                ? `Gagal mengekstrak teks. Sebab: ${blockReason}`
                : "Gagal mengekstrak teks. Respons tidak dijangka diterima daripada API.";
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Ralat semasa pengekstrakan teks:', error);
        throw error;
    }
}


