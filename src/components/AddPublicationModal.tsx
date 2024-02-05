import React, { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { extractDOI, fetchDoi } from '../utils/utils.ts';

const formID = 'form';

export function AddPublicationModal() {
  const [show, setShow] = useState(false);
  const [manual, setManual] = useState(false);

  const handleClose: () => void = () => {
    setShow(false);
    setManual(false);
  };
  const handleShow: () => void = () => setShow(true);

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleShow}>
        Add Publication
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Publication</Modal.Title>
        </Modal.Header>
        {manual ? (
          <ManualForm handleClose={handleClose} setManual={setManual} />
        ) : (
          <SearchDoiForm setManual={setManual} />
        )}
      </Modal>
    </>
  );
}

const SearchDoiForm = ({ setManual }: { setManual: (manual: boolean) => void }) => {
  return (
    <>
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
          onSubmit={async ({ doiOrUrl }, { setSubmitting, setErrors }) => {
            const doi = extractDOI(doiOrUrl);

            const data = await fetchDoi(doi);

            if (!data) {
              setErrors({ doiOrUrl: 'Invalid DOI. Publication not found. Enter manually instead' });
            }

            setSubmitting(false);
          }}
        >
          {({ handleChange, handleSubmit, values, errors }) => (
            <Form id={formID} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="validationDoiOrUrl">
                <Form.Label>DOI or DOI URL</Form.Label>
                <Form.Control
                  type="text"
                  name="doiOrUrl"
                  placeholder="Enter DOI"
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
        <Button type="button" variant="contained" color="secondary" onClick={() => setManual(true)}>
          Enter Manually
        </Button>
        <Button type="submit" variant="contained" color="primary" form={formID}>
          Search
        </Button>
      </Modal.Footer>
    </>
  );
};

const ManualForm = ({
  handleClose,
  setManual,
}: {
  handleClose: () => void;
  setManual: (manual: boolean) => void;
}) => {
  return (
    <>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Enter title" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="authors">
          <Form.Label>Author(s)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Author(s) names (ex. John Smith, Jane Doe, ...)"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="publisher">
          <Form.Label>Publisher</Form.Label>
          <Form.Control type="text" placeholder="Enter Publisher" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="authors">
          <Form.Label>Volume</Form.Label>
          <Form.Control type="text" placeholder="Enter Volume" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="authors">
          <Form.Label>URL</Form.Label>
          <Form.Control type="text" placeholder="Enter URL" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="DOI">
          <Form.Label>DOI</Form.Label>
          <Form.Control type="text" placeholder="Enter DOI" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="month">
          <Form.Label>Month of Publication</Form.Label>
          <Form.Control type="number" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="year">
          <Form.Label>Year of Publication</Form.Label>
          <Form.Control type="number" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="abstract">
          <Form.Label>Abstract</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Enter Abstract" />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="button"
          variant="contained"
          color="secondary"
          onClick={() => setManual(false)}
        >
          Return to search
        </Button>
        <Button type="submit" variant="contained" color="primary" form={formID}>
          Submit
        </Button>
      </Modal.Footer>
    </>
  );
};
