export const API_PORT = import.meta.env.VITE_API_PORT || 8000;
const PRODUCTION_API = import.meta.env.VITE_PROD_API || `http://localhost:${API_PORT}`
export const USER_API_END_POINT = `${PRODUCTION_API}/api/v1/user`;
export const JOB_API_END_POINT = `${PRODUCTION_API}/api/v1/job`;
export const APPLICATION_API_END_POINT = `${PRODUCTION_API}/api/v1/application`;
export const COMPANY_API_END_POINT = `${PRODUCTION_API}/api/v1/company`;

export const USER_ROLE = {
    jobseeker: 'Job Seeker',
    recruiter: 'Recruiter',
    all: "All Users",
}