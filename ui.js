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
