import { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';

import { fetchDoi, validateDoi } from '../utils/utils.ts';
import { selectPublications } from '../store/slice/appState';
import { addPublication } from '../utils/firebase.ts';
import { Publication } from '../../types';
import { LoadingButton } from './LoadingButton.tsx';

const searchFormId = 'searchForm';
const manualFormId = 'manualForm';

const getBlankFormValues: () => Publication = () => ({
  title: '',
  author: '',
  publisher: '',
  url: '',
  doi: '',
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
  abstract: '',
});

const validationSchema = yup.object().shape({
  title: yup.string().required(),
  author: yup.string().required(),
  publisher: yup.string().required(),
  url: yup.string().url().required(),
  doi: validateDoi(),
  month: yup.number().integer().min(1).max(12).required(),
  year: yup.number().integer().min(1).max(new Date().getFullYear()).required(),
  abstract: yup.string().default(''),
});

export function AddPublicationModal() {
  const [show, setShow] = useState(false);
  const [manual, setManual] = useState(false);
  const [initialValues, setInitialValues] = useState(getBlankFormValues());

  const handleClose: () => void = () => {
    setShow(false);
    setManual(false);
    setInitialValues(getBlankFormValues());
  };
  const handleShow: () => void = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
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
  const publications = useSelector(selectPublications);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Modal.Body>
        <Formik
          validationSchema={yup.object().shape({
            doi: validateDoi(),
          })}
          initialValues={{
            doi: '',
          }}
          onSubmit={async ({ doi }, { setSubmitting, setErrors }) => {
            setLoading(true);

            if (publications.find((p) => p.doi.toLowerCase() === doi.toLowerCase())) {
              setErrors({ doi: 'Publication already exists in database' });
              setSubmitting(false);
              setLoading(false);
              return;
            }

            const data = await fetchDoi(doi);

            if (!data) {
              setErrors({ doi: 'Invalid DOI. Publication not found. Enter manually instead' });
              setSubmitting(false);
              setLoading(false);
              return;
            }

            setInitialValues(data);
            setManual(true);
            setSubmitting(false);
            setLoading(false);
          }}
        >
          {({ handleChange, handleSubmit, values, errors, isSubmitting }) => (
            <Form id={searchFormId} onSubmit={handleSubmit}>
              <fieldset disabled={isSubmitting || loading}>
                <Form.Group className="form-group mb-3 required" controlId="validationDoi">
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
              </fieldset>
            </Form>
          )}
        </Formik>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="button"
          variant="secondary"
          onClick={() => setManual(true)}
          disabled={loading}
        >
          Enter Manually
        </Button>
        <LoadingButton loading={loading} type="submit" variant="primary" form={searchFormId}>
          Search
        </LoadingButton>
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
  const publications = useSelector(selectPublications);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, setErrors, setStatus }) => {
            setLoading(true);
            const { doi } = values;
            let errorMessage: string;

            if (publications.find((p) => p.doi.toLowerCase() === doi.toLowerCase())) {
              setErrors({ doi: 'Publication already exists in database' });
              setSubmitting(false);
              return;
            }

            try {
              await addPublication(values);
            } catch (error) {
              errorMessage = `Submission failed. Please try again. ${error.code}: ${error.message}`;
              setStatus({
                error: errorMessage,
              });
            }

            if (!errorMessage) {
              setInitialValues(getBlankFormValues());
              handleClose();
            }

            setSubmitting(false);
            setLoading(false);
          }}
        >
          {({ handleChange, handleSubmit, values, errors, touched, status, isSubmitting }) => (
            <Form id={manualFormId} onSubmit={handleSubmit}>
              <fieldset disabled={isSubmitting || loading}>
                <Form.Group className="form-group mb-3 required" controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="title"
                    placeholder="Enter title"
                    value={values.title}
                    onChange={handleChange}
                    isInvalid={touched.title && !!errors.title}
                    autoFocus
                  />
                  <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-group mb-3 required" controlId="author">
                  <Form.Label>Author(s)</Form.Label>
                  <Form.Control
                    type="text"
                    name="author"
                    placeholder="Enter Author(s) names (ex. John Smith, Jane Doe, ...)"
                    value={values.author}
                    onChange={handleChange}
                    isInvalid={touched.author && !!errors.author}
                  />
                  <Form.Control.Feedback type="invalid">{errors.author}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-group mb-3 required" controlId="publisher">
                  <Form.Label>Publisher</Form.Label>
                  <Form.Control
                    type="text"
                    name="publisher"
                    placeholder="Enter Publisher"
                    value={values.publisher}
                    onChange={handleChange}
                    isInvalid={touched.publisher && !!errors.publisher}
                  />
                  <Form.Control.Feedback type="invalid">{errors.publisher}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-group mb-3 required" controlId="url">
                  <Form.Label>URL</Form.Label>
                  <Form.Control
                    type="text"
                    name="url"
                    placeholder="Enter URL"
                    value={values.url}
                    onChange={handleChange}
                    isInvalid={touched.url && !!errors.url}
                  />
                  <Form.Control.Feedback type="invalid">{errors.url}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-group mb-3 required" controlId="doi">
                  <Form.Label>DOI</Form.Label>
                  <Form.Control
                    type="text"
                    name="doi"
                    placeholder="Enter DOI"
                    value={values.doi}
                    onChange={handleChange}
                    isInvalid={touched.doi && !!errors.doi}
                  />
                  <Form.Control.Feedback type="invalid">{errors.doi}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-group mb-3 required" controlId="month">
                  <Form.Label>Month of Publication</Form.Label>
                  <Form.Control
                    type="number"
                    name="month"
                    placeholder="Enter number"
                    value={values.month}
                    onChange={handleChange}
                    isInvalid={touched.month && !!errors.month}
                  />
                  <Form.Control.Feedback type="invalid">{errors.month}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-group mb-3 required" controlId="year">
                  <Form.Label>Year of Publication</Form.Label>
                  <Form.Control
                    type="number"
                    name="year"
                    placeholder="Enter number"
                    value={values.year}
                    onChange={handleChange}
                    isInvalid={touched.year && !!errors.year}
                  />
                  <Form.Control.Feedback type="invalid">{errors.year}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-group mb-3" controlId="abstract">
                  <Form.Label>Abstract</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="abstract"
                    placeholder="Enter Abstract"
                    value={values.abstract}
                    onChange={handleChange}
                    isInvalid={touched.abstract && !!errors.abstract}
                  />
                  <Form.Control.Feedback type="invalid">{errors.abstract}</Form.Control.Feedback>
                </Form.Group>
              </fieldset>

              {status?.error && <div className="text-center text-danger">{status.error}</div>}
            </Form>
          )}
        </Formik>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="button"
          variant="secondary"
          onClick={() => setManual(false)}
          disabled={loading}
        >
          Back
        </Button>
        <LoadingButton loading={loading} type="submit" variant="primary" form={manualFormId}>
          Submit
        </LoadingButton>
      </Modal.Footer>
    </>
  );
};
