/**
 * MergePDFFilesFree - Contact Form AJAX Handler
 * Submits contact form data to send-mail.php via fetch API.
 */
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Send Message';
  const statusDiv = document.getElementById('contact-status');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const subject = document.getElementById('subject')?.value.trim();
    const message = document.getElementById('message')?.value.trim();

    if (!name || !email || !message) {
      showStatus('Please fill in all required fields.', 'error');
      return;
    }

    // Set loading state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="inline-flex items-center"><svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg> Sending...</span>';
    }

    // Resolve endpoint path (support both root and localized subdirectories)
    const endpoint = window.location.pathname.includes('/') && !window.location.pathname.endsWith('/contact.html') && window.location.pathname.split('/').filter(Boolean).length > 1
      ? '../send-mail.php'
      : (document.querySelector('base') ? 'send-mail.php' : '/send-mail.php');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ name, email, subject, message })
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data && data.success) {
        showStatus('✅ Thank you! Your message has been received. Our team will follow up via email shortly.', 'success');
        form.reset();
      } else {
        const errorMsg = data && data.error ? data.error : 'Failed to send message. Please try again or email hello@mergepdffilesfree.com directly.';
        showStatus('⚠️ ' + errorMsg, 'error');
      }
    } catch (err) {
      showStatus('⚠️ Connection error. Please try again or email hello@mergepdffilesfree.com directly.', 'error');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    }
  });

  function showStatus(msg, type) {
    if (!statusDiv) return;
    statusDiv.classList.remove('hidden');
    if (type === 'success') {
      statusDiv.className = 'mt-4 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-medium';
    } else {
      statusDiv.className = 'mt-4 p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-medium';
    }
    statusDiv.innerHTML = msg;
  }
});
