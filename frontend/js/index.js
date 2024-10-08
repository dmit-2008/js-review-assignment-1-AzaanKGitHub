// import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchJobs, fetchJobDetails } from './api/jobs';

const jobForm = document.getElementById('search-jobs-form');
const jobList = document.getElementById('searched-jobs');

// event listeners
jobForm.addEventListener("submit", onSubmitForm);
jobList.addEventListener('click', onViewJob);

// form submit 
function onSubmitForm(e) {
    e.preventDefault();
    const query = document.getElementById('query-input').value;
    fetchJobs(query).then(displayJobs);
}

// displays jobs 
function displayJobs(jobs) {
    jobList.innerHTML = '';  // clears previous results

    if (jobs.length === 0) {
        jobList.innerHTML = '<div class="text-dark">No Results Found</div>';
        return;
    }

    jobs.forEach(job => {
        const jobCard = `
            <li class="job-card card my-1" style="width: 18rem;">
                <div class="card-header">${job.company}</div>
                <div class="card-body">
                    <h5 class="card-title">${job.title}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">${job.location}</h6>
                    <h6 class="card-subtitle mb-2 text-body-secondary">Posted: ${new Date(job.date_posted).toLocaleDateString()}</h6>
                    <button class="btn btn-primary view-job-button" job-data-id="${job.id}">View Job</button>
                </div>
            </li>
        `;
        jobList.innerHTML += jobCard;
    });
}

// fetches jobs when page is loaded 
document.addEventListener('DOMContentLoaded', function () {
    fetchJobs('').then(displayJobs);
});

// Handle "View Job" button clicks
function onViewJob(event) {
    if (event.target.classList.contains('view-job-button')) {
        const jobId = event.target.getAttribute('job-data-id');
        fetchJobDetails(jobId).then(displayJobDetails);
    }
}

// displays job details to user
function displayJobDetails(job) {
    const jobDetailsCard = document.getElementById('job-details-card');
    jobDetailsCard.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h3 class="card-title">${job.title}</h3>
                <h4 class="card-subtitle mb-2 text-body-secondary">${job.company}</h4>
                <h6 class="card-subtitle mb-2 text-body-secondary">${job.location}</h6>
                <h6 class="card-subtitle mb-2 text-body-secondary">Posted: ${new Date(job.date_posted).toLocaleDateString()}</h6>
                <h5 class="card-subtitle mb-2">Description</h5>
                <p class="card-text">${job.description}</p>
                <h5 class="card-subtitle mb-2">Qualifications</h5>
                <p class="card-text">${job.qualifications}</p>
                <button class="btn btn-success save-job-button" job-data-id="${job.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark" viewBox="0 0 16 16">
                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/>
                    </svg>
                    Save Job
                </button>
            </div>
        </div>
    `;
}

