/**
 * googleSheetService.js
 * Modul ini bertanggungjawab untuk menghantar data ke Google Apps Script Web App.
 */

// URL Aplikasi Web yang anda dapat selepas menerbitkan Google Apps Script.
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyiSRpAF87Gj6Q0tRLHzcrJA7lBdTb8WyWdeTb23rYR9at3KiahrdgZHrCxLk-hfLc/exec";

/**
 * Menghantar objek data yang telah diekstrak ke Google Sheet melalui Google Apps Script.
 * @param {Object} data - Objek JavaScript yang mengandungi maklumat (nama, no_kp, dll.).
 * @returns {Promise<Object>} - Janji yang selesai dengan respons dari skrip.
 * @throws {Error} - Melontarkan ralat jika penghantaran gagal.
 */
export async function saveDataToSheet(data) {
    if (!data) {
        throw new Error("Tiada data untuk disimpan.");
    }

    try {
        // Guna fetch() untuk membuat permintaan POST ke URL Aplikasi Web anda.
        const response = await fetch(WEB_APP_URL, {
            method: 'POST',
            // Walaupun Apps Script boleh mengendalikan permintaan tanpa header ini, 
            // adalah amalan baik untuk menghantar data sebagai teks biasa. 
            // Skrip akan mem-parse-nya.
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify(data) // Tukar objek data kepada rentetan JSON.
        });

        if (!response.ok) {
            // Urus ralat rangkaian atau pelayan.
            throw new Error(`Ralat rangkaian: ${response.status} ${response.statusText}`);
        }

        // Dapatkan respons dari Apps Script.
        const result = await response.json();

        // Semak jika skrip itu sendiri melaporkan ralat.
        if (result.status === 'error') {
            throw new Error(`Ralat dari Google Sheet: ${result.message}`);
        }

        return result; // Pulangkan objek kejayaan (cth., {status: "success", ...})

    } catch (error) {
        console.error("Gagal menghantar data ke Google Sheet:", error);
        // Lontarkan semula ralat supaya fail lain boleh menguruskannya.
        throw error;
    }
}
