// jobSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Job {
  id: number;
  title: string;
  company: string;
  experience: number;
  skills: string[];
  description: string;
  logo: string;
  applied: boolean;
  
}

interface JobState {
  jobs: Job[];
  selectedJob: Job | null;
}

const initialState: JobState = {
  jobs: [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'Tech Corp',
      experience: 3,
      skills: ['React', 'JavaScript', 'CSS'],
      description: 'We are looking for a skilled frontend developer...',
      logo: 'clogo1.jpg',
      applied: false,
      
    },
    {
      id: 2,
      title: 'Backend Developer',
      company: 'Data Inc.',
      experience: 5,
      skills: ['Node.js', 'Express', 'MongoDB'],
      description: 'Backend developer with experience in Node.js...',
      logo: 'clogo2.jpg',
      applied: false,
      
    },
    {
      id: 3,
      title: 'UI/UX Designer',
      company: 'Creative Solutions',
      experience: 4,
      skills: ['Figma', 'Adobe XD', 'Sketch'],
      description: 'Design intuitive and engaging user interfaces...',
      logo: 'clogo3.jpg',
      applied: false,
      
    },
    {
      id: 4,
      title: 'Full Stack Developer',
      company: 'Innovate Tech',
      experience: 6,
      skills: ['React', 'Node.js', 'TypeScript', 'GraphQL'],
      description: 'Develop full stack applications and APIs...',
      logo: 'clogo4.jpg',
      applied: false,
      
    },
    {
      id: 5,
      title: 'Data Scientist',
      company: 'Analytics Hub',
      experience: 3,
      skills: ['Python', 'Pandas', 'Machine Learning'],
      description: 'Analyze data and build predictive models...',
      logo: 'clogo5.jpg',
      applied: false,
      
    },
    {
      id: 6,
      title: 'DevOps Engineer',
      company: 'Cloudify Solutions',
      experience: 4,
      skills: ['Docker', 'Kubernetes', 'AWS'],
      description: 'Implement and manage CI/CD pipelines and cloud infrastructure...',
      logo: 'clogo6.jpg',
      applied: false,
      
    },
  ],
  selectedJob: null,
};


const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setSelectedJob(state, action: PayloadAction<Job>) {
      state.selectedJob = action.payload;
    },
    markAsApplied(state, action: PayloadAction<number>) {
      const job = state.jobs.find(job => job.id === action.payload);
      if (job) {
        job.applied = true;
      }
    },
  },
});

export const { setSelectedJob, markAsApplied } = jobSlice.actions;

export default jobSlice.reducer;

   