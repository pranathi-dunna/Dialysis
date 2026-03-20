# Dialysis Session Tracker
# Overview

A full-stack application to track dialysis sessions, monitor patient vitals, and detect anomalies per session. Designed for nurses to manage sessions efficiently and highlight clinically significant deviations.

# Tech Stack

Frontend: React + TypeScript

Backend: Node.js + Express + TypeScript

Database: MongoDB (Atlas)

# Architecture Overview

# Frontend (React):

Dashboard for session tracking

Forms for adding patients and sessions

Anomaly highlighting and filtering

# Backend (Express):

REST APIs for patients and sessions

Business logic for anomaly detection

Schedule aggregation (patients + sessions)

# Database (MongoDB):

patients collection

sessions collection

# Flow:
Frontend → API → Services → MongoDB → Response → UI

# Setup Instructions
1. Clone repo
   
git clone <your-repo-link>

2. cd ../dialysis-backend

3. Install dependencies
   
npm install

4. Configure environment

Create .env:

PORT=5001

MONGO_URI=MONGO_URI=your_mongodb_connection_string

4. Run backend

npm install

npm run dev

MongoDB connected

Server running on port 5001

6. Run frontend
   
cd ../dialysis-frontend

npm install

npm start

App runs at:

Frontend: http://localhost:3000

Backend: http://localhost:5001

#  Notes

- The `.env` file is not included in the repository for security reasons.
- Use `.env.example` as a reference to create your own `.env`.
- Ensure your MongoDB Atlas cluster allows connections from your IP.

# Clinical Assumptions & Trade-offs
# Assumptions

Excess weight change > 2.5 kg is clinically significant

High systolic BP > 180 mmHg

Normal session duration: 120–300 mins

Post-weight should be close to dry weight

# Trade-offs

Simplified anomaly thresholds (not personalized per patient)

No historical trend analysis

Status is manually controlled (not automated)

# Known Limitations

No authentication

No real-time updates

No machine analytics or logs

No patient history trends

# Future Improvements

Add authentication (roles: nurse/admin)

Auto status transitions

Graphs for weight/BP trends

Alerts/notifications system

Machine utilization analytics

# Features Implemented

Add patients (with dry weight)

Record dialysis sessions

Status tracking (not_started / in_progress / completed)

Anomaly detection:

Weight change

BP

Duration

Dry weight comparison

Notes editing

Filter: show only anomalies

Machine ID tracking

# Test Coverage

Basic testing implemented for anomaly detection logic.

# Sample Data (Manual Setup)

To quickly test the system:

1. Add Patients:
   - John Doe (Dry Weight: 70)
   - Jane Smith (Dry Weight: 65)

2. Add Sessions:

    Normal Session:
   - Pre: 72, Post: 70, BP: 140, Duration: 180

    High BP:
   - Pre: 75, Post: 71, BP: 190, Duration: 200

    Weight Change:(>2.5)
   - Pre: 70, Post: 66

    Duration Issue:(<120 or > 300)
   - Duration: 90 or 320

    Dry Weight Mismatch:
   - Post Weight far from dry weight

    Status Variations:
   - not_started
   - in_progress
   - completed
  
# Validation of Anomaly Detection

The anomaly detection logic was manually validated using multiple session scenarios:

- High BP (>180 mmHg)
- Excess weight change (>2.5 kg)
- Abnormal duration (<120 or >300 mins)
- Dry weight mismatch

Each condition was tested via UI inputs and verified in the dashboard.


