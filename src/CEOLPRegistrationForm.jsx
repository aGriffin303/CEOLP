import React, { useState } from 'react';
import './App.css';

const CEOLPRegistrationForm = () => {
  const [currentSection, setCurrentSection] = useState('eligibility');
  const [eligibilityStatus, setEligibilityStatus] = useState(null);
  
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    zip: '',
    yearsResident: '',
    email: '',
    phone: '',
    primaryDisposition: '',
    alternativeDisposition: '',
    repName: '',
    repPhone: '',
    repEmail: '',
    repAddress: '',
    fullName: '',
    dateOfBirth: '',
    ssn: '',
    sex: '',
    placeOfBirth: '',
    usForces: '',
    maritalStatus: '',
    spouseName: '',
    motherName: '',
    fatherName: '',
    occupation: '',
    industry: '',
    education: '',
    hispanicOrigin: '',
    race: '',
    electronicImplant: '',
    implantDetails: '',
    contagiousDiseases: [],
    hpName: '',
    hpGroup: '',
    hpContact: '',
    medicalPoaContact: '',
    caregiverName: '',
    caregiverContact: '',
    familyContact1Name: '',
    familyContact1Info: '',
    familyContact2Name: '',
    familyContact2Info: '',
    understandNotAdvanceDirective: false,
    understandDiscussWithFamily: false,
    understandVitalRecordsConfidential: false,
    submitted: false,
  });

  const sections = [
    { id: 'eligibility', label: 'Eligibility' },
    { id: 'contact', label: 'Contact' },
    { id: 'disposition', label: 'End-of-Life Wishes' },
    { id: 'representative', label: 'Designated Representative' },
    { id: 'vitalRecords', label: 'Vital Records' },
    { id: 'healthPractitioner', label: 'Medical Contacts' },
    { id: 'statements', label: 'Confirmations' },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'contagiousDiseases') {
        setFormData(prev => ({
          ...prev,
          contagiousDiseases: checked
            ? [...prev.contagiousDiseases, value]
            : prev.contagiousDiseases.filter(item => item !== value)
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: checked
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleEligibilityCheck = () => {
    const years = parseInt(formData.yearsResident);
    if (years >= 1) {
      setEligibilityStatus('eligible');
      setCurrentSection('contact');
    } else if (formData.yearsResident === '0') {
      setEligibilityStatus('ineligible');
    }
  };

const handleSubmit = (e) => {
  e.preventDefault();
  setFormData(prev => ({ ...prev, submitted: true }));
};

  const goToNextSection = () => {
    const currentIndex = sections.findIndex(s => s.id === currentSection);
    if (currentIndex < sections.length - 1) {
      setCurrentSection(sections[currentIndex + 1].id);
      window.scrollTo(0, 0);
    }
  };

  const goToPreviousSection = () => {
    const currentIndex = sections.findIndex(s => s.id === currentSection);
    if (currentIndex > 0) {
      setCurrentSection(sections[currentIndex - 1].id);
      window.scrollTo(0, 0);
    }
  };

  const currentSectionIndex = sections.findIndex(s => s.id === currentSection) + 1;
  const totalSections = sections.length;

  // INELIGIBLE GATE
  if (eligibilityStatus === 'ineligible') {
    return (
      <div className="container">
        <img src="/ceolp-website-logo.png" alt="CEOLP Logo" className="logo" />
        <div className="gate-message">
          <h2>Residency Requirement</h2>
          <p>CEOLP services are only available to Saguache County residents who have lived here for 90+ consecutive days.</p>
          <p>For more information on alternative services, please <a href="https://informedfinalchoices.org" target="_blank" rel="noopener noreferrer">visit the Informed Final Choices website</a>.</p>
          <button className="secondary-btn" onClick={() => setEligibilityStatus(null)}>Go Back</button>
        </div>
      </div>
    );
  }

  // SUBMISSION CONFIRMATION
  if (formData.submitted) {
    return (
      <div className="container">
        <img src="/ceolp-website-logo.png" alt="CEOLP Logo" className="logo" />
        <div className="confirmation">
          <h2>Your registration has been received.</h2>
          <h3>What happens next:</h3>
          <p>We've sent you an email with instructions for Part 2.</p>
          <div className="next-steps">
            <p><strong>You need to:</strong></p>
            <ol>
              <li>Download the notarization document (attached to the email)</li>
              <li>Print it</li>
              <li>Take it to a notary public</li>
              <li>Mail the notarized pages to us</li>
            </ol>
          </div>
          <div className="contact-info">
            <p><strong>Questions?</strong><br />
            Call us at (719) 588-7415 (option 2)<br />
            or email ceolp.info@gmail.com</p>
          </div>
          <p className="final-note">When we receive your notarized documents, we'll send you a confirmation that your registration is complete.</p>
        </div>
      </div>
    );
  }

  // MAIN FORM
  return (
    <div className="container">
      <img src="/ceolp-website-logo.png" alt="CEOLP Logo" className="logo" />
      
      <form onSubmit={handleSubmit}>
        <div className="progress-section">
          <p className="progress-text">Part 1: Your Information</p>
          <p className="progress-count">Step {currentSectionIndex} of {totalSections}</p>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(currentSectionIndex / totalSections) * 100}%` }}
            />
          </div>
        </div>

        {/* ELIGIBILITY */}
        {currentSection === 'eligibility' && (
          <section className="form-section">
            <h2>Let's start with eligibility</h2>
            <p className="section-description">CEOLP services are available only to Saguache County residents who have lived here for 90+ consecutive days.</p>
            
            <div className="form-group">
              <label>Street Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="123 Main Street"
              />
            </div>

            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Crestone"
              />
            </div>

            <div className="form-group">
              <label>Zip Code</label>
              <input
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleInputChange}
                placeholder="81131"
              />
            </div>

            <div className="form-group">
              <label>How long have you lived in Saguache County continuously?</label>
              <select 
                name="yearsResident" 
                value={formData.yearsResident}
                onChange={handleInputChange}
              >
                <option value="">Select...</option>
                <option value="0">Less than 90 days</option>
                <option value="1">90 days to 1 year</option>
                <option value="2">1–2 years</option>
                <option value="3">2–5 years</option>
                <option value="4">5–10 years</option>
                <option value="5">10+ years</option>
              </select>
            </div>

            <button 
              type="button" 
              className="primary-btn"
              onClick={handleEligibilityCheck}
              disabled={!formData.address || !formData.city || !formData.zip || !formData.yearsResident}
            >
              Check Eligibility
            </button>
          </section>
        )}

        {/* CONTACT */}
        {currentSection === 'contact' && (
          <section className="form-section">
            <h2>Contact Information</h2>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="(719) 555-1234"
                required
              />
            </div>

            <div className="button-group">
              <button type="button" className="secondary-btn" onClick={goToPreviousSection}>Back</button>
              <button type="button" className="primary-btn" onClick={goToNextSection}>Next</button>
            </div>
          </section>
        )}

        {/* DISPOSITION */}
        {currentSection === 'disposition' && (
          <section className="form-section">
            <h2>End-of-Life Wishes</h2>

            <div className="form-group">
              <label>What is your primary end-of-life choice?</label>
              <select 
                name="primaryDisposition" 
                value={formData.primaryDisposition}
                onChange={handleInputChange}
                required
              >
                <option value="">Select...</option>
                <option value="ceolp-cremation">CEOLP open-air cremation</option>
                <option value="ceolp-burial">CEOLP natural burial</option>
                <option value="conventional-cremation">Conventional cremation (not administered by CEOLP)</option>
                <option value="conventional-burial">Conventional burial (not administered by CEOLP)</option>
                <option value="crestone-cemetery">Town of Crestone green burial</option>
              </select>
            </div>

            <div className="form-group">
              <label>What is your alternative choice?</label>
              <p className="field-hint">In case your primary choice is not possible (e.g., fire ban)</p>
              <select 
                name="alternativeDisposition" 
                value={formData.alternativeDisposition}
                onChange={handleInputChange}
                required
              >
                <option value="">Select...</option>
                <option value="ceolp-cremation">CEOLP open-air cremation</option>
                <option value="ceolp-burial">CEOLP natural burial</option>
                <option value="conventional-cremation">Conventional cremation (not administered by CEOLP)</option>
                <option value="conventional-burial">Conventional burial (not administered by CEOLP)</option>
                <option value="crestone-cemetery">Town of Crestone green burial</option>
              </select>
            </div>

            <div className="button-group">
              <button type="button" className="secondary-btn" onClick={goToPreviousSection}>Back</button>
              <button type="button" className="primary-btn" onClick={goToNextSection}>Next</button>
            </div>
          </section>
        )}

        {/* REPRESENTATIVE */}
        {currentSection === 'representative' && (
          <section className="form-section">
            <h2>Designated Representative</h2>
            <p className="section-description">This is the person who will carry out your end-of-life wishes.</p>

            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="repName"
                value={formData.repName}
                onChange={handleInputChange}
                placeholder="Jane Doe"
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="repPhone"
                value={formData.repPhone}
                onChange={handleInputChange}
                placeholder="(719) 555-1234"
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="repEmail"
                value={formData.repEmail}
                onChange={handleInputChange}
                placeholder="jane@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Mailing Address</label>
              <textarea
                name="repAddress"
                value={formData.repAddress}
                onChange={handleInputChange}
                placeholder="123 Main St, Crestone, CO 81131"
                rows="3"
                required
              />
            </div>

            <div className="button-group">
              <button type="button" className="secondary-btn" onClick={goToPreviousSection}>Back</button>
              <button type="button" className="primary-btn" onClick={goToNextSection}>Next</button>
            </div>
          </section>
        )}

        {/* VITAL RECORDS */}
        {currentSection === 'vitalRecords' && (
          <section className="form-section">
            <h2>Vital Records</h2>
            <p className="section-description">Required for death certificate. Optional fields can be filled later.</p>

            <div className="subsection">
              <h3>Required Information</h3>

              <div className="form-group">
                <label>Full Legal Name (First, Middle, Last)</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="John Michael Smith"
                  required
                />
                <p className="field-hint">Must match your Social Security card</p>
              </div>

              <div className="form-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Social Security Number</label>
                <input
                  type="text"
                  name="ssn"
                  value={formData.ssn}
                  onChange={handleInputChange}
                  placeholder="XXX-XX-XXXX"
                  required
                />
              </div>

              <div className="form-group">
                <label>Sex</label>
                <select 
                  name="sex" 
                  value={formData.sex}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select...</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            <div className="subsection">
              <h3>Optional Information</h3>
              <p className="section-description">These fields are helpful but not required.</p>

              <div className="form-group">
                <label>Place of Birth</label>
                <input
                  type="text"
                  name="placeOfBirth"
                  value={formData.placeOfBirth}
                  onChange={handleInputChange}
                  placeholder="Denver, Colorado"
                />
              </div>

              <div className="form-group">
                <label>Ever in U.S. Armed Forces?</label>
                <select 
                  name="usForces" 
                  value={formData.usForces}
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div className="form-group">
                <label>Marital/Civil Status</label>
                <select 
                  name="maritalStatus" 
                  value={formData.maritalStatus}
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="never-married">Never married</option>
                  <option value="married">Married</option>
                  <option value="married-separated">Married, but separated</option>
                  <option value="divorced">Divorced (and not remarried)</option>
                  <option value="widowed">Widow/Widower (and not remarried)</option>
                </select>
              </div>

              {(formData.maritalStatus === 'married' || formData.maritalStatus === 'married-separated') && (
                <div className="form-group">
                  <label>Spouse's Name</label>
                  <input
                    type="text"
                    name="spouseName"
                    value={formData.spouseName}
                    onChange={handleInputChange}
                  />
                </div>
              )}

              <div className="form-group">
                <label>Mother's Full Name</label>
                <input
                  type="text"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Father's Full Name</label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Usual Occupation</label>
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                  placeholder="e.g., carpenter, teacher"
                />
              </div>

              <div className="form-group">
                <label>Type of Business/Industry</label>
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  placeholder="e.g., construction, education"
                />
              </div>

              <div className="form-group">
                <label>Education</label>
                <select 
                  name="education" 
                  value={formData.education}
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="8th-or-less">8th Grade or Less</option>
                  <option value="9-12-no-diploma">9th–12th Grade, but No Diploma</option>
                  <option value="hs-grad">High School Graduate or GED</option>
                  <option value="some-college">Some College Credit, but No Degree</option>
                  <option value="associates">Associate Degree</option>
                  <option value="bachelors">Bachelor's Degree</option>
                  <option value="masters">Master's Degree</option>
                  <option value="doctorate">Doctorate or Professional Degree</option>
                  <option value="unknown">Unknown</option>
                </select>
              </div>

              <div className="form-group">
                <label>Hispanic Origin</label>
                <select 
                  name="hispanicOrigin" 
                  value={formData.hispanicOrigin}
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="no">No, not Spanish/Hispanic/Latino</option>
                  <option value="puerto-rican">Yes, Puerto Rican</option>
                  <option value="mexican">Yes, Mexican/Mexican-American/Chicano</option>
                  <option value="cuban">Yes, Cuban</option>
                  <option value="other">Yes, Other</option>
                  <option value="unknown">Unknown</option>
                  <option value="prefer-not">Prefer not to answer</option>
                </select>
              </div>

              <div className="form-group">
                <label>Race</label>
                <select 
                  name="race" 
                  value={formData.race}
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="white">White</option>
                  <option value="black">Black or African American</option>
                  <option value="native-american">American Indian or Alaska Native</option>
                  <option value="asian-indian">Asian Indian</option>
                  <option value="chinese">Chinese</option>
                  <option value="other">Other</option>
                  <option value="unknown">Unknown</option>
                  <option value="prefer-not">Prefer not to answer</option>
                </select>
              </div>

              <div className="form-group">
                <label>Do you have any electronic implants?</label>
                <select 
                  name="electronicImplant" 
                  value={formData.electronicImplant}
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>

              {formData.electronicImplant === 'yes' && (
                <div className="form-group">
                  <label>Describe the type and location</label>
                  <textarea
                    name="implantDetails"
                    value={formData.implantDetails}
                    onChange={handleInputChange}
                    rows="3"
                  />
                </div>
              )}

              <div className="form-group">
                <label>Contagious Diseases (Check all that apply)</label>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="contagiousDiseases"
                      value="hepatitis"
                      checked={formData.contagiousDiseases.includes('hepatitis')}
                      onChange={handleInputChange}
                    />
                    Hepatitis B/C
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="contagiousDiseases"
                      value="hiv"
                      checked={formData.contagiousDiseases.includes('hiv')}
                      onChange={handleInputChange}
                    />
                    HIV
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="contagiousDiseases"
                      value="tuberculosis"
                      checked={formData.contagiousDiseases.includes('tuberculosis')}
                      onChange={handleInputChange}
                    />
                    Tuberculosis
                  </label>
                </div>
              </div>
            </div>

            <div className="button-group">
              <button type="button" className="secondary-btn" onClick={goToPreviousSection}>Back</button>
              <button type="button" className="primary-btn" onClick={goToNextSection}>Next</button>
            </div>
          </section>
        )}

        {/* HEALTH PRACTITIONER */}
        {currentSection === 'healthPractitioner' && (
          <section className="form-section">
            <h2>Medical Contacts</h2>
            <p className="section-description">Your medical records help determine cause of death.</p>

            <div className="form-group">
              <label>Health Practitioner Name</label>
              <input
                type="text"
                name="hpName"
                value={formData.hpName}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Medical Practice Group</label>
              <input
                type="text"
                name="hpGroup"
                value={formData.hpGroup}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Health Practitioner Contact Information</label>
              <textarea
                name="hpContact"
                value={formData.hpContact}
                onChange={handleInputChange}
                placeholder="Phone and/or address"
                rows="2"
              />
            </div>

            <div className="form-group">
              <label>Medical Power of Attorney Contact</label>
              <textarea
                name="medicalPoaContact"
                value={formData.medicalPoaContact}
                onChange={handleInputChange}
                placeholder="Name and contact info"
                rows="2"
              />
            </div>

            <div className="form-group">
              <label>Caregiver Name</label>
              <input
                type="text"
                name="caregiverName"
                value={formData.caregiverName}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Caregiver Contact Information</label>
              <textarea
                name="caregiverContact"
                value={formData.caregiverContact}
                onChange={handleInputChange}
                rows="2"
              />
            </div>

            <div className="form-group">
              <label>Additional Family or Friends (Name)</label>
              <input
                type="text"
                name="familyContact1Name"
                value={formData.familyContact1Name}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Their Contact Information</label>
              <textarea
                name="familyContact1Info"
                value={formData.familyContact1Info}
                onChange={handleInputChange}
                rows="2"
              />
            </div>

            <div className="form-group">
              <label>Additional Family or Friends (Name)</label>
              <input
                type="text"
                name="familyContact2Name"
                value={formData.familyContact2Name}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Their Contact Information</label>
              <textarea
                name="familyContact2Info"
                value={formData.familyContact2Info}
                onChange={handleInputChange}
                rows="2"
              />
            </div>

            <div className="button-group">
              <button type="button" className="secondary-btn" onClick={goToPreviousSection}>Back</button>
              <button type="button" className="primary-btn" onClick={goToNextSection}>Next</button>
            </div>
          </section>
        )}

        {/* STATEMENTS */}
        {currentSection === 'statements' && (
          <section className="form-section">
            <h2>Final Confirmations</h2>

            <div className="checkbox-group">
              <label className="checkbox-label checkbox-large">
                <input
                  type="checkbox"
                  name="understandNotAdvanceDirective"
                  checked={formData.understandNotAdvanceDirective}
                  onChange={handleInputChange}
                  required
                />
                I understand that CEOLP registration forms do not serve as Advance Directives or Living Wills. I will complete those documents separately.
              </label>
              <label className="checkbox-label checkbox-large">
                <input
                  type="checkbox"
                  name="understandDiscussWithFamily"
                  checked={formData.understandDiscussWithFamily}
                  onChange={handleInputChange}
                  required
                />
                I understand that I need to discuss my end-of-life choices with my next of kin and/or designated representative.
              </label>
              <label className="checkbox-label checkbox-large">
                <input
                  type="checkbox"
                  name="understandVitalRecordsConfidential"
                  checked={formData.understandVitalRecordsConfidential}
                  onChange={handleInputChange}
                  required
                />
                I understand that vital records information will be kept in confidence by CEOLP.
              </label>
            </div>

            <div className="button-group">
              <button type="button" className="secondary-btn" onClick={goToPreviousSection}>Back</button>
              <button 
                type="submit" 
                className="primary-btn"
                disabled={
				  !formData.understandNotAdvanceDirective ||
				  !formData.understandDiscussWithFamily ||
				  !formData.understandVitalRecordsConfidential
				}
              >
                {submitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </section>
        )}
      </form>
    </div>
  );
};

export default CEOLPRegistrationForm;
