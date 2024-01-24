import React, { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { extractDOI, fetchDoi } from '../utils/utils.ts';

const formID = 'form';

export function PublicationModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleShow}>
        Add Publication
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Publication</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={yup.object().shape({
              doiOrUrl: yup
                .string()
                .matches(/^10\.\d{4,9}\/[-._;()/:a-zA-Z0-9]+$/)
                .required(),
            })}
            initialValues={{
              doiOrUrl: '',
            }}
            onSubmit={async ({ doiOrUrl }) => {
              const doi = extractDOI(doiOrUrl);
              console.log(await fetchDoi(doi));
            }}
          >
            {({ handleChange, handleSubmit, values, touched, errors }) => (
              <Form id={formID} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="validationDoiOrUrl">
                  <Form.Label>DOI or DOI URL</Form.Label>
                  <Form.Control
                    type="text"
                    name="doiOrUrl"
                    placeholder="Enter DOI or URL"
                    value={values.doiOrUrl}
                    onChange={handleChange}
                    isInvalid={!!errors.doiOrUrl}
                    autoFocus
                  />
                  <Form.Control.Feedback type="invalid">{errors.doiOrUrl}</Form.Control.Feedback>
                </Form.Group>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" variant="contained" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary" form={formID}>
            Search
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
