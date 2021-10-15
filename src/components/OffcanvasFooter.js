import { useState } from "react";
import Button from "react-bootstrap/Button";
import CreditsModal from "./CreditsModal";

const OffcanvasFooter = () => {
  const [showCreditsModal, setShowCreditsModal] = useState(false);
  
  return (
    <div style={{ fontSize: 12 }}>
    <Button 
      style={{ textDecoration: 'none' }}
      variant="link" 
      size="sm" 
      onClick={() => setShowCreditsModal(true)}
    >Copyright &amp; Daten</Button>
    <br />
    <Button 
      style={{ textDecoration: 'none' }}
      variant="link" 
      size="sm" 
      onClick={() => window.open('https://twitter.com/mrzmyr')}
    >🧑🏻‍💻 mrzmyr</Button>
    <br />
    <CreditsModal 
      show={showCreditsModal}
      onHide={() => setShowCreditsModal(false)}
    />
  </div>
  )
}

export default OffcanvasFooter;
