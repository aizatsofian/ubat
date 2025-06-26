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
