// cryptoUtils.js

// Function to encrypt text using XOR encryption and Base64 encoding
export function et(originalText) {
    const binaryData = new TextEncoder().encode(originalText);
    const encryptedData = binaryData.map(byte => byte ^ 255); // XOR each byte with 255
    const base64EncodedText = btoa(String.fromCharCode.apply(null, encryptedData));
    
    // Replace Base64 characters to avoid issues with URL encoding
    const replacedBase64 = base64EncodedText.replace(/\+/g, '*').replace(/\//g, '-');
    const encryptedText = encodeURIComponent(replacedBase64); // URL encode the final encrypted string
    
    return encryptedText;
  }
  
  // Function to decrypt the encrypted text
  export function dt(encryptedText) {
    const decodedText = decodeURIComponent(encryptedText);
    const restoredBase64 = decodedText.replace(/\*/g, '+').replace(/-/g, '/');
    const base64DecodedText = atob(restoredBase64);
  
    // Convert Base64 decoded string back to binary data
    const encryptedData = new Uint8Array(base64DecodedText.length);
    for (let i = 0; i < base64DecodedText.length; i++) {
      encryptedData[i] = base64DecodedText.charCodeAt(i);
    }
  
    // XOR decryption (XOR with 255 again)
    const decryptedData = encryptedData.map(byte => byte ^ 255);
    const originalText = new TextDecoder().decode(decryptedData);
  
    return originalText;
  }
  
  // Function to prepare encrypted object (eot stands for encrypt object)
  export function eot(data) {
    return {
      encData: et(JSON.stringify(data)), // Encrypt JSON stringified data
    };
  }
  
  // Function to decrypt object (dot stands for decrypt object)
  export function dot(data) {
    try {
      const decData = dt(data.encData); // Decrypt the encData field
      return JSON.parse(decData); // Parse the decrypted data back to original object
    } catch (error) {
      console.error("dot error:", error);
      return {}; // Return an empty object on decryption failure
    }
  }
  