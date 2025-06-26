/**
 * googleSheetService.js
 * Modul ini kini menghantar data ke backend Google Apps Script yang sama.
 */

// URL Aplikasi Web yang sama digunakan untuk semua tindakan.
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyiSRpAF87Gj6Q0tRLHzcrJA7lBdTb8WyWdeTb23rYR9at3KiahrdgZHrCxLk-hfLc/exec";

/**
 * Menghantar objek data untuk disimpan melalui backend Google Apps Script.
 * @param {Object} dataToSave - Objek JavaScript yang mengandungi maklumat.
 * @returns {Promise<Object>} - Janji yang selesai dengan respons dari skrip.
 */
export async function saveDataToSheet(dataToSave) {
  if (!dataToSave) {
    throw new Error("Tiada data untuk disimpan.");
  }

  // Bina payload untuk dihantar ke Apps Script.
  const payload = {
    action: 'save', // Beritahu backend kita mahu simpan data.
    data: dataToSave
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
      throw new Error(`Ralat rangkaian: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();

    if (result.status === 'error') {
      throw new Error(`Ralat dari Google Sheet: ${result.message}`);
    }

    return result;

  } catch (error) {
    console.error("Gagal menghantar data ke Google Sheet:", error);
    throw error;
  }
}
