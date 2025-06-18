document.addEventListener('DOMContentLoaded', () => {
  const highlights = document.querySelectorAll('div.highlight'); // Common wrapper by Jekyll/Rouge

  highlights.forEach((highlightDiv) => {
    const preTag = highlightDiv.querySelector('pre');
    if (!preTag) return; // Should not happen if structure is as expected

    const codeBlock = preTag.querySelector('code');
    if (!codeBlock) return;

    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';

    const button = document.createElement('button');
    button.className = 'copy-code-button';
    button.type = 'button';
    button.innerText = 'Copy';
    button.setAttribute('aria-label', 'Copy code to clipboard');

    // Style button (can be moved to CSS)
    button.style.position = 'absolute';
    button.style.top = '0.5em';
    button.style.right = '0.5em';
    button.style.padding = '0.25em 0.5em';
    button.style.fontSize = '0.8em';
    button.style.backgroundColor = '#eee';
    button.style.border = '1px solid #ccc';
    button.style.borderRadius = '3px';
    button.style.cursor = 'pointer';
    button.style.opacity = '0.7'; // Initially a bit transparent

    highlightDiv.parentNode.insertBefore(wrapper, highlightDiv);
    wrapper.appendChild(highlightDiv); // Move the original highlight div into the wrapper
    wrapper.appendChild(button);     // Add button to the new wrapper

    button.addEventListener('mouseenter', () => {
        button.style.opacity = '1';
    });
    button.addEventListener('mouseleave', () => {
        button.style.opacity = '0.7';
    });

    button.addEventListener('click', () => {
      navigator.clipboard.writeText(codeBlock.innerText).then(() => {
        button.innerText = 'Copied!';
        button.disabled = true;
        setTimeout(() => {
          button.innerText = 'Copy';
          button.disabled = false;
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
        button.innerText = 'Error';
        setTimeout(() => {
          button.innerText = 'Copy';
        }, 2000);
      });
    });
  });
});
