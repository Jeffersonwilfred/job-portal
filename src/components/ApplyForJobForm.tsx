import React, { useRef } from 'react';
import { Formik, Field, Form } from 'formik';
import { Button, Form as BootstrapForm } from 'react-bootstrap';
import Select from 'react-select';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { setFormData } from '../redux/userSlice';
import { Job } from '../redux/jobSlice';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import './ApplyForJobForm.css';


interface ApplyForJobFormProps {
  job: Job;
  onApplySuccess: () => void; // Callback for successful application
}

const ApplyForJobForm: React.FC<ApplyForJobFormProps> = ({ job, onApplySuccess }) => {
  const dispatch = useDispatch();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (values: any) => {
    console.log('Application submitted:', values);
    dispatch(setFormData(values)); // Save form data to Redux store
    onApplySuccess(); // Notify JobList component of successful application
  };

  const handlePrint = useReactToPrint({
    content: () => formRef.current!,
  });

  const handleDownloadPDF = (values: any) => {
    const doc = new jsPDF();
    doc.text(`First Name: ${values.firstName}`, 10, 10);
    doc.text(`Last Name: ${values.lastName}`, 10, 20);
    doc.text(`Email: ${values.email}`, 10, 30);
    doc.text(`Skills: ${values.skills.join(', ')}`, 10, 40);
    doc.text(`About Me: ${values.aboutMe}`, 10, 50);
    doc.save('job-application.pdf');
  };

  return (
    <div>
      
<Formik
  initialValues={{
    firstName: '',
    lastName: '',
    email: '',
    skills: [],
    aboutMe: '',
  }}
  validationSchema={Yup.object({
    firstName: Yup.string()
      .matches(/^[A-Za-z]+$/, 'First Name should only contain letters')
      .required('First Name is required'),
    lastName: Yup.string()
      .matches(/^[A-Za-z]+$/, 'Last Name should only contain letters')
      .required('Last Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'Email must be a valid Gmail address')
      .required('Email is required'),
    skills: Yup.array()
      .min(1, 'Select at least one skill')
      .required('Skills are required'),
    aboutMe: Yup.string()
      .required('About Me is required'),
  })}
        onSubmit={(values) => {
          handleSubmit(values);
          // Removed handleDownloadPDF call here
        }}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form ref={formRef}>
            <BootstrapForm.Group controlId="formFirstName">
              <BootstrapForm.Label>First Name</BootstrapForm.Label>
              <Field name="firstName" className="form-control" />
              {errors.firstName && touched.firstName ? (
                <div className="text-danger">{errors.firstName}</div>
              ) : null}
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="formLastName">
              <BootstrapForm.Label>Last Name</BootstrapForm.Label>
              <Field name="lastName" className="form-control" />
              {errors.lastName && touched.lastName ? (
                <div className="text-danger">{errors.lastName}</div>
              ) : null}
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="formEmail">
              <BootstrapForm.Label>Email</BootstrapForm.Label>
              <Field name="email" type="email" className="form-control" />
              {errors.email && touched.email ? (
                <div className="text-danger">{errors.email}</div>
              ) : null}
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="formSkills">
              <BootstrapForm.Label>Skills</BootstrapForm.Label>
              <Select
                isMulti
                options={[
                  { value: 'React', label: 'React' },
                  { value: 'JavaScript', label: 'JavaScript' },
                  { value: 'HTML', label: 'HTML' },
                  { value: 'CSS', label: 'CSS' },
                  { value: 'Python', label: 'Python' },
                  { value: 'Java', label: 'Java' },
                  { value: 'C++', label: 'C++' },
                  { value: 'Node.js', label: 'Node.js' },
                  { value: 'Angular', label: 'Angular' },
                  { value: 'Vue.js', label: 'Vue.js' },
                  { value: 'TypeScript', label: 'TypeScript' },
                  { value: 'Ruby', label: 'Ruby' },
                  { value: 'PHP', label: 'PHP' },
                  { value: 'SQL', label: 'SQL' },
                  { value: 'NoSQL', label: 'NoSQL' },
                  { value: 'MongoDB', label: 'MongoDB' },
                  { value: 'MySQL', label: 'MySQL' },
                  { value: 'PostgreSQL', label: 'PostgreSQL' },
                  { value: 'Django', label: 'Django' },
                  { value: 'Flask', label: 'Flask' },
                  { value: 'Spring Boot', label: 'Spring Boot' },
                  { value: 'Express.js', label: 'Express.js' },
                  { value: 'Kotlin', label: 'Kotlin' },
                  { value: 'Swift', label: 'Swift' },
                  { value: 'Git', label: 'Git' },
                  { value: 'Docker', label: 'Docker' },
                  { value: 'Kubernetes', label: 'Kubernetes' },
                  { value: 'AWS', label: 'AWS' },
                  { value: 'Azure', label: 'Azure' },
                  { value: 'GCP', label: 'GCP' },
                  { value: 'REST APIs', label: 'REST APIs' },
                  { value: 'GraphQL', label: 'GraphQL' },
                  { value: 'Redux', label: 'Redux' },
                  { value: 'MobX', label: 'MobX' },
                  { value: 'Webpack', label: 'Webpack' },
                  { value: 'Babel', label: 'Babel' },
                  { value: 'Jenkins', label: 'Jenkins' },
                  { value: 'CI/CD', label: 'CI/CD' },
                  { value: 'Agile', label: 'Agile' },
                  { value: 'Scrum', label: 'Scrum' },
                  { value: 'TDD (Test-Driven Development)', label: 'TDD' },
                  { value: 'Unit Testing', label: 'Unit Testing' },
                  { value: 'Integration Testing', label: 'Integration Testing' },
                  { value: 'UI/UX Design', label: 'UI/UX Design' },
                  { value: 'Figma', label: 'Figma' },
                  { value: 'Sketch', label: 'Sketch' },
                  { value: 'Adobe XD', label: 'Adobe XD' },
                  { value: 'Photoshop', label: 'Photoshop' },
                  { value: 'Illustrator', label: 'Illustrator' },
                  { value: 'Blockchain', label: 'Blockchain' },
                  { value: 'Solidity', label: 'Solidity' },
                  { value: 'Machine Learning', label: 'Machine Learning' },
                  { value: 'Data Science', label: 'Data Science' },
                  { value: 'Data Analysis', label: 'Data Analysis' },
                  { value: 'Big Data', label: 'Big Data' },
                  { value: 'Artificial Intelligence', label: 'Artificial Intelligence' },
                  { value: 'TensorFlow', label: 'TensorFlow' },
                  { value: 'PyTorch', label: 'PyTorch' },
                  { value: 'Natural Language Processing (NLP)', label: 'NLP' },
                  { value: 'Computer Vision', label: 'Computer Vision' },
                  // Add other skills here
                ]}
                onChange={(selectedOptions) =>
                  setFieldValue('skills', selectedOptions.map(option => option.value))
                }
              />
              {errors.skills && touched.skills ? (
                <div className="text-danger">{errors.skills}</div>
              ) : null}
            </BootstrapForm.Group>

           
          <BootstrapForm.Group controlId="formAboutMe">
            <BootstrapForm.Label>About Me</BootstrapForm.Label>
            <ReactQuill
              value={values.aboutMe}
              onChange={(content) => setFieldValue('aboutMe', content)}
            />
          
          </BootstrapForm.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ApplyForJobForm;
