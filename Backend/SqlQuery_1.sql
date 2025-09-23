-- Create the database
CREATE DATABASE SafetyDB;
GO

-- Use the newly created database
USE SafetyDB;
GO

-- 1. Users table for workers, admins, and supervisors
CREATE TABLE Users (
    UserID INT PRIMARY KEY IDENTITY(1,1),
    FirstName VARCHAR(100) NOT NULL,
    LastName VARCHAR(100) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL, -- Store hashed passwords
    Role VARCHAR(50) NOT NULL CHECK (Role IN ('Worker', 'Admin', 'Supervisor')),
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    UpdatedAt DATETIME NOT NULL DEFAULT GETDATE()
);

-- 2. Complaints table to store safety reports
CREATE TABLE Complaints (
    ComplaintID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL, -- Worker who filed the complaint
    AssignedToSupervisorID INT, -- Supervisor assigned to it
    Title VARCHAR(255) NOT NULL,
    Description TEXT NOT NULL,
    Status VARCHAR(50) NOT NULL CHECK (Status IN ('Pending', 'In Progress', 'Resolved', 'Withdrawn')),
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    ResolvedAt DATETIME,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (AssignedToSupervisorID) REFERENCES Users(UserID)
);

-- 3. ComplaintAttachments for photos/files
CREATE TABLE ComplaintAttachments (
    AttachmentID INT PRIMARY KEY IDENTITY(1,1),
    ComplaintID INT NOT NULL,
    FilePath VARCHAR(255) NOT NULL,
    UploadedAt DATETIME NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (ComplaintID) REFERENCES Complaints(ComplaintID)
);

-- 4. Feedback table
CREATE TABLE Feedback (
    FeedbackID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    Comment TEXT NOT NULL,
    Rating INT, -- Optional rating field
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- 5. Requests for safety gear
CREATE TABLE Requests (
    RequestID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    ItemName VARCHAR(100) NOT NULL,
    Quantity INT NOT NULL,
    Status VARCHAR(50) NOT NULL CHECK (Status IN ('Pending', 'Approved', 'Denied')),
    RequestedAt DATETIME NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- 6. TrainingMaterials for training content
CREATE TABLE TrainingMaterials (
    MaterialID INT PRIMARY KEY IDENTITY(1,1),
    Title VARCHAR(255) NOT NULL,
    Description TEXT,
    FilePath VARCHAR(255) NOT NULL,
    UploadedAt DATETIME NOT NULL DEFAULT GETDATE()
);

-- 7. Notifications table
CREATE TABLE Notifications (
    NotificationID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    Message TEXT NOT NULL,
    Type VARCHAR(50) NOT NULL,
    IsRead BIT NOT NULL DEFAULT 0,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- 8. Alerts Table
CREATE TABLE Alerts (
    alert_id INT PRIMARY KEY IDENTITY(1,1),
    message TEXT,
    target_role VARCHAR(50) CHECK (target_role IN ('Worker', 'SafetyOfficer', 'Admin', 'All')),
    created_at DATETIME DEFAULT GETDATE()
);
--9. Stock Table
CREATE TABLE Stock (
    ItemID INT PRIMARY KEY IDENTITY(1,1),
    ItemName VARCHAR(100) NOT NULL UNIQUE,
    CurrentQuantity INT NOT NULL DEFAULT 0,
    ReorderLevel INT NOT NULL DEFAULT 10,
    LastUpdated DATETIME NOT NULL DEFAULT GETDATE()
);
--10. FAQ
CREATE TABLE FAQs (
    FAQId INT PRIMARY KEY IDENTITY(1,1),
    Question VARCHAR(500) NOT NULL,
    Answer VARCHAR(2000) NOT NULL,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE()
);
ALTER TABLE FAQs
ADD CreatedByUserID INT,
    FOREIGN KEY (CreatedByUserID) REFERENCES Users(UserID);




-- Insert an Admin user
INSERT INTO Users (FirstName, LastName, Email, PasswordHash, Role)
VALUES ('Jane', 'Doe', 'j.doe@company.com', 'hashed_password_admin_1', 'Admin');

-- Insert a Supervisor user
INSERT INTO Users (FirstName, LastName, Email, PasswordHash, Role)
VALUES ('John', 'Smith', 'j.smith@company.com', 'hashed_password_supervisor_1', 'Supervisor');

-- Insert a Worker user
INSERT INTO Users (FirstName, LastName, Email, PasswordHash, Role)
VALUES ('Mike', 'Johnson', 'm.johnson@company.com', 'hashed_password_worker_1', 'Worker');

-- Insert another Worker user
INSERT INTO Users (FirstName, LastName, Email, PasswordHash, Role)
VALUES ('Sarah', 'Lee', 's.lee@company.com', 'hashed_password_worker_2', 'Worker');

-- Additional Admin user
INSERT INTO Users (FirstName, LastName, Email, PasswordHash, Role)
VALUES ('Chris', 'Evans', 'c.evans@company.com', 'hashed_password_admin_2', 'Admin');

-- Additional Supervisor user
INSERT INTO Users (FirstName, LastName, Email, PasswordHash, Role)
VALUES ('Laura', 'Davis', 'l.davis@company.com', 'hashed_password_supervisor_2', 'Supervisor');

-- More Worker users
INSERT INTO Users (FirstName, LastName, Email, PasswordHash, Role)
VALUES ('Peter', 'Green', 'p.green@company.com', 'hashed_password_worker_3', 'Worker'),
       ('Maria', 'Garcia', 'm.garcia@company.com', 'hashed_password_worker_4', 'Worker'),
       ('Alex', 'Wong', 'a.wong@company.com', 'hashed_password_worker_5', 'Worker'),
       ('Emily', 'Clark', 'e.clark@company.com', 'hashed_password_worker_6', 'Worker'),
       ('James', 'Rodriguez', 'j.rodriguez@company.com', 'hashed_password_worker_7', 'Worker'),
       ('Olivia', 'Martinez', 'o.martinez@company.com', 'hashed_password_worker_8', 'Worker');

       -- Assuming UserIDs 3, 4, 5, 6, 7, 8, 9, 10 are Workers and UserIDs 2 and 12 are Supervisors
INSERT INTO Complaints (UserID, AssignedToSupervisorID, Title, Description, Status, CreatedAt, ResolvedAt)
VALUES
-- Pending Complaints (unassigned)
(3, NULL, 'Spilled liquid near electrical panel', 'A cleaning crew left a bucket of water near a live electrical panel in the breakroom. This is a severe shock risk.', 'Pending', '2025-08-20 10:15:00', NULL),
(4, NULL, 'Unlabeled chemical containers', 'Several chemical containers in the storage closet lack proper labels, making them a hazard to identify and handle.', 'Pending', '2025-08-21 14:30:00', NULL),
(5, NULL, 'Faulty ladder on warehouse floor', 'The A-frame ladder near the receiving bay is wobbly and has a broken step. It is unsafe to use.', 'Pending', '2025-08-21 16:00:00', NULL),
(6, NULL, 'Blocked fire exit in west wing', 'Boxes and equipment are consistently blocking the fire exit doors in the west wing, preventing a quick evacuation.', 'Pending', '2025-08-22 09:00:00', NULL),
(7, NULL, 'Inoperative safety eyewash station', 'The eyewash station in Lab 3 is not functioning. The water pressure is too low to be effective in an emergency.', 'Pending', '2025-08-22 11:45:00', NULL),

-- In Progress Complaints (assigned to a supervisor)
(8, 2, 'Noise hazard from malfunctioning machine', 'Machine #4 in the assembly line is emitting a loud, high-pitched screeching noise. It is above safe decibel levels.', 'In Progress', '2025-08-23 08:30:00', NULL),
(9, 12, 'Slippery floor near beverage dispenser', 'The floor around the new beverage dispenser is always wet and slippery. It needs a non-slip mat or better drainage.', 'In Progress', '2025-08-23 13:20:00', NULL),
(10, 2, 'Inadequate ventilation in paint booth', 'The fumes inside the paint booth seem to be overpowering the ventilation system. It feels unsafe to work in there.', 'In Progress', '2025-08-24 10:00:00', NULL),
(3, 12, 'Worn electrical cords in office area', 'Many power cords and extension cables under desks are frayed and worn, posing a fire risk.', 'In Progress', '2025-08-25 15:00:00', NULL),
(4, 2, 'Broken guard rail on catwalk', 'A section of the guard rail on the catwalk above the main production floor is loose. This is a fall hazard.', 'In Progress', '2025-08-26 09:40:00', NULL),

-- Resolved Complaints
(5, 2, 'Obstructed walkway with crates', 'A worker reported that crates were left in a main walkway. The issue was immediately addressed and the path cleared.', 'Resolved', '2025-08-27 11:00:00', '2025-08-27 11:30:00'),
(6, 12, 'Missing fire extinguisher in kitchen', 'The fire extinguisher in the employee kitchen area was missing from its mount. A new one was installed within the hour.', 'Resolved', '2025-08-28 07:45:00', '2025-08-28 08:45:00'),
(7, 2, 'Malfunctioning overhead light', 'An overhead light was flickering and casting shadows, creating a visual strain. It was replaced by maintenance.', 'Resolved', '2025-08-29 14:00:00', '2025-08-29 16:00:00'),
(8, 12, 'Tripping hazard from loose cable', 'A loose cable was causing a tripping hazard in the office hallway. The cable was secured to the floor with tape.', 'Resolved', '2025-08-30 09:10:00', '2025-08-30 09:30:00'),
(9, 2, 'Lack of proper PPE for welding', 'Two workers in the welding bay were not wearing proper safety gloves. The issue was addressed with the workers and new gloves were provided.', 'Resolved', '2025-09-01 13:00:00', '2025-09-01 15:30:00'),
(10, 12, 'Door not closing properly on equipment', 'The door on a piece of heavy equipment would not latch, posing a risk. The latch was repaired by a technician.', 'Resolved', '2025-09-02 10:45:00', '2025-09-02 14:00:00'),
(3, 2, 'Poor lighting in parking lot', 'The lighting in the east parking lot is dim, making it difficult to see and creating a security concern. Additional lights were installed.', 'Resolved', '2025-09-03 18:00:00', '2025-09-05 10:00:00'),

-- Withdrawn Complaints
(4, NULL, 'Unclear signage in stairwell', 'The worker was unsure if the sign was a complaint or a suggestion and withdrew it after discussing it with a supervisor.', 'Withdrawn', '2025-09-04 11:20:00', '2025-09-04 11:30:00'),
(5, NULL, 'High temperature in server room', 'The worker believed the server room was too hot, but later found out it was within the acceptable range for the equipment and withdrew the complaint.', 'Withdrawn', '2025-09-05 09:00:00', '2025-09-05 09:15:00'),
(6, NULL, 'Broken handle on supply cart', 'A worker filed a complaint about a broken cart handle but repaired it themselves shortly after. The complaint was withdrawn.', 'Withdrawn', '2025-09-06 14:00:00', '2025-09-06 14:10:00');

-- Insert values for the ComplaintAttachments table
INSERT INTO ComplaintAttachments (ComplaintID, FilePath, UploadedAt)
VALUES
-- Photos for pending and in-progress complaints
(1, '/uploads/complaints/1/spill_photo_1.jpg', '2025-08-20 10:16:00'),
(1, '/uploads/complaints/1/panel_close_up.png', '2025-08-20 10:17:00'),
(3, '/uploads/complaints/3/ladder_broken_step.jpeg', '2025-08-21 16:05:00'),
(6, '/uploads/complaints/6/blocked_exit_photo.jpg', '2025-08-22 09:05:00'),
(7, '/uploads/complaints/7/eyewash_station_01.png', '2025-08-22 11:46:00'),
(8, '/uploads/complaints/8/machine_noise_evidence.mp4', '2025-08-23 08:35:00'),
(9, '/uploads/complaints/9/slippery_floor.jpeg', '2025-08-23 13:22:00'),
(10, '/uploads/complaints/10/paint_booth_air.jpg', '2025-08-24 10:02:00'),
(11, '/uploads/complaints/11/frayed_cords_office.jpg', '2025-08-25 15:05:00'),
(12, '/uploads/complaints/12/broken_guard_rail_01.jpg', '2025-08-26 09:42:00'),

-- Photos for resolved complaints
(13, '/uploads/complaints/13/walkway_cleared_after.jpg', '2025-08-27 11:31:00'),
(14, '/uploads/complaints/14/extinguisher_new.jpg', '2025-08-28 08:46:00'),
(15, '/uploads/complaints/15/light_fixed_photo.jpg', '2025-08-29 16:01:00');

INSERT INTO Feedback (UserID, Comment, Rating, CreatedAt)
VALUES
-- Positive and helpful feedback
(3, 'The system is very easy to use and the process for filing a complaint is simple.', 5, '2025-08-28 09:30:00'),
(4, 'I appreciate the ability to track the status of my report in real-time. Great feature!', 5, '2025-08-29 11:15:00'),
(5, 'The awareness page is a fantastic resource. I learned about a new safety procedure there.', 4, '2025-08-30 14:00:00'),
(6, 'The notification system for new training is very helpful. Keep up the good work!', 5, '2025-09-01 08:00:00'),
(7, 'My complaint was resolved in less than a day. The response was incredibly fast.', 5, '2025-09-02 10:45:00'),
(8, 'The ability to attach a photo to the complaint is very useful for documentation.', 4, '2025-09-03 15:20:00'),
(9, 'I liked the email updates on my request. Very clear and informative.', 4, '2025-09-04 11:00:00'),
(10, 'The design is clean and intuitive. No issues at all.', 5, '2025-09-05 16:30:00'),
(3, 'A great step towards a safer workplace. The interface is not confusing at all.', 5, '2025-09-06 09:10:00'),
(4, 'The new safety gear request form is so much better than the old paper system.', 5, '2025-09-07 13:00:00'),

-- Neutral or mixed feedback
(5, 'The system is okay, but I wish there were more details on the resolution notes.', 3, '2025-09-08 10:00:00'),
(6, 'It works. I just need to get used to it.', 3, '2025-09-09 11:45:00'),
(7, 'The FAQ section is a good idea, but it needs more questions answered.', 3, '2025-09-10 14:20:00'),
(8, 'I didn''t receive an email when my complaint status changed, but the dashboard was updated.', 3, '2025-09-11 16:00:00'),
(9, 'The system seems to slow down during peak hours.', 2, '2025-09-12 09:00:00'),

-- Critical or negative feedback
(10, 'I had trouble logging in and had to reset my password multiple times.', 1, '2025-09-13 10:30:00'),
(3, 'The mobile version of the site is difficult to navigate.', 2, '2025-09-14 15:00:00'),
(4, 'My complaint was marked as resolved, but no one ever followed up with me. Not satisfied.', 1, '2025-09-15 08:45:00'),
(5, 'The form kept crashing when I tried to attach a photo. Very frustrating.', 1, '2025-09-16 12:00:00'),

-- Feedback with no rating
(6, 'I submitted a comment, but I do not want to provide a rating.', NULL, '2025-09-17 11:00:00');

INSERT INTO Requests (UserID, ItemName, Quantity, Status, RequestedAt)
VALUES
-- Pending Requests
(3, 'Safety Goggles', 2, 'Pending', '2025-09-01 09:30:00'),
(4, 'Steel-toed Boots', 1, 'Pending', '2025-09-02 14:00:00'),
(5, 'Hard Hat', 1, 'Pending', '2025-09-03 10:45:00'),
(6, 'High-visibility Vest', 2, 'Pending', '2025-09-04 11:20:00'),
(7, 'Disposable Nitrile Gloves', 5, 'Pending', '2025-09-05 08:00:00'),
(8, 'Fire Extinguisher', 1, 'Pending', '2025-09-06 15:30:00'),
(9, 'Face Shield', 1, 'Pending', '2025-09-07 09:00:00'),
(10, 'Dust Mask (N95)', 10, 'Pending', '2025-09-08 12:00:00'),
(3, 'Ear Plugs', 5, 'Pending', '2025-09-09 14:00:00'),
(4, 'Emergency First-Aid Kit', 1, 'Pending', '2025-09-10 10:00:00'),

-- Approved Requests
(5, 'Gloves (Cut-resistant)', 3, 'Approved', '2025-09-01 15:00:00'),
(6, 'Safety Harness', 1, 'Approved', '2025-09-02 08:30:00'),
(7, 'Respirator Mask', 1, 'Approved', '2025-09-03 11:00:00'),
(8, 'Chemical Splash Goggles', 2, 'Approved', '2025-09-04 16:00:00'),
(9, 'Safety Knife', 1, 'Approved', '2025-09-05 09:45:00'),
(10, 'Warning Sign (Wet Floor)', 3, 'Approved', '2025-09-06 11:00:00'),
(3, 'Hard Hat', 1, 'Approved', '2025-09-07 15:00:00'),

-- Denied Requests
(4, 'Personal GPS Tracker', 1, 'Denied', '2025-09-08 10:30:00'),
(5, 'Loud Speaker', 1, 'Denied', '2025-09-09 13:00:00'),
(6, 'Smart Watch', 1, 'Denied', '2025-09-10 16:00:00');

INSERT INTO TrainingMaterials (Title, Description, FilePath, UploadedAt)
VALUES
('Emergency Evacuation Procedures', 'A comprehensive guide on what to do during fire alarms and other evacuation scenarios.', '/training/pdfs/evacuation_guide.pdf', '2025-07-01 10:00:00'),
('Personal Protective Equipment (PPE) Usage', 'A video tutorial on how to properly wear and maintain various types of PPE.', '/training/videos/ppe_video.mp4', '2025-07-05 14:30:00'),
('Chemical Handling and Storage', 'Guidelines on the safe handling, storage, and disposal of hazardous chemicals.', '/training/pdfs/chemical_handling.pdf', '2025-07-10 11:15:00'),
('First Aid and CPR Essentials', 'An introductory presentation on basic first aid and CPR techniques for emergencies.', '/training/pptx/first_aid_cpr.pptx', '2025-07-15 09:00:00'),
('Ergonomics in the Workplace', 'Tips and exercises to prevent repetitive strain injuries and improve posture at your desk.', '/training/pdfs/ergonomics_guide.pdf', '2025-07-20 13:45:00'),
('Fire Safety and Extinguisher Training', 'An interactive module covering different types of fires and how to use a fire extinguisher.', '/training/modules/fire_safety.html', '2025-07-25 16:00:00'),
('Slips, Trips, and Falls Prevention', 'A short video highlighting common hazards and best practices to prevent accidents.', '/training/videos/falls_prevention.mp4', '2025-07-30 10:30:00'),
('Ladder and Scaffolding Safety', 'A detailed guide on inspecting and safely using ladders and scaffolding on-site.', '/training/pdfs/ladder_safety.pdf', '2025-08-05 14:00:00'),
('Lockout/Tagout (LOTO) Procedures', 'Training on how to properly lock and tag out machinery to prevent unexpected startup.', '/training/pdfs/loto_procedure.pdf', '2025-08-10 09:00:00'),
('Workplace Violence Prevention', 'A training document on recognizing and de-escalating potential workplace violence situations.', '/training/pdfs/violence_prevention.pdf', '2025-08-15 11:00:00'),
('Manual Lifting Techniques', 'A video guide on safe lifting practices to avoid back injuries.', '/training/videos/lifting_tech.mp4', '2025-08-20 13:00:00'),
('Electrical Safety', 'An overview of electrical hazards and safety protocols for all employees.', '/training/pptx/electrical_safety.pptx', '2025-08-25 10:00:00'),
('Vehicle and Forklift Safety', 'Guidelines for operating company vehicles and forklifts safely within the facility.', '/training/pdfs/vehicle_safety.pdf', '2025-08-30 15:00:00'),
('Hazard Communication Standard (HAZCOM)', 'Training on the proper labeling and understanding of hazardous materials.', '/training/pdfs/hazcom_training.pdf', '2025-09-01 09:30:00'),
('Bloodborne Pathogen Awareness', 'An online course on protecting against exposure to bloodborne pathogens.', '/training/courses/bloodborne.html', '2025-09-03 14:00:00'),
('Heat Stress Prevention', 'A guide on how to recognize and prevent heat-related illnesses during hot weather.', '/training/pdfs/heat_stress_prevention.pdf', '2025-09-05 10:45:00'),
('Confined Space Entry', 'Procedures for safely entering and working in confined spaces.', '/training/pdfs/confined_space.pdf', '2025-09-07 16:00:00'),
('Respiratory Protection Program', 'Details on when and how to use respirators for protection.', '/training/pdfs/respirator_program.pdf', '2025-09-09 11:30:00'),
('Hearing Conservation Program', 'Information on protecting hearing in noisy environments.', '/training/pdfs/hearing_conservation.pdf', '2025-09-11 10:00:00'),
('Job Hazard Analysis (JHA) Training', 'A module on how to conduct a Job Hazard Analysis to identify and mitigate risks.', '/training/modules/jha_training.html', '2025-09-12 14:00:00');

INSERT INTO Notifications (UserID, Message, Type, IsRead, CreatedAt)
VALUES
-- Notifications for Workers (UserIDs 3-10)
(3, 'Your complaint "Spilled liquid near electrical panel" has been assigned to a supervisor.', 'ComplaintUpdate', 0, '2025-08-20 11:00:00'),
(4, 'Your complaint "Unlabeled chemical containers" has been resolved.', 'ComplaintUpdate', 1, '2025-08-28 10:00:00'),
(5, 'The status of your request for "Safety Goggles" has been updated to Approved.', 'RequestStatus', 0, '2025-09-02 16:30:00'),
(6, 'Your complaint "Blocked fire exit in west wing" has been resolved.', 'ComplaintUpdate', 1, '2025-08-28 09:15:00'),
(7, 'A new training material on "Emergency Evacuation Procedures" is now available.', 'Training', 0, '2025-09-01 10:30:00'),
(8, 'Your request for "Respirator Mask" has been denied.', 'RequestStatus', 1, '2025-09-10 14:00:00'),
(9, 'There is a new company-wide safety alert: high winds expected today.', 'Alert', 0, '2025-09-12 08:00:00'),
(10, 'Your complaint "Inadequate ventilation in paint booth" is in progress and being investigated.', 'ComplaintUpdate', 1, '2025-08-25 11:30:00'),
(3, 'Your request for "Steel-toed Boots" has been approved.', 'RequestStatus', 0, '2025-09-04 10:40:00'),
(4, 'The training video on "Chemical Handling and Storage" has been updated.', 'Training', 0, '2025-09-11 15:00:00'),

-- Notifications for Supervisors (UserIDs 2 and 12)
(2, 'A new complaint "Noise hazard from malfunctioning machine" has been assigned to you.', 'NewComplaint', 0, '2025-08-23 08:40:00'),
(12, 'A new complaint "Slippery floor near beverage dispenser" requires your attention.', 'NewComplaint', 1, '2025-08-23 13:30:00'),
(2, 'Complaint #15 has been resolved and the case is closed.', 'ComplaintUpdate', 1, '2025-08-29 16:05:00'),
(12, 'A worker has withdrawn their complaint: "Unclear signage in stairwell".', 'ComplaintUpdate', 0, '2025-09-04 11:35:00'),
(2, 'You have a new safety gear request from Worker #8.', 'NewRequest', 0, '2025-09-06 15:40:00'),
(12, 'There are 5 new pending complaints in your department. Check your dashboard.', 'NewComplaint', 0, '2025-09-12 10:00:00'),

-- Notifications for Admins (UserIDs 1 and 11)
(1, 'A new complaint has been filed by a worker: "Faulty ladder on warehouse floor".', 'NewComplaint', 1, '2025-08-21 16:10:00'),
(11, 'Monthly report is now available for review.', 'Report', 0, '2025-09-01 09:00:00'),
(1, 'A new feedback entry has been submitted.', 'NewFeedback', 0, '2025-09-15 09:00:00'),
(11, 'System security update is scheduled for tonight.', 'SystemAlert', 1, '2025-09-11 18:00:00');

-- 8. Alerts Table
INSERT INTO Alerts (message, target_role, created_at) VALUES
-- General Alerts for all users
('Mandatory fire drill scheduled for this Friday at 10 AM.', 'All', '2025-08-01 09:00:00'),
('New company-wide safety policy regarding PPE usage has been uploaded. Please review.', 'All', '2025-08-05 14:30:00'),
('Emergency weather alert: High winds and thunderstorms expected tonight. Stay safe.', 'All', '2025-08-10 16:45:00'),
('Remember to complete your annual safety training module by end of month.', 'All', '2025-08-15 08:00:00'),
('System maintenance is scheduled for Saturday 2 AM. The application will be unavailable.', 'All', '2025-08-20 12:00:00'),

-- Alerts for Workers
('Safety goggles are now required in the assembly line at all times.', 'Worker', '2025-08-25 10:15:00'),
('New ergonomic chairs have been installed. Please report any issues through the system.', 'Worker', '2025-08-30 11:30:00'),
('Reminder: All loose tools must be secured before leaving your workstation.', 'Worker', '2025-09-01 15:00:00'),
('A new training video on "Electrical Safety" is available in the training section.', 'Worker', '2025-09-05 09:00:00'),
('The floor in the warehouse is being treated. Please use caution and follow all signage.', 'Worker', '2025-09-07 14:00:00'),

-- Alerts for Safety Officers
('A critical safety complaint has been submitted. Immediate action required.', 'SafetyOfficer', '2025-09-10 16:00:00'),
('There are 5 pending safety reports assigned to you for investigation.', 'SafetyOfficer', '2025-09-11 08:30:00'),
('Review and approve the new batch of safety gear requests from the supply chain.', 'SafetyOfficer', '2025-09-12 10:00:00'),
('Monthly safety inspection report is due by the end of the week.', 'SafetyOfficer', '2025-09-13 11:00:00'),
('A high-severity complaint has been filed anonymously.', 'SafetyOfficer', '2025-09-14 09:00:00'),

-- Alerts for Admins
('A system error log has been generated. Check the server for details.', 'Admin', '2025-09-15 13:00:00'),
('New user registration: Worker Jane Doe needs account verification.', 'Admin', '2025-09-16 10:45:00'),
('The weekly complaint report has been successfully generated and is ready for review.', 'Admin', '2025-09-17 08:00:00'),
('An audit of resolved complaints is required for compliance this quarter.', 'Admin', '2025-09-18 15:00:00'),
('Unauthorized login attempt detected on the server. Investigate immediately.', 'Admin', '2025-09-19 11:00:00');


--Stock Details
INSERT INTO Stock (ItemName, CurrentQuantity, ReorderLevel)
VALUES
('Safety Goggles', 150, 50),
('Steel-toed Boots', 75, 30),
('Hard Hat', 200, 75),
('High-visibility Vest', 180, 60),
('Disposable Nitrile Gloves', 5000, 1000),
('Cut-resistant Gloves', 90, 40),
('Face Shield', 60, 20),
('Ear Plugs', 350, 150),
('Respirator Mask', 120, 50),
('Chemical Splash Goggles', 80, 25),
('Safety Harness', 30, 10),
('Emergency First-Aid Kit', 15, 5),
('Fire Extinguisher', 25, 10),
('Warning Sign (Wet Floor)', 50, 15),
('Safety Knife', 100, 30),
('Dust Mask (N95)', 2500, 500),
('Welding Helmet', 45, 15),
('Ladder (A-frame)', 10, 5),
('Fall Protection Lanyard', 20, 8),
('Spill Kit', 18, 6);

INSERT INTO FAQs (Question, Answer)
VALUES 
('What should I do if I witness a safety hazard?', 'Immediately report the hazard to your supervisor or use the complaint submission form in the portal.'),
('How can I request safety gear?', 'Go to the Requests section in your dashboard and fill out the form with the required item and quantity.'),
('Who reviews the complaints?', 'Complaints are reviewed by assigned supervisors and safety officers based on severity and category.'),
('How do I know if my complaint has been resolved?', 'You can track the status of your complaint in the Track Status section. Resolved complaints will be marked accordingly.'),
('Can I withdraw a complaint?', 'Yes, you can withdraw a complaint if it has not yet been resolved. Contact your supervisor or use the complaint management tool.');


--Store Procedure
GO
CREATE PROCEDURE RaiseNewComplaint
    @UserID INT,
    @Title VARCHAR(255),
    @Description VARCHAR(MAX) -- Changed from TEXT
AS
BEGIN
    -- Find a supervisor with the fewest assigned "In Progress" complaints
    DECLARE @AssignedSupervisorID INT;
    SELECT TOP 1 @AssignedSupervisorID = UserID
    FROM Users
    WHERE Role = 'Supervisor'
    ORDER BY (SELECT COUNT(*) FROM Complaints WHERE AssignedToSupervisorID = Users.UserID AND Status = 'In Progress');

    -- Insert the new complaint
    INSERT INTO Complaints (UserID, Title, Description, Status, AssignedToSupervisorID)
    VALUES (@UserID, @Title, @Description, 'In Progress', @AssignedSupervisorID);
    
    -- Optional: Notify the assigned supervisor
    DECLARE @ComplaintID INT = SCOPE_IDENTITY();
    DECLARE @SupervisorMessage VARCHAR(MAX) = 'A new complaint (ID: ' + CAST(@ComplaintID AS VARCHAR) + ') has been assigned to you.';
    
    INSERT INTO Notifications (UserID, Message, Type)
    VALUES (@AssignedSupervisorID, @SupervisorMessage, 'NewComplaint');
END;
GO
CREATE PROCEDURE UpdateComplaintStatus
    @ComplaintID INT,
    @NewStatus VARCHAR(50)
AS
BEGIN
    DECLARE @WorkerID INT;
    DECLARE @OldStatus VARCHAR(50);
    
    -- Get the current status and the worker's ID
    SELECT @WorkerID = UserID, @OldStatus = Status
    FROM Complaints
    WHERE ComplaintID = @ComplaintID;

    IF @WorkerID IS NOT NULL
    BEGIN
        -- Update the complaint status and resolution date if resolved
        UPDATE Complaints
        SET 
            Status = @NewStatus,
            ResolvedAt = CASE WHEN @NewStatus = 'Resolved' THEN GETDATE() ELSE NULL END
        WHERE ComplaintID = @ComplaintID;

        -- Notify the worker of the status change
        DECLARE @WorkerMessage VARCHAR(MAX) = 'The status of your complaint "' + (SELECT Title FROM Complaints WHERE ComplaintID = @ComplaintID) + '" has been updated to "' + @NewStatus + '".';
        
        INSERT INTO Notifications (UserID, Message, Type)
        VALUES (@WorkerID, @WorkerMessage, 'ComplaintUpdate');
    END
END;
GO
CREATE PROCEDURE ApproveSafetyGearRequest
    @RequestID INT
AS
BEGIN
    DECLARE @ItemName VARCHAR(100);
    DECLARE @Quantity INT;
    DECLARE @UserID INT;
    
    -- Get request details
    SELECT 
        @ItemName = ItemName,
        @Quantity = Quantity,
        @UserID = UserID
    FROM Requests
    WHERE RequestID = @RequestID;

    -- Update the request status
    UPDATE Requests
    SET Status = 'Approved'
    WHERE RequestID = @RequestID;
    
    -- Update the stock quantity
    UPDATE Stock
    SET CurrentQuantity = CurrentQuantity - @Quantity,
        LastUpdated = GETDATE()
    WHERE ItemName = @ItemName;

    -- Optional: Notify the worker
    DECLARE @WorkerMessage VARCHAR(MAX) = 'Your request for "' + @ItemName + '" has been approved.';
    
    INSERT INTO Notifications (UserID, Message, Type)
    VALUES (@UserID, @WorkerMessage, 'RequestStatus');
END;
GO
Alter PROCEDURE RAISE
(
    @UserId int,
	@AssignedToSupervisorID int,
	@Title varchar(500),
	@Description varchar(500),
	@createdAt datetime,
	@status int,
	@resolvedAt datetime
)
AS
BEGIN
	INSERT INTO COMPLAINTS(UserId,	AssignedToSupervisorID, Title, Description, createdAt, Status, resolvedAt)
	VALUES(@UserId, @AssignedToSupervisorID, @Title, @Description, @createdAt, @status, @resolvedAt)
END
GO

use SafetyDB;

ALTER TABLE Complaints ADD StatusId INT;
 
 UPDATE Complaints SET StatusId = 0 WHERE Status = 'Pending';
UPDATE Complaints SET StatusId = 1 WHERE Status = 'In Progress';
UPDATE Complaints SET StatusId = 2 WHERE Status = 'Resolved';
UPDATE Complaints SET StatusId = 3 WHERE Status = 'Withdrawn';

ALTER TABLE Complaints DROP COLUMN Status;

ALTER TABLE Complaints
DROP CONSTRAINT CK__Complaint__Statu__2A4B4B5E;

EXEC sp_rename 'Complaints.StatusId', 'Status', 'COLUMN';
 
GO
ALTER PROCEDURE PROGRESS
(@id int)
AS
BEGIN
	UPDATE Complaints
	SET Status = 1
	Where ComplaintID = @id
END
GO


ALTER PROCEDURE RESOLVED
(@id int)
AS
BEGIN
	UPDATE Complaints
	SET Status = 2
	Where ComplaintID = @id
END
GO


ALTER PROCEDURE Supervisor
(@supId int)
AS
BEGIN 
	SELECT Title,ComplaintID from Complaints
	where  AssignedToSupervisorID= @supId
END
GO

CREATE PROCEDURE MyComplProgress
(@UserId int)
AS
BEGIN 
	SELECT ComplaintId, Title, Status from Complaints
	WHERE @UserId = UserId
END