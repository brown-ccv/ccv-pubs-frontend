import React, { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { fetchDoi } from '../utils/utils.ts';

const searchFormId = 'searchForm';
const manualFormId = 'manualForm';

interface Publication {
  title: string;
  author: string;
  publisher: string;
  url: string;
  doi: string;
  month: number;
  year: number;
  abstract: string;
}

const blankFormValues: Publication = {
  title: '',
  author: '',
  publisher: '',
  url: '',
  doi: '',
  month: 0,
  year: 0,
  abstract: '',
};

export function AddPublicationModal() {
  const [show, setShow] = useState(false);
  const [manual, setManual] = useState(false);
  const [initialValues, setInitialValues] = useState(blankFormValues);

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
          <ManualForm
            handleClose={handleClose}
            setManual={setManual}
            initialValues={initialValues}
            setInitialValues={setInitialValues}
          />
        ) : (
          <SearchDoiForm setManual={setManual} setInitialValues={setInitialValues} />
        )}
      </Modal>
    </>
  );
}

const SearchDoiForm = ({
  setManual,
  setInitialValues,
}: {
  setManual: (manual: boolean) => void;
  setInitialValues: (values: Publication) => void;
}) => {
  return (
    <>
      <Modal.Body>
        <Formik
          validationSchema={yup.object().shape({
            doi: yup
              .string()
              .matches(
                /^10\.\d{4,9}\/[-._;()/:a-zA-Z0-9]+$/,
                "Invalid DOI format. Example: '10.1234/abcd-efg'"
              )
              .required(),
          })}
          initialValues={{
            doi: '',
          }}
          onSubmit={async ({ doi }, { setSubmitting, setErrors }) => {
            const data = await fetchDoi(doi);

            if (!data) {
              setErrors({ doi: 'Invalid DOI. Publication not found. Enter manually instead' });
            }

            setInitialValues(data);
            setSubmitting(false);
            setManual(true);
          }}
        >
          {({ handleChange, handleSubmit, values, errors }) => (
            <Form id={searchFormId} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="validationDoi">
                <Form.Label>DOI</Form.Label>
                <Form.Control
                  type="text"
                  name="doi"
                  placeholder="Enter DOI. Example: '10.1234/abcd-efg'"
                  value={values.doi}
                  onChange={handleChange}
                  isInvalid={!!errors.doi}
                  autoFocus
                />
                <Form.Control.Feedback type="invalid">{errors.doi}</Form.Control.Feedback>
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
  initialValues,
  setInitialValues,
}: {
  handleClose: () => void;
  setManual: (manual: boolean) => void;
  initialValues: Publication;
  setInitialValues: (values: Publication) => void;
}) => {
  return (
    <>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);

            setInitialValues(blankFormValues);
            setSubmitting(false);
            handleClose();
          }}
        >
          {({ handleChange, handleSubmit, values, errors }) => (
            <Form id={manualFormId} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="title"
                  placeholder="Enter title"
                  value={values.title}
                  onChange={handleChange}
                  isInvalid={!!errors.title}
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="author">
                <Form.Label>Author(s)</Form.Label>
                <Form.Control
                  type="text"
                  name="author"
                  placeholder="Enter Author(s) names (ex. John Smith, Jane Doe, ...)"
                  value={values.author}
                  onChange={handleChange}
                  isInvalid={!!errors.author}
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
