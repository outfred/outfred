/**
 * Utility function to copy text to clipboard
 * Falls back to legacy method if Clipboard API is not available or blocked
 * Works in all environments including iframes and restricted contexts
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!text) {
    console.warn('Cannot copy empty text');
    return false;
  }

  // Try modern Clipboard API first (only if available and not blocked)
  if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      console.log('✅ Text copied using Clipboard API');
      return true;
    } catch (err) {
      console.log('⚠️ Clipboard API blocked or failed, using fallback method');
      // Fall through to legacy method
    }
  }

  // Fallback to legacy method using document.execCommand
  // This works in most environments including those with restricted Clipboard API
  try {
    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = text;
    
    // Make it invisible but ensure it's in the viewport for iOS
    textarea.style.position = 'fixed';
    textarea.style.top = '0';
    textarea.style.left = '0';
    textarea.style.width = '2em';
    textarea.style.height = '2em';
    textarea.style.padding = '0';
    textarea.style.border = 'none';
    textarea.style.outline = 'none';
    textarea.style.boxShadow = 'none';
    textarea.style.background = 'transparent';
    textarea.style.opacity = '0';
    textarea.setAttribute('readonly', '');
    textarea.setAttribute('aria-hidden', 'true');
    textarea.setAttribute('tabindex', '-1');
    
    // Add to DOM
    document.body.appendChild(textarea);
    
    // Focus and select the text
    textarea.focus();
    textarea.select();
    
    // For iOS compatibility
    textarea.setSelectionRange(0, text.length);
    
    // Copy to clipboard using execCommand
    const successful = document.execCommand('copy');
    
    // Clean up - remove the temporary element
    document.body.removeChild(textarea);
    
    if (successful) {
      console.log('✅ Text copied using legacy execCommand method');
      return true;
    } else {
      console.error('❌ execCommand copy failed');
      return false;
    }
  } catch (err) {
    console.error('❌ Failed to copy text to clipboard:', err);
    return false;
  }
}

/**
 * Check if clipboard operations are supported
 */
export function isClipboardSupported(): boolean {
  return (
    (typeof navigator !== 'undefined' && 
     navigator.clipboard && 
     typeof navigator.clipboard.writeText === 'function') ||
    (typeof document !== 'undefined' && 
     typeof document.execCommand === 'function')
  );
}
