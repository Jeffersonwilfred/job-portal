// JobApplicationView.tsx
import React, { useRef } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useReactToPrint } from 'react-to-print';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './JobApplicationView.css';



const JobApplicationView: React.FC = () => {
  const selectedJob = useSelector((state: RootState) => state.jobs.selectedJob);
  const userData = useSelector((state: RootState) => state.user.formData); 
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleDownloadPDF = async () => {
    const input = componentRef.current;
    if (input) {
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('application-details.pdf');
    }
  };

  if (!selectedJob || !userData) {
    return <div>No job selected or No form data available.</div>;
  }

  return (
    <Modal show={true} onHide={() => {}}>
      <Modal.Header closeButton>
        <Modal.Title>Job Application Details</Modal.Title>
      </Modal.Header>
      <Modal.Body ref={componentRef}>
        <h1>{selectedJob.title}</h1>
        <p>Company: {selectedJob.company}</p>
        <p>Experience Required: {selectedJob.experience} years</p>
        <div>
          <strong>Skills Required:</strong>
          {selectedJob.skills.map(skill => (
            <span key={skill} className="badge bg-primary me-2">{skill}</span>
          ))}
        </div>
        <p>{selectedJob.description}</p>
        <div>
          <strong>About Me:</strong>
          <p dangerouslySetInnerHTML={{ __html: userData.aboutMe }} />
        </div>
        <div>
          <strong>Form Data:</strong>
          <p><strong>First Name:</strong> {userData.firstName}</p>
          <p><strong>Last Name:</strong> {userData.lastName}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Skills:</strong> {userData.skills.join(', ')}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => {}}>
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
  );
};

export default JobApplicationView;
