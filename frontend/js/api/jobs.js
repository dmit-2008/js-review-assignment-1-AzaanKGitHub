
export function fetchJobs(query) {
    return fetch(`http://localhost:3000/jobs?q=${query}`)  
        .then(response => {
            console.log('Response received:', response);
            return response.json();
        })
        .then(data => {
            console.log('Jobs data received:', data);
            return data;
        })
        .catch(error => {
            console.error('Error fetching jobs:', error);
        });
}


export function fetchJobDetails(jobId) {
    return fetch(`http://localhost:3000/jobs/${jobId}`)
      .then(response => response.json())
      .catch(error => {
        console.error('Error fetching job details:', error);
      });
}
