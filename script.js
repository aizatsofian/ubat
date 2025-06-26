// --- DOM Element Selection ---
// Get references to all the necessary elements from the HTML to manipulate them with JavaScript.
const imageUpload = document.getElementById('image-upload');
const uploadButton = document.getElementById('upload-button');
const extractButton = document.getElementById('extract-button');
const imagePreview = document.getElementById('image-preview');
const uploadPlaceholder = document.getElementById('upload-placeholder');
const extractedText = document.getElementById('extracted-text');
const loader = document.getElementById('loader');
const copyButton = document.getElementById('copy-button');
const copySuccess = document.getElementById('copy-success');

// A variable to store the base64 representation of the uploaded image.
let imageBase64 = null;

// --- Event Listeners ---
// Assign functions to be called when specific events occur.
uploadButton.addEventListener('click', () => imageUpload.click()); // Triggers the file input when the button is clicked.
imageUpload.addEventListener('change', handleImageUpload); // Called when a user selects a file.
extractButton.addEventListener('click', handleExtractText); // Called when the "Extract Text" button is clicked.
copyButton.addEventListener('click', handleCopyText); // Called when the copy button is clicked.

/**
 * Handles the image file selection. It reads the selected file, converts it to a
 * Base64 string, displays a preview, and enables the extract button.
 * @param {Event} event - The file input change event.
 */
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            // Display the image preview.
            imagePreview.src = e.target.result;
            imagePreview.classList.remove('hidden');
            uploadPlaceholder.classList.add('hidden');
            
            // Enable the extract button as an image is now ready.
            extractButton.disabled = false;
            
            // Store the base64 string, removing the data URL prefix (e.g., "data:image/jpeg;base64,").
            imageBase64 = e.target.result.split(',')[1];
            
            // Reset the text area to its initial state.
            extractedText.textContent = 'Imej sedia untuk diekstrak.';
            copyButton.classList.add('hidden');
        };
        // Read the image file as a Data URL (which is a base64 string).
        reader.readAsDataURL(file);
    }
}

/**
 * Calls the Gemini API to extract text from the uploaded image.
 * Manages the UI loading state during the API call.
 */
async function handleExtractText() {
    if (!imageBase64) {
        extractedText.textContent = 'Sila muat naik imej dahulu.';
        return;
    }

    // Show the loader and disable buttons to prevent multiple submissions.
    setLoading(true);

    const prompt = "Extract any and all text from this image. Provide only the text content, without any additional comments or explanations.";

    // Construct the payload for the Gemini API.
    const payload = {
        contents: [{
            parts: [
                { text: prompt },
                {
                    inlineData: {
                        mimeType: "image/jpeg", // The API can handle various image types here.
                        data: imageBase64
                    }
                }
            ]
        }],
        generationConfig: {
            temperature: 0.2, // Lower temperature for more deterministic, less creative output.
        }
    };
    
    try {
        const apiKey = ""; // The API key is handled by the execution environment.
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
             const errorText = await response.text();
             throw new Error(`API request failed with status ${response.status}: ${errorText}`);
        }

        const result = await response.json();
        
        // Check if the response has the expected structure and content.
        if (result.candidates && result.candidates[0]?.content?.parts[0]) {
            const text = result.candidates[0].content.parts[0].text;
            extractedText.textContent = text.trim();
            copyButton.classList.remove('hidden');
        } else {
            // Handle cases where the response structure is unexpected or content is missing/blocked.
            console.error("Unexpected API response structure:", result);
            let errorMessage = "Gagal mengekstrak teks. Respons tidak dijangka diterima.";
            if (result.promptFeedback?.blockReason) {
                errorMessage += ` Sebab: ${result.promptFeedback.blockReason}`;
            }
            extractedText.textContent = errorMessage;
            copyButton.classList.add('hidden');
        }

    } catch (error) {
        console.error('Error during text extraction:', error);
        extractedText.textContent = `Berlaku ralat: ${error.message}. Sila cuba lagi.`;
        copyButton.classList.add('hidden');
    } finally {
        // Hide the loader and re-enable the buttons.
        setLoading(false);
    }
}

/**
 * Copies the extracted text from the result area to the user's clipboard.
 */
function handleCopyText() {
    const textToCopy = extractedText.textContent;
    
    // Use a temporary textarea element to reliably copy text to the clipboard.
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = textToCopy;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    
    try {
        document.execCommand('copy');
        // Show a "Copied!" message for 2 seconds.
        copySuccess.classList.remove('hidden');
        setTimeout(() => {
            copySuccess.classList.add('hidden');
        }, 2000);
    } catch (err) {
        console.error('Gagal menyalin teks: ', err);
        // Fallback for the user if execCommand fails.
        alert("Gagal menyalin. Sila cuba secara manual.");
    }
    
    document.body.removeChild(tempTextArea);
}

/**
 * Toggles the loading state of the UI.
 * @param {boolean} isLoading - Whether to show the loader or not.
 */
function setLoading(isLoading) {
    loader.classList.toggle('hidden', !isLoading);
    extractButton.disabled = isLoading;
    uploadButton.disabled = isLoading;
    extractButton.classList.toggle('cursor-not-allowed', isLoading);
}
