import AppError from "./AppError";
import { Modal } from "react-bootstrap";
import AppFileInput from "./AppFileInput";
import AppInput from "./AppInput";
import { useState } from "react";

import PropTypes from "prop-types";

export default function TeamLogo({ errors }) {
  const team = false;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const logoSelected = (file) => {
    // handle file selection
    console.log("Logo selected", file);
  };

  const handleLogoUrlChange = (event) => {
    // updateTeam({ logo_url: event.target.value });
    console.log("Handle logo url change", event);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  return (
    <div>
      {team ? (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
        <img
          onClick={openModal}
          src=""
          alt=""
          className="pointer"
          style={{ width: "100%", maxWidth: "200px" }}
        />
      ) : (
        <button className="btn btn-sm" onClick={openModal}>
          <i className="material-icons material-icons-round md-36">
            file_upload
          </i>
        </button>
      )}
      <AppError errors={errors} field="logo_url" />
      <Modal
        show={isModalOpen}
        onHide={() => setIsModalOpen(false)}
        centered
        size="sm"
        contentClassName="bg-base dp--24 text-center"
      >
        <Modal.Header closeButton style={{ fontSize: "0.65rem" }}>
          <Modal.Title style={{ fontSize: "1.25rem" }}>Choose Logo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AppFileInput
            accept="image/*"
            onSelected={logoSelected}
            outputType="base64"
            className="mb-4"
          />
          or
          <AppInput
            value={team.logo_url}
            className="mt-4"
            onChange={handleLogoUrlChange}
            label="Insert image web url"
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

TeamLogo.propTypes = {
  errors: PropTypes.object.isRequired,
};
