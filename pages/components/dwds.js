import { useState } from 'react';
import { FiCopy } from 'react-icons/fi';  // You can use react-icons for the copy symbol

export default function CopyMobileNumber() {
  const [isCopied, setIsCopied] = useState(false);
  const mobileNumber = '+1 234 567 890';

  // Handle copying the mobile number to the clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(mobileNumber);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div>
      <span>{mobileNumber}</span>
      <button onClick={copyToClipboard} style={{ marginLeft: '8px', cursor: 'pointer' }}>
        <FiCopy />
      </button>
      {isCopied && <span style={{ marginLeft: '10px', color: 'green' }}>Copied!</span>}
    </div>
  );
}
