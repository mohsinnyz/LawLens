// D:\LawLens\frontend\src\components\ReportPage.tsx

import React, { useState } from 'react';
import { marked } from 'marked';
import LawLensForm from './LawLensForm';
import LegalAlertBanner from './LegalAlertBanner';
import ConfidenceScore from './ConfidenceScore';
import UserRights from './UserRights';
import Disclaimer from './Disclaimer';

// Define interfaces for structured data that components expect
interface IncidentFormData {
  incidentDescription: string;
  location: string;
  time: string;
}

interface UserRight {
  title: string;
  description: string;
}

const ReportPage: React.FC = () => {
  const [analysisResponse, setAnalysisResponse] = useState<string | null>(null); // Raw markdown response
  const [loading, setLoading] = useState(false);
  const [incidentData, setIncidentData] = useState<IncidentFormData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // States to hold parsed sections
  const [acknowledgementSummary, setAcknowledgementSummary] = useState<string>('');
  const [criminalAspects, setCriminalAspects] = useState<string>('');
  const [userRights, setUserRights] = useState<string>('');
  const [legalAlerts, setLegalAlerts] = useState<string>('');
  const [confidenceScore, setConfidenceScore] = useState<number | null>(null);
  const [initialStepsCivilRemedy, setInitialStepsCivilRemedy] = useState<string>('');
  const [rawResponse, setRawResponse] = useState<string>('');

  // States for structured data
  const [legalAlertMessage, setLegalAlertMessage] = useState<string | null>(null);
  const [userRightsData, setUserRightsData] = useState<UserRight[]>([]);

  const parseMarkdownResponse = async (rawResult: string) => {
    console.log('Raw backend response:', rawResult);
    
    // More flexible parsing - try different patterns
    let acknowledgementSummary = '';
    let criminalAspects = '';
    let userRights = '';
    let legalAlerts = '';
    let confidenceScore = null;
    let initialStepsCivilRemedy = '';

    // Try to extract Acknowledgement and Incident Summary with multiple patterns
    const initialPatterns = [
      /⚖️ Legal Insights from LawLens:(.*?)1\. Pakistan Penal Code/s,
      /Legal Insights from LawLens:(.*?)1\. Pakistan Penal Code/s,
      /Legal Analysis:(.*?)1\. Pakistan Penal Code/s,
      /(.*?)1\. Pakistan Penal Code/s
    ];

    for (const pattern of initialPatterns) {
      const match = rawResult.match(pattern);
      if (match && match[1]) {
        acknowledgementSummary = match[1].trim();
        console.log('Found acknowledgement summary:', acknowledgementSummary);
        break;
      }
    }

    // Extract sections with more flexible patterns
    const sections = rawResult.split(/\d+\./);
    console.log('Split sections:', sections);

    if (sections.length > 1) {
      // Section 1: Pakistan Penal Code (Criminal Aspects)
      if (sections[1]) {
        const section1Text = sections[1].split(/\d+\./)[0] || sections[1];
        criminalAspects = section1Text.trim();
        console.log('Found Criminal Aspects section:', criminalAspects);
      }

      // Section 2: Cognizable/Non-Cognizable (part of Criminal Aspects)
      if (sections[2]) {
        const section2Text = sections[2].split(/\d+\./)[0] || sections[2];
        criminalAspects += '\n\n' + section2Text.trim();
        console.log('Added to Criminal Aspects section:', section2Text.trim());
      }

      // Section 5: Civil Remedies (Initial Steps & Civil Remedy Hint)
      if (sections[5]) {
        const section5Text = sections[5].split(/\d+\./)[0] || sections[5];
        initialStepsCivilRemedy = section5Text.trim();
        console.log('Found Initial Steps & Civil Remedy section:', initialStepsCivilRemedy);
      }

      // Section 6: Legal Procedures (part of Initial Steps)
      if (sections[6]) {
        const section6Text = sections[6].split(/\d+\./)[0] || sections[6];
        initialStepsCivilRemedy += '\n\n' + section6Text.trim();
        console.log('Added to Initial Steps section:', section6Text.trim());
      }

      // Section 7: Confidence Score
      if (sections[7]) {
        const section7Text = sections[7].split(/\d+\./)[0] || sections[7];
        const scoreMatch = section7Text.match(/Confidence Score:\s*(\d+)%/i);
        if (scoreMatch && scoreMatch[1]) {
          confidenceScore = parseInt(scoreMatch[1], 10);
          console.log('Found confidence score:', confidenceScore);
        }
      }

      // Section 8: Legal Alerts (Critical Legal Alerts)
      if (sections[8]) {
        const section8Text = sections[8].split(/\d+\./)[0] || sections[8];
        legalAlerts = section8Text.trim();
        console.log('Found Critical Legal Alerts section:', legalAlerts);
        
        if (section8Text.toLowerCase().includes("urgent") || section8Text.toLowerCase().includes("critical")) {
          setLegalAlertMessage("This case requires urgent legal attention. Consult a lawyer immediately.");
        }
      }

      // Section 9: User Rights (Relevant User Rights)
      if (sections[9]) {
        const section9Text = sections[9].split(/\d+\./)[0] || sections[9];
        userRights = section9Text.trim();
        console.log('Found Relevant User Rights section:', userRights);
      }
    }

    // Parse and set the sections
    if (acknowledgementSummary) {
      const parsed = await marked.parse(acknowledgementSummary);
      setAcknowledgementSummary(parsed);
    }

    if (criminalAspects) {
      const parsed = await marked.parse(criminalAspects);
      setCriminalAspects(parsed);
    }

    if (userRights) {
      const parsed = await marked.parse(userRights);
      setUserRights(parsed);
    }

    if (legalAlerts) {
      const parsed = await marked.parse(legalAlerts);
      setLegalAlerts(parsed);
    }

    if (confidenceScore !== null) {
      setConfidenceScore(confidenceScore);
    }

    if (initialStepsCivilRemedy) {
      const parsed = await marked.parse(initialStepsCivilRemedy);
      setInitialStepsCivilRemedy(parsed);
    }

    // Mock structured data for components
    const mockUserRights: UserRight[] = [
      { title: "Right to Fair Trial", description: "Every person has the right to a fair trial and due process." },
      { title: "Right to Legal Representation", description: "An accused person has the right to consult and be defended by a legal practitioner of their choice." },
    ];
    setUserRightsData(mockUserRights);
  };

  const handleFormSubmit = async (formData: IncidentFormData) => {
    setLoading(true);
    setError(null);
    setAnalysisResponse(null);
    setIncidentData(formData);

    // Clear previous parsed sections
    setAcknowledgementSummary('');
    setCriminalAspects('');
    setUserRights('');
    setLegalAlerts('');
    setConfidenceScore(null);
    setInitialStepsCivilRemedy('');
    setRawResponse('');
    setLegalAlertMessage(null);
    setUserRightsData([]);

    try {
      const query = `
        Incident Description: ${formData.incidentDescription}
        Location: ${formData.location}
        Time: ${formData.time || 'Not provided'}
        
        Please provide a comprehensive legal analysis including:
        1. Applicable sections of Pakistan Penal Code
        2. Whether the offense is cognizable/non-cognizable
        3. Whether the offense is bailable/non-bailable
        4. Punishment details
        5. Civil remedies available
        6. Legal procedures to follow
        7. A confidence score (0-100) for the analysis.
        8. Any critical legal alerts.
        9. Relevant user rights.
        10. A small glossary of terms.
      `;

      const res = await fetch('http://localhost:8000/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      const rawResult = data.result;
      
      console.log('Backend response data:', data);
      console.log('Raw result:', rawResult);
      console.log('Raw result type:', typeof rawResult);
      console.log('Raw result length:', rawResult.length);

      const parsedResult = await marked.parse(rawResult);
      setAnalysisResponse(parsedResult);
      setRawResponse(rawResult);
      await parseMarkdownResponse(rawResult);

    } catch (err) {
      console.error("Error fetching legal analysis:", err);
      setError('❌ Error fetching legal analysis. Please ensure the backend is running and try again.');
      setAnalysisResponse(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReport = () => {
    if (analysisResponse && incidentData) {
      let reportContent = `
LawLens AI Legal Analysis Report

Incident Details:
Incident: ${incidentData.incidentDescription}
Location: ${incidentData.location}
Time: ${incidentData.time || 'N/A'}

`;

      // If sections were parsed, include them
      if (acknowledgementSummary || criminalAspects || userRights || legalAlerts || initialStepsCivilRemedy) {
        reportContent += `
Acknowledgement and Incident Summary:
${acknowledgementSummary.replace(/<[^>]*>?/gm, '')}

Criminal Aspects (Pakistan Penal Code):
${criminalAspects.replace(/<[^>]*>?/gm, '')}

Relevant User Rights:
${userRights.replace(/<[^>]*>?/gm, '')}

Critical Legal Alerts:
${legalAlerts.replace(/<[^>]*>?/gm, '')}

Initial Steps & Civil Remedy Hint:
${initialStepsCivilRemedy.replace(/<[^>]*>?/gm, '')}
`;
      } else {
        // If no sections parsed, include raw response
        reportContent += `
Complete Analysis:

${rawResponse}
`;
      }

      reportContent += `

---
Disclaimer: This report is for informational purposes only and does not constitute legal advice.
      `;

      const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'LawLens_Legal_Report.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      alert("No report to download. Please submit an incident first.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Incident Form */}
      <LawLensForm onSubmit={handleFormSubmit} loading={loading} error={error} />

      {/* Legal Alert Banner */}
      {legalAlertMessage && <LegalAlertBanner message={legalAlertMessage} />}

      {/* Main Report Sections */}
      {analysisResponse && (
        <>
          {/* Acknowledgement and Incident Summary */}
          {acknowledgementSummary && (
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 shadow-xl animate-fade-in-up">
              <h2 className="text-2xl font-semibold text-primary-300 mb-4">
                Acknowledgement and Incident Summary
              </h2>
              <div className="prose prose-lg max-w-none prose-invert prose-p:text-gray-300">
                <div dangerouslySetInnerHTML={{ __html: acknowledgementSummary }} />
              </div>
            </div>
          )}

          {/* Criminal Aspects (Pakistan Penal Code) */}
          {criminalAspects && (
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 shadow-xl animate-fade-in-up">
              <h2 className="text-2xl font-semibold text-primary-300 mb-4">
                Criminal Aspects (Pakistan Penal Code)
              </h2>
              <div className="prose prose-lg max-w-none prose-invert prose-p:text-gray-300">
                <div dangerouslySetInnerHTML={{ __html: criminalAspects }} />
              </div>
            </div>
          )}

          {/* Relevant User Rights */}
          {userRights && (
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 shadow-xl animate-fade-in-up">
              <h2 className="text-2xl font-semibold text-primary-300 mb-4">
                Relevant User Rights
              </h2>
              <UserRights rights={userRightsData} loading={loading} />
              <div className="prose prose-lg max-w-none prose-invert prose-p:text-gray-300 mt-4">
                <div dangerouslySetInnerHTML={{ __html: userRights }} />
              </div>
            </div>
          )}

          {/* Critical Legal Alerts */}
          {legalAlerts && (
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 shadow-xl animate-fade-in-up">
              <h2 className="text-2xl font-semibold text-primary-300 mb-4">
                Critical Legal Alerts
              </h2>
              <LegalAlertBanner message={legalAlertMessage || "Legal alerts detected"} />
              <div className="prose prose-lg max-w-none prose-invert prose-p:text-gray-300 mt-4">
                <div dangerouslySetInnerHTML={{ __html: legalAlerts }} />
              </div>
            </div>
          )}

          {/* Confidence Score */}
          {confidenceScore !== null && (
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 shadow-xl animate-fade-in-up">
              <h2 className="text-2xl font-semibold text-primary-300 mb-4">
                Confidence Score
              </h2>
              <ConfidenceScore score={confidenceScore} loading={loading} />
            </div>
          )}

          {/* Initial Steps & Civil Remedy Hint */}
          {initialStepsCivilRemedy && (
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 shadow-xl animate-fade-in-up">
              <h2 className="text-2xl font-semibold text-primary-300 mb-4">
                Initial Steps & Civil Remedy Hint
              </h2>
              <div className="prose prose-lg max-w-none prose-invert prose-p:text-gray-300">
                <div dangerouslySetInnerHTML={{ __html: initialStepsCivilRemedy }} />
              </div>
            </div>
          )}

          {/* Download Report Button */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 shadow-xl text-center animate-fade-in-up">
            <h2 className="text-2xl font-semibold text-primary-300 mb-4">
              Report Ready!
            </h2>
            <p className="text-gray-300 mb-6">
              Your comprehensive legal guidance report is ready for download.
            </p>
            <button
              onClick={handleDownloadReport}
              className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-primary-600 hover:to-secondary-600 transform hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <div className="loading-spinner mx-auto"></div>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 001.414 0L9 8.414V14a1 1 0 102 0V8.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 000 1.414z" clipRule="evenodd" />
                  </svg>
                  Download Report
                </>
              )}
            </button>
          </div>

          {/* Fallback: Show raw response if no sections parsed */}
          {!acknowledgementSummary && !criminalAspects && !userRights && !legalAlerts && !initialStepsCivilRemedy && rawResponse && (
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 shadow-xl animate-fade-in-up">
              <h2 className="text-2xl font-semibold text-primary-300 mb-4">
                Raw Analysis Response
              </h2>
              <div className="prose prose-lg max-w-none prose-invert prose-p:text-gray-300">
                <pre className="whitespace-pre-wrap text-sm text-gray-300">{rawResponse}</pre>
              </div>
            </div>
          )}
        </>
      )}

      {/* Disclaimer */}
      <Disclaimer show={true} />
    </div>
  );
};

export default ReportPage;