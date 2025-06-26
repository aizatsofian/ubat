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
