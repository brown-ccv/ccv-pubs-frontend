import React, { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { extractDOI, fetchDoi } from '../utils/utils.ts';

const searchFormId = 'searchForm';
const manualFormId = 'manualForm';

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
              .matches(
                /^10\.\d{4,9}\/[-._;()/:a-zA-Z0-9]+$/,
                "Invalid DOI format. Example: '10.1234/abcd-efg'"
              )
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
            <Form id={searchFormId} onSubmit={handleSubmit}>
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
        <Button type="submit" variant="contained" color="primary" form={searchFormId}>
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
        <Formik
          initialValues={{
            title: '',
            authors: '',
            publisher: '',
            url: '',
            doi: '',
            month: 0,
            year: 0,
            abstract: '',
          }}
          onSubmit={(values) => {
            console.log(values);
            handleClose();
          }}
        >
          {({ handleChange, handleSubmit, values, errors }) => (
            <Form id={manualFormId} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Enter title"
                  value={values.title}
                  onChange={handleChange}
                  isInvalid={!!errors.title}
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="authors">
                <Form.Label>Author(s)</Form.Label>
                <Form.Control
                  type="text"
                  name="authors"
                  placeholder="Enter Author(s) names (ex. John Smith, Jane Doe, ...)"
                  value={values.authors}
                  onChange={handleChange}
                  isInvalid={!!errors.authors}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="publisher">
                <Form.Label>Publisher</Form.Label>
                <Form.Control
                  type="text"
                  name="publisher"
                  placeholder="Enter Publisher"
                  value={values.publisher}
                  onChange={handleChange}
                  isInvalid={!!errors.publisher}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="url">
                <Form.Label>URL</Form.Label>
                <Form.Control
                  type="text"
                  name="url"
                  placeholder="Enter URL"
                  value={values.url}
                  onChange={handleChange}
                  isInvalid={!!errors.url}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="doi">
                <Form.Label>DOI</Form.Label>
                <Form.Control
                  type="text"
                  name="doi"
                  placeholder="Enter DOI"
                  value={values.doi}
                  onChange={handleChange}
                  isInvalid={!!errors.doi}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="month">
                <Form.Label>Month of Publication</Form.Label>
                <Form.Control
                  type="number"
                  name="month"
                  value={values.month}
                  onChange={handleChange}
                  isInvalid={!!errors.month}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="year">
                <Form.Label>Year of Publication</Form.Label>
                <Form.Control
                  type="number"
                  name="year"
                  value={values.year}
                  onChange={handleChange}
                  isInvalid={!!errors.year}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="abstract">
                <Form.Label>Abstract</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="abstract"
                  placeholder="Enter Abstract"
                  value={values.abstract}
                  onChange={handleChange}
                  isInvalid={!!errors.abstract}
                />
              </Form.Group>
            </Form>
          )}
        </Formik>
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
        <Button type="submit" variant="contained" color="primary" form={manualFormId}>
          Submit
        </Button>
      </Modal.Footer>
    </>
  );
};
