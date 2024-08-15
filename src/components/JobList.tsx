import React, { useState, useRef, useEffect } from 'react';
import { Button, Modal, Card, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { Job, setSelectedJob, markAsApplied } from '../redux/jobSlice';
import ApplyForJobForm from './ApplyForJobForm';
import { useReactToPrint } from 'react-to-print';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './JobList.css'; 

const JobList: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [viewApplication, setViewApplication] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const componentRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const jobs = useSelector((state: RootState) => state.jobs.jobs);
  const selectedJob = useSelector((state: RootState) => state.jobs.selectedJob);
  const userData = useSelector((state: RootState) => state.user.formData);

  useEffect(() => {
    setFilteredJobs(
      jobs.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, jobs]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleJobClick = (job: Job) => {
    dispatch(setSelectedJob(job));
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setViewApplication(false);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current!,
  });

  const handleDownloadPDF = async () => {
    if (componentRef.current) {
      const canvas = await html2canvas(componentRef.current);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('application-details.pdf');
    }
  };

  const handleApplySuccess = () => {
    if (selectedJob) {
      dispatch(markAsApplied(selectedJob.id));
      setFilteredJobs(prevJobs =>
        prevJobs.map(job => (job.id === selectedJob.id ? { ...job, applied: true } : job))
      );
      setShowModal(false);
      setViewApplication(true);
    }
  };

  return (
    <div className="job-list-container">
      <header className="header">
      <img src="/logo.jpg" alt="Company Logo" className="logo" />

        <h1 className="page-heading">JOB PORTAL</h1>
        <Form.Control
          type="text"
          placeholder="Search jobs..."
          value={searchQuery}
          onChange={handleSearch}
          style={{ width: '400px'}}
        />
      </header>

      <div className="job-cards-container">
  {(filteredJobs.length > 0 ? filteredJobs : jobs).map(job => (
    <Card key={job.id} className="job-card">
      <Card.Body>
        {/* Displaying the job logo */}
        <div className="job-logo-container">
          <img src={job.logo} alt={`${job.company} logo`} className="job-logo" />
        </div>
        <Card.Title
          style={{ cursor: 'pointer' }}
          onClick={() => handleJobClick(job)}
        >
          {job.title}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{job.company}</Card.Subtitle>
        <Card.Text>
          <strong>Experience Required:</strong> {job.experience} years<br />
          <strong>Skills Required:</strong> {job.skills.join(', ')}<br/>
          <strong>Job description:</strong> {job.description}
        </Card.Text>
        <Button
          variant={job.applied ? 'success' : 'primary'}
          onClick={() => !job.applied && handleJobClick(job)}
          disabled={job.applied}
          className="apply-button"
        >
          {job.applied ? 'Applied' : 'Apply'}
        </Button>
      </Card.Body>
    </Card>
  ))}
</div>


      {/* Apply for Job Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Apply for Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedJob && (
            <ApplyForJobForm 
              job={selectedJob} 
              onApplySuccess={handleApplySuccess}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* View Application Modal */}
      <Modal show={viewApplication} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Job Application Details</Modal.Title>
        </Modal.Header>
        <Modal.Body ref={componentRef}>
          {selectedJob && userData && (
            <div>
              <h5>Company: {selectedJob.company}</h5>
              <p>Experience Required: {selectedJob.experience} years</p>
              <div>
                <strong>Skills Required:</strong>
                {selectedJob.skills.map(skill => (
                  <span key={skill} className="badge bg-primary me-2">
                    {skill}
                  </span>
                ))}
              </div>
              <h5>About Me:</h5>
              <div dangerouslySetInnerHTML={{ __html: userData.aboutMe }} />
              <div>
                <strong>Form Data:</strong>
                <p><strong>First Name:</strong> {userData.firstName}</p>
                <p><strong>Last Name:</strong> {userData.lastName}</p>
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>Skills:</strong> {userData.skills.join(', ')}</p>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handlePrint}>
            Print
          </Button>
          <Button variant="secondary" onClick={handleDownloadPDF}>
            Download PDF
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default JobList;
