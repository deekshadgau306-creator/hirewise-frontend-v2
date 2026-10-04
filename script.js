/* =====================================================
   HIREWISE FRONTEND
   STEP 1 - CORE FLOW + OWNER DASHBOARD
===================================================== */


/* =====================================================
   GLOBAL DATA
===================================================== */

const OWNER_PASSWORD = "HireWise@123";


/* =====================================================
   SCREEN HELPERS
===================================================== */

function hideAllScreens() {

    const screens = document.querySelectorAll(".screen");

    screens.forEach(function(screen) {
        screen.classList.add("hidden");
    });

    const dashboard = document.getElementById("ownerDashboard");

    if (dashboard) {
        dashboard.classList.add("hidden");
    }
}


function showScreen(id) {

    hideAllScreens();

    const screen = document.getElementById(id);

    if (screen) {
        screen.classList.remove("hidden");
    }
}


/* =====================================================
   SPLASH
===================================================== */

function startHireWiseApp() {

    const splash =
        document.getElementById("splashScreen");

    const auth =
        document.getElementById("authScreen");


    setTimeout(function () {

        if (splash) {
            splash.classList.add("hidden");
        }

        if (auth) {
            auth.classList.remove("hidden");
        }

    }, 1800);

}


/* Start application safely */

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        startHireWiseApp
    );

} else {

    startHireWiseApp();

}

/* =====================================================
   LOGIN / SIGNUP
===================================================== */

function showLogin() {

    document
        .getElementById("loginPanel")
        .classList.remove("hidden");

    document
        .getElementById("signupPanel")
        .classList.add("hidden");
}


function showSignup() {

    document
        .getElementById("loginPanel")
        .classList.add("hidden");

    document
        .getElementById("signupPanel")
        .classList.remove("hidden");
}


/* =====================================================
   LOGIN
===================================================== */

document.addEventListener("DOMContentLoaded", function() {

    const loginForm =
        document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            function(event) {

                event.preventDefault();

                const email =
                    document
                        .getElementById("loginEmail")
                        .value
                        .trim();

                const password =
                    document
                        .getElementById("loginPassword")
                        .value
                        .trim();


                if (!email || !password) {

                    alert(
                        "Please enter your email and password."
                    );

                    return;
                }


                localStorage.setItem(
                    "hirewiseUser",
                    JSON.stringify({
                        name: email.split("@")[0],
                        email: email
                    })
                );


                showRoleScreen();

            }
        );

    }


    /* =================================================
       SIGNUP
    ================================================= */

    const signupForm =
        document.getElementById("signupForm");

    if (signupForm) {

        signupForm.addEventListener(
            "submit",
            function(event) {

                event.preventDefault();

                const name =
                    document
                        .getElementById("signupName")
                        .value
                        .trim();

                const email =
                    document
                        .getElementById("signupEmail")
                        .value
                        .trim();

                const password =
                    document
                        .getElementById("signupPassword")
                        .value
                        .trim();


                if (!name || !email || !password) {

                    alert(
                        "Please complete all fields."
                    );

                    return;
                }


                localStorage.setItem(
                    "hirewiseUser",
                    JSON.stringify({
                        name: name,
                        email: email
                    })
                );


                alert(
                    "Account created successfully!"
                );


                showRoleScreen();

            }
        );

    }


    /* =================================================
       OWNER SECURITY
    ================================================= */

    const ownerSecurityForm =
        document.getElementById(
            "ownerSecurityForm"
        );


    if (ownerSecurityForm) {

        ownerSecurityForm.addEventListener(
            "submit",
            function(event) {

                event.preventDefault();


                const password =
                    document
                        .getElementById(
                            "ownerSecurityPassword"
                        )
                        .value
                        .trim();


                const error =
                    document.getElementById(
                        "securityError"
                    );


                if (password === OWNER_PASSWORD) {

                    if (error) {
                        error.classList.add("hidden");
                    }

                    showOwnerDashboard();

                } else {

                    if (error) {

                        error.textContent =
                            "Incorrect owner password. Please try again.";

                        error.classList.remove(
                            "hidden"
                        );

                    }

                }

            }
        );

    }

});


/* =====================================================
   ROLE SCREEN
===================================================== */

function showRoleScreen() {

    showScreen("roleScreen");

}


function selectRole(role) {

    if (role === "owner") {

        showScreen(
            "ownerSecurityScreen"
        );

        const passwordInput =
            document.getElementById(
                "ownerSecurityPassword"
            );

        if (passwordInput) {

            passwordInput.value = "";

            setTimeout(function() {
                passwordInput.focus();
            }, 100);

        }

        return;
    }


    if (role === "employee") {
    showEmployeeDashboard();
    return;
}

}


/* =====================================================
   OWNER DASHBOARD
===================================================== */

function showOwnerDashboard() {

    hideAllScreens();

    const dashboard =
        document.getElementById(
            "ownerDashboard"
        );

    if (!dashboard) {
        return;
    }


    dashboard.classList.remove("hidden");


    const userData =
        localStorage.getItem(
            "hirewiseUser"
        );


    if (userData) {

        try {

            const user =
                JSON.parse(userData);


            const name =
                user.name ||
                "Owner";


            const displayName =
                document.getElementById(
                    "ownerDisplayName"
                );

            const welcomeName =
                document.getElementById(
                    "welcomeName"
                );


            if (displayName) {
                displayName.textContent = name;
            }


            if (welcomeName) {
                welcomeName.textContent = name;
            }


            const avatar =
                document.querySelector(
                    ".avatar"
                );


            if (avatar) {

                avatar.textContent =
                    name
                        .charAt(0)
                        .toUpperCase();

            }

        } catch (error) {

            console.error(
                "Could not load user:",
                error
            );

        }

    }


    updateDashboardStats();

}


/* =====================================================
   OWNER PAGE NAVIGATION
===================================================== */

function showOwnerPage(
    page,
    clickedButton
) {

    const content =
        document.getElementById(
            "dashboardContent"
        );


    const title =
        document.getElementById(
            "dashboardPageTitle"
        );


    if (!content) {
        return;
    }


    document
        .querySelectorAll(
            ".dashboard-nav-item"
        )
        .forEach(function(button) {

            button.classList.remove(
                "active"
            );

        });


    if (clickedButton) {

        clickedButton.classList.add(
            "active"
        );

    }


    if (page === "dashboard") {

        title.textContent =
            "Dashboard";


        renderDashboardHome();

        return;
    }


    if (page === "createJob") {

        title.textContent =
            "Create New Job";


        renderCreateJobPage();

        return;
    }


    if (page === "jobs") {

        title.textContent =
            "Jobs";


        renderJobsPage();

        return;
    }


    if (page === "candidates") {

        title.textContent =
            "Candidates";


        renderCandidatesPage();

        return;
    }


    if (page === "verification") {

        title.textContent =
            "Document Verification";


        renderVerificationPage();

        return;
    }


    if (page === "settings") {

        title.textContent =
            "Settings";


        renderSettingsPage();

        return;
    }

}


/* =====================================================
   DASHBOARD HOME
===================================================== */

function renderDashboardHome() {

    const content =
        document.getElementById(
            "dashboardContent"
        );


    content.innerHTML = `

        <div class="dashboard-page">

            <div class="welcome-banner">

                <div>

                    <span class="dashboard-eyebrow">
                        RECRUITER OVERVIEW
                    </span>

                    <h1>
                        Welcome back,
                        <span id="welcomeName">
                            Owner
                        </span>!
                    </h1>

                    <p>
                        Manage your hiring pipeline,
                        discover top candidates and make
                        smarter recruitment decisions.
                    </p>

                </div>

                <div class="welcome-icon">
                    <i class="bi bi-stars"></i>
                </div>

            </div>


            <div class="stats-grid">

                <div class="stat-card">

                    <div class="stat-icon">
                        <i class="bi bi-briefcase-fill"></i>
                    </div>

                    <div>

                        <span>Active Jobs</span>

                        <strong id="activeJobsCount">
                            0
                        </strong>

                    </div>

                </div>


                <div class="stat-card">

                    <div class="stat-icon">
                        <i class="bi bi-people-fill"></i>
                    </div>

                    <div>

                        <span>Candidates</span>

                        <strong>24</strong>

                    </div>

                </div>


                <div class="stat-card">

                    <div class="stat-icon">
                        <i class="bi bi-stars"></i>
                    </div>

                    <div>

                        <span>AI Matches</span>

                        <strong>18</strong>

                    </div>

                </div>


                <div class="stat-card">

                    <div class="stat-icon">
                        <i class="bi bi-shield-check"></i>
                    </div>

                    <div>

                        <span>Verified Docs</span>

                        <strong>12</strong>

                    </div>

                </div>

            </div>


            <div class="section-heading">

                <div>

                    <span class="dashboard-eyebrow">
                        QUICK ACTIONS
                    </span>

                    <h2>
                        Start hiring
                    </h2>

                </div>

            </div>


            <div class="quick-actions-grid">

                <button
                    class="action-card"
                    onclick="showOwnerPage('createJob')">

                    <div class="action-icon">
                        <i class="bi bi-plus-lg"></i>
                    </div>

                    <div>

                        <h3>
                            Create New Job
                        </h3>

                        <p>
                            Add a new job opening
                            and define requirements.
                        </p>

                    </div>

                    <i class="bi bi-arrow-up-right action-arrow"></i>

                </button>


                <button
                    class="action-card"
                    onclick="showOwnerPage('candidates')">

                    <div class="action-icon">
                        <i class="bi bi-stars"></i>
                    </div>

                    <div>

                        <h3>
                            Analyze Candidates
                        </h3>

                        <p>
                            Find and compare the best
                            candidates for your jobs.
                        </p>

                    </div>

                    <i class="bi bi-arrow-up-right action-arrow"></i>

                </button>


                <button
                    class="action-card"
                    onclick="showOwnerPage('verification')">

                    <div class="action-icon">
                        <i class="bi bi-shield-check"></i>
                    </div>

                    <div>

                        <h3>
                            Verify Documents
                        </h3>

                        <p>
                            Review candidate documents
                            and verification status.
                        </p>

                    </div>

                    <i class="bi bi-arrow-up-right action-arrow"></i>

                </button>

            </div>

        </div>

    `;


    updateDashboardStats();

}


/* =====================================================
   JOB STORAGE
===================================================== */

function getJobs() {

    const stored =
        localStorage.getItem(
            "hirewiseJobs"
        );


    if (!stored) {
        return [];
    }


    try {

        return JSON.parse(stored);

    } catch (error) {

        console.error(error);

        return [];

    }

}


function saveJobs(jobs) {

    localStorage.setItem(
        "hirewiseJobs",
        JSON.stringify(jobs)
    );

}


/* =====================================================
   DASHBOARD STATS
===================================================== */

function updateDashboardStats() {

    const jobs =
        getJobs();


    const count =
        document.getElementById(
            "activeJobsCount"
        );


    if (count) {
        count.textContent =
            jobs.length;
    }

}


/* =====================================================
   CREATE JOB PAGE
===================================================== */

function renderCreateJobPage() {

    const content =
        document.getElementById(
            "dashboardContent"
        );


    content.innerHTML = `

        <div class="page-header">

            <span class="dashboard-eyebrow">
                JOB MANAGEMENT
            </span>

            <h1>
                Create New Job
            </h1>

            <p>
                Define the role and requirements
                for your new position.
            </p>

        </div>


        <div class="content-card">

            <form
                class="job-form"
                id="createJobForm">


                <div class="form-group">

                    <label>
                        Job Title
                    </label>

                    <input
                        id="jobTitle"
                        type="text"
                        placeholder="e.g. Frontend Developer"
                        required>

                </div>


                <div class="form-group">

                    <label>
                        Company
                    </label>

                    <input
                        id="jobCompany"
                        type="text"
                        placeholder="Company name"
                        required>

                </div>


                <div class="form-group">

                    <label>
                        Location
                    </label>

                    <input
                        id="jobLocation"
                        type="text"
                        placeholder="e.g. Bengaluru"
                        required>

                </div>


                <div class="form-group">

                    <label>
                        Employment Type
                    </label>

                    <select id="jobType">

                        <option value="Full Time">
                            Full Time
                        </option>

                        <option value="Part Time">
                            Part Time
                        </option>

                        <option value="Internship">
                            Internship
                        </option>

                        <option value="Contract">
                            Contract
                        </option>

                    </select>

                </div>


                <div class="form-group">

                    <label>
                        Experience Required
                    </label>

                    <input
                        id="jobExperience"
                        type="text"
                        placeholder="e.g. 2-4 Years"
                        required>

                </div>


                <div class="form-group">

                    <label>
                        Salary
                    </label>

                    <input
                        id="jobSalary"
                        type="text"
                        placeholder="e.g. ₹6-10 LPA">

                </div>


                <div class="form-group full-width">

                    <label>
                        Required Skills
                    </label>

                    <input
                        id="jobSkills"
                        type="text"
                        placeholder="React, JavaScript, HTML, CSS, Git"
                        required>

                </div>


                <div class="form-group full-width">

                    <label>
                        Job Description
                    </label>

                    <textarea
                        id="jobDescription"
                        placeholder="Describe the role, responsibilities and requirements..."
                        required></textarea>

                </div>


                <div class="form-actions">

                    <button
                        type="button"
                        class="secondary-btn"
                        onclick="showOwnerPage('dashboard')">

                        Cancel

                    </button>


                    <button
                        type="submit"
                        class="primary-btn">

                        <i class="bi bi-plus-lg"></i>

                        Create Job

                    </button>

                </div>

            </form>

        </div>

    `;


    const form =
        document.getElementById(
            "createJobForm"
        );


    form.addEventListener(
        "submit",
        saveNewJob
    );

}


/* =====================================================
   SAVE JOB
===================================================== */

function saveNewJob(event) {

    event.preventDefault();


    const job = {

        id: Date.now(),

        title:
            document
                .getElementById("jobTitle")
                .value
                .trim(),

        company:
            document
                .getElementById("jobCompany")
                .value
                .trim(),

        location:
            document
                .getElementById("jobLocation")
                .value
                .trim(),

        type:
            document
                .getElementById("jobType")
                .value,

        experience:
            document
                .getElementById("jobExperience")
                .value
                .trim(),

        salary:
            document
                .getElementById("jobSalary")
                .value
                .trim(),

        skills:
            document
                .getElementById("jobSkills")
                .value
                .trim(),

        description:
            document
                .getElementById("jobDescription")
                .value
                .trim(),

        createdAt:
            new Date().toISOString()

    };


    const jobs =
        getJobs();


    jobs.push(job);


    saveJobs(jobs);


    alert(
        "Job created successfully!"
    );


    showOwnerPage("jobs");

}


/* =====================================================
   JOBS PAGE
===================================================== */

function renderJobsPage() {

    const content =
        document.getElementById(
            "dashboardContent"
        );


    const jobs =
        getJobs();


    let html = `

        <div class="page-header">

            <span class="dashboard-eyebrow">
                JOB MANAGEMENT
            </span>

            <h1>
                Your Jobs
            </h1>

            <p>
                Manage your current job openings
                and hiring requirements.
            </p>

        </div>


        <div style="
            display:flex;
            justify-content:flex-end;
            margin-bottom:18px;
        ">

            <button
                class="primary-btn"
                onclick="showOwnerPage('createJob')">

                <i class="bi bi-plus-lg"></i>

                Create New Job

            </button>

        </div>


        <div class="jobs-list">
    `;


    if (jobs.length === 0) {

        html += `

            <div class="content-card">

                <div class="empty-state">

                    <i class="bi bi-briefcase"></i>

                    <h3>
                        No jobs created yet
                    </h3>

                    <p>
                        Create your first job opening
                        to start analyzing candidates.
                    </p>

                </div>

            </div>

        `;

    } else {

        jobs.forEach(function(job) {

            html += `

                <div class="job-card">

                    <div class="job-card-left">

                        <div class="job-card-icon">

                            <i class="bi bi-briefcase-fill"></i>

                        </div>

                        <div>

                            <h3>
                                ${escapeHTML(job.title)}
                            </h3>

                            <p>
                                ${escapeHTML(job.company)}
                            </p>

                            <div class="job-card-meta">

                                <span>
                                    <i class="bi bi-geo-alt"></i>
                                    ${escapeHTML(job.location)}
                                </span>

                                <span>
                                    <i class="bi bi-clock"></i>
                                    ${escapeHTML(job.type)}
                                </span>

                                <span>
                                    <i class="bi bi-briefcase"></i>
                                    ${escapeHTML(job.experience)}
                                </span>

                            </div>

                        </div>

                    </div>


                    <button
                        class="outline-btn"
                        onclick="viewJob(${job.id})">

                        View Job

                    </button>

                </div>

            `;

        });

    }


    html += `
        </div>
    `;


    content.innerHTML = html;

}


/* =====================================================
   VIEW JOB
===================================================== */

function viewJob(jobId) {

    const jobs =
        getJobs();


    const job =
        jobs.find(function(item) {

            return item.id === jobId;

        });


    if (!job) {
        return;
    }


    const content =
        document.getElementById(
            "dashboardContent"
        );


    content.innerHTML = `

        <div class="page-header">

            <span class="dashboard-eyebrow">
                JOB DETAILS
            </span>

            <h1>
                ${escapeHTML(job.title)}
            </h1>

            <p>
                ${escapeHTML(job.company)}
            </p>

        </div>


        <div class="content-card">

            <div style="
                display:grid;
                grid-template-columns:
                    repeat(auto-fit,minmax(180px,1fr));
                gap:15px;
                margin-bottom:25px;
            ">

                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="bi bi-geo-alt"></i>
                    </div>

                    <div>
                        <span>Location</span>
                        <strong style="font-size:15px">
                            ${escapeHTML(job.location)}
                        </strong>
                    </div>
                </div>


                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="bi bi-clock"></i>
                    </div>

                    <div>
                        <span>Type</span>
                        <strong style="font-size:15px">
                            ${escapeHTML(job.type)}
                        </strong>
                    </div>
                </div>


                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="bi bi-briefcase"></i>
                    </div>

                    <div>
                        <span>Experience</span>
                        <strong style="font-size:15px">
                            ${escapeHTML(job.experience)}
                        </strong>
                    </div>
                </div>


                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="bi bi-currency-rupee"></i>
                    </div>

                    <div>
                        <span>Salary</span>
                        <strong style="font-size:15px">
                            ${escapeHTML(job.salary || "Not specified")}
                        </strong>
                    </div>
                </div>

            </div>


            <h3>
                Required Skills
            </h3>

            <p style="
                margin-top:10px;
                color:#667371;
                font-size:14px;
                line-height:1.7;
            ">
                ${escapeHTML(job.skills)}
            </p>


            <h3 style="
                margin-top:25px;
            ">
                Job Description
            </h3>

            <p style="
                margin-top:10px;
                color:#667371;
                font-size:14px;
                line-height:1.8;
            ">
                ${escapeHTML(job.description)}
            </p>


            <div style="
                margin-top:28px;
                display:flex;
                gap:10px;
            ">

                <button
                    class="primary-btn"
                    onclick="showOwnerPage('candidates')">

                    <i class="bi bi-stars"></i>

                    Analyze Candidates

                </button>


                <button
                    class="secondary-btn"
                    onclick="showOwnerPage('jobs')">

                    Back to Jobs

                </button>

            </div>

        </div>

    `;

}


/* =====================================================
   CANDIDATES PAGE
===================================================== */

function renderCandidatesPage() {

    const content =
        document.getElementById(
            "dashboardContent"
        );


    content.innerHTML = `

        <div class="page-header">

            <span class="dashboard-eyebrow">
                AI CANDIDATE MATCHING
            </span>

            <h1>
                Analyze Candidates
            </h1>

            <p>
                HireWise will analyze candidate profiles
                against your job requirements.
            </p>

        </div>


        <div class="content-card">

            <div class="empty-state">

                <i class="bi bi-stars"></i>

                <h3>
                    Candidate analysis is ready
                </h3>

                <p>
                    Once candidates are available,
                    the backend AI matching engine will
                    calculate match scores, matched skills,
                    missing skills and explanations.
                </p>

                <button
                    class="primary-btn"
                    style="margin-top:20px"
                    onclick="runMockCandidateAnalysis()">

                    <i class="bi bi-magic"></i>

                    Run Demo Analysis

                </button>

            </div>

        </div>

    `;

}


/* =====================================================
   MOCK CANDIDATE ANALYSIS
===================================================== */

function runMockCandidateAnalysis() {

    const content =
        document.getElementById(
            "dashboardContent"
        );


    const candidates = [

        {
            name: "Aarav Sharma",
            role: "Frontend Developer",
            score: 94,
            matched: "React, JavaScript, HTML, CSS, Git",
            missing: "TypeScript",
            experience: "3 Years"
        },

        {
            name: "Priya Nair",
            role: "Frontend Developer",
            score: 89,
            matched: "React, JavaScript, CSS, Figma",
            missing: "Git",
            experience: "2 Years"
        },

        {
            name: "Rohan Mehta",
            role: "Full Stack Developer",
            score: 82,
            matched: "React, JavaScript, Git",
            missing: "TypeScript, Figma",
            experience: "4 Years"
        },

        {
            name: "Sneha Reddy",
            role: "UI Developer",
            score: 76,
            matched: "HTML, CSS, JavaScript",
            missing: "React, Git",
            experience: "2 Years"
        }

    ];


    let html = `

        <div class="page-header">

            <span class="dashboard-eyebrow">
                AI MATCH RESULTS
            </span>

            <h1>
                Candidate Rankings
            </h1>

            <p>
                Candidates ranked by relevance to
                the selected job.
            </p>

        </div>

    `;


    candidates.forEach(function(candidate, index) {

        html += `

            <div class="job-card"
                 style="margin-bottom:15px">

                <div class="job-card-left">

                    <div class="job-card-icon">

                        <strong>
                            ${index + 1}
                        </strong>

                    </div>

                    <div>

                        <h3>
                            ${candidate.name}
                        </h3>

                        <p>
                            ${candidate.role}
                            •
                            ${candidate.experience}
                        </p>

                        <div class="job-card-meta">

                            <span>
                                Matched:
                                ${candidate.matched}
                            </span>

                        </div>

                    </div>

                </div>


                <div style="
                    text-align:right;
                    min-width:100px;
                ">

                    <strong style="
                        display:block;
                        color:#0f766e;
                        font-size:25px;
                    ">
                        ${candidate.score}%
                    </strong>

                    <span style="
                        color:#667371;
                        font-size:11px;
                    ">
                        AI Match
                    </span>

                </div>

            </div>

        `;

    });


    content.innerHTML = html;

}


/* =====================================================
   DOCUMENT VERIFICATION
===================================================== */

/* =====================================================
   AI DOCUMENT VERIFICATION
===================================================== */

function renderVerificationPage() {

    const content =
        document.getElementById(
            "dashboardContent"
        );


    const documents = [

        {
            id: 1,
            candidate: "Aarav Sharma",
            document: "B.Tech Degree Certificate",
            type: "Academic Document",
            status: "Pending",
            result: "success",
            confidence: 94,
            risk: "Low",
            message: "Document appears genuine."
        },

        {
            id: 2,
            candidate: "Priya Nair",
            document: "Identity Document",
            type: "Identity Verification",
            status: "Pending",
            result: "success",
            confidence: 91,
            risk: "Low",
            message: "Identity information appears consistent."
        },

        {
            id: 3,
            candidate: "Rohan Mehta",
            document: "B.Tech Degree Certificate",
            type: "Academic Document",
            status: "Pending",
            result: "danger",
            confidence: 87,
            risk: "High",
            message: "Potential document manipulation detected."
        },

        {
            id: 4,
            candidate: "Sneha Reddy",
            document: "Internship Certificate",
            type: "Professional Document",
            status: "Pending",
            result: "warning",
            confidence: 58,
            risk: "Medium",
            message: "Manual review recommended."
        }

    ];


    window.hireWiseVerificationDocuments =
        documents;


    content.innerHTML = `

        <div class="page-header">

            <span class="dashboard-eyebrow">
                AI DOCUMENT VERIFICATION
            </span>

            <h1>
                Document Verification
            </h1>

            <p>
                HireWise AI analyzes uploaded documents
                for authenticity, consistency and
                possible tampering.
            </p>

        </div>


        <div class="stats-grid">

            <div class="stat-card">

                <div class="stat-icon">
                    <i class="bi bi-files"></i>
                </div>

                <div>
                    <span>Total Documents</span>
                    <strong>
                        ${documents.length}
                    </strong>
                </div>

            </div>


            <div class="stat-card">

                <div class="stat-icon">
                    <i class="bi bi-hourglass-split"></i>
                </div>

                <div>
                    <span>Awaiting Verification</span>
                    <strong>
                        ${documents.length}
                    </strong>
                </div>

            </div>


            <div class="stat-card">

                <div class="stat-icon">
                    <i class="bi bi-shield-check"></i>
                </div>

                <div>
                    <span>AI Verification</span>
                    <strong>
                        Ready
                    </strong>
                </div>

            </div>


            <div class="stat-card">

                <div class="stat-icon">
                    <i class="bi bi-stars"></i>
                </div>

                <div>
                    <span>AI Engine</span>
                    <strong>
                        Active
                    </strong>
                </div>

            </div>

        </div>


        <div class="section-heading">

            <span class="dashboard-eyebrow">
                VERIFICATION QUEUE
            </span>

            <h2>
                Candidate Documents
            </h2>

        </div>


        <div class="verification-grid">

            ${documents
                .map(function(documentItem) {

                    return createVerificationDocumentCard(
                        documentItem
                    );

                })
                .join("")}

        </div>

    `;

}


function createVerificationDocumentCard(
    documentItem
) {

    return `

        <div class="verification-card">

            <div class="verification-card-top">

                <div class="verification-document">

                    <div class="verification-document-icon">

                        <i class="bi bi-file-earmark-text-fill"></i>

                    </div>

                    <div>

                        <h3>
                            ${escapeHTML(
                                documentItem.document
                            )}
                        </h3>

                        <p>
                            ${escapeHTML(
                                documentItem.candidate
                            )}
                            •
                            ${escapeHTML(
                                documentItem.type
                            )}
                        </p>

                    </div>

                </div>


                <span class="verification-status pending">

                    Pending

                </span>

            </div>


            <div class="verification-card-bottom">

                <span style="
                    color:#667371;
                    font-size:10px;
                ">

                    <i class="bi bi-stars"></i>

                    AI analysis available

                </span>


                <button
                    class="verify-ai-btn"
                    onclick="startAIVerification(${documentItem.id})">

                    <i class="bi bi-stars"></i>

                    Verify with AI

                </button>

            </div>

        </div>

    `;

}


/* =====================================================
   START AI VERIFICATION
===================================================== */

function startAIVerification(
    documentId
) {

    const documents =
        window.hireWiseVerificationDocuments || [];


    const documentItem =
        documents.find(function(item) {

            return item.id === documentId;

        });


    if (!documentItem) {
        return;
    }


    const overlay =
        document.createElement("div");


    overlay.className =
        "ai-verification-overlay";


    overlay.id =
        "aiVerificationOverlay";


    overlay.innerHTML = `

        <div class="ai-verification-modal">

            <div class="ai-modal-header">

                <div class="ai-modal-title">

                    <div class="ai-modal-icon">

                        <i class="bi bi-stars"></i>

                    </div>

                    <div>

                        <h2>
                            AI Document Verification
                        </h2>

                        <p>
                            ${escapeHTML(
                                documentItem.document
                            )}
                            •
                            ${escapeHTML(
                                documentItem.candidate
                            )}
                        </p>

                    </div>

                </div>


                <button
                    class="ai-modal-close"
                    onclick="closeAIVerification()">

                    <i class="bi bi-x-lg"></i>

                </button>

            </div>


            <div class="ai-verification-progress">

                <div class="ai-progress-header">

                    <span id="aiProgressText">
                        Preparing AI analysis...
                    </span>

                    <strong id="aiProgressPercent">
                        0%
                    </strong>

                </div>


                <div class="ai-progress-track">

                    <div
                        id="aiProgressBar"
                        class="ai-progress-bar">
                    </div>

                </div>

            </div>


            <div class="ai-verification-steps">

                ${createAIStep(
                    1,
                    "Document received",
                    "bi-file-earmark-check"
                )}

                ${createAIStep(
                    2,
                    "OCR text extraction",
                    "bi-file-text"
                )}

                ${createAIStep(
                    3,
                    "Document structure analysis",
                    "bi-layout-text-window"
                )}

                ${createAIStep(
                    4,
                    "Candidate information matching",
                    "bi-person-check"
                )}

                ${createAIStep(
                    5,
                    "Institution / certificate consistency",
                    "bi-building-check"
                )}

                ${createAIStep(
                    6,
                    "Tampering and manipulation analysis",
                    "bi-shield-exclamation"
                )}

            </div>


            <div id="aiVerificationResult"></div>

        </div>

    `;


    document.body.appendChild(
        overlay
    );


    runAIVerificationSteps(
        documentItem
    );

}


function createAIStep(
    number,
    text,
    icon
) {

    return `

        <div
            id="aiStep${number}"
            class="ai-verification-step">

            <div class="ai-step-icon">

                <i class="bi ${icon}"></i>

            </div>

            <span>
                ${text}
            </span>

        </div>

    `;

}


/* =====================================================
   RUN AI STEPS
===================================================== */

function runAIVerificationSteps(
    documentItem
) {

    const steps = [

        "Document received",
        "OCR text extraction",
        "Document structure analysis",
        "Candidate information matching",
        "Institution / certificate consistency",
        "Tampering and manipulation analysis"

    ];


    let currentStep = 0;


    const progressBar =
        document.getElementById(
            "aiProgressBar"
        );


    const progressText =
        document.getElementById(
            "aiProgressText"
        );


    const progressPercent =
        document.getElementById(
            "aiProgressPercent"
        );


    function nextStep() {

        if (currentStep > 0) {

            const previous =
                document.getElementById(
                    "aiStep" + currentStep
                );

            if (previous) {

                previous.classList.remove(
                    "active"
                );

                previous.classList.add(
                    "complete"
                );


                const icon =
                    previous.querySelector(
                        ".ai-step-icon"
                    );


                if (icon) {

                    icon.innerHTML =
                        '<i class="bi bi-check-lg"></i>';

                }

            }

        }


        currentStep++;


        if (currentStep <= steps.length) {

            const current =
                document.getElementById(
                    "aiStep" + currentStep
                );


            if (current) {

                current.classList.add(
                    "active"
                );

            }


            const progress =
                Math.round(
                    (
                        currentStep /
                        steps.length
                    ) * 100
                );


            if (progressBar) {

                progressBar.style.width =
                    progress + "%";

            }


            if (progressPercent) {

                progressPercent.textContent =
                    progress + "%";

            }


            if (progressText) {

                progressText.textContent =
                    steps[currentStep - 1] + "...";

            }


            setTimeout(
                nextStep,
                850
            );


        } else {

            if (progressText) {

                progressText.textContent =
                    "AI verification completed";

            }


            showAIVerificationResult(
                documentItem
            );

        }

    }


    nextStep();

}


/* =====================================================
   AI RESULT
===================================================== */

function showAIVerificationResult(
    documentItem
) {

    const resultContainer =
        document.getElementById(
            "aiVerificationResult"
        );


    if (!resultContainer) {
        return;
    }


    let resultClass =
        "success";


    let icon =
        "bi-check-circle-fill";


    let title =
        "Document Appears Genuine";


    if (documentItem.result === "danger") {

        resultClass =
            "danger";

        icon =
            "bi-x-circle-fill";

        title =
            "Verification Failed";

    }


    if (documentItem.result === "warning") {

        resultClass =
            "warning";

        icon =
            "bi-exclamation-triangle-fill";

        title =
            "Manual Review Recommended";

    }


    resultContainer.innerHTML = `

        <div class="
            ai-result-panel
            ${resultClass}
        ">

            <div class="ai-result-header">

                <div class="ai-result-title">

                    <i class="bi ${icon}"></i>

                    <div>

                        <h3>
                            ${title}
                        </h3>

                    </div>

                </div>


                <div class="ai-confidence">

                    <strong>
                        ${documentItem.confidence}%
                    </strong>

                    <span>
                        AI CONFIDENCE
                    </span>

                </div>

            </div>


            <div class="ai-result-details">

                <div class="ai-result-detail">

                    <span>
                        Candidate
                    </span>

                    <strong>
                        ${escapeHTML(
                            documentItem.candidate
                        )}
                    </strong>

                </div>


                <div class="ai-result-detail">

                    <span>
                        Document
                    </span>

                    <strong>
                        ${escapeHTML(
                            documentItem.document
                        )}
                    </strong>

                </div>


                <div class="ai-result-detail">

                    <span>
                        AI Result
                    </span>

                    <strong>
                        ${escapeHTML(
                            documentItem.message
                        )}
                    </strong>

                </div>


                <div class="ai-result-detail">

                    <span>
                        Analysis
                    </span>

                    <strong>
                        OCR + Structure + Consistency
                    </strong>

                </div>

            </div>


            <div class="ai-risk">

                <i class="bi bi-shield-exclamation"></i>

                Tampering Risk:

                <strong>
                    ${documentItem.risk}
                </strong>

            </div>


            <div class="ai-verification-footer">

                <button
                    class="primary-btn"
                    onclick="closeAIVerification()">

                    Done

                    <i class="bi bi-check-lg"></i>

                </button>

            </div>

        </div>

    `;

}


function closeAIVerification() {

    const overlay =
        document.getElementById(
            "aiVerificationOverlay"
        );


    if (overlay) {

        overlay.remove();

    }

}


function createVerificationCard(
    candidate,
    documentName,
    status,
    confidence
) {

    let icon =
        "bi-file-earmark-text";


    let statusClass =
        "primary";


    if (status === "Verified") {

        icon =
            "bi-check-circle-fill";

        statusClass =
            "success";

    }


    if (status === "Rejected") {

        icon =
            "bi-x-circle-fill";

        statusClass =
            "danger";

    }


    if (status === "Pending Review") {

        icon =
            "bi-hourglass-split";

        statusClass =
            "warning";

    }


    return `

        <div class="job-card">

            <div class="job-card-left">

                <div class="job-card-icon">

                    <i class="bi ${icon}"></i>

                </div>

                <div>

                    <h3>
                        ${candidate}
                    </h3>

                    <p>
                        ${documentName}
                    </p>

                    <div class="job-card-meta">

                        <span>
                            ${confidence}
                        </span>

                    </div>

                </div>

            </div>


            <strong style="
                color:${
                    statusClass === "success"
                        ? "#15803d"
                        : statusClass === "danger"
                        ? "#dc2626"
                        : statusClass === "warning"
                        ? "#d97706"
                        : "#0f766e"
                };
                font-size:12px;
            ">

                ${status}

            </strong>

        </div>

    `;

}


/* =====================================================
   SETTINGS
===================================================== */

function renderSettingsPage() {

    const content =
        document.getElementById(
            "dashboardContent"
        );


    content.innerHTML = `

        <div class="page-header">

            <span class="dashboard-eyebrow">
                WORKSPACE SETTINGS
            </span>

            <h1>
                Settings
            </h1>

            <p>
                Manage your HireWise recruiter workspace.
            </p>

        </div>


        <div class="content-card">

            <h3>
                Account
            </h3>

            <p style="
                margin-top:10px;
                color:#667371;
                font-size:13px;
            ">
                Your account is currently running
                in frontend demo mode.
            </p>


            <div style="
                margin-top:25px;
                padding:18px;
                border-radius:12px;
                background:#f1f8f7;
            ">

                <strong>
                    Demo Mode
                </strong>

                <p style="
                    margin-top:5px;
                    color:#667371;
                    font-size:12px;
                ">
                    Backend API integration will replace
                    the local demo data later.
                </p>

            </div>

        </div>

    `;

}


/* =====================================================
   LOGOUT
===================================================== */

function logout() {

    localStorage.removeItem(
        "hirewiseUser"
    );


    hideAllScreens();


    showScreen("authScreen");


    showLogin();

}


/* =====================================================
   HTML SAFETY
===================================================== */

function escapeHTML(value) {

    if (value === undefined ||
        value === null) {

        return "";

    }


    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}
/* =====================================================
   EMPLOYEE DASHBOARD
===================================================== */

function showEmployeeDashboard() {
    hideAllScreens();

    const employeeDashboard =
        document.getElementById("employeeDashboard");

    if (employeeDashboard) {
        employeeDashboard.classList.remove("hidden");
    }
}
/* =====================================================
   EMPLOYEE NAVIGATION + PROFILE
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const employeeDashboard =
        document.getElementById("employeeDashboard");

    if (!employeeDashboard) return;

    const content =
        employeeDashboard.querySelector(".employee-content");

    const navItems =
        employeeDashboard.querySelectorAll(".employee-nav-item");

    if (!content) return;


    /* ---------------------------------------------
       ORIGINAL DASHBOARD
    --------------------------------------------- */

    const dashboardHTML = content.innerHTML;


    /* ---------------------------------------------
       NAVIGATION
    --------------------------------------------- */

    navItems.forEach(function (button) {

        const label = button.textContent.trim();

        button.addEventListener("click", function () {

            navItems.forEach(function (item) {
                item.classList.remove("active");
            });

            button.classList.add("active");


            if (label === "Dashboard") {

                content.innerHTML = dashboardHTML;

                return;
            }


            if (label === "My Profile") {

                renderEmployeeProfilePage();

                return;
            }


            if (label === "My Resume") {

    renderEmployeeResumePage();

    return;
}

           if (label === "Documents") {

    renderEmployeeDocumentsPage();

    return;
}


if (label === "Job Opportunities") {
    const jobs = [
        {
            id: 1,
            title: "Frontend Developer",
            company: "TechNova Solutions",
            location: "Bengaluru, India",
            type: "Full-time",
            experience: "1–3 Years",
            skills: ["HTML", "CSS", "JavaScript", "React"],
            description:
                "Build modern and responsive web applications and work with a collaborative product team."
        },
        {
            id: 2,
            title: "UI/UX Designer",
            company: "Creative Labs",
            location: "Remote",
            type: "Full-time",
            experience: "1–2 Years",
            skills: ["Figma", "UI Design", "UX", "Prototyping"],
            description:
                "Design intuitive user experiences and create clean, user-friendly interfaces for digital products."
        },
        {
            id: 3,
            title: "Full Stack Developer",
            company: "InnovateHub",
            location: "Bengaluru, India",
            type: "Full-time",
            experience: "2–4 Years",
            skills: ["JavaScript", "React", "Python", "SQL"],
            description:
                "Develop frontend and backend features and help build scalable web applications."
        }
    ];

    const applications =
        JSON.parse(localStorage.getItem("hirewiseApplications")) || [];

    content.innerHTML = `
        <div class="employee-page-header">
            <p class="employee-eyebrow">OPPORTUNITIES</p>
            <h2>Job Opportunities</h2>
            <p>Find jobs that match your skills and experience.</p>
        </div>

        <div class="jobs-container">
            ${jobs.map(job => {
                const alreadyApplied = applications.some(
                    application => application.jobId === job.id
                );

                return `
                    <div class="job-card">
                        <div class="job-card-header">
                            <div>
                                <h3>${escapeHTML(job.title)}</h3>
                                <p class="job-company">
                                    ${escapeHTML(job.company)}
                                </p>
                            </div>

                            <span class="job-type">
                                ${escapeHTML(job.type)}
                            </span>
                        </div>

                        <div class="job-details">
                            <span>📍 ${escapeHTML(job.location)}</span>
                            <span>💼 ${escapeHTML(job.experience)}</span>
                        </div>

                        <p class="job-description">
                            ${escapeHTML(job.description)}
                        </p>

                        <div class="job-skills">
                            ${job.skills.map(skill => `
                                <span class="job-skill">
                                    ${escapeHTML(skill)}
                                </span>
                            `).join("")}
                        </div>

                        <button
                            class="job-apply-btn"
                            onclick="applyForJob(${job.id})"
                            ${alreadyApplied ? "disabled" : ""}
                        >
                            ${alreadyApplied ? "Applied ✓" : "Apply Now"}
                        </button>
                    </div>
                `;
            }).join("")}
        </div>
    `;

    return;
}

           if (label === "My Applications") {
    const applications =
        JSON.parse(localStorage.getItem("hirewiseApplications")) || [];

    const jobs = [
        {
            id: 1,
            title: "Frontend Developer",
            company: "TechNova Solutions",
            location: "Bengaluru, India"
        },
        {
            id: 2,
            title: "UI/UX Designer",
            company: "Creative Labs",
            location: "Remote"
        },
        {
            id: 3,
            title: "Full Stack Developer",
            company: "InnovateHub",
            location: "Bengaluru, India"
        }
    ];

    const appliedJobs = applications.map(application => {
        const job = jobs.find(j => j.id === application.jobId);

        if (!job) return "";

        const appliedDate = application.appliedAt
            ? new Date(application.appliedAt).toLocaleDateString()
            : "Recently";

        return `
            <div class="application-card">
                <div class="application-card-main">
                    <div>
                        <h3>${escapeHTML(job.title)}</h3>
                        <p class="application-company">
                            ${escapeHTML(job.company)}
                        </p>
                    </div>

                    <span class="application-status">
                        ${escapeHTML(application.status || "Applied")}
                    </span>
                </div>

                <div class="application-details">
                    <span>📍 ${escapeHTML(job.location)}</span>
                    <span>📅 Applied ${escapeHTML(appliedDate)}</span>
                </div>
            </div>
        `;
    }).join("");

    content.innerHTML = `
        <div class="employee-page-header">
            <p class="employee-eyebrow">APPLICATIONS</p>
            <h2>My Applications</h2>
            <p>Track the jobs you have applied for.</p>
        </div>

        ${
            applications.length === 0
                ? `
                    <div class="employee-placeholder-card">
                        <h3>No applications yet</h3>
                        <p>
                            Apply for a job from Job Opportunities and
                            your application will appear here.
                        </p>
                    </div>
                `
                : `
                    <div class="applications-container">
                        ${appliedJobs}
                    </div>
                `
        }
    `;

    return;
}

         
        });

    });

});
function applyForJob(jobId) {
    const applications =
        JSON.parse(localStorage.getItem("hirewiseApplications")) || [];

    const alreadyApplied = applications.some(
        application => application.jobId === jobId
    );

    if (alreadyApplied) {
        alert("You have already applied for this job.");
        return;
    }

    applications.push({
        jobId: jobId,
        status: "Applied",
        appliedAt: new Date().toISOString()
    });

    localStorage.setItem(
        "hirewiseApplications",
        JSON.stringify(applications)
    );

    alert("Application submitted successfully!");

    // Refresh Job Opportunities page
    const opportunitiesNav = Array.from(
        document.querySelectorAll("[data-label]")
    ).find(element =>
        element.getAttribute("data-label") === "Job Opportunities"
    );

    if (opportunitiesNav) {
        opportunitiesNav.click();
    }
}
function analyzeResume() {
    const resumeInput =
        document.getElementById("resumeTextInput");

    const result =
        document.getElementById("resumeAnalysisResult");

    const button =
        document.getElementById("analyzeResumeBtn");

    if (!resumeInput || !result) {
        return;
    }

    const resumeText = resumeInput.value.trim();

    if (!resumeText) {
        alert("Please paste your resume details first.");
        return;
    }

    button.disabled = true;
    button.textContent = "Analyzing resume...";

    result.innerHTML = `
        <div class="resume-analysis-loading">
            <div class="resume-loading-icon">✦</div>

            <h3>Analyzing your resume</h3>

            <p>
                Checking skills, experience and job readiness...
            </p>

            <div class="resume-progress">
                <div class="resume-progress-bar"></div>
            </div>
        </div>
    `;

    setTimeout(() => {
        const text = resumeText.toLowerCase();

        let score = 70;

        const skills = [
            "javascript",
            "html",
            "css",
            "react",
            "python",
            "java",
            "sql",
            "figma",
            "git"
        ];

        const foundSkills = skills.filter(skill =>
            text.includes(skill)
        );

        score += Math.min(foundSkills.length * 3, 18);

        if (text.length > 500) {
            score += 5;
        }

        score = Math.min(score, 95);

        const missingSkills = skills
            .filter(skill => !foundSkills.includes(skill))
            .slice(0, 4);

        const strengths = [];

        if (foundSkills.length > 0) {
            strengths.push(
                `Technical skills detected: ${foundSkills.join(", ")}`
            );
        }

        if (text.length > 300) {
            strengths.push(
                "Your resume contains useful career information."
            );
        }

        if (text.length > 700) {
            strengths.push(
                "Good level of detail in your resume."
            );
        }

        if (strengths.length === 0) {
            strengths.push(
                "Your resume has a starting foundation to build on."
            );
        }

        result.innerHTML = `
            <div class="resume-analysis-card">

                <div class="resume-score-section">
                    <div class="resume-score-circle">
                        <strong>${score}</strong>
                        <span>/100</span>
                    </div>

                    <div>
                        <p class="employee-eyebrow">
                            RESUME INSIGHT
                        </p>

                        <h3>
                            Your resume is
                            ${score >= 85
                                ? "strong"
                                : score >= 75
                                    ? "on the right track"
                                    : "ready for improvement"}
                        </h3>

                        <p>
                            Here are some areas that can help
                            you stand out to recruiters.
                        </p>
                    </div>
                </div>

                <div class="resume-analysis-grid">

                    <div class="resume-insight-box">
                        <h4>💪 Strengths</h4>

                        <ul>
                            ${strengths.map(item => `
                                <li>${escapeHTML(item)}</li>
                            `).join("")}
                        </ul>
                    </div>

                    <div class="resume-insight-box">
                        <h4>🎯 Skills Detected</h4>

                        ${
                            foundSkills.length
                                ? foundSkills.map(skill => `
                                    <span class="resume-skill-tag">
                                        ${escapeHTML(skill)}
                                    </span>
                                `).join("")
                                : "<p>No specific skills detected yet.</p>"
                        }
                    </div>

                    <div class="resume-insight-box">
                        <h4>🚀 Improve Your Resume</h4>

                        <ul>
                            <li>Use measurable achievements where possible.</li>
                            <li>Keep your strongest skills easy to find.</li>
                            <li>Tailor your resume to the job description.</li>
                        </ul>
                    </div>

                    <div class="resume-insight-box">
                        <h4>🔍 Consider Adding</h4>

                        ${
                            missingSkills.length
                                ? missingSkills.map(skill => `
                                    <span class="resume-missing-tag">
                                        ${escapeHTML(skill)}
                                    </span>
                                `).join("")
                                : "<p>Your resume covers many common skills.</p>"
                        }
                    </div>

                </div>

                <div class="resume-standout-box">
                    <div>
                        <span class="standout-label">
                            ✦ WHAT MAKES YOU STAND OUT
                        </span>

                        <h3>
                            Turn skills into evidence.
                        </h3>

                        <p>
                            Recruiters don't just want to know what
                            you can do. Show what you achieved,
                            what you built, and the impact you made.
                        </p>
                    </div>

                    <div class="standout-example">
                        <span>Instead of</span>
                        <p>
                            "Worked on React projects"
                        </p>

                        <span>Try</span>
                        <p>
                            "Built a React dashboard that improved
                            task tracking for the team."
                        </p>
                    </div>
                </div>

            </div>
        `;

        button.disabled = false;
        button.textContent = "✨ Analyze My Resume";

    }, 1200);
}
/* =====================================================
   EMPLOYEE PROFILE
===================================================== */

function getEmployeeProfile() {

    const saved =
        localStorage.getItem("hirewiseEmployeeProfile");

    if (saved) {
        return JSON.parse(saved);
    }

    return {
        fullName: "",
        email: "",
        phone: "",
        location: "",
        jobTitle: "",
        education: "",
        skills: "",
        experience: ""
    };
}


/* ---------------------------------------------
   RENDER PROFILE PAGE
--------------------------------------------- */

function renderEmployeeProfilePage() {

    const dashboard =
        document.getElementById("employeeDashboard");

    if (!dashboard) return;

    const content =
        dashboard.querySelector(".employee-content");

    if (!content) return;

    const profile =
        getEmployeeProfile();

    content.innerHTML = `

        <div class="employee-page-header">

            <div>

                <p class="employee-eyebrow">
                    MY PROFILE
                </p>

                <h2>Build your professional profile</h2>

                <p>
                    Keep your information updated so HireWise
                    can match you with better opportunities.
                </p>

            </div>

            <div class="profile-completion-box">

                <strong id="profileCompletion">
                    0%
                </strong>

                <span>
                    Profile Complete
                </span>

            </div>

        </div>


        <form
            id="employeeProfileForm"
            class="employee-profile-form"
        >

            <div class="profile-form-grid">


                <!-- FULL NAME -->

                <div class="profile-field">

                    <label>
                        Full Name
                    </label>

                    <input
                        type="text"
                        id="employeeFullName"
                        placeholder="Enter your full name"
                        value="${escapeProfileValue(profile.fullName)}"
                    >

                </div>


                <!-- EMAIL -->

                <div class="profile-field">

                    <label>
                        Email Address
                    </label>

                    <input
                        type="email"
                        id="employeeEmail"
                        placeholder="Enter your email"
                        value="${escapeProfileValue(profile.email)}"
                    >

                </div>


                <!-- PHONE -->

                <div class="profile-field">

                    <label>
                        Phone Number
                    </label>

                    <input
                        type="tel"
                        id="employeePhone"
                        placeholder="Enter your phone number"
                        value="${escapeProfileValue(profile.phone)}"
                    >

                </div>


                <!-- LOCATION -->

                <div class="profile-field">

                    <label>
                        Location
                    </label>

                    <input
                        type="text"
                        id="employeeLocation"
                        placeholder="e.g. Bengaluru"
                        value="${escapeProfileValue(profile.location)}"
                    >

                </div>


                <!-- JOB TITLE -->

                <div class="profile-field">

                    <label>
                        Current Job Title
                    </label>

                    <input
                        type="text"
                        id="employeeJobTitle"
                        placeholder="e.g. Frontend Developer"
                        value="${escapeProfileValue(profile.jobTitle)}"
                    >

                </div>


                <!-- EDUCATION -->

                <div class="profile-field">

                    <label>
                        Education
                    </label>

                    <input
                        type="text"
                        id="employeeEducation"
                        placeholder="e.g. B.Tech Computer Science"
                        value="${escapeProfileValue(profile.education)}"
                    >

                </div>


                <!-- SKILLS -->

                <div class="profile-field profile-field-full">

                    <label>
                        Skills
                    </label>

                    <textarea
                        id="employeeSkills"
                        placeholder="e.g. React, JavaScript, HTML, CSS, Git"
                    >${escapeProfileText(profile.skills)}</textarea>

                    <small>
                        Separate multiple skills with commas.
                    </small>

                </div>


                <!-- EXPERIENCE -->

                <div class="profile-field profile-field-full">

                    <label>
                        Professional Experience
                    </label>

                    <textarea
                        id="employeeExperience"
                        placeholder="Describe your professional experience..."
                    >${escapeProfileText(profile.experience)}</textarea>

                </div>

            </div>


            <div class="profile-form-footer">

                <p id="profileSaveMessage"></p>

                <button
                    type="submit"
                    class="profile-save-button"
                >
                    Save Profile
                </button>

            </div>

        </form>
    `;


    const form =
        document.getElementById("employeeProfileForm");

    if (form) {

        form.addEventListener(
            "submit",
            saveEmployeeProfile
        );

    }

    updateEmployeeProfileCompletion();

}


/* ---------------------------------------------
   SAVE PROFILE
--------------------------------------------- */

function saveEmployeeProfile(event) {

    event.preventDefault();

    const profile = {

        fullName:
            document.getElementById("employeeFullName").value.trim(),

        email:
            document.getElementById("employeeEmail").value.trim(),

        phone:
            document.getElementById("employeePhone").value.trim(),

        location:
            document.getElementById("employeeLocation").value.trim(),

        jobTitle:
            document.getElementById("employeeJobTitle").value.trim(),

        education:
            document.getElementById("employeeEducation").value.trim(),

        skills:
            document.getElementById("employeeSkills").value.trim(),

        experience:
            document.getElementById("employeeExperience").value.trim()

    };


    localStorage.setItem(
        "hirewiseEmployeeProfile",
        JSON.stringify(profile)
    );


    updateEmployeeProfileCompletion();


    const message =
        document.getElementById("profileSaveMessage");

    if (message) {

        message.textContent =
            "✓ Profile saved successfully";

        message.classList.add("success");

        setTimeout(function () {

            message.textContent = "";

        }, 3000);

    }

}


/* ---------------------------------------------
   PROFILE COMPLETION
--------------------------------------------- */

function updateEmployeeProfileCompletion() {

    const profile =
        getEmployeeProfile();

    const fields = [
        profile.fullName,
        profile.email,
        profile.phone,
        profile.location,
        profile.jobTitle,
        profile.education,
        profile.skills,
        profile.experience
    ];

    const completed =
        fields.filter(function (value) {
            return value && value.trim() !== "";
        }).length;

    const percentage =
        Math.round((completed / fields.length) * 100);


    const completion =
        document.getElementById("profileCompletion");

    if (completion) {
        completion.textContent =
            percentage + "%";
    }

}


/* ---------------------------------------------
   SAFE PROFILE TEXT
--------------------------------------------- */

function escapeProfileValue(value) {

    if (!value) return "";

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}


function escapeProfileText(value) {

    if (!value) return "";

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}
/* =====================================================
   EMPLOYEE RESUME
===================================================== */

function getEmployeeResume() {

    const saved =
        localStorage.getItem("hirewiseEmployeeResume");

    if (saved) {
        return JSON.parse(saved);
    }

    return null;
}


/* ---------------------------------------------
   RENDER RESUME PAGE
--------------------------------------------- */

function renderEmployeeResumePage() {

    const dashboard =
        document.getElementById("employeeDashboard");

    if (!dashboard) return;

    const content =
        dashboard.querySelector(".employee-content");

    if (!content) return;

    const resume =
        getEmployeeResume();


    content.innerHTML = `

        <div class="employee-page-header">

            <div>

                <p class="employee-eyebrow">
                    MY RESUME
                </p>

                <h2>Manage your resume</h2>

                <p>
                    Keep your latest resume ready for job
                    applications and AI-powered analysis.
                </p>

            </div>

        </div>


        ${
            resume
            ? createUploadedResumeHTML(resume)
            : createResumeUploadHTML()
        }

    `;


    setupResumeUpload();

}


/* ---------------------------------------------
   UPLOAD AREA
--------------------------------------------- */

function createResumeUploadHTML() {

    return `

        <div class="resume-upload-card">

            <div class="resume-upload-icon">
                ↑
            </div>

            <h3>
                Upload your resume
            </h3>

            <p>
                Upload your latest resume to use it for
                job applications and AI analysis.
            </p>


            <label class="resume-upload-button">

                Choose Resume

                <input
                    type="file"
                    id="employeeResumeInput"
                    accept=".pdf,.doc,.docx"
                    hidden
                >

            </label>


            <small>
                Supported formats: PDF, DOC, DOCX
            </small>

        </div>

    `;
}


/* ---------------------------------------------
   UPLOADED RESUME
--------------------------------------------- */

function createUploadedResumeHTML(resume) {

    return `

        <div class="resume-status-card">

            <div class="resume-status-header">

                <div class="resume-file-icon">
                    PDF
                </div>

                <div class="resume-file-info">

                    <h3>
                        ${escapeResumeText(resume.name)}
                    </h3>

                    <p>
                        Uploaded ${escapeResumeText(resume.uploadDate)}
                    </p>

                </div>

                <div class="resume-ready-badge">
                    Ready
                </div>

            </div>


            <div class="resume-progress-section">

                <div class="resume-progress-top">

                    <span>
                        Resume readiness
                    </span>

                    <strong>
                        85%
                    </strong>

                </div>

                <div class="resume-progress-bar">

                    <div
                        class="resume-progress-fill"
                        style="width:85%"
                    ></div>

                </div>

                <p>
                    Your resume is ready for job matching.
                    AI improvement tools can further enhance it.
                </p>

            </div>


            <div class="resume-actions">

                <label class="resume-replace-button">

                    Replace Resume

                    <input
                        type="file"
                        id="employeeResumeInput"
                        accept=".pdf,.doc,.docx"
                        hidden
                    >

                </label>

                <button
                    type="button"
                    class="resume-remove-button"
                    onclick="removeEmployeeResume()"
                >
                    Remove
                </button>

            </div>

        </div>

    `;
}


/* ---------------------------------------------
   FILE UPLOAD
--------------------------------------------- */

function setupResumeUpload() {

    const input =
        document.getElementById("employeeResumeInput");

    if (!input) return;


    input.addEventListener("change", function () {

        const file = input.files[0];

        if (!file) return;


        const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ];


        const extension =
            file.name.split(".").pop().toLowerCase();


        if (
            !allowedTypes.includes(file.type) &&
            !["pdf", "doc", "docx"].includes(extension)
        ) {

            alert(
                "Please upload a PDF, DOC or DOCX file."
            );

            input.value = "";

            return;
        }


        const resume = {

            name: file.name,

            type: extension.toUpperCase(),

            size: file.size,

            uploadDate:
                new Date().toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                })

        };


        localStorage.setItem(
            "hirewiseEmployeeResume",
            JSON.stringify(resume)
        );


        renderEmployeeResumePage();

    });

}


/* ---------------------------------------------
   REMOVE RESUME
--------------------------------------------- */

function removeEmployeeResume() {

    const confirmed =
        confirm(
            "Are you sure you want to remove your resume?"
        );

    if (!confirmed) return;


    localStorage.removeItem(
        "hirewiseEmployeeResume"
    );


    renderEmployeeResumePage();

}


/* ---------------------------------------------
   SAFE RESUME TEXT
--------------------------------------------- */

function escapeResumeText(value) {

    if (!value) return "";

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}
/* =====================================================
   EMPLOYEE DOCUMENTS
===================================================== */

function getEmployeeDocuments() {

    const saved =
        localStorage.getItem("hirewiseEmployeeDocuments");

    if (saved) {
        return JSON.parse(saved);
    }

    return [];
}


/* ---------------------------------------------
   SAVE DOCUMENTS
--------------------------------------------- */

function saveEmployeeDocuments(documents) {

    localStorage.setItem(
        "hirewiseEmployeeDocuments",
        JSON.stringify(documents)
    );
}


/* ---------------------------------------------
   RENDER DOCUMENT PAGE
--------------------------------------------- */

function renderEmployeeDocumentsPage() {

    const dashboard =
        document.getElementById("employeeDashboard");

    if (!dashboard) return;

    const content =
        dashboard.querySelector(".employee-content");

    if (!content) return;

    const documents =
        getEmployeeDocuments();


    content.innerHTML = `

        <div class="employee-page-header">

            <div>

                <p class="employee-eyebrow">
                    DOCUMENTS
                </p>

                <h2>My Documents</h2>

                <p>
                    Upload your certificates and important
                    documents for AI-powered verification.
                </p>

            </div>

        </div>


        <!-- UPLOAD CARD -->

        <div class="employee-document-upload-card">

            <div class="document-upload-icon">
                ↑
            </div>

            <div>

                <h3>
                    Upload a document
                </h3>

                <p>
                    Add degree certificates, identity documents,
                    internship certificates and other professional
                    documents.
                </p>

            </div>

            <label class="document-upload-button">

                Upload Document

                <input
                    type="file"
                    id="employeeDocumentInput"
                    accept=".pdf,.jpg,.jpeg,.png"
                    hidden
                >

            </label>

        </div>


        <!-- DOCUMENT LIST -->

        <div class="employee-documents-section">

            <div class="documents-section-header">

                <div>

                    <h3>
                        Uploaded Documents
                    </h3>

                    <span>
                        ${documents.length} document${documents.length === 1 ? "" : "s"}
                    </span>

                </div>

            </div>


            <div id="employeeDocumentsList">

                ${createEmployeeDocumentsList(documents)}

            </div>

        </div>

    `;


    setupEmployeeDocumentUpload();

}


/* ---------------------------------------------
   DOCUMENT LIST
--------------------------------------------- */

function createEmployeeDocumentsList(documents) {

    if (!documents.length) {

        return `

            <div class="documents-empty-state">

                <div class="documents-empty-icon">
                    📄
                </div>

                <h3>
                    No documents uploaded
                </h3>

                <p>
                    Upload your first certificate or document
                    to begin verification.
                </p>

            </div>

        `;

    }


    return documents.map(function (document) {

        return createEmployeeDocumentCard(document);

    }).join("");

}


/* ---------------------------------------------
   DOCUMENT CARD
--------------------------------------------- */

function createEmployeeDocumentCard(document) {

    let statusClass = "document-status-pending";
    let statusText = "Pending Verification";


    if (document.status === "Verified") {

        statusClass = "document-status-verified";
        statusText = "Verified";

    }


    if (document.status === "Review") {

        statusClass = "document-status-review";
        statusText = "Manual Review";

    }


    if (document.status === "Rejected") {

        statusClass = "document-status-rejected";
        statusText = "Rejected";

    }


    return `

        <div class="employee-document-card">

            <div class="document-card-main">

                <div class="document-file-icon">
                    ${document.type || "PDF"}
                </div>


                <div class="document-file-details">

                    <h4>
                        ${escapeDocumentText(document.name)}
                    </h4>

                    <p>
                        ${escapeDocumentText(document.category || "Professional Document")}
                    </p>

                    <small>
                        Uploaded ${escapeDocumentText(document.uploadDate)}
                    </small>

                </div>

            </div>


            <div class="document-card-right">

                <span class="document-status ${statusClass}">
                    ${statusText}
                </span>


                ${
                    document.status === "Pending"
                    ?
                    `
                    <button
                        type="button"
                        class="document-verify-button"
                        onclick="startEmployeeDocumentVerification(${document.id})"
                    >
                        Verify with AI
                    </button>
                    `
                    :
                    `
                    <button
                        type="button"
                        class="document-view-button"
                        onclick="showEmployeeDocumentResult(${document.id})"
                    >
                        View Result
                    </button>
                    `
                }


                <button
                    type="button"
                    class="document-delete-button"
                    onclick="removeEmployeeDocument(${document.id})"
                >
                    Remove
                </button>

            </div>

        </div>

    `;

}


/* ---------------------------------------------
   DOCUMENT UPLOAD
--------------------------------------------- */

function setupEmployeeDocumentUpload() {

    const input =
        document.getElementById("employeeDocumentInput");

    if (!input) return;


    input.addEventListener("change", function () {

        const file = input.files[0];

        if (!file) return;


        const extension =
            file.name.split(".").pop().toLowerCase();


        const allowedExtensions = [
            "pdf",
            "jpg",
            "jpeg",
            "png"
        ];


        if (!allowedExtensions.includes(extension)) {

            alert(
                "Please upload a PDF, JPG or PNG document."
            );

            input.value = "";

            return;
        }


        const documents =
            getEmployeeDocuments();


        const newDocument = {

            id: Date.now(),

            name: file.name,

            type: extension.toUpperCase(),

            category: "Professional Document",

            status: "Pending",

            confidence: null,

            risk: null,

            message: null,

            uploadDate:
                new Date().toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                })

        };


        documents.unshift(newDocument);

        saveEmployeeDocuments(documents);

        renderEmployeeDocumentsPage();

    });

}


/* ---------------------------------------------
   START AI VERIFICATION
--------------------------------------------- */

function startEmployeeDocumentVerification(documentId) {

    const documents =
        getEmployeeDocuments();

    const document =
        documents.find(function (item) {

            return item.id === documentId;

        });


    if (!document) return;


    showEmployeeVerificationModal(document);

}


/* ---------------------------------------------
   AI VERIFICATION MODAL
--------------------------------------------- */

function showEmployeeVerificationModal(document) {

    const existing =
        document.getElementById("employeeVerificationModal");

    if (existing) {
        existing.remove();
    }


    const modal =
        window.document.createElement("div");

    modal.id =
        "employeeVerificationModal";

    modal.className =
        "employee-verification-modal";


    modal.innerHTML = `

        <div class="employee-verification-box">

            <button
                class="verification-close"
                onclick="closeEmployeeVerification()"
            >
                ×
            </button>


            <div class="verification-modal-icon">
                ✦
            </div>


            <p class="employee-eyebrow">
                HIREWISE AI
            </p>


            <h2>
                Verifying Document
            </h2>


            <p class="verification-document-name">
                ${escapeDocumentText(document.name)}
            </p>


            <div class="verification-ai-status">

                <div
                    id="employeeVerificationSpinner"
                    class="verification-spinner"
                >
                </div>

                <strong id="employeeVerificationStatus">
                    AI is analyzing your document...
                </strong>

            </div>


            <div class="employee-verification-steps">

                <div
                    class="employee-verification-step"
                    id="employeeStep1"
                >
                    <span>1</span>
                    <p>Reading document</p>
                </div>

                <div
                    class="employee-verification-step"
                    id="employeeStep2"
                >
                    <span>2</span>
                    <p>Extracting document information</p>
                </div>

                <div
                    class="employee-verification-step"
                    id="employeeStep3"
                >
                    <span>3</span>
                    <p>Checking document structure</p>
                </div>

                <div
                    class="employee-verification-step"
                    id="employeeStep4"
                >
                    <span>4</span>
                    <p>Checking consistency</p>
                </div>

                <div
                    class="employee-verification-step"
                    id="employeeStep5"
                >
                    <span>5</span>
                    <p>Running authenticity analysis</p>
                </div>

            </div>


            <div class="employee-verification-progress">

                <div
                    id="employeeVerificationProgress"
                    class="employee-verification-progress-fill"
                ></div>

            </div>

        </div>

    `;


    window.document.body.appendChild(modal);


    runEmployeeVerification(document);

}


/* ---------------------------------------------
   RUN VERIFICATION
--------------------------------------------- */

function runEmployeeVerification(document) {

    const steps = [
        "Reading document...",
        "Extracting document information...",
        "Checking document structure...",
        "Checking consistency...",
        "Running authenticity analysis..."
    ];


    let currentStep = 0;


    const status =
        window.document.getElementById(
            "employeeVerificationStatus"
        );

    const progress =
        window.document.getElementById(
            "employeeVerificationProgress"
        );


    function runNextStep() {

        if (currentStep >= steps.length) {

            finishEmployeeVerification(document);

            return;
        }


        if (status) {

            status.textContent =
                steps[currentStep];

        }


        const stepElement =
            window.document.getElementById(
                "employeeStep" + (currentStep + 1)
            );


        if (stepElement) {

            stepElement.classList.add("active");

        }


        if (progress) {

            progress.style.width =
                ((currentStep + 1) / steps.length * 100) + "%";

        }


        currentStep++;


        setTimeout(
            runNextStep,
            900
        );

    }


    runNextStep();

}


/* ---------------------------------------------
   FINISH VERIFICATION
--------------------------------------------- */

function finishEmployeeVerification(document) {

    const documents =
        getEmployeeDocuments();


    const storedDocument =
        documents.find(function (item) {

            return item.id === document.id;

        });


    if (!storedDocument) return;


    /*
       FRONTEND DEMO RESULT

       Later this will come from the Flask backend.
    */

    const score =
        Math.floor(
            Math.random() * 11
        ) + 88;


    storedDocument.status = "Verified";

    storedDocument.confidence = score;

    storedDocument.risk = "Low";

    storedDocument.message =
        "Document appears consistent and authentic.";


    saveEmployeeDocuments(documents);


    showEmployeeVerificationResult(
        storedDocument
    );

}


/* ---------------------------------------------
   VERIFICATION RESULT
--------------------------------------------- */

function showEmployeeVerificationResult(document) {

    const modal =
        window.document.getElementById(
            "employeeVerificationModal"
        );

    if (!modal) return;


    modal.innerHTML = `

        <div class="employee-verification-box verification-result-box">

            <button
                class="verification-close"
                onclick="closeEmployeeVerification()"
            >
                ×
            </button>


            <div class="verification-success-icon">
                ✓
            </div>


            <p class="employee-eyebrow">
                AI VERIFICATION COMPLETE
            </p>


            <h2>
                Document Verified
            </h2>


            <p class="verification-document-name">
                ${escapeDocumentText(document.name)}
            </p>


            <div class="verification-score">

                <strong>
                    ${document.confidence}%
                </strong>

                <span>
                    Confidence Score
                </span>

            </div>


            <div class="verification-result-grid">

                <div>

                    <span>
                        Risk Level
                    </span>

                    <strong class="risk-low">
                        ${document.risk}
                    </strong>

                </div>


                <div>

                    <span>
                        Status
                    </span>

                    <strong>
                        ${document.status}
                    </strong>

                </div>

            </div>


            <div class="verification-result-message">

                <strong>
                    AI Analysis
                </strong>

                <p>
                    ${escapeDocumentText(document.message)}
                </p>

            </div>


            <button
                class="verification-done-button"
                onclick="closeEmployeeVerification()"
            >
                Done
            </button>

        </div>

    `;

}


/* ---------------------------------------------
   VIEW EXISTING RESULT
--------------------------------------------- */

function showEmployeeDocumentResult(documentId) {

    const documents =
        getEmployeeDocuments();


    const document =
        documents.find(function (item) {

            return item.id === documentId;

        });


    if (!document) return;


    showEmployeeVerificationResultModal(document);

}


function showEmployeeVerificationResultModal(document) {

    const existing =
        window.document.getElementById(
            "employeeVerificationModal"
        );

    if (existing) {
        existing.remove();
    }


    const modal =
        window.document.createElement("div");

    modal.id =
        "employeeVerificationModal";

    modal.className =
        "employee-verification-modal";


    window.document.body.appendChild(modal);


    showEmployeeVerificationResult(document);

}


/* ---------------------------------------------
   CLOSE MODAL
--------------------------------------------- */

function closeEmployeeVerification() {

    const modal =
        window.document.getElementById(
            "employeeVerificationModal"
        );

    if (modal) {
        modal.remove();
    }


    renderEmployeeDocumentsPage();

}


/* ---------------------------------------------
   REMOVE DOCUMENT
--------------------------------------------- */

function removeEmployeeDocument(documentId) {

    const confirmed =
        confirm(
            "Are you sure you want to remove this document?"
        );


    if (!confirmed) return;


    let documents =
        getEmployeeDocuments();


    documents =
        documents.filter(function (document) {

            return document.id !== documentId;

        });


    saveEmployeeDocuments(documents);

    renderEmployeeDocumentsPage();

}


/* ---------------------------------------------
   SAFE DOCUMENT TEXT
--------------------------------------------- */

function escapeDocumentText(value) {

    if (!value) return "";

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}