/**
 * apiService.js
 * Fail ini tidak lagi memanggil Google Gemini API secara terus.
 * Sebaliknya, ia membuat panggilan selamat ke Google Apps Script anda,
 * yang bertindak sebagai proksi (orang tengah).
 * KUNCI API TELAH DIPADAMKAN DARI SINI.
 */

// URL Aplikasi Web yang sama digunakan untuk semua tindakan.
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyiSRpAF87Gj6Q0tRLHzcrJA7lBdTb8WyWdeTb23rYR9at3KiahrdgZHrCxLk-hfLc/exec";

/**
 * Meminta data berstruktur dari backend Google Apps Script.
 * @param {string} imageBase64 - Rentetan base64 bagi imej.
 * @param {string} mimeType - Jenis MIME bagi imej.
 * @returns {Promise<Object>} - Janji yang selesai dengan objek data berstruktur.
 */
export async function getStructuredDataFromApi(imageBase64, mimeType) {

  // Bina payload untuk dihantar ke Apps Script.
  const payload = {
    action: 'extract', // Beritahu backend kita mahu ekstrak data.
    imageData: {
      base64: imageBase64,
      mimeType: mimeType
    }
  };

  try {
    const response = await fetch(WEB_APP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Ralat rangkaian semasa menghubungi backend: ${response.status}`);
    }

    const result = await response.json();

    if (result.status === 'error') {
      // Jika Apps Script itu sendiri melaporkan ralat.
      throw new Error(result.message);
    }

    // Kembalikan data yang berada di dalam 'data' properti.
    return result.data;

  } catch (error) {
    console.error("Gagal mendapatkan data dari backend:", error);
    throw error;
  }
}
