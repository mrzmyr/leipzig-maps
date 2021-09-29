import Modal from 'react-bootstrap/Modal';

const CreditsModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Credits / Source
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul>
          <li><a href="https://www.openstreetmap.org/copyright/en">© OpenStreetMap contributors</a><br /></li>
          <li><a href="https://www.maptiler.com/copyright/">&copy; MapTiler</a></li>
          <li><a href="https://www.cyclosm.org">&copy; cyclosm</a></li>
          <li><a href="https://github.com/mrzmyr/leipzig-maps">GitHub Source Code</a><br /></li>
        </ul>
      </Modal.Body>
    </Modal>
  );
}

export default CreditsModal;